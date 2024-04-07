import { Model, DataTypes, CreationOptional } from 'sequelize';
import { sequelize } from './sync-model';

class SecurityGroupMaster extends Model {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string;
  declare isActive: CreationOptional<boolean>;
}

SecurityGroupMaster.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
  sequelize,
  modelName: 'SecurityGroupMaster',
  freezeTableName: true,
});

export default SecurityGroupMaster;
