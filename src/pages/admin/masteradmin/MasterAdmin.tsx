import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WidgetsIcon from '@mui/icons-material/Widgets';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppProvider } from '@toolpad/core/AppProvider';
import GroupIcon from '@mui/icons-material/Group';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Picture_Profile from '../../../assets/images/Ellipse 234.svg'
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
import { Outlet } from 'react-router-dom';
import HotTubIcon from '@mui/icons-material/HotTub';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Header from '../../../component_Admin/header_Admin/Header';
const NAVIGATION: Navigation = [
  { kind: 'header', title: 'Main items' },
  { segment: 'dashboard', title: 'Home', icon: <AddHomeWorkIcon /> },
  { segment: 'ListUsers', title: 'Users', icon: <GroupIcon /> },
  { segment: 'Rooms', title: 'Rooms', icon: <WidgetsIcon /> },
    { segment: 'Ads', title: 'Ads', icon: <CalendarMonthIcon /> },
   { segment: 'Bookings', title: 'Bookings', icon: <HotTubIcon /> },
 { segment: 'ChangePW', title: 'ٌReset PW', icon: <ChangeCircleIcon /> },
 { segment: 'ٌLogout', title: 'ٌLogout', icon: <LogoutIcon /> },
    

];

const demoTheme = createTheme({
  cssVariables: { colorSchemeSelector: 'data-toolpad-color-scheme' },
  colorSchemes: { light: true, dark: true },
  breakpoints: { values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 } },
});

function CustomToolbarActions() {
  return (
       <Stack
      direction="row"
      justifyContent="space-between"  
      alignItems="center"
    >
      <Box
        display="flex"               
        flexDirection="row"
        alignItems="center"
        gap={1}                        
        mr={2}                        
      >
        <Avatar
          src={Picture_Profile}       
          alt="Upskilling"
        />
        <Typography
          variant="h6"             
          fontWeight={600}
          fontSize={14}
        >
          Upskilling
        </Typography>
      </Box>

      <ThemeSwitcher />              
    </Stack>

  );
}

function DemoPageContent() {
  let LOCATION=window.location.pathname
  return (
    <>
{LOCATION!='/MasterAdmin/HomeAdmin'? <Header/>:null}
    

     <Outlet/>
    
  
    </>
   
  );
}

// Props for AccountSidebarPreview
interface AccountSidebarPreviewProps {
  handleClick: () => void;
  open: boolean;
  mini: boolean;
}

function AccountSidebarPreview({ handleClick, open, mini }: AccountSidebarPreviewProps) {
  return (
    <Stack direction="column" p={0}>
      <Divider />
      <AccountPreview
        variant={mini ? 'condensed' : 'expanded'}
        handleClick={handleClick}
        open={open}
      />
    </Stack>
  );
}

const accounts = [
  { id: 1, name: 'Bharat Kashyap', email: 'bharatkashyap@outlook.com', image: 'https://avatars.githubusercontent.com/u/19550456', projects: [{ id: 3, title: 'Project X' }] },
  { id: 2, name: 'Bharat MUI', email: 'bharat@mui.com', color: '#8B4513', projects: [{ id: 4, title: 'Project A' }] },
];

function SidebarFooterAccountPopover() {
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
            <ListItemText primary={account.name} secondary={account.email} primaryTypographyProps={{ variant: 'body2' }} secondaryTypographyProps={{ variant: 'caption' }} />
          </MenuItem>
        ))}
      </MenuList>
      <Divider />
      <AccountPopoverFooter>
        <SignOutButton />
      </AccountPopoverFooter>
    </Stack>
  );
}

// Sidebar footer component
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
                filter: theme => `drop-shadow(0px 2px 8px ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.32)'})`,
                mt: 1,
                '&::before': { content: '""', display: 'block', position: 'absolute', bottom: 10, left: 0, width: 10, height: 10, bgcolor: 'background.paper', transform: 'translate(-50%, -50%) rotate(45deg)', zIndex: 0 },
              },
            },
          },
        },
      }}
    />
  );
}

const demoSession: Session = {
  user: { name: 'Bharat Kashyap', email: 'bharatkashyap@outlook.com', image: 'https://avatars.githubusercontent.com/u/19550456' },
};

export default function Sidepar_Admin(props: { window?: () => Window }) {
  const { window } = props;
  const [pathname, setPathname] = React.useState('/dashboard');

  const router = React.useMemo<Router>(
    () => ({ pathname, searchParams: new URLSearchParams(), navigate: path => setPathname(String(path)) }),
    [pathname]
  );

  const demoWindow = window ? window() : undefined;
  const [session, setSession] = React.useState<Session | null>(demoSession);
  const authentication = React.useMemo(() => ({ signIn: () => setSession(demoSession), signOut: () => setSession(null) }), []);

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
        <DashboardLayout slots={{ toolbarActions: CustomToolbarActions, sidebarFooter: SidebarFooterAccount }}>
          <DemoPageContent pathname={pathname} />
        </DashboardLayout>
      </AppProvider>
    </DemoProvider>
  );
}
