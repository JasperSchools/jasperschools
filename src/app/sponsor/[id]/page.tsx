import StudentDetailClient from './StudentDetailClient'
import { sampleChildren } from '@/data/children'

export function generateStaticParams() {
  return sampleChildren.map((c) => ({
    id: c.id,
  }))
}

export default async function StudentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <StudentDetailClient id={id} />
}
