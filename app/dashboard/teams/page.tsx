import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { columns, type Team } from "./columns"

const TeamsPage = async () => {
  const teams: Team[] = [
    {
      id: 1,
      name: "alpha",
      memberCount: 3,
      teamLeader: {
        firstName: "Colin",
        lastName: "Murray",
        avatar: "/images/cm.jpg",
      },
      color: "#3b82f6",
    },
    {
      id: 2,
      name: "beta",
      memberCount: 3,
      teamLeader: {
        firstName: "Tina",
        lastName: "Fey",
        avatar: "/images/tf.jpg",
      },
      color: "#f97316",
    },
    {
      id: 3,
      name: "delta",
      memberCount: 3,
      teamLeader: { firstName: "Amy", lastName: "Adams" },
      color: "#84cc16",
    },
    {
      id: 4,
      name: "gamma",
      memberCount: 12,
      teamLeader: { firstName: "Sarah", lastName: "Chen" },
      color: "#a855f7",
    },
    {
      id: 5,
      name: "epsilon",
      memberCount: 8,
      teamLeader: { firstName: "Marcus", lastName: "Webb" },
      color: "#ec4899",
    },
    {
      id: 6,
      name: "zeta",
      memberCount: 15,
      teamLeader: {
        firstName: "Ryan",
        lastName: "Lopez",
        avatar: "/images/rl.jpg",
      },
      color: "#06b6d4",
    },
    {
      id: 7,
      name: "eta",
      memberCount: 6,
      teamLeader: { firstName: "Priya", lastName: "Patel" },
      color: "#eab308",
    },
    {
      id: 8,
      name: "theta",
      memberCount: 10,
      teamLeader: { firstName: "James", lastName: "Okafor" },
      color: "#6366f1",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Teams</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={teams} />
      </CardContent>
    </Card>
  )
}

export default TeamsPage
