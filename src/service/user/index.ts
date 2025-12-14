"use server";

import { cookies } from "next/headers";

export const getAllUsers = async (pageIndex:number, pageSize:number) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      throw new Error("No authentication token found");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/all-users?page=${pageIndex + 1}&limit=${pageSize}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch users: ${res.status}`);
    }

    const result = await res.json();
    return result;
  } catch (error: unknown) {
    console.error("Get all users error:", error);
    throw error instanceof Error ? error : new Error(String(error));
  }
}

export const deleteUser = async (userId: string) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
        throw new Error("No authentication token found");
    }
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/delete/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
            cache: "no-store",
        })

        if (!res.ok) {
            throw new Error(`Failed to Delete users: ${res.status}`);
            return res.json()
        }
    } catch (error: unknown) {

        throw error instanceof Error ? error : new Error(String(error));
    }

}