"use client"

import { useUser } from "@/components/providers/user-provider"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { MenuIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import { useState } from "react"
import MainMenu from "./main-menu"
import MenuTitle from "./menu-title"

const DashboardShell = ({ children }: { children: React.ReactNode }) => {
  const { firstName, isReady } = useUser()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const [prevPathname, setPrevPathname] = useState(pathname)

  if (pathname !== prevPathname) {
    setPrevPathname(pathname)
    if (mobileMenuOpen) {
      setMobileMenuOpen(false)
    }
  }

  const welcomeTitle =
    isReady && firstName ? `Welcome back, ${firstName}` : "Welcome back, John"

  return (
    <div className="md:grid md:grid-cols-[250px_1fr] h-screen">
      <MainMenu className="hidden md:flex" />
      <div className="p-4 flex justify-between md:hidden sticky top-0 left-0 bg-background border-b border-border z-10">
        <MenuTitle />
        <Drawer
          direction="right"
          open={mobileMenuOpen}
          onOpenChange={setMobileMenuOpen}
        >
          <DrawerTrigger
            className="inline-flex size-9 items-center justify-center rounded-md hover:bg-accent"
            aria-label="Open menu"
          >
            <MenuIcon />
          </DrawerTrigger>
          <DrawerContent>
            <MainMenu onNavigate={() => setMobileMenuOpen(false)} />
          </DrawerContent>
        </Drawer>
      </div>

      <div className="overflow-auto py-2 px-4">
        <h1 className="pb-4">{welcomeTitle}</h1>
        {children}
      </div>
    </div>
  )
}

export default DashboardShell
