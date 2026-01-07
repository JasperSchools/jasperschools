import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServiceClient()

    const formData = await request.formData()
    const file = formData.get('file') as File
    const jobId = formData.get('jobId') as string
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type (PDF, DOC, DOCX)
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    const allowedExtensions = ['.pdf', '.doc', '.docx']
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
    
    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only PDF, DOC, and DOCX files are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      )
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExt = file.name.split('.').pop()
    const fileName = `${timestamp}-${randomString}.${fileExt}`
    const filePath = jobId ? `job-${jobId}/${fileName}` : `applications/${fileName}`

    // Convert File to ArrayBuffer then to Buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('job-applications')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      console.error('Storage upload error:', uploadError)
      return NextResponse.json(
        { error: `Failed to upload file: ${uploadError.message}` },
        { status: 500 }
      )
    }

    if (!uploadData) {
      return NextResponse.json(
        { error: 'Upload failed: No data returned' },
        { status: 500 }
      )
    }

    // Get signed URL (since bucket is private)
    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from('job-applications')
      .createSignedUrl(filePath, 31536000) // 1 year expiry

    if (signedUrlError || !signedUrlData) {
      console.error('Signed URL creation error:', signedUrlError)
      // Still return the file path even if signed URL fails - admin can access via service role
      return NextResponse.json({
        success: true,
        cv_url: filePath, // Return path as fallback
        cv_filename: file.name,
        file_path: filePath,
      })
    }

    return NextResponse.json({
      success: true,
      cv_url: signedUrlData.signedUrl,
      cv_filename: file.name,
      file_path: filePath,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}

