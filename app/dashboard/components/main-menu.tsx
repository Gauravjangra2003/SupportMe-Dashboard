import { Avatar , AvatarFallback } from "@/components/ui/avatar"
import MenuItem from "./menu-item"
import MenuTitle from "./menu-title"
import Link from "next/link"
import LightDarkToggle from "@/components/ui/light-dark-toggle"
import { cn } from "@/lib/utils"


const MainMenu = ({className}: {className?:string}) => {
  return (
     <nav className={cn(`md:bg-muted overflow-auto p-4 flex flex-col` , className)}>
        <header className="hidden md:block border-b dark:border-b-black border-b-zinc-300 pb-4">
          <MenuTitle />
        </header>
        <ul className="py-5 grow">
          <MenuItem href="/dashboard">
            My dashboard
          </MenuItem>
           <MenuItem href="/dashboard/teams">
            Teams
          </MenuItem>
           <MenuItem href="/dashboard/employees">
            Employees
          </MenuItem>
           <MenuItem href="/dashboard/account">
            Account
          </MenuItem>
           <MenuItem href="/dashboard/settings">
            Settings
          </MenuItem>
        </ul>
        <footer className="flex gap-2 items-center">
            <Avatar>
              <AvatarFallback className="bg-green-400 dark:bg-green-800">GK</AvatarFallback>
            </Avatar>
            <Link className="hover:underline" href="/">Logout</Link>
            <LightDarkToggle className="ml-auto" />
        </footer>
     </nav>
  )
}

export default MainMenu