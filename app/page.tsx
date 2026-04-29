import { BlankDashboardPage } from "@/src/components/dashboard/BlankDashboardPage"
import { AnalysisHomeContent } from "@/src/components/dashboard/AnalysisHomeContent"

export default function Page() {
  return (
    <BlankDashboardPage title="Hello, User!" showSidePanels={false}>
      <AnalysisHomeContent todayIso={new Date().toISOString()} />
    </BlankDashboardPage>
  )
}
