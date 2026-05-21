import { UserProvider } from "@/components/providers/user-provider"
import DashboardShell from "./components/dashboard-shell"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <DashboardShell>{children}</DashboardShell>
    </UserProvider>
  )
}

export default DashboardLayout
