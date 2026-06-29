import { styled } from '@mui/material';
import { Sidebar } from './Sidebar';

const LayoutRoot = styled('div')({
  display: 'flex',
  height: '100vh',
  overflow: 'hidden',
});

const MainContent = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  overflow: 'auto',
  backgroundColor: '#f8f9fa',
  marginTop: 0,
}));

export const CustomLayout = (props: any) => {
  const { children } = props;

  return (
    <LayoutRoot>
      <Sidebar {...props} />
      <MainContent>
        {children}
      </MainContent>
    </LayoutRoot>
  );
};