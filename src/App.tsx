import './App.css'
import {Dashboard} from "./dashboard/Dashboard.tsx";
import {Admin, Resource} from "react-admin";
import {authProvider} from "./authProvider.ts";
import {dataProvider} from "./dataProvider.ts";
import { RoomsList, RoomsCreate, RoomsEdit } from "./rooms/index.ts";

function App() {

  return (
      <Admin
          authProvider={authProvider}
          dataProvider={dataProvider}
          dashboard={Dashboard}
      >
          <Resource
              name="events"
          >
          </Resource>
          <Resource
              name="rooms"
              list={RoomsList}
              create={RoomsCreate}
              edit={RoomsEdit}
          />
      </Admin>
  )
}

export default App
