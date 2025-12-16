"use client";

import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RegisterUser } from "@/service/auth/AuthService";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/contexts/UseerContext";


// Type Definitions
interface RegisterData {
  username: string;
  role: "tenant" | "landlord";
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<RegisterData>({
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      phoneNumber: "",
      role: "tenant",
      password: "",
      confirmPassword: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Watch fields
  const username = useWatch({ control, name: "username" });
  const password = watch("password");
  const formValues = watch();

  //REDIRECT LOGIC
   const redirect = useSearchParams().get("redirectPath");
   const router = useRouter();

   //loading context
    const { setIsLoading } = useUser();
    
  // Load saved form data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("registerForm");
    if (saved) {
      const parsed = JSON.parse(saved);
      Object.keys(parsed).forEach((key) => setValue(key as keyof RegisterData, parsed[key]));
    }
    setIsLoaded(true);
  }, [setValue]);

  // Save form data to localStorage whenever form changes, except passwords
  useEffect(() => {
    if (isLoaded) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, confirmPassword, ...rest } = formValues;
      localStorage.setItem("registerForm", JSON.stringify(rest));
    }
  }, [formValues, isLoaded]);

  const onSubmit = async (data: RegisterData) => {
    try {
      const res = await RegisterUser(data);
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
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen overflow-y-auto min-w-screen  bg-transparent">
      <Card className="w-full max-w-sm group relative flex items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-transparent px-3 font-medium text-neutral-600 transition-all duration-100 [box-shadow:3px_3px_3px_rgb(82_82_82)]">
        <CardHeader className="w-full">
          <CardTitle className="text-2xl text-center">Create an Account</CardTitle>
          <CardDescription className="text-center">
            Please enter your details to register.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

            {/* USERNAME */}
            <div className="grid gap-2">
              <Label>Username</Label>
              <Input
                {...register("username", {
                  required: "Username is required",
                  pattern: {
                    value: /^\S+$/,
                    message: "No spaces allowed",
                  },
                })}
                onChange={(e) => {
                  const cleaned = e.target.value.replace(/\s+/g, "");
                  setValue("username", cleaned);
                }}
                placeholder="Enter username"
              />
              {username && (
                <p className="text-green-500 text-sm">
                  Your username will be: <b>{username}</b>
                </p>
              )}
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username.message}</p>
              )}
            </div>

            {/* EMAIL */}
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="you@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* PHONE NUMBER */}
            <div className="grid gap-2">
              <Label>Phone Number</Label>
              <Input
                type="tel"
                placeholder="+880 1XXXXXXXXX"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^\+?\d{10,15}$/,
                    message: "Invalid phone number",
                  },
                })}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
              )}
            </div>

            {/* ROLE */}
            <div className="grid gap-2">
              <Label>Select Role</Label>
              <Controller
                name="role"
                control={control}
                rules={{ required: "Please select a role" }}
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="landlord" id="landlord" />
                      <Label htmlFor="landlord">Landlord</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="tenant" id="tenant" />
                      <Label htmlFor="tenant">Tenant</Label>
                    </div>
                  </RadioGroup>
                )}
              />
              {errors.role && (
                <p className="text-red-500 text-sm">{errors.role.message}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="grid gap-2">
              <Label>Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                  })}
                  placeholder="Enter password"
                />
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

            {/* CONFIRM PASSWORD */}
            <div className="grid gap-2">
              <Label>Confirm Password</Label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  placeholder="Confirm password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full mt-2" disabled={!isValid}>
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
