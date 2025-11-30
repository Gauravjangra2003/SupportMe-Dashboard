
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ListCheckIcon , PieChart, StarIcon, UsersIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import cm from "@/public/images/cm.jpg"
import tf from "@/public/images/tf.jpg"
import rl from "@/public/images/rl.jpg"
import { TooltipProvider , Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Avatar , AvatarFallback } from "@/components/ui/avatar"
import TeamDistributionChart from "./team-distribution-chart"
import SupportTicketsResolved from "./support-tickets-resolved"


const teamLeaders = [
  {
    firstName: "Colin",
    lastName: "Murray",
    avatar: cm,
  },
  {
    firstName: "Tom",
    lastName: "Phillips",
  },
  {
    firstName: "Liam",
    lastName: "Fuentes",
  },
  {
    firstName: "Tina",
    lastName: "Fey",
    avatar: tf,
  },
  {
    firstName: "Katie",
    lastName: "Johnson",
  },
  {
    firstName: "Tina",
    lastName: "Jones",
  },
  {
    firstName: "Amy",
    lastName: "Adams",
  },
  {
    firstName: "Ryan",
    lastName: "Lopez",
    avatar: rl,
  },
  {
    firstName: "Jenny",
    lastName: "Jones",
  },
];



const TeamsStats = () => {
  return (
    <>
        {/* Cards Content */}
        <div className="grid lg:grid-cols-3 gap-4">
         {/* Card 1 */}
        <Card>
            <CardHeader  >
                <CardTitle className="text-base ">
                    Total teams
                </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
                <div className="flex gap-3">
                    <UsersIcon /> 
                    <span className="text-5xl font-bold">8</span>
                </div>
                <div>
                    <Button size="sm" asChild>
                        <Link href="/dashboard/teams">view all</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
        {/* Card 2 */}
        <Card>
            <CardHeader >
                <CardTitle className="text-base flex justify-between items-center">
                    <span>Teams leaders </span>
                    <StarIcon className="text-yellow-500" />
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
                    {
                        teamLeaders.map(items => (
                            <TooltipProvider key={`${items.firstName}${items.lastName}`}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                                <Avatar>
                                                    {
                                                        !!items.avatar && 
                                                        <Image src={items.avatar} alt={`${items.firstName} ${items.lastName} avatar`}/>
                                                    }
                                                    <AvatarFallback>
                                                        {items.firstName[0]} {items.lastName[0]}
                                                    </AvatarFallback>
                                                </Avatar>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            {items.firstName} {items.lastName}
                                        </TooltipContent>
                                    </Tooltip>
                            </TooltipProvider>
                        ))
                    }
            </CardContent>
        </Card>
        {/* Card 3 */}
        <Card className="flex flex-col">
            <CardHeader >
                  <CardTitle className="text-base flex justify-between items-center">
                    <span>Teams distribution </span>
                    <PieChart />
                </CardTitle>
            </CardHeader>
            <CardContent className="pb-0">
                {/* Pie Chart in a card */}
                <TeamDistributionChart />
            </CardContent>
        </Card>
        </div>

        {/* Line Graph Contennt */}

        <Card className="my-4">
            <CardHeader>
                <CardTitle  className="flex items-center text-lg gap-2">
                    <ListCheckIcon />
                    <span>Support tickets resolved</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="pl-0">
                {/* Pie chart component */}
                <SupportTicketsResolved />
            </CardContent>
        </Card>

    </>
  )
}

export default TeamsStats