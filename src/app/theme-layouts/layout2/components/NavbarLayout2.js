import clsx from 'clsx';
import { memo } from 'react';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import Hidden from '@mui/material/Hidden';
import SearchBar from 'src/app/pages/components/SearchBar/SearchBar';
import { selectFuseCurrentLayoutConfig } from 'app/store/fuse/settingsSlice';
import Logo from '../../shared-components/Logo';
import NavbarToggleButton from '../../shared-components/NavbarToggleButton';
import Navigation from '../../shared-components/Navigation';
import NavigationSearch from '../../shared-components/NavigationSearch';

const Root = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
}));

function NavbarLayout2(props) {
  const config = useSelector(selectFuseCurrentLayoutConfig);
  return (
    <Root className={clsx('w-full h-64 min-h-64 max-h-64 bg-main-80', props.className)}>
      <div className="flex justify-between items-center w-full h-full container pl-8 pr-0 md:px-24 z-20">
        <div>
          <Logo />
        </div>
        <Hidden mdDown>
          <FuseScrollbars className="flex h-full items-center">
            <Navigation className="w-full" layout="horizontal" />
          </FuseScrollbars>
        </Hidden>
        <div className="flex items-center">
          {config.navbar.display && (
            <Hidden mdUp>
              <NavigationSearch />
              <NavbarToggleButton className="w-40 h-40 p-0 mx-0 sm:mx-8" />
            </Hidden>
          )}
          <Hidden mdDown>
            <SearchBar />
          </Hidden>
        </div>
      </div>
    </Root>
  );
}

export default memo(NavbarLayout2);
