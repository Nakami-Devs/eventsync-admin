import './App.css'
import {Dashboard} from "./components/dashboard/Dashboard.tsx";
import {Admin, Resource} from "react-admin";
import {authProvider} from "./authProvider.ts";
import {dataProvider} from "./dataProvider.ts";
import { AdminLayout } from './components/layout/Layout.tsx';

function App() {

  return (
      <Admin
          authProvider={authProvider}
          dataProvider={dataProvider}
          dashboard={Dashboard}
          layout={AdminLayout}
      >
          <Resource
              name="events"
          >
          </Resource>
      </Admin>
  )
}

export default App
