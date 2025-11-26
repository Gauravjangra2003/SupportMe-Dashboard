'use client'

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes";


const LightDarkToggle = ({className}: {className?: string}) => {
  const {setTheme , resolvedTheme} = useTheme();
  return (
    <Tooltip>
        <TooltipTrigger asChild onClick={() => {setTheme(resolvedTheme === "light" ? "dark" : "light")}}>
            <Button variant="outline" className={className} >
                <SunIcon className="block dark:hidden"/>
                <MoonIcon className="hidden dark:block" />
            </Button>
        </TooltipTrigger>
        <TooltipContent>
            <span className="hidden dark:inline">Enable light mode</span>
            <span className="inline dark:hidden">Enable dark mode</span>
        </TooltipContent>
    </Tooltip>
  )
}

export default LightDarkToggle