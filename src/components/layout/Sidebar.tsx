import {Sidebar as RASidebar, Menu} from "react-admin";
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

export const Sidebar = (props: any) => {
    return(
    <RASidebar {...props}>
        <Menu>
            <Menu.DashboardItem
                to="/"
                primaryText="Dashboard"
                leftIcon={<DashboardIcon/>}
            />
            <Menu.ResourceItem
                name="events"
                primaryText="Événements"
                leftIcon={<EventIcon/>}
            />
            <Menu.ResourceItem
                name="speakers"
                primaryText="Intervenants"
                leftIcon={<PeopleIcon/>}
            />
            <Menu.ResourceItem
                name="rooms"
                primaryText="Salles"
                leftIcon={<MeetingRoomIcon/>}
            />
        </Menu>
    </RASidebar>
    )
}