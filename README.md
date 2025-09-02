# Blue Patient Portal
Example registration and appointment application. Built for parents or caregivers to manage their child's care.

## Setup and Run Locally
Node v22+ recommended. Use `nvm` or whatever you are comfortable with on your system.

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Project Objective
Three major functionalities will be achieved in this proof of concept:

**1. View a list of their children (the patients).**

Display each child’s name, age, and whether they have an upcoming
appointment.

**2. Submit a form to add a new child to the list.**

It should capture at least these fields: first name, last name, sex, and date of birth.

After submitting the form, the newly added child should appear in the list.

**3. Schedule an appointment for their child.**

The user can click somewhere to schedule an appointment for any of their
children.

Assume we have infinite availability, so we simply need the parent to provide a
date, time, and purpose of their visit (“well visit” or “sick visit”).

Once scheduled, the appointment info should be shown somewhere.

## Approach
### What data entities are required
| Entity         | Why It's Needed                                                                 | Key Fields                                      | Relationships                                      |
|----------------|--------------------------------------------------------------------------------|--------------------------------------------------|----------------------------------------------------|
| Parent/Caregiver | Represents the user managing children's care                                  | id, name, contact info                           | Has many Children                                  |
| Patient (Child)  | Core subject of the portal; each child is a patient                          | id, parent_id, first name, last name, sex, DOB   | Belongs to Parent; Has many Appointments           |
| Appointment      | Tracks scheduled visits for each child                                        | id, patient_id, date, time, purpose                | Belongs to Patient                                   |

**Relationships:**
- A Parent/Caregiver can have multiple Patients (one-to-many).
- Each Patient belongs to one Parent/Caregiver.
- Each Patient can have multiple Appointments (one-to-many).
- Each Appointment is linked to one Patient.


### Consider Product Next Steps
In order to build a product that is future proof, let's think about what features are nice to have even if they aren't explicit in the requirements.
- Management by multiple parents for the same patient (child)
  - Consider how registration would work: do we try to "merge" patient data into one row, with Patient possibly having many Parent/Caregivers
  - Privacy concern if we state during registration "patient already exists". Then, this gives away info that this person is a patient
- Among all Patients under a Parent/Caregivers care, create a calendar of upcoming appointments
  - May be optimized by storing appointments differently in DB
- Appointment location and provider info
- If a Patient grows up to become a Parent/Caregiver, do we still want their info linked in some way?
- Could a Patient have their own log-in?
- Editing patient information or removing a patient from management
  - Does this remove the patient data entirely, or just unlink it from the Parent/Caregiver?
  - Would appointments be cancelled automatically?

- Cancelling or rescheduling appointments

- Patient data permissioning: who can view, manage schedule, edit medical info, etc?

- If Caregiver has many Patients, a tabular view with sort and filter may become preferred

## Creating the project
### Don't start from scratch
Many starter templates exist, so finding one that gives the right mix of technologies is the first step.

Requirements: React, Typescript, CSS Framework
Nice to have: Vite, Material UI, NPM, eslint, prettier

https://github.com/suren-atoyan/react-pwa was a good candidate and let's just start with that!

Bonus: this is a Progressive Web App template, so more nice stuff is built in. Eg: offline support, installable on mobile

Pulled without full git history using `degit`: `npx degit suren-atoyan/react-pwa#master blue-patient-portal`

### Deciding routes to create
List of patients: `/home/:parent_id`
- View and launch the add flow

Add a patient: `/home/:parent_id/add`
- On form submit, send back to previous page

Schedule appointment: `/appointments/:patient_id/new`
- On form submit, send back to previous page

(Bonus) View appointments: `/appointments/:patient_id`
