import { Layout as RALayout } from 'react-admin';
import { AppBar } from './AppBar';

export const AdminLayout = (props: any) => (
  <RALayout {...props} appBar={AppBar} />
);