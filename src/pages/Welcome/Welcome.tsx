import { Alert, Button, Typography } from '@mui/material';

import { useAtom } from 'jotai';

import Loading from '@/components/Loading';
import PatientPreview from '@/components/PatientPreview';
import { ColumnAlignedStart, ColumnNeat, FullSizeCentered } from '@/components/styled';

import { patientsQueryAtom } from './atoms';

function Welcome() {
  const [{ data, isPending, isError }] = useAtom(patientsQueryAtom);

  const tintColors = ['primary', 'secondary', 'success'];

  return (
    <>
      <meta name="title" content="Welcome" />
      <ColumnAlignedStart flexDirection={'column'} m={3}>
        <Typography variant="h2">Welcome</Typography>
        <Typography variant="h5">Manage your patients</Typography>
        <FullSizeCentered>
          {/* TODO: Make this easier to read. Loading + Error Fallback  */}
          {data ? (
            <ColumnNeat flexDirection={'column'}>
              {data.map((patient, idx) => (
                <PatientPreview
                  key={patient.id}
                  {...patient}
                  tintColor={tintColors[idx % tintColors.length]}
                />
              ))}
            </ColumnNeat>
          ) : isPending ? (
            <Loading />
          ) : isError ? (
            <Alert severity="error">Could not load Patient data. Is the backend running?</Alert>
          ) : null}

          <Button variant="contained" href={`/home/${'foo'}/add`}>
            Register New Patient
          </Button>
        </FullSizeCentered>
      </ColumnAlignedStart>
    </>
  );
}

export default Welcome;
