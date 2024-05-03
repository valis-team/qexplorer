import { LineChart } from '@mui/x-charts/LineChart';
import { useMediaQuery } from '@mui/material';

export default function BasicLineChart() {
  const isMobile = useMediaQuery('(max-width:768px)');

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format;

  return (
    <LineChart
      xAxis={[
        {
          data: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
          ],
        },
      ]}
      series={[
        {
          label: 'QU',
          data: [
            2, 5.5, 6.7, 8.5, 7.5, 5, 5.5, 2, 5.5, 7, 7.9, 8.2, 6.3, 8.1, 3.5, 5, 5.5, 4, 2.5, 1.5,
            5, 5.3, 5.9, 6.3,
          ],
          valueFormatter: (v) => (v === null ? '' : currencyFormatter(v)),
        },
      ]}
      width={isMobile ? 400 : 900}
      height={isMobile ? 300 : 350}
    />
  );
}
