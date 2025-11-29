import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const DashboardPage = () => {
  return (
    <Tabs defaultValue="employees">
      <TabsList>
          <TabsTrigger value="employees">
              Employees stats
          </TabsTrigger>
           <TabsTrigger value="teams">
              Teams stats
          </TabsTrigger>
      </TabsList>
        <TabsContent value="employees">
          employees stats view
      </TabsContent>
        <TabsContent value="teams">
          teams stats view
      </TabsContent>
    </Tabs>
  )
}

export default DashboardPage