import './App.css'
import { Dashboard }     from './dashboard/Dashboard.tsx'
import { Admin, Resource } from 'react-admin'
import { authProvider }  from './authProvider.ts'
import { dataProvider }  from './dataProvider.ts'
import { SpeakerList }   from './speakers/SpeakerList.tsx'
import { SpeakerCreate } from './speakers/SpeakerCreate.tsx'
import { SpeakerEdit }   from './speakers/SpeakerEdit.tsx'

function App() {
  return (
    <Admin
      authProvider={authProvider}
      dataProvider={dataProvider}
      dashboard={Dashboard}
    >
      
      <Resource name="events" />

      
      <Resource
        name="speakers"
        list={SpeakerList}
        create={SpeakerCreate}
        edit={SpeakerEdit}
        options={{ label: 'Intervenants' }}
      />
    </Admin>
  )
}

export default App