import { Model, DataTypes, CreationOptional } from 'sequelize';
import { sequelize } from './sync-model';
import UserMaster from './UserMaster';


class UserTokenMaster extends Model {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare token: string;
  declare type: number;
  declare isActive: CreationOptional<boolean>;
  declare userMaster?: CreationOptional<UserMaster[]>;
}

UserTokenMaster.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    references: {
      model: UserMaster,
      key: 'id',
    }
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
  sequelize,
  modelName: 'UserTokenMaster',
  freezeTableName: true,
  // paranoid: true, // Enable "soft deletes" for this model.
  defaultScope: {
    where: { isActive: true }
  },
  hooks: {
    // TODO;
  },
});

export default UserTokenMaster;
