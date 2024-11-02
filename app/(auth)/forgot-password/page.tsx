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
import { Check, Lock, Mail } from "lucide-react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { SpinningIcon } from "@/components/custom-icons"

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

type FormValues = z.infer<typeof formSchema>

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(data: FormValues) {
    setIsLoading(true)
    // Add your password reset logic here
    console.log(data)
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1000)
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
          {!isSubmitted &&
            <><CardTitle className="text-2xl flex items-center gap-2">
              <Lock className="w-6 h-6" />
              Forgot password
            </CardTitle>
              <CardDescription>
                Enter your email address and we&apos;ll send you a reset link
              </CardDescription>
            </>
          }
        </CardHeader>
        {!isSubmitted ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="grid gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="email">Email</Label>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            className={`pl-9 ${form.formState.errors.email ? 'border-red-500' : ''}`}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <SpinningIcon />
                      Sending reset link...
                    </>
                  ) : (
                    "Send reset link"
                  )}
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Remember your password?{" "}
                  <Link href="/login" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Form>
        ) : (
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center gap-2">
              <Check className="h-12 w-12 text-green-500 border-2 border-green-500 rounded-full p-2" />
              <p className="text-center text-sm text-muted-foreground">
                We&apos;ve sent you an email with a reset link. Please check your inbox.
              </p>
            </div>
            <Button asChild className="w-full">
              <Link href="/login">Return to login</Link>
            </Button>
          </CardContent>
        )}
      </Card>
    </AuthLayout>
  )
}