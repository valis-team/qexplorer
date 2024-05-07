import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { useSocket } from 'src/app/context/SocketContext';
import { useMediaQuery } from '@mui/material';

const today = new Date();

const oneMonthAgo = new Date();
oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

// Create an array to store the dates
const days = [];

// Loop through each day from one month ago to today
const currentDate = oneMonthAgo;
while (currentDate <= today) {
  days.push(new Date(currentDate));
  currentDate.setDate(currentDate.getDate() + 1);
}

const FranceGDPperCapita = [
  28129, 28294.264, 28619.805, 28336.16, 28907.977, 29418.863, 29736.645, 30341.807, 31323.078,
  32284.611, 33409.68, 33920.098, 34152.773, 34292.03, 35093.824, 35495.465, 36166.16, 36845.684,
  36761.793, 36527, 36827, 37124, 37895, 38515.918, 36761.793, 35534.926, 36086.727, 36691, 36571,
  36632,
];

const GermanyGDPperCapita = [
  25391, 26769.96, 27385.055, 27250.701, 28140.057, 28868.945, 29349.982, 30186.945, 31129.584,
  32087.604, 33367.285, 34260.29, 34590.93, 34716.44, 35528.715, 36205.574, 38014.137, 39752.207,
  40715.434, 38962.938, 41109.582, 43189, 43320, 43413, 46177.617, 38962.938, 43922, 44293, 44689,
  45619.785,
];

const lineChartsParams = {
  series: [
    {
      label: 'QU',
      data: FranceGDPperCapita,
      showMark: false,
    },
    {
      label: 'QWALLET',
      data: GermanyGDPperCapita,
      showMark: false,
    },
  ],
};

export default function Chart() {
  const isMobile = useMediaQuery('(max-width:768px)');
  const { prices: socketPrices, sendMessage } = useSocket();
  // const prices = React.useMemo(() => (socketPrices.prices || []).map(item => ({date: formatDate(item[0]), amount: item[1]})), [socketPrices])

  React.useEffect(() => {
    sendMessage(`prices.QWALLET`);
  }, []);

  const dayFormatter = (date) =>
    (date.getMonth() + 1).toString().padStart(2, '0') + date.getDate().toString().padStart(2, '0');
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format;
  return (
    <LineChart
      {...lineChartsParams}
      xAxis={[{ data: days, scaleType: 'time', valueFormatter: dayFormatter }]}
      series={lineChartsParams.series.map((series) => ({
        ...series,
        valueFormatter: (v) => (v === null ? '' : currencyFormatter(v)),
      }))}
      width={isMobile ? 400 : 900}
      height={isMobile ? 300 : 350}
    />
  );
}
