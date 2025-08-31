import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const Centered = styled(Stack)({
  justifyContent: 'center',
  alignItems: 'center',
});

const FullSizeCentered = styled(Centered)({
  width: '100%',
  height: '100%',
});

const ColumnNeat = styled(Stack)({
  justifyContent: 'flex-start',
  alignItems: 'stretch',
});

const ColumnAlignedStart = styled(Stack)({
  alignItems: 'flex-start',
});

export { Centered, FullSizeCentered, ColumnNeat, ColumnAlignedStart };
