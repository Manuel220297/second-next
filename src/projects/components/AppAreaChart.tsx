'use client';

import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

const chartConfig = {
  facebook: {
    label: 'Facebook',
    color: '#37abf9',
  },
  twitter: {
    label: 'Twitter',
    color: '#31f4f8',
  },
  instagram: {
    label: 'Instagram',
    color: '#ab41d0',
  },
} satisfies ChartConfig;

const AppAreaChart = () => {
  const chartData = [
    { month: 'January', facebook: 1861, twitter: 830, instagram: 1000 },
    { month: 'February', facebook: 3053, twitter: 2001, instagram: 1200 },
    { month: 'March', facebook: 2372, twitter: 1200, instagram: 1800 },
    { month: 'April', facebook: 733, twitter: 1900, instagram: 2500 },
    { month: 'May', facebook: 2091, twitter: 1302, instagram: 3100 },
    { month: 'June', facebook: 2142, twitter: 3333, instagram: 4000 },
  ];

  return (
    <div>
      <h1 className='text-lg mb-6 font-medium'>Total Visitor</h1>
      <ChartContainer config={chartConfig} className='min-h-[200px] w-full'>
        <AreaChart accessibilityLayer data={chartData}>
          <CartesianGrid stroke='#c0c0c060' vertical={false}></CartesianGrid>
          <XAxis dataKey='month' tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
          <YAxis tickLine={false} tickMargin={10} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <defs>
            <linearGradient id='fillFacebook' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='20%' stopColor='var(--color-facebook)' stopOpacity={0.8} />
              <stop offset='90%' stopColor='var(--color-facebook)' stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id='fillTwitter' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='20%' stopColor='var(--color-twitter)' stopOpacity={0.8} />
              <stop offset='90%' stopColor='var(--color-twitter)' stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id='fillInstagram' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='20%' stopColor='var(--color-instagram)' stopOpacity={0.8} />
              <stop offset='90%' stopColor='var(--color-instagram)' stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Area type={'natural'} stackId={'a'} dataKey='facebook' fill='url(#fillFacebook)' stroke='var(--color-facebook)' radius={4} />
          <Area type={'natural'} stackId={'a'} dataKey='twitter' fill='url(#fillTwitter)' stroke='var(--color-twitter)' radius={4} />
          <Area type={'natural'} stackId={'a'} dataKey='instagram' fill='url(#fillInstagram)' stroke='var(--color-instagram)' radius={4} />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};

export default AppAreaChart;
