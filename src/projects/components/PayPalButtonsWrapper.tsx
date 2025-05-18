'use client';
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { createOrder, capturePayment } from '@/lib/actions/payment';

export function PayPalButtonsWrapper() {
  const [{ isPending }] = usePayPalScriptReducer();

  return (
    <div className='w-full max-w-md'>
      {isPending && <div className='animate-pulse'>Loading PayPal...</div>}
      <PayPalButtons
        style={{ layout: 'vertical' }}
        createOrder={async (data, actions) => {
          const response = await createOrder();
          return response.orderID;
        }}
        onApprove={async (data, actions) => {
          await capturePayment(data.orderID);
          // Handle successful payment (update database, redirect user, etc.)
        }}
      />
    </div>
  );
}

export function PayPalProvider({ children }: { children: React.ReactNode }) {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
        components: 'buttons',
        currency: 'USD',
      }}>
      {children}
    </PayPalScriptProvider>
  );
}
