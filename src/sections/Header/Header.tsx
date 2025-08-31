import ThemeIcon from '@mui/icons-material/InvertColors';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Button, Divider, IconButton, Stack, Toolbar, Tooltip } from '@mui/material';

import { useNotifications } from '@toolpad/core/useNotifications';

import { title } from '@/config';
import { useSidebar } from '@/sections/Sidebar/hooks';
import { useThemeMode } from '@/theme';

import { getNotificationDemo } from './utils';

function Header() {
  const { themeMode, toggle: toggleThemeMode } = useThemeMode();
  const { open: openSidebar } = useSidebar();
  const notifications = useNotifications();

  function showNotification() {
    notifications.show(getNotificationDemo(), {
      autoHideDuration: 5000,
    });
  }

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={2}
      data-pw={`theme-${themeMode}`}
      enableColorOnDark
    >
      <Toolbar>
        <Stack direction="row" justifyContent="space-between" alignItems="center" flex={1}>
          <Stack direction="row" gap={1} alignItems="center">
            <IconButton
              size="large"
              edge="start"
              color="info"
              aria-label="menu"
              onClick={openSidebar}
            >
              <MenuIcon />
            </IconButton>
            <Button onClick={showNotification} color="info">
              {title}
            </Button>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Tooltip title="Switch language" arrow>
              <IconButton
                color="info"
                onClick={() => {
                  const currentLang = localStorage.getItem('lang') || 'en';
                  const newLang = currentLang === 'en' ? 'es' : 'en';
                  localStorage.setItem('lang', newLang);
                  window.location.reload();
                }}
                sx={{ mr: 1 }}
                data-pw="lang-toggle"
              >
                {(localStorage.getItem('lang') || 'en') === 'en' ? 'ES' : 'EN'}
              </IconButton>
            </Tooltip>
            <Divider orientation="vertical" flexItem />
            <Tooltip title="Switch theme" arrow>
              <IconButton
                color="info"
                edge="end"
                size="large"
                onClick={toggleThemeMode}
                data-pw="theme-toggle"
              >
                <ThemeIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
