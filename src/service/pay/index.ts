
/**
 * Client-side helper to request a PaymentIntent from your backend API.
 * This avoids exposing any Stripe secret key in the frontend code.
 */
export async function createPaymentIntent(requestId: string) {


  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pay/create-checkout-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requestId }),
      credentials: 'include',
    });
    if (!res.ok) {
      throw new Error(`Failed to create PaymentIntent: ${res.status}`);
    }
    const dataObj = await res.json();
    
    return dataObj.data;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('createPaymentIntent error:', message);
    throw new Error(message);
  }
}

export default createPaymentIntent;