import { Stack, Typography } from '@mui/material';

function getNotificationDemo() {
  return (
    <Stack gap={0.5}>
      <Typography variant="body1" fontWeight={900}>
        Notification demo
      </Typography>
      <Typography variant="body1">Test, test, 1... 2... 3...</Typography>
    </Stack>
  );
}

export { getNotificationDemo };
