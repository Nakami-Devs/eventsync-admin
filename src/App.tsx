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
          </Resource>
      </Admin>
  )
}

export default App
