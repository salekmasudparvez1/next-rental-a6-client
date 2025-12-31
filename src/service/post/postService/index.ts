"use server"

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
export const getAllPropertiesPublicFunction = async (pageIndex?: number, pageSize?: number, id?: string) => {
    const token = (await cookies()).get('accessToken')?.value
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) headers['Authorization'] = `Bearer ${token}`

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tenants/get-all?id=${id}&page=${pageIndex}&limit=${pageSize}`, {
            method: "GET",
            headers,
            cache: "no-store",
        });
        const result = await res.json();
        if (!res.ok) {
            throw new Error(result.message || `Failed to get properties: ${res.status}`);
        }
        return result;
    } catch (error: unknown) {
        throw error instanceof Error ? error : new Error(String(error));
    }
}
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




