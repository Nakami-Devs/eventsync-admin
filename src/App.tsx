import './App.css'
import { Admin, Resource, defaultDarkTheme, defaultTheme } from 'react-admin'
import { authProvider } from './authProvider.ts'
import { dataProvider } from './dataProvider.ts'
import { SpeakerList } from './resources/speakers/SpeakerList.tsx'
import { SpeakerCreate } from './resources/speakers/SpeakerCreate.tsx'
import { SpeakerEdit } from './resources/speakers/SpeakerEdit.tsx'
import { SpeakerShow } from './resources/speakers/SpeakerShow.tsx'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import { EventList } from './resources/events/EventList.tsx';
import { EventEdit } from './resources/events/EventEdit.tsx';
import { EventCreate } from './resources/events/EventCreate.tsx';
import { RoomCreate } from "./resources/rooms/RoomCreate.tsx";
import { RoomEdit } from "./resources/rooms/RoomEdit.tsx";
import { RoomsList } from "./resources/rooms/RoomsList.tsx"
import { Dashboard } from "./components/dashboard/Dashboard.tsx";
import { RoomShow } from './resources/rooms/RoomShow.tsx'
import { CustomLoginPage } from './components/login/CustomLoginPage.tsx'
import { SessionCreate } from './resources/events/sessions/SessionCreate.tsx'
import { SessionEdit } from './resources/events/sessions/SessionEdit.tsx'
import { SessionList } from './resources/events/sessions/SessionList.tsx'
import { EventShow } from './resources/events/EventShow.tsx'
import { CustomLayout } from './components/layout/CustomLayout.tsx'




const lightTheme = {
  ...defaultTheme,
  palette: {
    ...defaultTheme.palette,
    primary: { main: '#7C3AED' },
    background: {
      default: '#F0F0F5',
      paper: '#FFFFFF',
    },
  },
}

const darkTheme = {
  ...defaultDarkTheme,
  palette: {
    ...defaultDarkTheme.palette,
    primary: { main: '#7C3AED' },
    background: {
      default: '#12132A',
      paper: '#1a1b35',
    },
  },
}

function App() {
  return (
    <Admin
      authProvider={authProvider}
      dataProvider={dataProvider}
      dashboard={Dashboard}
      layout={CustomLayout}
      theme={lightTheme}
      darkTheme={darkTheme}
      loginPage={CustomLoginPage}
    >
      <Resource
        name="events"
        list={EventList}
        edit={EventEdit}
        create={EventCreate}
        show={EventShow}
      />
      <Resource
        name="speakers"
        list={SpeakerList}
        create={SpeakerCreate}
        edit={SpeakerEdit}
        show={SpeakerShow}
        options={{ label: 'Intervenants' }}
        icon={PeopleAltIcon}
      />
      <Resource
        name="rooms"
        list={RoomsList}
        create={RoomCreate}
        edit={RoomEdit}
        show={RoomShow}
      />
      <Resource
        name="sessions"
        list={SessionList}
        create={SessionCreate}
        edit={SessionEdit}
      />
    </Admin>
  )
}

export default App
