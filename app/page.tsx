import { BlankDashboardPage } from "@/src/components/dashboard/BlankDashboardPage"
import { AnalysisHomeContent } from "@/src/components/dashboard/AnalysisHomeContent"

interface PageProps {
  searchParams?: Promise<{
    name?: string | string[]
  }>
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams
  const nameParam = params?.name
  const rawName = Array.isArray(nameParam) ? nameParam[0] : nameParam
  const displayName = rawName?.trim() || "User"

  return (
    <BlankDashboardPage title={`Hello, ${displayName}!`} showSidePanels={false}>
      <AnalysisHomeContent todayIso={new Date().toISOString()} />
    </BlankDashboardPage>
  )
}
