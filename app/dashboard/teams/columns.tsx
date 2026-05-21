"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"

export type Team = {
  id: number
  name: string
  memberCount: number
  teamLeader: {
    firstName: string
    lastName: string
    avatar?: string
  }
  color: string
}

export const columns: ColumnDef<Team>[] = [
  {
    accessorKey: "name",
    header: "Team",
    cell: ({ row }) => {
      const name: string = row.getValue("name")
      const color: string = row.original.color

      return (
        <div className="flex items-center gap-2 capitalize">
          <span
            className="size-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: color }}
          />
          {name}
        </div>
      )
    },
  },
  {
    accessorKey: "memberCount",
    header: "Members",
    cell: ({ row }) => {
      const count: number = row.getValue("memberCount")
      return <span className="text-muted-foreground">{count}</span>
    },
  },
  {
    id: "teamLeader",
    header: "Team leader",
    cell: ({ row }) => {
      const { firstName, lastName, avatar } = row.original.teamLeader

      return (
        <div className="flex min-w-[200px] flex-wrap items-center gap-2 sm:gap-3">
          <Avatar>
            {avatar && (
              <Image
                height={40}
                width={40}
                src={avatar}
                alt={`${firstName} ${lastName} avatar`}
              />
            )}
            <AvatarFallback className="uppercase">
              {firstName[0]}
              {lastName[0]}
            </AvatarFallback>
          </Avatar>
          <span className="whitespace-nowrap">
            {firstName} {lastName}
          </span>
          <Badge variant="success" className="shrink-0">
            Team Leader
          </Badge>
        </div>
      )
    },
  },
]
