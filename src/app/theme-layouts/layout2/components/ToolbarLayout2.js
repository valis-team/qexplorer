import clsx from 'clsx';
import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from '@mui/material';
import Hidden from '@mui/material/Hidden';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { selectFuseCurrentLayoutConfig, selectToolbarTheme } from 'app/store/fuse/settingsSlice';
import { useSocket } from 'src/app/context/SocketContext';
import SearchBar from 'src/app/pages/components/SearchBar/SearchBar';
import TickText from 'src/app/pages/components/common/TickText';
import { formatString, getTimeAgo } from 'src/app/utils/function';
import Logo from '../../shared-components/Logo';
import NavbarToggleButton from '../../shared-components/NavbarToggleButton';
import Navigation from '../../shared-components/Navigation';
import NavigationSearch from '../../shared-components/NavigationSearch';

function ToolbarLayout2(props) {
  const toolbarTheme = useSelector(selectToolbarTheme);
  const config = useSelector(selectFuseCurrentLayoutConfig);
  const { marketcap, loading, sendMessage, currentTick } = useSocket();
  const [currentT, setCurrentT] = useState({});
  const [loadCurrentT, setLoadCurrentT] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    sendMessage('marketcap');
  }, [sendMessage]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setLoadCurrentT(true);
    setTimeout(() => {
      setCurrentT(currentTick);
      setLoadCurrentT(false);
    }, 100);
  }, [currentTick]);

  return (
    <ThemeProvider theme={toolbarTheme}>
      <AppBar
        id="fuse-toolbar"
        className={clsx('flex relative z-20 border-b-1 bg-main-80', props.className)}
        color="default"
      >
        <Toolbar className="container flex-col gap-5 md:gap-20 px-12 md:px-24 py-10 md:py-20">
          <div
            className="flex w-full justify-between py-5"
            style={{ borderBottom: '1px solid', borderColor: '#8596A5' }}
          >
            <div className="flex gap-14 items-center">
              <div className="flex gap-4 items-center">
                <img className="w-24 h-24" src="assets/icons/price_mark.svg" alt="icon" />
                <Typography>{marketcap?.price}</Typography>
              </div>
              <div className="flex gap-4 items-center">
                <img className="w-20 h-20" src="assets/icons/market_mark.svg" alt="icon" />
                <Typography>{formatString(marketcap?.marketcap)}</Typography>
              </div>
            </div>
            <div className="w-1/2">
              <Hidden mdDown>
                <SearchBar />
              </Hidden>
            </div>
            <div className="flex items-center">
              <img className="w-20 h-20" src="assets/icons/setting.svg" alt="icon" />
            </div>
          </div>
          <div className="flex justify-between gap-40 items-center w-full">
            <div className="flex gap-[20px]">
              <Logo />
              {Object.keys(currentT).length > 0 && (
                <div>
                  <TickText
                    className={`text-18 p-0 text-hawkes-100 transition-all duration-500 ease-in-out ${
                      loadCurrentT ? 'opacity-70' : 'opacity-100'
                    }`}
                    tick={`${currentT.tick}`}
                    link
                  />
                  <Typography
                    className={`font-space p-0 text-14 text-hawkes-50 ${
                      loadCurrentT ? 'opacity-70' : 'opacity-100'
                    }`}
                  >
                    {getTimeAgo(currentTime, currentT.utc * 1000)}
                  </Typography>
                </div>
              )}
            </div>
            <div className="flex w-1/2 items-center justify-end">
              {config.navbar.display && (
                <Hidden mdUp>
                  <NavigationSearch />
                  <NavbarToggleButton className="w-20 h-20" />
                </Hidden>
              )}
              <Hidden mdDown>
                <FuseScrollbars className="flex h-full items-center">
                  <Navigation className="w-full" layout="horizontal" />
                </FuseScrollbars>
              </Hidden>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default memo(ToolbarLayout2);
