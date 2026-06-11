import './App.css'
import { Admin, Resource, defaultDarkTheme, defaultTheme } from 'react-admin'
import { authProvider }  from './authProvider.ts'
import { dataProvider }  from './dataProvider.ts'
import { SpeakerList }   from './resources/speakers/SpeakerList.tsx'
import { SpeakerCreate } from './resources/speakers/SpeakerCreate.tsx'
import { SpeakerEdit }   from './resources/speakers/SpeakerEdit.tsx'
import { SpeakerShow }   from './resources/speakers/SpeakerShow.tsx'
import PeopleAltIcon     from '@mui/icons-material/PeopleAlt'
import { AdminLayout } from './components/layout/Layout.tsx';
import { EventList } from './resources/events/EventList.tsx';
import { EventEdit } from './resources/events/EventEdit.tsx';
import { EventCreate } from './resources/events/EventCreate.tsx';
import { RoomCreate } from "./rooms/RoomCreate.tsx";
import { RoomEdit } from "./rooms/RoomEdit.tsx";
import { RoomsList } from "./rooms/RoomsList.tsx"
import {Dashboard} from "./components/dashboard/Dashboard.tsx";
import { RoomShow } from './rooms/RoomShow.tsx'


const lightTheme = {
  ...defaultTheme,
  palette: {
    ...defaultTheme.palette,
    primary: { main: '#7C3AED' },
    background: {
      default: '#F0F0F5',   
      paper:   '#FFFFFF',
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
      paper:   '#1a1b35',
    },
  },
}

function App() {
  return (
    <Admin
      authProvider={authProvider}
      dataProvider={dataProvider}
      dashboard={Dashboard}
      layout={AdminLayout}
      theme={lightTheme}
      darkTheme={darkTheme}
    >
      <Resource
        name="events"
        list={EventList}
        edit={EventEdit}
        create={EventCreate}
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
    </Admin>
  )
}

export default App
