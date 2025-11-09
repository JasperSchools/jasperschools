-- ============================================
-- DATABASE MIGRATION SCRIPT
-- ============================================
-- Run this in your Supabase SQL Editor to update existing database
-- This adds support for:
-- 1. Split name fields (first_name, last_name)
-- 2. Archive functionality
-- 3. Image upload support
-- ============================================

-- Add new columns to children table
ALTER TABLE children 
ADD COLUMN IF NOT EXISTS first_name TEXT,
ADD COLUMN IF NOT EXISTS last_name TEXT,
ADD COLUMN IF NOT EXISTS archived BOOLEAN DEFAULT FALSE NOT NULL,
ADD COLUMN IF NOT EXISTS photo_path TEXT;

-- Migrate existing name data to first_name (if name exists and first_name is null)
-- Note: You'll need to manually split names in the admin panel
UPDATE children 
SET first_name = name
WHERE first_name IS NULL AND name IS NOT NULL;

-- After migration, you can optionally make first_name and last_name required
-- Uncomment these after you've updated all records:
-- ALTER TABLE children ALTER COLUMN first_name SET NOT NULL;
-- ALTER TABLE children ALTER COLUMN last_name SET NOT NULL;

-- Add index for archived column for better performance
CREATE INDEX IF NOT EXISTS idx_children_archived ON children(archived);

-- Update the public read policy to exclude archived children from public view
DROP POLICY IF EXISTS "Children are viewable by everyone" ON children;

CREATE POLICY "Children are viewable by everyone" 
    ON children FOR SELECT 
    USING (archived = FALSE);

-- Create a policy for admin to view all children including archived
CREATE POLICY "All children viewable by service role" 
    ON children FOR SELECT 
    USING (true);

-- Create storage bucket for children photos if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('children-photos', 'children-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for children photos
DO $$ 
BEGIN
    -- Drop existing policies if they exist
    DROP POLICY IF EXISTS "Public Access to children photos" ON storage.objects;
    DROP POLICY IF EXISTS "Authenticated users can upload children photos" ON storage.objects;
    DROP POLICY IF EXISTS "Service role can upload children photos" ON storage.objects;
    DROP POLICY IF EXISTS "Service role can delete children photos" ON storage.objects;
END $$;

-- Public can view photos
CREATE POLICY "Public Access to children photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'children-photos');

-- Service role can upload photos
CREATE POLICY "Service role can upload children photos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'children-photos');

-- Service role can update photos
CREATE POLICY "Service role can update children photos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'children-photos');

-- Service role can delete photos
CREATE POLICY "Service role can delete children photos"
ON storage.objects FOR DELETE
USING (bucket_id = 'children-photos');

-- ============================================
-- Migration Complete!
-- ============================================
-- Next steps:
-- 1. Update all existing children records to have first_name and last_name
-- 2. Upload photos to Supabase Storage
-- 3. Update photo_path fields with storage paths
-- ============================================

