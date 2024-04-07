import { Model, DataTypes, CreationOptional } from 'sequelize';
import { sequelize } from './sync-model';

class UserMaster extends Model {
  declare id: CreationOptional<number>; // Marks `id` as optional in creation because it's auto-incremented
  declare email: string;
  declare password: string;
  declare isActive: CreationOptional<boolean>; // Marks `isActive` as optional in creation because it has a default value
}

UserMaster.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  },
  password: {
    type: DataTypes.STRING,
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
  modelName: 'UserMaster',
  freezeTableName: true,
  // paranoid: true, // Enable "soft deletes" for this model.
  defaultScope: {
    attributes: { exclude: ['password'] },
    where: { isActive: true }
  }
});

export default UserMaster;
