"use server"

import { IQueryParamsAllPost } from "@/types";
import { RentalHouseFormData } from "@/types/post";
import { cookies } from "next/headers"
import { DateRange } from "react-day-picker";

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
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: data instanceof FormData ? data : JSON.stringify(data),
            credentials: 'include',
            cache: 'no-store'
        });
        const result = await res.json()
        if (!res.ok) {
            throw new Error(result.message || `Failed to create post: ${res.status}`);
        }

        return result;

    } catch (error: unknown) {
        throw error instanceof Error ? error : new Error(String(error))
    }
}
export const getAllPosts = async (pageIndex?: number, pageSize?: number) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/landlords/listings?page=${pageIndex}&limit=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${(await cookies()).get('accessToken')?.value}`
            },
            credentials: "include",
            cache: "no-store",
        });

        const result = await res.json();
        if (!res.ok) {
            throw new Error(result.message || `Failed to get posts: ${res.status}`);
        }


        return result;
    } catch (error: unknown) {

        throw error instanceof Error ? error : new Error(String(error));
    }
}
export const getAllPropertiesPublicFunction = async (queryParam?: IQueryParamsAllPost, id?: string) => {
    // 1. Handle Auth Token (Server-Side)
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;
    
    const headers: Record<string, string> = { 
        "Content-Type": "application/json" 
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    // 2. Build Query Params Robustly using URLSearchParams
    const params = new URLSearchParams();

    // A. Handle specific ID argument
    if (id && id.trim() !== "") {
        params.append("id", id);
    }

    // B. Handle Filter Object
    if (queryParam) {
        Object.entries(queryParam).forEach(([key, value]) => {
            // Only append parameters that have actual values (not undefined/null/empty)
            if (value !== undefined && value !== null && value !== "") {
                params.append(key, String(value));
            }
        });
    }

    const queryString = params.toString();
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/tenants/get-all${queryString ? `?${queryString}` : ""}`;

    console.log("Fetching URL:", endpoint);

    try {
        const res = await fetch(endpoint, {
            method: "GET",
            headers,
            cache: "no-store", // Ensure fresh data
        });

        const result = await res.json();

        if (!res.ok) {
            console.error('API Error Response:', result);
            throw new Error(result.message || `Failed to get properties: ${res.status}`);
        }

        return result;

    } catch (error: unknown) {
        // Better error logging for debugging
        console.error("Service Error:", error);
        throw error instanceof Error ? error : new Error(String(error));
    }
};
export const getPostById = async (postId: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/landlords/listings/${postId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${(await cookies()).get('accessToken')?.value}`
            },
            credentials: "include",
            cache: "no-store",
        });
        const result = await res.json();
        if (!res.ok) {
            throw new Error(result.message || `Failed to get post: ${res.status}`);
        }
        return result;
    } catch (error: unknown) {
        throw error instanceof Error ? error : new Error(String(error));
    }
}
export const updatePost = async (data: Partial<RentalHouseFormData> | FormData, id: string) => {
    try {
        const token = (await cookies()).get('accessToken')?.value
        if (!token) {
            return null;
        }



        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/landlords/listings/${id}`, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: data instanceof FormData ? data : JSON.stringify(data),
            credentials: 'include',
            cache: 'no-store'
        });
        const result = await res.json()
        if (!res.ok) {
            throw new Error(result.message || `Failed to update post: ${res.status}`);
        }

        return result;

    } catch (error: unknown) {
        throw error instanceof Error ? error : new Error(String(error))
    }
}
export const createRequest = async (id: string, date: DateRange) => {
    try {
        const token = (await cookies()).get('accessToken')?.value
        if (!token) {
            return null;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tenants/requests`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ id, date }),
            credentials: 'include',
            cache: 'no-store'
        });
        const result = await res.json()
        if (!res.ok) {
            throw new Error(result.message || `Failed to create post: ${res.status}`);
        }



        return result;

    } catch (error: unknown) {
        throw error instanceof Error ? error : new Error(String(error))
    }
}
//id is from request
export const getSingleRequestForTenantById = async (id: string) => {
    try {
        const token = (await cookies()).get('accessToken')?.value
        if (!token) {
            return null;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tenants/request/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            credentials: 'include',
            cache: 'no-store'
        });
        const result = await res.json();

        if (!res.ok) {
            throw new Error(result.message || `Failed to create post: ${res.status}`);
        }

        return result;

    } catch (error: unknown) {
        throw error instanceof Error ? error : new Error(String(error))
    }
}
// id is from rentalHouseId
export const getSingleRequestForTenantByInfo = async (id: string) => {
    try {
        const token = (await cookies()).get('accessToken')?.value
        if (!token) {
            return null;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tenants/request/post/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            credentials: 'include',
            cache: 'no-store'
        });
        const result = await res.json()
        if (!res.ok) {
            throw new Error(result.message || `Failed to create post: ${res.status}`);
        }

        return result;

    } catch (error: unknown) {
        throw error instanceof Error ? error : new Error(String(error))
    }
}
export const getRequestForTenant = async () => {
    try {
        const token = (await cookies()).get('accessToken')?.value
        if (!token) {
            return null;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tenants/requests`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            credentials: 'include',
            cache: 'no-store'
        });
        const result = await res.json()

        if (!res.ok) {
            throw new Error(result.message || `Failed to create post: ${res.status}`);
        }



        return result;

    } catch (error: unknown) {
        throw error instanceof Error ? error : new Error(String(error))
    }
}
export const getRequestForLandlord = async () => {
    try {
        const token = (await cookies()).get('accessToken')?.value
        if (!token) {
            return null;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/landlords/requests`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            credentials: 'include',
            cache: 'no-store'
        });
        const result = await res.json()
        if (!res.ok) {
            throw new Error(result.message || `Failed to create post: ${res.status}`);
        }



        return result;

    } catch (error: unknown) {
        throw error instanceof Error ? error : new Error(String(error))
    }
}
export const updateRequestStatus = async (requestId: string, status: 'approve' | 'reject' | 'pending') => {
    try {
        const token = (await cookies()).get('accessToken')?.value
        if (!token) {
            return null;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/landlords/requests/${requestId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ status }),
            credentials: 'include',
            cache: 'no-store'
        });
        const result = await res.json()
        if (!res.ok) {
            throw new Error(result.message || `Failed to update request status: ${res.status}`);
        }

        return result;

    } catch (error: unknown) {
        throw error instanceof Error ? error : new Error(String(error))
    }
}




