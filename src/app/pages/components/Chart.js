import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { useSocket } from 'src/app/context/SocketContext';
import { ToggleButton, ToggleButtonGroup, useMediaQuery } from '@mui/material';
import { getStandardTime } from 'src/app/utils/function';

export default function Chart() {
  const isSp = useMediaQuery('(max-width:1024px)');
  const { prices: socketPrices, sendMessage } = useSocket();
  const [chartMode, setChartMode] = React.useState(0); // 0: daily, 1: weekly
  const [displayPrices, setDisplayPrices] = React.useState([]);

  const prices = React.useMemo(() => {
    return (socketPrices?.prices || []).map((item) => [getStandardTime(item[0]), item[1]]);
  }, [socketPrices]);

  React.useEffect(() => {
    sendMessage(`prices 1 10000`);
  }, []);

  React.useEffect(() => {
    if (chartMode === 0) {
      const currentDate = new Date();
      const oneDayInMillis = 24 * 60 * 60 * 1000;
      const timeBeforeOneDay = new Date(currentDate.getTime() - oneDayInMillis);
      setDisplayPrices(
        prices.filter(
          (item, key) =>
            new Date(item[0]) > new Date().getTime() - 24 * 60 * 60 * 1000 && key % 5 === 0
        )
      );
    } else {
      const currentDate = new Date();
      const oneWeekInMillis = 7 * 24 * 60 * 60 * 1000;
      const timeBeforeOneWeek = new Date(currentDate.getTime() - oneWeekInMillis);
      setDisplayPrices(
        prices.filter((item, key) => new Date(item[0]) > timeBeforeOneWeek && key % 35 === 0)
      );
    }
  }, [prices, chartMode]);

  const dayFormatter = (date) =>
    `${date.getDate().toString().padStart(2, '0')}/${date
      .getHours()
      .toString()
      .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 10,
    maximumFractionDigits: 10,
  }).format;

  const lineChartsParams = React.useMemo(
    () => ({
      series: [
        {
          label: 'QU Price',
          data: displayPrices.map((item) => item[1]),
          showMark: false,
          color: '#03A9F4',
        },
      ],
    }),
    [displayPrices]
  );

  const handleChange = (event, value) => {
    setChartMode(+value || 0);
  };
  return (
    <div className="w-fit relative">
      <LineChart
        {...lineChartsParams}
        xAxis={[
          {
            data: displayPrices.map((item) => item[0]),
            scaleType: 'time',
            valueFormatter: dayFormatter,
          },
        ]}
        series={lineChartsParams.series.map((series) => ({
          ...series,
          valueFormatter: (v) => (v === null ? '' : currencyFormatter(v)),
        }))}
        width={isSp ? window.innerWidth * 0.9 : 900}
        height={isSp ? 250 : 350}
      />
      <div className="w-fit absolute top-0 left-[10px] md:left-[100px]">
        <ToggleButtonGroup
          color="info"
          value={chartMode}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton size="small" value={0}>
            Day
          </ToggleButton>
          <ToggleButton size="small" value={1}>
            WeeK
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
}
