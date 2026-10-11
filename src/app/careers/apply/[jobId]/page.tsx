import ApplyClient from './ApplyClient'
import { sampleJobs } from '@/data/careers'

export function generateStaticParams() {
  return sampleJobs.map((j) => ({
    jobId: j.id,
  }))
}

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ jobId: string }>
}) {
  const { jobId } = await params
  return <ApplyClient jobId={jobId} />
}
