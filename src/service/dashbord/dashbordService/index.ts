"use server"
import { ILandlordDashboardInfo } from "@/types/dashbord";
import { cookies } from "next/headers";

export const getDashbordInfoForLandlord = async (): Promise<ILandlordDashboardInfo> => {
    try {
        const token = (await cookies()).get('accessToken')?.value;
        if (!token) {
            throw new Error('No access token found');
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/landlords/info`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            credentials: 'include',
            cache: 'no-store'
        });

        const result = await res.json();

        // if (!res.ok) {
        //     throw new Error(result.message || `Failed to fetch dashboard info: ${res.status}`);
        // }
       

        return result?.data?.data[0] as ILandlordDashboardInfo;

    } catch (error: unknown) {
        throw error instanceof Error ? error : new Error(String(error));
    }
}