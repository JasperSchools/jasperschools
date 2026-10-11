import TeamMemberClient from './TeamMemberClient'
import { teamMembers, createSlug } from '@/data/teamMembers'

export function generateStaticParams() {
  return teamMembers.map((member) => ({
    slug: member.slug || createSlug(member.name),
  }))
}

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <TeamMemberClient slug={slug} />
}
