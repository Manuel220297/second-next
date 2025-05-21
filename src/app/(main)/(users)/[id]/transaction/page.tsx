import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { RefreshCcw, Download, HelpCircle } from 'lucide-react';
import getStudent from '@/lib/actions/getStudent';

export default async function TransactionPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const { documents: student } = await getStudent(id);

  console.log('💦🔴', student[0].assessments?.totalBalance);

  const studentTotalBalance = student[0].assessments?.totalBalance;
  const studentTotalPayment = student[0].assessments?.totalPayments;
  const formattedBalance = `₱ ${studentTotalBalance?.toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  const formattedPayment = `₱ ${studentTotalPayment?.toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  return (
    <div className='container mx-auto py-6'>
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-2xl font-medium text-primary'>Transactions</h1>
          <p className='text-sm text-gray-500'>AY 2024-2025 Term 2nd (Current)</p>
        </div>
      </div>

      <Tabs defaultValue='payments'>
        <TabsList className='mb-4'>
          <TabsTrigger value='payments'>Payments</TabsTrigger>
          <TabsTrigger value='assessment'>Assessment</TabsTrigger>
        </TabsList>

        <TabsContent value='payments' className='space-y-6'>
          <Card className='bg-blue-50/50 dark:bg-teal-950/15'>
            <CardContent className='p-6'>
              <div className='flex justify-between items-start'>
                <div className='space-y-4 w-1/2'>
                  <div className='flex justify-between text-sm'>
                    <span className='text-primary/75'>Net total assessment</span>
                    <span className='font-medium'>
                      {`₱ ${(studentTotalPayment! + studentTotalBalance!).toLocaleString('en-PH', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}` || 0}
                    </span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-primary/75'>Total payments</span>
                    <span className='font-medium'> {formattedPayment} </span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-primary/75'>Total overpayment</span>
                    <span className='font-medium'>(0.00)</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-primary/75'>Total refunds</span>
                    <span className='font-medium'>(0.00)</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-primary/75'>Total pending payments</span>
                    <span className='font-medium'>0.00</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-primary/75'>Total balance</span>
                    <span className='font-medium'> {formattedBalance} </span>
                  </div>
                </div>

                <div className='p-4 bg-primary/5 rounded-md shadow-sm w-1/2 ml-6'>
                  <h3 className='font-medium mb-2'>Amount to pay</h3>
                  <p className='text-xs text-primary/75 mb-3'>Payment due on: 05/12/2025</p>

                  <div className='space-y-3'>
                    <div className='flex justify-between text-sm'>
                      <div className='flex items-center'>
                        <span className='text-primary/75'>Overdue</span>
                        <span className='text-xs text-gray-400 ml-1'>(Due last: 04/14/2025)</span>
                      </div>
                      <span className='font-medium'>0.00</span>
                    </div>

                    <div className='flex justify-between text-sm'>
                      <span className='text-primary/75'>Amount due</span>
                      <span className='font-medium'>2,085.00</span>
                    </div>

                    <div className='flex justify-between text-sm'>
                      <div className='flex items-center'>
                        <span className='text-primary/75'>Added penalties</span>
                        <HelpCircle className='h-3 w-3 text-blue-500 ml-1' />
                      </div>
                      <span className='font-medium'>0.00</span>
                    </div>

                    <div className='flex justify-between text-sm pt-2 border-t'>
                      <span className='text-primary/75 font-medium'>Total amount to pay</span>
                      <span className='font-bold'> {formattedBalance} </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className='items-center mt-8'>
            <h2 className='text-lg font-medium'>Payment history</h2>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[100px]'>DATE</TableHead>
                  <TableHead>DETAILS</TableHead>
                  <TableHead className='text-right'>AMOUNT</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {student[0].transactions.map((tx: any, index: any) => (
                  <TableRow key={index}>
                    <TableCell>
                      {new Date(tx.date).toLocaleDateString('en-US', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className='text-xs text-gray-500'>{tx.reference}</div>
                        <div>{tx.method}</div>
                      </div>
                    </TableCell>
                    <TableCell className='text-right'>{Number(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value='assessment'>
          <Card className='p-6'>
            <p className='text-gray-500'>Wala pa</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
