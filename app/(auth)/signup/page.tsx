"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthLayout } from "@/components/auth/auth-layout"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { UserPlus, Eye, EyeOff, GraduationCap, Calendar, Building2, School, ArrowLeft, BadgeAlert } from "lucide-react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { SpinningIcon } from "@/components/custom-icons"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import { institutions } from "@/data/helper"
import { useRouter } from "next/navigation"
import { signUp } from "@/services/auth"
import { useToast } from "@/hooks/use-toast"

const step1Schema = z.object({
  matricNumber: z.string().min(1, "Matriculation number is required"),
  graduationYear: z.string()
    .regex(/^\d{4}$/, "Must be a valid year")
    .refine((year) => parseInt(year) >= 1900 && parseInt(year) <= new Date().getFullYear() + 6, {
      message: "Must be a valid graduation year"
    }),
  institutionType: z.enum(["university", "polytechnic", "college"], {
    required_error: "Please select an institution type",
  }),
  institutionName: z.string().min(2, "Institution name is required"),
})

const step2Schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type Step1FormValues = z.infer<typeof step1Schema>
type Step2FormValues = z.infer<typeof step2Schema>

export default function SignUpPage() {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [step1Data, setStep1Data] = useState<Step1FormValues | null>(null)
  const [institutionSearchOpen, setInstitutionSearchOpen] = useState(false)
  const [error, setError] = useState<string>('')
  const router = useRouter()
  const { toast } = useToast()


  const step1Form = useForm<Step1FormValues>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      matricNumber: "",
      graduationYear: "",
      institutionType: undefined,
      institutionName: "",
    },
  })

  const step2Form = useForm<Step2FormValues>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const selectedInstitutionType = step1Form.watch("institutionType")
  const institutionsList = selectedInstitutionType ? institutions[selectedInstitutionType] : []

  async function onStep1Submit(data: Step1FormValues) {
    setStep1Data(data)
    setStep(2)
  }

  async function onStep2Submit(data: Step2FormValues) {
    setIsLoading(true)
    try {
      setError('');
      await signUp(data.email, data.password, {...step1Data, ...data});
      toast({
        title: "Success",
        description: "Account created successfully",
      })
      router.push('/');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthLayout>
      <Card className="border-none shadow-none">
        <CardHeader className="space-y-1">
          <div className="flex flex-col items-center justify-center mb-6">
            <Link href="/">
              <Image
                src="/assets/images/logo.png"
                alt="Logo"
                width={102}
                height={102}
                priority
              />
            </Link>
            <p className="font-bold text-lg">Welcome to <span className="text-primary">GOWNS2TOWN</span> 👋</p>
          </div>
          <CardTitle className="text-2xl flex items-center gap-2">
            <UserPlus className="w-6 h-6" />
            Create an account
          </CardTitle>
          <CardDescription>
            {step === 1 ? "Enter your academic information" : "Enter your personal information"}
          </CardDescription>
        </CardHeader>

        {step === 1 ? (
          <Form {...step1Form}>
            <form onSubmit={step1Form.handleSubmit(onStep1Submit)}>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={step1Form.control}
                    name="matricNumber"
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor="matricNumber">Matriculation Number</Label>
                        <FormControl>
                          <div className="relative">
                            <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="matricNumber"
                              className={`pl-9 ${step1Form.formState.errors.matricNumber ? 'border-red-500' : ''}`}
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={step1Form.control}
                    name="graduationYear"
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor="graduationYear">Graduation Year</Label>
                        <FormControl>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="graduationYear"
                              type="number"
                              className={`pl-9 ${step1Form.formState.errors.graduationYear ? 'border-red-500' : ''}`}
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={step1Form.control}
                    name="institutionType"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Institution Type</Label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className={`pl-9 ${step1Form.formState.errors.institutionType ? 'border-red-500' : ''}`}>
                                <SelectValue placeholder="Select institution type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="university">University</SelectItem>
                              <SelectItem value="polytechnic">Polytechnic</SelectItem>
                              <SelectItem value="college">College</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={step1Form.control}
                    name="institutionName"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Institution Name</Label>
                        <Popover open={institutionSearchOpen} onOpenChange={setInstitutionSearchOpen}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-full justify-between pl-9 relative text-sm",
                                  !field.value && "text-muted-foreground",
                                  step1Form.formState.errors.institutionName && "border-red-500"
                                )}
                                disabled={!selectedInstitutionType}
                              >
                                <School className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                {field.value
                                  ? institutionsList.find(
                                    (institution) => institution === field.value
                                  )
                                  : "Select institution"}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[400px] p-0">
                            <Command>
                              <CommandInput placeholder="Search institution..." />
                              <CommandEmpty>No institution found.</CommandEmpty>
                              <CommandGroup className="max-h-[300px] overflow-auto">
                                {institutionsList.map((institution) => (
                                  <CommandItem
                                    value={institution}
                                    key={institution}
                                    onSelect={() => {
                                      step1Form.setValue("institutionName", institution)
                                      setInstitutionSearchOpen(false)
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        institution === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {institution}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" type="submit">
                  Continue
                </Button>
              </CardFooter>
            </form>
          </Form>
        ) : (
          <Form {...step2Form}>
            <form onSubmit={step2Form.handleSubmit(onStep2Submit)}>
              <CardContent className="grid gap-4">
                {error && (
                  <Alert variant="destructive" className="my-4">
                    <BadgeAlert className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <FormField
                  control={step2Form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="name">Full Name</Label>
                      <FormControl>
                        <Input
                          id="name"
                          type="text"
                          placeholder="John Doe"
                          className={`${step2Form.formState.errors.name ? 'border-red-500' : ''}`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={step2Form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="email">Email</Label>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="name@example.com"
                          className={`${step2Form.formState.errors.email ? 'border-red-500' : ''}`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={step2Form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="password">Password</Label>
                      <FormControl>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            className={`${step2Form.formState.errors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={step2Form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <FormControl>
                        <div className="relative">
                          <Input
                            id="confirm-password"
                            type={showConfirmPassword ? "text" : "password"}
                            className={`${step2Form.formState.errors.confirmPassword ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <p className="text-center text-xs text-muted-foreground">
                  By signing up, you agree to the G2T{" "}
                  <Link href="/user-agreement" className="text-primary hover:underline">User Agreement</Link>,{" "}
                  <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>, and{" "}
                  <Link href="/cookie-policy" className="text-primary hover:underline">Cookie Policy</Link>.
                </p>
                <div className="flex gap-4 w-full">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setStep(1)}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button className="flex-1" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <SpinningIcon />
                        Creating account...
                      </>
                    ) : (
                      "Create account"
                    )}
                  </Button>
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Form>
        )}
      </Card>
    </AuthLayout>
  )
}