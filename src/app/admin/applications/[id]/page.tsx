import ApplicationDetailClient from './ApplicationDetailClient'

export function generateStaticParams() {
  return [{ id: 'sample-app' }]
}

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <ApplicationDetailClient id={id} />
}
