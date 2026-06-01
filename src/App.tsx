import './App.css'
import {Dashboard} from "./components/dashboard/Dashboard.tsx";
import {Admin, Resource} from "react-admin";
import {authProvider} from "./authProvider.ts";
import {dataProvider} from "./dataProvider.ts";
import { AdminLayout } from './components/layout/Layout.tsx';
import { EventList } from './components/events/EventList.tsx';
import { EventEdit } from './components/events/EventEdit.tsx';
import { EventCreate } from './components/events/EventCreate.tsx';

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
                list={EventList}
                edit={EventEdit}
                create={EventCreate}/>
      </Admin>
  )
}

export default App
