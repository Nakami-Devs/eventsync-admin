import {RoomsList} from "./rooms/RoomsList.tsx";
import {RoomCreate} from "./rooms/RoomCreate.tsx";
import {RoomEdit} from "./rooms/RoomEdit.tsx";
import './App.css'
import {Dashboard} from "./dashboard/Dashboard.tsx";
import {Admin, Resource} from "react-admin";
import {authProvider} from "./authProvider.ts";
import {dataProvider} from "./dataProvider.ts";

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

            <Resource
                name="rooms"
                list={RoomsList}
                create={RoomCreate}
            edit={RoomEdit}
            />
          </Resource>
      </Admin>
  )
}

export default App


export default App
