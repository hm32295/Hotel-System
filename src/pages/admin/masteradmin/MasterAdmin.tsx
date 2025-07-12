import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { createTheme, useColorScheme } from '@mui/material/styles';
import PeopleIcon from '@mui/icons-material/People';
import WidgetsIcon from '@mui/icons-material/Widgets';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppProvider } from '@toolpad/core/AppProvider';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Picture_Profile from '../../../assets/images/Ellipse 234.svg';
import {
  DashboardLayout,
  ThemeSwitcher,
} from '@toolpad/core/DashboardLayout';
import {
  Account,
  AccountPreview,
  AccountPopoverFooter,
  SignOutButton,
} from '@toolpad/core/Account';
import type { Navigation, Router, Session } from '@toolpad/core/AppProvider';
import { DemoProvider } from '@toolpad/core/internal';
import { Outlet, useNavigate } from 'react-router-dom';
import HotTubIcon from '@mui/icons-material/HotTub';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import Header from '../../../component_Admin/header_Admin/Header';
import { AuthContext } from '../../../context/context';
import { Skeleton } from '@mui/material';


const NAVIGATION: Navigation = [
  { kind: 'header', title: 'Main items' },
  { segment: 'dashboard', title: 'Dashboard', icon: <AddHomeWorkIcon /> },
 
  { segment: 'Rooms', title: 'Rooms', icon: <WidgetsIcon /> },
  { segment: 'Ads', title: 'Ads', icon: <CalendarMonthIcon /> },
  { segment: 'Facilities', title: 'Facilities', icon: <HotTubIcon /> },
  { segment: 'list-booking', title: 'Bookings', icon: <ShoppingCartIcon /> },
  { segment: 'users-list', title: 'Users', icon: <PeopleIcon /> },
  { segment: 'change-password', title: 'change password', icon: <ChangeCircleIcon /> },
  
];

const demoTheme = createTheme({
  cssVariables: { colorSchemeSelector: 'data-toolpad-color-scheme' },
  colorSchemes: { light: true, dark: true },
  breakpoints: { values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 } },
});

export  function CustomToolbarActions() {
  const { mode } = useColorScheme();
  const isDarkMode = mode === 'dark';

  const authContext = useContext(AuthContext);

  if (!authContext || authContext.isAuthLoading || !authContext.loginData) {
    return <Skeleton />;  
  }

  const { loginData } = authContext;

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Box display="flex" flexDirection="row" alignItems="center" gap={1} mr={2}>

        <Avatar src={Picture_Profile} alt="User profile" />
        <Typography
          variant="h6"
          color={isDarkMode ? '#fff' : ''}
          fontWeight={600}
          fontSize={14}
        >
          {loginData?.role || 'No Role'}
        </Typography>
      </Box>
      <ThemeSwitcher />
    </Stack>
  );
}
function DemoPageContent() {
  const LOCATION = window.location.pathname;
  return (
    <>
    <div className="" style={{marginTop:'10px'}}>
       {LOCATION !== '/MasterAdmin/HomeAdmin' && LOCATION !== '/MasterAdmin' ? <Header /> : null}
    </div>
     
      <Outlet />
    </>
  );
}

interface AccountSidebarPreviewProps {
  handleClick: () => void;
  open: boolean;
  mini: boolean;
}

function AccountSidebarPreview({ handleClick, open, mini }: AccountSidebarPreviewProps) {
  return (
    <Stack direction="column" p={0}>
      <Divider />
      <AccountPreview variant={mini ? 'condensed' : 'expanded'} handleClick={handleClick} open={open} />
    </Stack>
  );
}

const accounts = [
  { id: 1, name: 'Bharat Kashyap', email: 'bharatkashyap@outlook.com', image: 'https://avatars.githubusercontent.com/u/19550456', projects: [{ id: 3, title: 'Project X' }] },
  { id: 2, name: 'Bharat MUI', email: 'bharat@mui.com', color: '#8B4513', projects: [{ id: 4, title: 'Project A' }] },
];

