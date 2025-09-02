import { atomWithQuery } from 'jotai-tanstack-query';

import { urlAppointments, urlPatients } from '@/api';
import { Appointment, DbAppointment, DbPatient, Patient } from '@/api/types';

async function getAppointment(resourceUrl: string): Promise<Appointment> {
  const response = await fetch(resourceUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch appointment with id');
  }
  const rawDbAppointment = (await response.json()) as DbAppointment; // TODO: avoid `as` maybe using Zod
  return {
    id: rawDbAppointment.id,
    date: new Date(`${rawDbAppointment.date}T${rawDbAppointment.time}`).toISOString(),
    description: rawDbAppointment.purpose,
  };
}

// TODO: look up patients for one patient manager at a time
export const patientsQueryAtom = atomWithQuery<Patient[]>(() => ({
  queryKey: ['patients'],
  queryFn: async () => {
    const response = await fetch(urlPatients);
    if (!response.ok) {
      throw new Error('Failed to fetch patients');
    }
    const dbPatients = (await response.json()) as DbPatient[];

    // Transform and fully resolve appointments
    const patients: Patient[] = await Promise.all(
      dbPatients.map(async (dbPatient: DbPatient) => {
        const appointments = dbPatient.appointments
          ? await Promise.all(dbPatient.appointments.map(getAppointment))
          : undefined;
        return {
          id: dbPatient.id,
          name: `${dbPatient.first_name} ${dbPatient.last_name}`,
          dateOfBith: dbPatient.date_of_birth,
          appointments,
        } as Patient;
      }),
    );
    return patients;
  },
}));

export const appointmentGetAtom = atomWithQuery<Appointment>(() => ({
  queryKey: ['appointment'],
  queryFn: async () => {
    const response = await fetch(urlAppointments);
    if (!response.ok) {
      throw new Error('Failed to fetch appointment with id');
    }
    return response.json();
  },
}));
