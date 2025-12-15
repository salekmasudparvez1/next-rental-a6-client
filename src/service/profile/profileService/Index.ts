"use server"

import { cookies } from "next/headers";

export const getProfileData = async () => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('accessToken')?.value;

        if (!token) {
            // No token present; return null so caller can handle (e.g., redirect)
            return null;
        }
      

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            credentials: "include",
            cache: "no-store"
        });
        
        
        if (!res.ok) {
            throw new Error(`Failed to fetch profile: ${res.status}`);
        }
        
        const result = await res.json();
        return result;
    } catch (error: unknown) {
        
        throw error instanceof Error ? error : new Error(String(error));
    }
}