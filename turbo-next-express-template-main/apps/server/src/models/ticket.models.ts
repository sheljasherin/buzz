import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../helpers/sequelize';

export interface ITicket {
  id: number;
  name: string;
  email: string;
  phone: string;
  event_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface TicketCreationAttributes extends Optional<ITicket, 'id'> {}

export class TicketModel extends Model<ITicket, TicketCreationAttributes> implements ITicket {
  public id!: number;
  public name!: string;
  public email!: string;
  public phone!: string;
  public event_id!: number;
  public created_at!: Date;
  public updated_at!: Date;
}

TicketModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    event_id: DataTypes.INTEGER,
    created_at: {
      type: DataTypes.DATE,
      field: 'createdAt',
    },
    updated_at: {
      type: DataTypes.DATE,
      field: 'updatedAt',
    },
  },
  {
    sequelize,
    tableName: 'ticket_bookings',
    timestamps: true,
    underscored: true,
  }
);
