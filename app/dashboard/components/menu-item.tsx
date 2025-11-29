'use client'

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

type MenuItemProps = {
  children: React.ReactNode,
  href: string
}

const MenuItem = ({children, href} : MenuItemProps) => {

  const pathname = usePathname();
  const isActive = pathname === href;

  return (
   <li>
     <Link className={cn("block p-2 hover:bg-white dark:hover:bg-zinc-700 rounded-md text-muted-foreground hover:text-foreground" , isActive && "bg-primary hover:bg-primary dark:hover:bg-primary hover:text-primary-foreground text-primary-foreground")} href={href}>{children}</Link>
   </li>
  )
}

export default MenuItem