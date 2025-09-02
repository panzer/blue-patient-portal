export type Appointment = {
  id: string;
  date: string; // ISO string or formatted date
  description: string;
};

export type Patient = {
  id: string;
  name: string;
  dateOfBith: string | number;
  profilePictureUrl?: string;
  appointments?: Appointment[];
};

export type DbPatient = {
  id: string;
  first_name: string;
  last_name: string;
  sex: 'M' | 'F' | 'O';
  date_of_birth: string | number;
  appointments?: string[]; // the url to GET additional appointment info
};

export type DbAppointment = {
  id: string;
  date: string;
  time: string;
  purpose: string;
};
