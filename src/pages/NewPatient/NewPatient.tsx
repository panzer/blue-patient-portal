import { useNavigate } from 'react-router';

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

import { Formik } from 'formik';

import { urlPatients } from '@/api';
import { FullSizeCentered } from '@/components/styled';

function NewPatient() {
  const navigate = useNavigate();

  // TODO: Pull parent id from session or url
  const parentDefault = 'http://127.0.0.1:8000/patient-managers/1/';

  return (
    <>
      <meta name="title" content="Add New Patient" />
      <FullSizeCentered>
        <Typography variant="h3">Add a Patient</Typography>
        <Formik
          initialValues={{
            first_name: '',
            last_name: '',
            date_of_birth: '',
            sex: '',
            parent: parentDefault,
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const formData = new FormData();
              Object.entries(values).forEach(([key, value]) => {
                formData.append(key, value);
              });
              await fetch(urlPatients, {
                method: 'POST',
                body: formData,
              });
              // Go back to previous page
              navigate(-1);
            } catch (error) {
              // Optionally handle error
              console.error('Failed to submit new patient', error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
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
              onSubmit={handleSubmit}
            >
              <TextField
                label="First name"
                name="first_name"
                type="text"
                fullWidth
                value={values.first_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <TextField
                label="Last name"
                name="last_name"
                type="text"
                fullWidth
                value={values.last_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <TextField
                label="Date of birth"
                name="date_of_birth"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={values.date_of_birth}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormControl fullWidth>
                <InputLabel id="sex-label">Sex</InputLabel>
                <Select
                  labelId="sex-label"
                  name="sex"
                  label="Sex"
                  value={values.sex}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="M">Male</MenuItem>
                  <MenuItem value="F">Female</MenuItem>
                  <MenuItem value="O">Other</MenuItem>
                </Select>
              </FormControl>

              {/* Hidden parent field */}
              <FormControl fullWidth sx={{ display: 'none' }}>
                <InputLabel id="parent-label">Parent</InputLabel>
                <Select
                  labelId="parent-label"
                  name="parent"
                  label="Parent"
                  value={values.parent}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <MenuItem value={parentDefault}>{parentDefault}</MenuItem>
                </Select>
              </FormControl>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  title="Make a POST request on the Patient List resource"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          )}
        </Formik>
      </FullSizeCentered>
    </>
  );
}

export default NewPatient;
