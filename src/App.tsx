import { Provider } from 'react-redux';
import Leaflet from './Leaflet';
import NavBar from './Navbar';
import store from './store';
import TimeSlider from './Navbar/TimeSlider';
import AutoPlay from './Leaflet/AutoPlay';
import CountButton from './Navbar/CountButton';
import GlobalStyles from '@mui/material/GlobalStyles';
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const drawerWidth = 400;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

function useWindowSize() {
  const [size, setSize] = React.useState([0, 0]);
  React.useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  // padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function App() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [width, height] = useWindowSize();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  var showCount = true;
  var showSlider = true;
  var showAutoplay = true;

  if (open && width <= 1167) {
    showCount = false
  } else if (!open && width <= 860) {
    showCount = false
  } else {
    showCount = true
  }

  if ((open && width <= 1200) || (open && height<= 500)) {
    showSlider = false
  } else if ((!open && width <= 900) || (!open && height<= 500)) {
    showSlider = false
  } else {
    showSlider = true
  }

  if ((open && width <= 790) || (open && height<= 250)) {
    showAutoplay = false
  } else if ((!open && width <= 500) || (!open && height<= 250)) {
    showAutoplay = false
  } else {
    showAutoplay = true
  }


  return (
    <>
      <Provider store={store}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar id="app-bar" position="fixed" open={open} style={{ background: '#232C33'}}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
              QuakeVisual
              </Typography>
              {showCount? <CountButton/>:<></> }
            </Toolbar>
          </AppBar>
          <GlobalStyles 
            styles={{ 
              '*::-webkit-scrollbar': {width: '1em'},
              '*::-webkit-scrollbar-thumb': {backgroundColor: 'lightgrey',outline: '1px solid slategrey' }, 
              '*::-webkit-scrollbar-track': {backgroundColor: '#232C33'}
            }} 
          />
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader style={{ background: '#232C33' }}>
              <IconButton style={{ background: '#ffffff' }} onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </DrawerHeader>
            <NavBar />
          </Drawer>
          <Main open={open} style={{ padding: 0 }}>
            <DrawerHeader />
            <Leaflet />
            {showSlider? <TimeSlider/>:<></>}
            {showAutoplay? <AutoPlay/>:<></>}
          </Main>
        </Box>
      </Provider>
    </>
  );
}

