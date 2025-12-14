"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const getAllUsers = async (pageIndex:number, pageSize:number) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      throw new Error("No authentication token found");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users?page=${pageIndex + 1}&limit=${pageSize}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      cache: "no-store",
      next: { tags: ["users"] },
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${userId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
            cache: "no-store",
        })

        if (!res.ok) {
            throw new Error(`Failed to Delete users: ${res.status}`);
        }
        revalidatePath("/admin/all-users");
        return res.json()
    } catch (error: unknown) {

        throw error instanceof Error ? error : new Error(String(error));
    }

}

export const updateUserRole = async (userId: string, newRole: string) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
        throw new Error("No authentication token found");
    }
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
            cache: "no-store",
            body: JSON.stringify({ role: newRole }),
        })

        if (!res.ok) {
            throw new Error(`Failed to update user role: ${res.status}`);
        }
        revalidatePath("/admin/all-users");
        return res.json()
    } catch (error: unknown) {

        throw error instanceof Error ? error : new Error(String(error));
    }}