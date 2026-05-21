'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectItem } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, PersonStandingIcon } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { PasswordInput } from "@/components/ui/password-input"
import { Checkbox } from "@/components/ui/checkbox"
import { registerUser } from "@/lib/user-session"
import { useRouter } from "next/navigation"

const accountTypeSchema = z.object({
    accountType : z.enum(["personal", "company"]),
    companyName : z.string().optional(),
    numberOfEmployees : z
  .union([z.number().min(1), z.literal(undefined)])
.optional(),
}).superRefine((data , ctx) =>  {
     if(data.accountType === "company" && !data.companyName) {
        ctx.addIssue({
            code : z.ZodIssueCode.custom,
            path : ["companyName"],
            message : "Company name is required",
        })
    }
     if(data.accountType === "company" && (!data.numberOfEmployees || data.numberOfEmployees < 1)){
        ctx.addIssue({
            code : z.ZodIssueCode.custom,
            path : ["numberOfEmployees"],
            message : "Number of employees is required",
        })
    }
})

const passwordSchema = z.object({
      password : z.string().min(8 , "Password must be at least 8 characters").refine((password) => {
        // must contain at least one uppercase letter and one special character
        return /^(?=.*[!@#$%^&*])(?=.*[A-Z]).*$/.test(password);
    } , "Password must contain at least one uppercase letter and one special letter"),
    passwordConfirm: z.string(),
}).superRefine((data , ctx) => {
    if(data.password !== data.passwordConfirm) {
        ctx.addIssue({
            code : z.ZodIssueCode.custom,
            path : ["passwordConfirm"],
            message : "Passwords do not match",
        })
    }
})

const acceptTermsSchema = z.object({
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});


const baseSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email : z.string().email(),
    dob : z.date().refine((date) => {
        const today = new Date();
        const eighteenYearsAgo = new Date(
            today.getFullYear() - 18,
            today.getDate(),
            today.getMonth()
        );
        return date <= eighteenYearsAgo;
    } , "You must be at least 18 years old"),
})

const formSchema = baseSchema.and(accountTypeSchema).and(passwordSchema).and(acceptTermsSchema);


const SignUpPage = () => {

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirm: '',
            companyName: '',
            numberOfEmployees: undefined,
            accountType: undefined,
            acceptTerms: false,
            dob: undefined,
        }
    });

    const handleSubmit = (data: z.infer<typeof formSchema>) => {
        registerUser({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
        })
        router.push("/dashboard")
    }

    const accountType = form.watch("accountType");

  return (
    <>
    <PersonStandingIcon size={50} />
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>
                    Sign up
                </CardTitle>
                <CardDescription>
                   Sign up for a new SupportMe account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleSubmit)}>
                        <div className="grid grid-cols-2 gap-4">
                        <FormField control={form.control} name="firstName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>First name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField control={form.control} name="lastName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Last name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        </div>
                        <FormField control={form.control} name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="john@deo.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField control={form.control} name="accountType"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Account Type
                                    </FormLabel>
                                    <Select onValueChange={field.onChange} >
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select an account type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="personal">
                                                Personal
                                            </SelectItem>
                                            <SelectItem value="company">
                                                Company
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {accountType === "company" && 
                            <>
                                <FormField control={form.control} name="companyName"
                                render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Company Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Company name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                                />

                                <FormField control={form.control} name="numberOfEmployees"
                                render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Employees
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="number" min={0} placeholder="Employees" {...field}  value={field.value ?? ""} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                                />
                            </>
                        }

                                <FormField control={form.control} name="dob"
                                render={({field}) => { 
                                    const dobFromDate = new Date();
                                    dobFromDate.setFullYear(dobFromDate.getFullYear() - 80);
                                    return (
                                <FormItem className="flex flex-col pt-1.5">
                                    <FormLabel>
                                        Date of Birth
                                    </FormLabel>
                                       <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button variant="outline" className="normal-case flex justify-between pr-1">
                                                        <span>Pick a date</span>
                                                        <CalendarIcon />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent align="start" className="w-auto p-0">
                                                <Calendar mode="single" defaultMonth={field.value} selected={field.value} onSelect={field.onChange} fixedWeeks weekStartsOn={1} startMonth={dobFromDate}
                                                captionLayout="dropdown" disabled={[
                                                    {
                                                        after: new Date(),
                                                        before: dobFromDate,
                                                }
                                                ]} />
                                            </PopoverContent>
                                       </Popover>
                                    <FormMessage />
                                </FormItem>
                                )}}
                                />

                                {/* Password */}

                                <FormField control={form.control} name="password"
                                render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <PasswordInput placeholder="••••••••" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                                />

                                {/* Confirm Password */ }

                                <FormField control={form.control} name="passwordConfirm"
                                render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                      Confirm Password
                                    </FormLabel>
                                    <FormControl>
                                        <PasswordInput placeholder="••••••••" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                                />

                                {/* Terms and conditions */ }

                                <FormField control={form.control} name="acceptTerms"
                                render={({field}) => (
                                <FormItem>
                                    <div className="flex gap-2 items-center">
                                        <FormControl>
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <FormLabel>
                                            I accept the terms and conditions
                                        </FormLabel>
                                    </div>
                                    <FormDescription>
                                        By signing up you agree to our <Link className="text-primary hover:underline" href="/terms" >terms and conditions</Link>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                                )}
                                />

                        <Button type="submit">
                            Sign up
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="justify-between">
                <small>Already have an account?</small>
                <Button asChild variant="outline" size="sm">
                    <Link href="/login">Login</Link>
                </Button>
            </CardFooter>
        </Card>
    </>
  )
}

export default SignUpPage