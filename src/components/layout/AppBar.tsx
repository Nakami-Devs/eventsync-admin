import { AppBar as RAAppBar } from 'react-admin';
import { styled } from '@mui/material';

const StyledAppBar = styled(RAAppBar)(({ theme }) => ({
  display: 'none',
}));

export const AppBar = (props: any) => {
  return <StyledAppBar {...props} />;
};