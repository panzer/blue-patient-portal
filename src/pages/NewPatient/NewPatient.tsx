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

import { urlPatients } from '@/api';
import { FullSizeCentered } from '@/components/styled';

function NewPatient() {
  return (
    <>
      <meta name="title" content="Add New Patient" />
      <FullSizeCentered>
        <Typography variant="h3">Add a Patient</Typography>
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
          action={urlPatients}
          method="post"
        >
          <TextField label="First name" name="first_name" type="text" fullWidth />
          <TextField label="Last name" name="last_name" type="text" fullWidth />
          <TextField
            label="Date of birth"
            name="date_of_birth"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel id="sex-label">Sex</InputLabel>
            <Select labelId="sex-label" name="sex" label="Sex" defaultValue="">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="M">Male</MenuItem>
              <MenuItem value="F">Female</MenuItem>
              <MenuItem value="O">Other</MenuItem>
            </Select>
          </FormControl>

          {/* TODO: Pull parent id from session or url */}
          <FormControl fullWidth sx={{ display: 'none' }}>
            <InputLabel id="parent-label">Parent</InputLabel>
            <Select
              labelId="parent-label"
              name="parent"
              label="Parent"
              defaultValue="http://127.0.0.1:8000/patient-managers/1/"
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

export default NewPatient;
