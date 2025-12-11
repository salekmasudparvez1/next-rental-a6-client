"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Eye, EyeOff } from "lucide-react"
import toast from "react-hot-toast"
import { Button } from "@/components/ui/button"
import {
    Card, CardContent, CardDescription,
    CardHeader, CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginUser } from "@/service/auth/AuthService"
import { useUser } from "@/contexts/UseerContext"
import { useRouter, useSearchParams } from "next/navigation"



interface LoginData {
    identifier: string;   // email OR username
    password: string;
}

export default function LoginPage() {

    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, formState: { errors }, watch ,setValue} = useForm<LoginData>({
        mode: "onChange",
    })
    const { setIsLoading,isLoading } = useUser();
    const router = useRouter();
    const redirect = useSearchParams().get("redirectPath");
    // eslint-disable-next-line react-hooks/incompatible-library
    const formValues = watch();
     //loading context
   

      // Load saved form data from localStorage on mount
      useEffect(() => {
        const saved = localStorage.getItem("registerForm");
        if (saved) {
          const parsed = JSON.parse(saved);
          Object.keys(parsed).forEach((key) => setValue(key as keyof LoginData, parsed[key]));
        }
        setIsLoading(true);
      }, [setIsLoading, setValue]);
    
      // Save form data to localStorage whenever form changes, except passwords
      useEffect(() => {
        if (isLoading) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password, ...rest } = formValues;
          localStorage.setItem("loginForm", JSON.stringify(rest));
        }
      }, [formValues, isLoading]);

    const onSubmit = async (data: LoginData) => {
        try {
            const res = await loginUser(data);
            setIsLoading(true);
            if (res?.success) {
                toast.success(res?.message);
                if (redirect) {
                    router.push(redirect);
                } else {
                    router.push("/");
                }
            } else {
                toast.error(res?.message);
            }
        } catch (error: unknown) {
            return error instanceof Error ? error : new Error(String(error))
        }
    }
     

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
                <CardDescription className="text-center">
                    Login using email or username
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

                    {/* EMAIL OR USERNAME */}
                    <div className="grid gap-2">
                        <Label>Email or Username</Label>
                        <Input
                            placeholder="Enter email or username"
                            {...register("identifier", {
                                required: "Email or Username is required",
                                validate: (value) => {
                                    if (!value.includes("@") && /\s/.test(value)) {
                                        return "Username cannot contain spaces"
                                    }
                                    return true
                                },
                            })}
                        />
                        {errors.identifier && (
                            <p className="text-red-500 text-sm">{errors.identifier.message}</p>
                        )}
                    </div>

                    {/* PASSWORD */}
                    <div className="grid gap-2">
                        <Label>Password</Label>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                className="pr-10"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Minimum 6 characters" },
                                })}
                            />

                            {/* TOGGLE BUTTON */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}
                    </div>

                    <Button type="submit" className="w-full mt-2">Login</Button>
                </form>
            </CardContent>

        </Card>
    )
}
