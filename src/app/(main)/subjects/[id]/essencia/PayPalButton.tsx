'use client';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

type Props = {
  amount: number;
  currency?: 'USD' | 'EUR' | 'GBP';
};

export default function PayPalButton({ amount, currency = 'USD' }: Props) {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
        currency: currency,
        intent: 'CAPTURE', // Changed to uppercase
        components: 'buttons',
      }}>
      <PayPalButtons
        style={{ layout: 'vertical' }}
        createOrder={(data, actions) => {
          return actions.order.create({
            intent: 'CAPTURE', // Add intent here
            purchase_units: [
              {
                amount: {
                  currency_code: currency,
                  value: amount.toString(),
                  breakdown: {
                    item_total: {
                      currency_code: currency,
                      value: amount.toString(),
                    },
                  },
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          try {
            const details = await actions.order?.capture();
            await fetch('/api/save-transaction', {
              method: 'POST',
              body: JSON.stringify(details),
              headers: {
                'Content-Type': 'application/json',
              },
            });
          } catch (error) {
            console.error('Payment capture error:', error);
          }
        }}
        onError={(err) => {
          console.error('PayPal error:', err);
        }}
      />
    </PayPalScriptProvider>
  );
}
