import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function BasicLineChart() {
  const [isMobile, setIsMobile] = React.useState(window.matchMedia('(max-width: 768px)').matches);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    // Cleanup function
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);
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
          data: [
            2, 5.5, 6.7, 8.5, 7.5, 5, 5.5, 2, 5.5, 7, 7.9, 8.2, 6.3, 8.1, 3.5, 5, 5.5, 4, 2.5, 1.5,
            5, 5.3, 5.9, 6.3,
          ],
        },
      ]}
      width={isMobile ? 400 : 700}
      height={isMobile ? 300 : 350}
    />
  );
}
