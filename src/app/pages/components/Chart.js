import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { useSocket } from 'src/app/context/SocketContext';
import { FormControl, NativeSelect, useMediaQuery } from '@mui/material';
import { formatString, getStandardTime } from 'src/app/utils/function';

export default function Chart() {
  const isSp = useMediaQuery('(max-width:1024px)');
  const { prices: socketPrices, sendMessage, tokens, tokenPrices } = useSocket();
  const [chartMode, setChartMode] = React.useState(0); // 0: daily, 1: weekly
  const [displayPrices, setDisplayPrices] = React.useState([]);
  const [selectedToken, setSelectedToken] = React.useState('QU');
  // const [loading, setLoading] = React.useState(false);

  const prices = React.useMemo(() => {
    // setLoading(false);
    return (socketPrices?.prices || []).map((item) => [getStandardTime(item[0]), item[1]]);
  }, [socketPrices]);

  React.useEffect(() => {
    const myFunction = () => {
      sendMessage(`prices 1`);
    };
    const intervalId = setInterval(myFunction, 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  React.useEffect(() => {
    if (chartMode === 0) {
      const currentDate = new Date();
      const oneDayInMillis = 24 * 60 * 60 * 1000;
      const timeBeforeOneDay = new Date(currentDate.getTime() - oneDayInMillis);
      setDisplayPrices(prices);
    } else {
      const currentDate = new Date();
      const oneWeekInMillis = 7 * 24 * 60 * 60 * 1000;
      const timeBeforeOneWeek = new Date(currentDate.getTime() - oneWeekInMillis);
      setDisplayPrices(prices);
    }
  }, [prices, chartMode]);

  React.useEffect(() => {
    if (selectedToken !== 'QU') {
      const tokenPrice = (tokenPrices?.prices || []).map((item) => [
        getStandardTime(item[0]),
        item[1],
      ]);
      setDisplayPrices(tokenPrice);
    }
  }, [tokenPrices]);

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

  const quFormatter = (value) => `QU ${formatString(Math.round(value))}`;

  const customFormatter = (value) => {
    if (value < 1 && value !== 0) {
      return currencyFormatter(value);
    }
    return quFormatter(value);
  };

  const lineChartsParams = React.useMemo(
    () => ({
      series: [
        {
          // label: 'QU Price',
          data: displayPrices.map((item) => item[1]),
          showMark: false,
          color: '#03A9F4',
        },
      ],
    }),
    [displayPrices]
  );

  const handleTokenChange = (event) => {
    const selectedIdx = event.target.value;
    setSelectedToken(['QU', ...tokens][selectedIdx]);
  };

  React.useEffect(() => {
    if (selectedToken === 'QU') {
      sendMessage(`prices 1`);
    } else {
      sendMessage(`prices.${selectedToken} 1`);
    }
  }, [selectedToken]);

  return (
    <>
      {/* <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="warning" />
      </Backdrop> */}
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
            valueFormatter: (v) => (v === null ? '' : customFormatter(v)),
          }))}
          width={isSp ? window.innerWidth * 0.9 : 900}
          height={isSp ? 250 : 350}
        />
        <div className="w-fit absolute top-0 left-[10px] md:left-[100px]">
          <FormControl fullWidth>
            <NativeSelect
              defaultValue={0}
              onChange={handleTokenChange}
              inputProps={{
                name: 'age',
                id: 'uncontrolled-native',
              }}
            >
              {tokens &&
                tokens.length > 0 &&
                ['QU', ...tokens].map((token, idx) => {
                  return (
                    <option value={idx} key={idx}>
                      {token}
                    </option>
                  );
                })}
            </NativeSelect>
          </FormControl>
          {/* <ToggleButtonGroup
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
          </ToggleButtonGroup> */}
        </div>
      </div>
    </>
  );
}
