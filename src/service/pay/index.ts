"use server"

import { cookies } from "next/headers";

export const createPaymentIntent = async (requestId: string) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL as string | undefined;
  if (!apiUrl) {
    throw new Error('Missing API URL');
  }

  try {
    const res = await fetch(`${apiUrl}/api/pay/create-checkout-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: requestId }),
      credentials: 'include',
    });
    const dataObj = await res.json();
    if (!res.ok) {
      throw new Error(dataObj.message || 'Failed to create Payment Intent');
    }


  
    return dataObj.data;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(message);
  }
}


export const getAllTransactions = async (pageIndex?: number, pageSize?: number) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL as string | undefined;
  if (!apiUrl) {
    throw new Error('Missing API URL');
  }
  const token = (await cookies()).get('accessToken')?.value

  if (!token) {
    throw new Error("You are not authorized")
  }
  const page = (pageIndex ?? 0) + 1;
  const ressult = await fetch(`${apiUrl}/api/pay/transactions?page=${page}&limit=${pageSize}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,

    },
    credentials: "include"
  });
  const result = await ressult.json();
 

  if (!ressult.ok) {
    throw new Error(result.message || `Failed to fetch transaction`);
  }

  return { data: result.data?.data, meta: result?.data?.meta };
}

export const getTransactionById = async (id: string) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL as string | undefined;
  if (!apiUrl) {
    throw new Error('Missing API URL');
  }
  const token = (await cookies()).get('accessToken')?.value

  if (!token) {
    throw new Error("You are not authorized")
  }

  const res = await fetch(`${apiUrl}/api/pay/transactions/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,

    },
    credentials: "include"
  });
  const result = await res.json();

  // if (!res.ok) {
  //   throw new Error(result?.message || `Failed to fetch transaction`);
  // }
  console.log("Transaction fetched:", result.data);

  return result.data;
}
// for tenant dashboard stats
export const getTransactionByStatus = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL as string | undefined;
  if (!apiUrl) {
    throw new Error('Missing API URL');
  }
  const token = (await cookies()).get('accessToken')?.value

  if (!token) {
    throw new Error("You are not authorized")
  }

  const res = await fetch(`${apiUrl}/api/pay/transactions/status`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,

    },
    credentials: "include"
  });
  const result = await res.json();
  console.log(result);
  // if (!res.ok) {
  //   throw new Error(result?.message || `Failed to fetch transaction`);
  // }


  return result.data;
}
