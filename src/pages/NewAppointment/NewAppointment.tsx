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

import { urlAppointments } from '@/api';
import { FullSizeCentered } from '@/components/styled';

function Page3() {
  const params = useParams();
  const id = params.id;

  return (
    <>
      <meta name="title" content="New Appointment" />
      <FullSizeCentered>
        <Typography variant="h3">New Appointment</Typography>
        {/* TODO: Fetch and show patient name */}
        <Typography variant="h5">For _Name_</Typography>
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
              defaultValue={`http://127.0.0.1:8000/patients/${id}/`}
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
