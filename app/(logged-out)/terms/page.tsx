import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

const TermsPage = () => {
  return (
    <Card className="w-[350px] max-w-lg">
      <CardHeader>
        <CardTitle>Terms and conditions</CardTitle>
        <CardDescription>
          Demo placeholder for the Support Me dashboard course project.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground space-y-3">
        <p>
          By using this application you agree that data is stored locally in
          your browser for demonstration purposes only.
        </p>
        <p>
          This is not a production legal agreement. Replace this page with your
          official terms before launching to users.
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline">
          <Link href="/sign-up">Back to sign up</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default TermsPage
