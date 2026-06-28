import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { RoomsList } from "./RoomsList";
import { RoomCreate } from "./RoomCreate";
import { RoomEdit } from "./RoomEdit";
import { RoomShow } from "./RoomShow";

export * from '../types';

export default {
    list: RoomsList,
    create: RoomCreate,
    edit: RoomEdit,
    show: RoomShow,
    icon: MeetingRoomIcon
};