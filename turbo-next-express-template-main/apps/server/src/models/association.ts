import { EventModel } from './event.model';
import { TicketModel } from './ticket.models';

export const applyAssociations = () => {
  EventModel.hasMany(TicketModel, {
    foreignKey: 'event_id',
    as: 'tickets',
  });

  TicketModel.belongsTo(EventModel, {
    foreignKey: 'event_id',
    as: 'event',
  });
};
