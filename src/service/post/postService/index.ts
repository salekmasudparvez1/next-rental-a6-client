"use server"

import { RentalHouseFormData } from "@/types/post";
import { cookies } from "next/headers"

export const createPost = async (data: Partial<RentalHouseFormData> | FormData) => {
    try {
        const token = (await cookies()).get('accessToken')?.value
        if (!token) {
            // No token present; return null so caller can handle (e.g., redirect)
            return null;
        }


        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/landlords/listings`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: data instanceof FormData ? data : JSON.stringify(data),
            credentials: 'include',
            cache: 'no-store'
        });
        if (!res.ok) {
            throw new Error(`Failed to create post: ${res.status}`);
        }
        const result = res.json()
        return result;

    } catch (error: unknown) {
        throw error instanceof Error ? error : new Error(String(error))
    }
}
export const getAllPosts = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/landlords/listings`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${(await cookies()).get('accessToken')?.value}`
            },
            credentials: "include",
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch posts: ${res.status}`);
        }

        const result = await res.json();
        return result;
    } catch (error: unknown) {
        console.error("Get all posts error:", error);
        throw error instanceof Error ? error : new Error(String(error));
    }
}