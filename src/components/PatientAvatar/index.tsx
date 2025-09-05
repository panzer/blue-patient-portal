import React from 'react';

import PersonIcon from '@mui/icons-material/Person';
import { Avatar } from '@mui/material';

type PatientAvatarProps = {
  imageUrl?: string;
  tint?: string;
  // name: string;
};

const PatientAvatar = ({ imageUrl, tint = 'primary' }: PatientAvatarProps) => {
  return (
    <Avatar
      src={imageUrl}
      // alt={name}
      sx={{
        width: 64,
        height: 64,
        bgcolor: imageUrl ? undefined : `${tint}.light`,
        mr: 2,
      }}
    >
      {!imageUrl ? <PersonIcon fontSize="large" /> : null}
    </Avatar>
  );
};

export default PatientAvatar;
