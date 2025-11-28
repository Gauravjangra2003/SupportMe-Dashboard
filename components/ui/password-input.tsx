'use client'

import * as React from "react"

import { cn } from "@/lib/utils"
import { Input } from "./input"
import { EyeIcon, EyeOffIcon } from "lucide-react"

function PasswordInput({ className, type, ...props }: React.ComponentProps<"input">) {

    const [showPassword, setShowPassword] = React.useState(false);

  return (
        <div className="relative ">
            <Input type={showPassword ? "text" : "password"}  {...props} className={cn("pr-10" , className)}  /> 
            <span className="absolute top-[7px] right-2 cursor-pointer select-none">
                {showPassword ? <EyeIcon onClick={() => setShowPassword(false)} /> : <EyeOffIcon onClick={() => setShowPassword(true)} />}
            </span>
        </div>
  )
}

export { PasswordInput }
