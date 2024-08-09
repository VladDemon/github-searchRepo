import React from 'react';
import { Paper, Typography, Chip } from '@mui/material';

interface RepositoryDetailProps {
  name: string;
  description?: string;
  license?: string;
  language: string;
}

export const RepositoryDetail: React.FC<RepositoryDetailProps> = ({ name, description, license, language }) => {
  return (
    <Paper elevation={3} style={{ padding: '1rem', marginTop: '1rem' }}>
      <Typography variant="h5">{name}</Typography>
      {description && <Typography variant="body1">{description}</Typography>}
      {license && <Chip label={`License: ${license}`} />}
      <Chip label={language} color="primary" />
    </Paper>
  );
};
