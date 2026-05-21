"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useUser } from "@/components/providers/user-provider"

type UserAvatarProps = {
  className?: string
  fallbackClassName?: string
}

const UserAvatar = ({ className, fallbackClassName }: UserAvatarProps) => {
  const { initials, isReady } = useUser()

  return (
    <Avatar className={className}>
      <AvatarFallback
        className={cn(
          "bg-green-400 font-semibold text-black dark:bg-green-800 dark:text-white",
          fallbackClassName
        )}
      >
        {isReady ? initials : "GK"}
      </AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
