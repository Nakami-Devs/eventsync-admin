import { Layout as RALayout } from 'react-admin';
import { AppBar } from './AppBar';
import {Sidebar} from "./Sidebar";

export const AdminLayout = (props: any) => (
  <RALayout {...props} appBar={AppBar} sidebar={Sidebar} />
);