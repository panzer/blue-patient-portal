import { Button, Typography } from '@mui/material';

import PatientPreview from '@/components/PatientPreview';
import { ColumnAlignedStart, ColumnNeat, FullSizeCentered } from '@/components/styled';

function Welcome() {
  const data = [
    {
      id: 'a',
      name: 'John Doe',
      dateOfBith: '2022-03-11',
      upcomingAppointments: [],
    },
    {
      id: 'b',
      name: 'Sally Jane',
      dateOfBith: '2025-06-02',
      tintColor: 'secondary',
      upcomingAppointments: [{ date: '2025-09-13T10:00:00', description: 'Check Up' }],
    },
    {
      id: 'c',
      name: 'Billy Smith',
      dateOfBith: '2020-12-20',
      tintColor: 'success',
      upcomingAppointments: [
        { date: '2025-09-10T11:00:00', description: 'Follow-up' },
        { date: '2025-10-05T16:00:00', description: 'Flu Shot' },
        { date: '2026-07-01T09:00:00', description: 'Well Visit' },
        { date: '2026-08-15T14:30:00', description: 'Shot' },
      ],
    },
  ];

  return (
    <>
      <meta name="title" content="Welcome" />
      <ColumnAlignedStart flexDirection={'column'} m={3}>
        <Typography variant="h2">Welcome</Typography>
        <Typography variant="h5">Manage your patients</Typography>
        <FullSizeCentered>
          <ColumnNeat flexDirection={'column'}>
            {data.map((patient) => (
              <PatientPreview key={patient.id} {...patient} />
            ))}
          </ColumnNeat>
          <Button variant="contained" href={`/home/${'foo'}/add`}>
            Register New Patient
          </Button>
        </FullSizeCentered>
      </ColumnAlignedStart>
    </>
  );
}

export default Welcome;
