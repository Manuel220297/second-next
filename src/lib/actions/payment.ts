'use server';
import { createAdminClient, getLoggedInUser } from '@/lib/server/appwrite';
import axios from 'axios';
import { ID } from 'node-appwrite';

export async function createOrder() {
  try {
    const { user } = await getLoggedInUser();
    if (!user) throw new Error('User not authenticated');

    const { databases } = await createAdminClient();

    // Create order in PayPal
    const { data } = await axios.post(
      `${process.env.PAYPAL_API_URL}/v2/checkout/orders`,
      {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: '100.00', // Replace with actual amount
            },
          },
        ],
      },
      {
        auth: {
          username: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
          password: process.env.NEXT_PUBLIC_PAYPAL_SECRET_KEY,
        },
      }
    );

    // Store transaction in Appwrite
    await databases.createDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE, process.env.NEXT_PUBLIC_TRANSACTIONS_COLLECTION_ID!, ID.unique(), {
      date: new Date().toISOString(),
      reference: data.id,
      method: 'PayPal',
      amount: parseFloat(data.purchase_units[0].amount.value),
      type: 'payment',
      userId: (await getLoggedInUser()).user?.id,
    });

    return { orderID: data.id };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create order');
  }
}

export async function capturePayment(orderId: string) {
  try {
    const { databases } = await createAdminClient();
    const { user } = await getLoggedInUser();

    // Capture payment in PayPal
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_PAYPAL_API_URL}/v2/checkout/orders/${orderId}/capture`,
      {},
      {
        auth: {
          username: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
          password: process.env.NEXT_PUBLIC_PAYPAL_SECRET_KEY,
        },
      }
    );

    // Update transaction in Appwrite
    await databases.updateDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE, process.env.NEXT_PUBLIC_TRANSACTIONS_COLLECTION_ID!, data.id, {
      status: data.status,
      paypalData: JSON.stringify(data),
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    throw new Error('Payment capture failed');
  }
}
