import React from 'react';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import { Avatar, Box, Card, List, ListItem, Stack, Typography } from '@mui/material';

import { ageString, relativeDateTime, shortDateTime } from '@/utils/datetime';

import { ColumnAlignedStart } from '../styled';

type Appointment = {
  date: string; // ISO string or formatted date
  description: string;
};

type PatientPreviewProps = {
  id: string;
  name: string;
  dateOfBith: string | number;
  profilePictureUrl?: string;
  upcomingAppointments?: Appointment[];
  tintColor?: string;
};

const DEFAULT_TINT = 'primary';

const PatientPreview: React.FC<PatientPreviewProps> = ({
  id,
  name,
  dateOfBith,
  profilePictureUrl,
  upcomingAppointments = [],
  tintColor = DEFAULT_TINT,
}) => {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: 3,
        boxShadow: 2,
        p: 2,
        m: 1,
        minWidth: 320,
      }}
    >
      <Avatar
        src={profilePictureUrl}
        alt={name}
        sx={{
          width: 64,
          height: 64,
          bgcolor: profilePictureUrl ? undefined : `${tintColor}.light`,
          mr: 2,
        }}
      >
        {!profilePictureUrl ? <PersonIcon fontSize="large" /> : null}
      </Avatar>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" fontWeight={700} color={`${tintColor}.dark`}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Age: {ageString(dateOfBith)}
        </Typography>
        <ColumnAlignedStart spacing={0.5}>
          {upcomingAppointments.length > 0 ? (
            <>
              <Typography
                variant="subtitle2"
                component="a"
                href={`/appointments/${id}`}
                color="primary"
                sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}
              >
                <CalendarMonthIcon fontSize="small" sx={{ mr: 0.5 }} />
                Upcoming Appointments
              </Typography>
              <List dense disablePadding sx={{ pl: 1 }}>
                {upcomingAppointments.slice(0, 2).map((appt, idx) => (
                  <ListItem key={idx} disablePadding divider>
                    <Typography variant="body2" component="span" fontWeight={500}>
                      {shortDateTime(appt.date)}{' '}
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        component="span"
                        fontWeight={300}
                      >
                        ({relativeDateTime(appt.date)})
                      </Typography>
                    </Typography>
                    {appt.description ? (
                      <Typography variant="caption" component="span" sx={{ ml: 1 }}>
                        {appt.description}
                      </Typography>
                    ) : null}
                  </ListItem>
                ))}
                {upcomingAppointments.length > 2 && (
                  <ListItem disablePadding>
                    <Typography variant="caption" color="text.secondary">
                      +{upcomingAppointments.length - 2} more
                    </Typography>
                  </ListItem>
                )}
              </List>
            </>
          ) : (
            <Stack direction="row" gap={2}>
              <Typography variant="body2" color="text.secondary">
                No upcoming appointments
              </Typography>
              <Typography
                variant="body2"
                sx={{ ml: 0.5, color: 'primary.main' }}
                component="a"
                href={`/appointments/${id}/new`}
              >
                Book Now
              </Typography>
            </Stack>
          )}
        </ColumnAlignedStart>
      </Box>
    </Card>
  );
};

export default PatientPreview;
