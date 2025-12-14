"use server";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

export const RegisterUser = async (userData: FieldValues) => {
    try {
        const data = {
            username: userData?.username,
            email: userData?.email,
            phoneNumber: Number(userData?.phoneNumber),
            role: userData?.role,
            password: userData?.password
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(data)
        })
        const result = await res.json();
        if (result.success) {
            (await cookies()).set("accessToken", result.data.accessToken);
            (await cookies()).set("refreshToken", result?.data?.refreshToken);
        }
        return result
    } catch (error: unknown) {
        return error instanceof Error ? error : new Error(String(error))
    }
}


export const loginUser = async (userData: FieldValues) => {
  const data = {
    identifier: userData?.identifier,
    password: userData?.password,
  };
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result?.success) {
      (await cookies()).set("accessToken", result?.data?.accessToken);
      (await cookies()).set("refreshToken", result?.data?.refreshToken);
    }

    return result;
  }catch (error: unknown) {
        return error instanceof Error ? error : new Error(String(error))
    }
};


export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  

  let decodedData = null;

  if (accessToken) {
    decodedData = await jwtDecode(accessToken);
    return decodedData;
  } else {
    return null;
  }
};


export const logout = async () => {
  (await cookies()).delete("accessToken");
  (await cookies()).delete("refreshToken");
};