function SidebarFooterAccountPopover() {
  const {logout} = useContext(AuthContext);
  const navigation = useNavigate()
  return (
    <Stack direction="column">
      <Typography variant="body2" mx={2} mt={1}>Accounts</Typography>
      <MenuList>
        {accounts.map((account) => (
          <MenuItem key={account.id} component="button" sx={{ justifyContent: 'flex-start', width: '100%', columnGap: 2 }}>
            <ListItemIcon>
              <Avatar sx={{ width: 32, height: 32, fontSize: '0.95rem', bgcolor: account.color }} src={account.image} alt={account.name}>
                {account.name[0]}
              </Avatar>
            </ListItemIcon>
            <ListItemText
              primary={account.name}
              secondary={account.email}
              primaryTypographyProps={{ variant: 'body2' }}
              secondaryTypographyProps={{ variant: 'caption' }}
            />
          </MenuItem>
        ))}
      </MenuList>
      <Divider />
      <AccountPopoverFooter>
        <SignOutButton onClick={()=>{logout(); navigation('/login') }} />
      </AccountPopoverFooter>
    </Stack>
  );
}

type SidebarFooterAccountProps = { mini: boolean };
function SidebarFooterAccount({ mini }: SidebarFooterAccountProps) {
  const PreviewComponent = React.useMemo(
    () => (props: { handleClick: () => void; open: boolean }) => (
      <AccountSidebarPreview {...props} mini={mini} />
    ),
    [mini]
  );

  return (
    <Account
      slots={{ preview: PreviewComponent, popoverContent: SidebarFooterAccountPopover }}
      slotProps={{
        popover: {
          transformOrigin: { horizontal: 'left', vertical: 'bottom' },
          anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
          disableAutoFocus: true,
          slotProps: {
            paper: {
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: (theme) =>
                  `drop-shadow(0px 2px 8px ${
                    theme.palette.mode === 'dark'
                      ? 'rgba(255,255,255,0.10)'
                      : 'rgba(0,0,0,0.32)'
                  })`,
                mt: 1,
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  bottom: 10,
                  left: 0,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translate(-50%, -50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            },
          },
        },
      }}
    />
  );
}

const demoSession: Session = {
  user: {
    name: 'Bharat Kashyap',
    email: 'bharatkashyap@outlook.com',
    image: 'https://avatars.githubusercontent.com/u/19550456',
  },
};

export default function Sidepar_Admin(props: { window?: () => Window }) {
  const { window } = props;
  const navigate = useNavigate();
  const initialPathname =
    typeof window === 'function'
      ? window()?.location.pathname ?? ''
      : typeof window !== 'undefined' && window?.location
      ? (window as Window).location.pathname
      : '';
  const [pathname, setPathname] = React.useState(initialPathname);

  const router = React.useMemo<Router>(
    () => ({
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => {
        const fullPath = `/MasterAdmin${String(path)}`;
        navigate(fullPath);
        setPathname(fullPath);
      },
    }),
    [pathname, navigate]
  );

  const demoWindow = window ? window() : undefined;
  const [session, setSession] = React.useState<Session | null>(demoSession);
  const authentication = React.useMemo(
    () => ({
      signIn: () => setSession(demoSession),
      signOut: () => setSession(null),
    }),
    []
  );

  return (
    <DemoProvider window={demoWindow}>
      <AppProvider
        navigation={NAVIGATION}
        router={router}
        theme={demoTheme}
        window={demoWindow}
        authentication={authentication}
        session={session}
      >
        <DashboardLayout
          defaultSidebarCollapsed       
          sx={{
            '& .MuiDrawer-root .MuiDrawer-paper': {
              overflow: 'hidden',       
            },
          }}
           branding={{ title: 'Reflex',logo: <img src={'https://www.daleeeel.com/f/res/s05/locations-photos/000/891/0089179-269-4412de14ea85462e923e77887a343b55-r01.jpg'} /> }}
        
          slots={{ toolbarActions: CustomToolbarActions, sidebarFooter: SidebarFooterAccount }}
        >
          <DemoPageContent />
        </DashboardLayout>
      </AppProvider>
    </DemoProvider>
  );
}
