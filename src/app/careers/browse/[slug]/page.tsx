import JobDetailClient from './JobDetailClient'
import { sampleJobs } from '@/data/careers'

export function generateStaticParams() {
  return sampleJobs.map((j) => ({
    slug: j.slug,
  }))
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <JobDetailClient slug={slug} />
}
