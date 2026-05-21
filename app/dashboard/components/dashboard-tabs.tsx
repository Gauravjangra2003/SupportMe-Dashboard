"use client"

import dynamic from "next/dynamic"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

const EmployeesStats = dynamic(
  () => import("./employees/employees-stats"),
  {
    loading: () => <StatsPanelSkeleton />,
  }
)

const TeamsStats = dynamic(() => import("./teams/teams-stats"), {
  loading: () => <StatsPanelSkeleton />,
})

function StatsPanelSkeleton() {
  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-[350px] w-full lg:col-span-3" />
    </div>
  )
}

const DashboardTabs = () => {
  return (
    <Tabs defaultValue="employees">
      <TabsList className="mb-4">
        <TabsTrigger value="employees">Employees stats</TabsTrigger>
        <TabsTrigger value="teams">Teams stats</TabsTrigger>
      </TabsList>
      <TabsContent value="employees">
        <EmployeesStats />
      </TabsContent>
      <TabsContent value="teams">
        <TeamsStats />
      </TabsContent>
    </Tabs>
  )
}

export default DashboardTabs
