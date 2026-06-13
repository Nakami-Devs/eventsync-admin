import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

import { RoomsList } from "../../rooms/RoomsList";
import { RoomCreate } from "../../rooms/RoomCreate";
import { RoomEdit } from "../../rooms/RoomEdit";
import { RoomShow } from "./RoomShow";

export default {
    list: RoomsList,
    create: RoomCreate,
    edit: RoomEdit,
    show: RoomShow,
    icon: MeetingRoomIcon
};