import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

import { urlAppointments, urlPatients } from '@/api';
import { DbPatient } from '@/api/types';
import PatientAvatar from '@/components/PatientAvatar';
import { FullSizeCentered } from '@/components/styled';

function Page3() {
  const params = useParams();
  const patientId = params.id;

  const [patientData, setPatientData] = useState<DbPatient>();

  useEffect(() => {
    if (!patientId) return;
    const fetchPatient = async () => {
      try {
        const response = await fetch(`${urlPatients}${patientId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch patient data');
        }
        const data = await response.json();
        setPatientData(data);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };
    fetchPatient();
  }, [patientId]);

  return (
    <>
      <meta name="title" content="New Appointment" />
      <FullSizeCentered>
        <PatientAvatar />
        <Typography variant="h3">New Appointment</Typography>
        <Typography variant="h5">For {patientData?.first_name ?? '...'}</Typography>
        <Box
          component="form"
          sx={{
            mt: 3,
            width: '100%',
            maxWidth: 500,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
          noValidate
          autoComplete="off"
          // TODO: Formik or some other lib to handle validation and form submit without redirecting
          action={urlAppointments}
          method="post"
        >
          {/* TODO: switch to purpose built date and time inputs */}
          <TextField
            label="Date"
            name="date"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="Time"
            name="time"
            type="time"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel id="reason-label">Purpose</InputLabel>
            <Select labelId="reason-label" name="purpose" label="Purpose" defaultValue="">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Well Visit">Well Visit</MenuItem>
              <MenuItem value="Sick Visit">Sick Visit</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ display: 'none' }}>
            <InputLabel id="patient-label">Patient</InputLabel>
            <Select
              labelId="patient-label"
              name="patient"
              label="Patient"
              defaultValue={`http://127.0.0.1:8000/patients/${patientId}/`}
            ></Select>
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              title="Make a POST request on the Patient List resource"
            >
              Submit
            </Button>
          </Box>
        </Box>
      </FullSizeCentered>
    </>
  );
}

export default Page3;
