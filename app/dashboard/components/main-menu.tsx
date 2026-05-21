"use client"

import { useUser } from "@/components/providers/user-provider"
import UserAvatar from "@/components/user-avatar"
import LightDarkToggle from "@/components/ui/light-dark-toggle"
import { cn } from "@/lib/utils"
import MenuItem from "./menu-item"
import MenuTitle from "./menu-title"

type MainMenuProps = {
  className?: string
  onNavigate?: () => void
}

const MainMenu = ({ className, onNavigate }: MainMenuProps) => {
  const { logout } = useUser()

  const handleLogout = () => {
    onNavigate?.()
    logout()
  }

  return (
    <nav className={cn(`md:bg-muted overflow-auto p-4 flex flex-col`, className)}>
      <header className="hidden md:block border-b dark:border-b-black border-b-zinc-300 pb-4">
        <MenuTitle />
      </header>
      <ul className="py-5 grow">
        <MenuItem href="/dashboard" onNavigate={onNavigate}>
          My dashboard
        </MenuItem>
        <MenuItem href="/dashboard/teams" onNavigate={onNavigate}>
          Teams
        </MenuItem>
        <MenuItem href="/dashboard/employees" onNavigate={onNavigate}>
          Employees
        </MenuItem>
        <MenuItem href="/dashboard/account" onNavigate={onNavigate}>
          Account
        </MenuItem>
        <MenuItem href="/dashboard/settings" onNavigate={onNavigate}>
          Settings
        </MenuItem>
      </ul>
      <footer className="flex gap-2 items-center">
        <UserAvatar />
        <button
          type="button"
          className="hover:underline text-left"
          onClick={handleLogout}
        >
          Logout
        </button>
        <LightDarkToggle className="ml-auto" />
      </footer>
    </nav>
  )
}

export default MainMenu
