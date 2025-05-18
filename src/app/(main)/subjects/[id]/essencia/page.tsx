import { PayPalButtonsWrapper, PayPalProvider } from '@/projects/components/PayPalButtonsWrapper';

export default async function PaymentPage() {
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Complete Payment</h1>
      <PayPalProvider>
        <PayPalButtonsWrapper />
      </PayPalProvider>
    </div>
  );
}
