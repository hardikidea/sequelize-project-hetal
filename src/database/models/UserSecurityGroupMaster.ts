import { Model, DataTypes, CreationOptional } from 'sequelize';
import { sequelize } from './sync-model';

class UserSecurityGroupMaster extends Model {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare securityGroupId: number;
  declare isActive: CreationOptional<boolean>;
}

UserSecurityGroupMaster.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  securityGroupId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // unique: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
  sequelize,
  modelName: 'UserSecurityGroupMaster',
  freezeTableName: true,
});

export default UserSecurityGroupMaster;
