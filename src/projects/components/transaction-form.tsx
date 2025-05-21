'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { Student } from '@/lib/actions/getStudent';

// Define the transaction schema using zod
const transactionSchema = z.object({
  date: z.date({
    required_error: 'Please select a date',
  }),
  reference: z.string().min(3, { message: 'Reference must be at least 3 characters' }),
  method: z.string({
    required_error: 'Please select a payment method',
  }),
  amount: z.coerce.number().positive({ message: 'Amount must be a positive number' }),
  type: z.string({
    required_error: 'Please select a transaction type',
  }),
  students: z.string({
    required_error: 'Please select a student',
  }),
});

// Infer the type from the schema
type TransactionFormValues = z.infer<typeof transactionSchema>;

// Props interface for the component
interface TransactionFormProps {
  students?: Student[];
}

export default function TransactionForm({ students = [] }: TransactionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize the form with react-hook-form and zod resolver
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      date: new Date(), // This will always be the current date
      reference: '',
      method: '',
      amount: 0,
      type: '',
      students: '',
    },
  });

  // Handle form submission
  async function onSubmit(data: TransactionFormValues) {
    setIsSubmitting(true);

    try {
      // Always use the current date when submitting
      const formattedData = {
        ...data,
        date: format(new Date(), 'yyyy-MM-dd'),
      };

      const response = await fetch('/api/create_transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      const result = await response.json();

      if (result.success) {
        toast('Successful');
        form.reset({
          ...form.formState.defaultValues,
          date: new Date(), // Reset with current date
        });
      } else {
        throw new Error(result.error || 'Failed to create transaction');
      }
    } catch (error) {
      console.error('Error creating transaction:', error);
      toast('Failed');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          {/* Date Display (Current Date) */}
          <FormField
            control={form.control}
            name='date'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <div className='border rounded-md p-2 bg-muted/20'>{format(new Date(), 'PPP')}</div>
                </FormControl>
                <FormDescription>Current date is used automatically</FormDescription>
              </FormItem>
            )}
          />

          {/* Reference Field */}
          <FormField
            control={form.control}
            name='reference'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reference</FormLabel>
                <FormControl>
                  <Input placeholder='Enter reference number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Payment Method Field */}
          <FormField
            control={form.control}
            name='method'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Method</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select payment method' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='cash'>Cash</SelectItem>
                    <SelectItem value='card'>Card</SelectItem>
                    <SelectItem value='bank_transfer'>Bank Transfer</SelectItem>
                    <SelectItem value='cheque'>Cheque</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Amount Field */}
          <FormField
            control={form.control}
            name='amount'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input type='number' placeholder='0.00' {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Transaction Type Field */}
          <FormField
            control={form.control}
            name='type'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transaction Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select transaction type' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='payment'>Payment</SelectItem>
                    <SelectItem value='refund'>Refund</SelectItem>
                    <SelectItem value='deposit'>Deposit</SelectItem>
                    <SelectItem value='withdrawal'>Withdrawal</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Students Field */}
          <FormField
            control={form.control}
            name='students'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student</FormLabel>
                <Select
                  onValueChange={(value) => {
                    const selectedStudent = students.find((student) => student.assessments?.$id === value);
                    console.log('Selected student:', selectedStudent);
                    field.onChange(value);
                  }}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a student' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {students.length > 0 ? (
                      students.map((student) => (
                        <SelectItem key={student.assessments?.$id!} value={student.assessments?.$id!} disabled={!student.assessments?.$id}>
                          <div className='flex flex-col'>
                            <span>
                              {student.first_name} {student.last_name}
                            </span>
                            <span className='text-xs'>User id: {student.userId!} </span>
                            <span className='text-xs text-primary'>Balance: {student.assessments?.totalBalance ?? 'N/A'}</span>
                          </div>
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value='placeholder' disabled>
                        No students available
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormDescription>Select the student associated with this transaction</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type='submit' className='w-full' disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Creating Transaction...
            </>
          ) : (
            'Create Transaction'
          )}
        </Button>
      </form>
    </Form>
  );
}
