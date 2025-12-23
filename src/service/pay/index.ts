
/**
 * Client-side helper to request a PaymentIntent from your backend API.
 * This avoids exposing any Stripe secret key in the frontend code.
 */
export async function createPaymentIntent(requestId: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL as string | undefined;
  if (!apiUrl) {
    console.error('NEXT_PUBLIC_API_URL is missing');
    throw new Error('Missing API URL');
  }

  try {
    const res = await fetch(`${apiUrl}/api/pay/create-checkout-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requestId }),
      credentials: 'include',
    });

    if (!res.ok) {
      const body = await res.text();
      console.error('createPaymentIntent failed:', res.status, body);
      throw new Error(`Failed to create PaymentIntent: ${res.status}`);
    }

    const dataObj = await res.json();
    console.log('createPaymentIntent response:', dataObj);
    return dataObj.data;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('createPaymentIntent error:', message);
    throw new Error(message);
  }
} 

export default createPaymentIntent;