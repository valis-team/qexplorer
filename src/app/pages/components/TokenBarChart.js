import * as React from 'react';

import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';
import { useSocket } from 'src/app/context/SocketContext';
import { getStandardTime } from 'src/app/utils/function';
import { Box, ToggleButton, ToggleButtonGroup, Typography, useMediaQuery } from '@mui/material';

export default function AreaChartFillByValue() {
  const isMobile = useMediaQuery('(max-width:768px)');
  const { tokenPrices, sendMessage } = useSocket();
  const [chartMode, setChartMode] = React.useState(0); // 0: week, 1: month
  const prices = React.useMemo(() => {
    return (tokenPrices?.prices || []).map((item) => [getStandardTime(item[0]), item[1]]);
  }, [tokenPrices]);
  const [displayPrices, setDisplayPrices] = React.useState([]);

  React.useEffect(() => {
    const currentDate = new Date();
    if (chartMode === 0) {
      const oneWeekInMillis = 7 * 24 * 60 * 60 * 1000;
      const timeBeforeOneWeek = new Date(currentDate.getTime() - oneWeekInMillis);
      setDisplayPrices(prices.filter((item, key) => new Date(item[0]) > timeBeforeOneWeek));
    } else {
      const oneMonthInMillis = 30 * 24 * 60 * 60 * 1000;
      const timeBeforeOneMonth = new Date(currentDate.getTime() - oneMonthInMillis);
      setDisplayPrices(prices.filter((item, key) => new Date(item[0]) > timeBeforeOneMonth));
    }
  }, [prices, chartMode]);

  React.useEffect(() => {
    sendMessage(`prices.QWALLET`);
  }, []);

  const data = (displayPrices || []).map((item) => item[1]);
  const xData = (displayPrices || []).map((item) => item[0]);
  const handleChange = (event, value) => {
    setChartMode(+value || 0);
  };
  return (
    <Box className="flex w-full gap-5 md:gap-10 flex-col">
      <Box className="flex w-full justify-between items-center">
        <Typography className="text-24 md:text-32 font-urb text-hawkes-100">
          QWallet Dashboard
        </Typography>
        <ToggleButtonGroup
          color="info"
          value={chartMode}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton size="small" value={0}>
            Week
          </ToggleButton>
          <ToggleButton size="small" value={1}>
            Month
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box className="w-fit mx-auto">
        <LineChart
          width={isMobile ? window.innerWidth * 0.9 : window.innerWidth * 0.45}
          height={300}
          series={[
            {
              data,
              label: 'QWALLET',
              area: true,
              showMark: false,
              color: '#14424f',
              valueFormatter: (v) => (v === null ? '' : `${v} QU`),
            },
          ]}
          xAxis={[{ scaleType: 'point', data: xData }]}
          sx={{
            [`& .${lineElementClasses.root}`]: {
              display: 'none',
            },
          }}
        />
      </Box>
    </Box>
  );
}
