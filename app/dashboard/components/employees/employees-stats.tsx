import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangleIcon, BadgeCheckIcon, LaptopIcon, PartyPopperIcon, UserCheck2Icon, UserIcon, UserRoundXIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import cm from "@/public/images/cm.jpg"
import WorkLocationTrends from "./work-location-trends"


const EmployeesStats = () => {

  const totalemployees = 100;
  const employeesPresent = 80;
  const employeesPresentPercentage = (employeesPresent / totalemployees * 100)

  return (
    <>
        {/* Cards Content */}
        <div className="grid lg:grid-cols-3 gap-4">
         {/* Card 1 */}
        <Card>
            <CardHeader >
                <CardTitle className="text-base ">
                    Total Employees
                </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
                <div className="flex gap-2">
                    <UserIcon /> 
                    <span className="text-5xl font-bold">{totalemployees}</span>
                </div>
                <div>
                    <Button size="xs" asChild>
                        <Link href="/dashboard/employees">VIEW ALL</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
        {/* Card 2 */}
        <Card>
            <CardHeader>
                <CardTitle className="text-base ">
                    Employees Present
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex gap-2">
                    {
                        employeesPresentPercentage > 75 ?  <UserCheck2Icon />  : <UserRoundXIcon />
                    }
                    <span className="text-5xl font-bold">{employeesPresent}</span>
                </div>
            </CardContent>
            <CardFooter>
                {
                    employeesPresentPercentage > 75 ?
                    <span className="flex items-center text-green-600 gap-1 text-xs"><BadgeCheckIcon /> 80% of employees are present</span> :
                    <span className="flex items-center text-red-400 gap-1 text-xs"><AlertTriangleIcon /> {employeesPresentPercentage}% of employees are present</span>
                }
           
            </CardFooter>
        </Card>
        {/* Card 3 */}
        <Card className="border-[#c8e7d1] flex flex-col">
            <CardHeader>
                <CardTitle className="text-base ">
                    Employees of the month
                </CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2 items-center">
                <Avatar>
                    <Image src={cm} alt="employee of month image not found" />
                    <AvatarFallback>CM</AvatarFallback>
                </Avatar>
                <span className="text-2xl">Colin Murray!</span>
            </CardContent>
            <CardFooter className="flex gap-2 items-center text-xs text-muted-foreground mt-auto">
                    <PartyPopperIcon className="text-pink-400" />
                    <span className="text-zinc-500">Congratulations, Colin!</span>
            </CardFooter>
        </Card>
        </div>

        {/* Graph Contennt */}

        <Card className="my-4">
            <CardHeader>
                <CardTitle  className="flex items-center text-lg gap-2">
                    <LaptopIcon />
                    <span>Employee work location trends</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="pl-0">
                {/* Pie chart component */}
                <WorkLocationTrends />
            </CardContent>
        </Card>

    </>
  )
}

export default EmployeesStats