import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { RefreshCcw, Download, HelpCircle } from 'lucide-react';

export default async function TransactionPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  console.log('THEID', params);

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
                    <span className='font-medium'>10,425.00</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-primary/75'>Total payments</span>
                    <span className='font-medium'>8,340.00</span>
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
                    <span className='font-medium'>2,085.00</span>
                  </div>
                </div>

                <div className='bg-white p-4 rounded-md shadow-sm w-1/2 ml-6'>
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
                      <span className='font-bold'>₱ 2,085.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className='items-center mt-8'>
            <h2 className='text-lg font-medium'>Payment history</h2>
            <h2 className='text-sm text-primary/75'>Testing lang, hindi ko pa nagagawa database dito</h2>
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
                <TableRow>
                  <TableCell>08 Jan 2025</TableCell>
                  <TableCell>
                    <div>
                      <div className='text-xs text-gray-500'>OR-FW187</div>
                      <div>Cash</div>
                    </div>
                  </TableCell>
                  <TableCell className='text-right'>300.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>08 Jan 2025</TableCell>
                  <TableCell>
                    <div>
                      <div className='text-xs text-gray-500'>OR-90089</div>
                      <div>Cash</div>
                    </div>
                  </TableCell>
                  <TableCell className='text-right'>2,200.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>12 Feb 2025</TableCell>
                  <TableCell>
                    <div>
                      <div className='text-xs text-gray-500'>OR-FW207</div>
                      <div>Cash</div>
                    </div>
                  </TableCell>
                  <TableCell className='text-right'>300.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>12 Feb 2025</TableCell>
                  <TableCell>
                    <div>
                      <div className='text-xs text-gray-500'>OR-90284</div>
                      <div>Cash</div>
                    </div>
                  </TableCell>
                  <TableCell className='text-right'>1,370.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>21 Mar 2025</TableCell>
                  <TableCell>
                    <div>
                      <div className='text-xs text-gray-500'>OR-90358</div>
                      <div>Cash</div>
                    </div>
                  </TableCell>
                  <TableCell className='text-right'>2,080.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>24 Apr 2025</TableCell>
                  <TableCell>
                    <div>
                      <div className='text-xs text-gray-500'>OR-90589</div>
                      <div>Cash</div>
                    </div>
                  </TableCell>
                  <TableCell className='text-right'>2,090.00</TableCell>
                </TableRow>
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
