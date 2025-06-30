import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BookIcon from '@mui/icons-material/Book';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'src/contexts/AuthContext';
import { useTranslation } from 'react-i18next';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha('#0d47a1', 0.15),
  '&:hover': {
    backgroundColor: alpha('#0d47a1', 0.6),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function HeaderWithSidebar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  // i18n
  const { i18n } = useTranslation();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    )
      return;
    setOpen(open);
  };

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['Exchange', 'Spot', 'Event'].map((text) => {
          const route = `/${text.toLowerCase()}`;
          return (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => navigate(route)}>
                <ListItemIcon>
                  {text === 'Exchange' && <BookIcon />}
                  {text === 'Spot' && <LocationOnIcon />}
                  {text === 'Event' && <EventAvailableIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      sx={{ fontFamily: 'Dancing Script', fontSize: '1.7rem' }}
                    >
                      {text}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#eceff1' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon sx={{ color: '#121858' }} />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            onClick={() => navigate('/')}
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'block' },
              color: '#0d47a1',
              fontWeight: '600',
              fontSize: '1.8rem',
              fontFamily: 'Dancing Script',
              cursor: 'pointer',
            }}
          >
            RyuExChange
          </Typography>

          {/* Language Selector Dropdown */}
          <Select
            value={i18n.language}
            onChange={handleLanguageChange}
            size="small"
            sx={{
              mr: 2,
              color: '#0d47a1',
              fontWeight: '500',
              minWidth: 100,
              backgroundColor: 'white',
              borderRadius: 1,
              '& .MuiSvgIcon-root': {
                color: '#0d47a1',
              },
            }}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="jp">日本語</MenuItem>
           
          </Select>

          <Box sx={{ ml: 1 }}>
            {user ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={{ color: '#0d47a1', fontWeight: '500' }}>
                  {user.displayName || user.email}
                </Typography>
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                >
                  Log out
                </button>
              </Box>
            ) : (
              <button
                onClick={() => navigate('/auth')}
                className="px-6 py-3 bg-blue-600 rounded hover:bg-blue-700 transition drop-shadow-lg"
              >
                Log in
              </button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </Box>
  );
}
