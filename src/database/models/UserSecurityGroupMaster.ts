import { Model, DataTypes, CreationOptional } from 'sequelize';
import { sequelize } from './sync-model';
import UserMaster from './UserMaster';
import SecurityGroupMaster from './SecurityGroupMaster';

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
    references: {
      model: UserMaster,
      key: 'id',
    }
  },
  securityGroupId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: SecurityGroupMaster,
      key: 'id',
    }
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

UserSecurityGroupMaster.belongsTo(UserMaster, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
UserSecurityGroupMaster.belongsTo(SecurityGroupMaster, { foreignKey: 'securityGroupId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

export default UserSecurityGroupMaster;
