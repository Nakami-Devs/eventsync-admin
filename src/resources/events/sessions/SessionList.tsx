import { List, Datagrid, TextField, DateField, ReferenceField, EditButton, DeleteButton, TopToolbar, CreateButton, useRecordContext } from 'react-admin';
import { useParams } from 'react-router-dom';

const SessionActions = ({ eventId }: { eventId: string }) => (
  <TopToolbar>
    <CreateButton
      to={`/events/${eventId}/sessions/create`}
      label="Ajouter une session"
    />
  </TopToolbar>
);

export const SessionList = () => {
  const { id: eventId } = useParams();
  const record = useRecordContext();

  const currentEventId = eventId || record?.id;

  if (!currentEventId) return <div>Chargement...</div>;

  return (
    <List
      resource="sessions"
      filter={{ eventId: currentEventId }}
      actions={<SessionActions eventId={currentEventId as string} />}
      empty={<div>Aucune session pour cet événement.</div>}
    >
      <Datagrid>
        <TextField source="title" />
        <TextField source="description" />
        <DateField source="start_time" showTime />
        <DateField source="end_time" showTime />
        <ReferenceField source="id_room" reference="rooms">
          <TextField source="name" />
        </ReferenceField>
        <EditButton to={`/events/${currentEventId}/sessions/:id/edit`} />
        <DeleteButton mutationMode="pessimistic" />
      </Datagrid>
    </List>
  );
};