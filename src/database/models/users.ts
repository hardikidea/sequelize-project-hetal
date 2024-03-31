import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import { sequelize } from './database-model'

// Define the User model
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  // Use CreationOptional for attributes that are optional at creation time
  declare id: CreationOptional<number>
  declare username: string
  declare email: string
  declare password: string

  // Automatically managed timestamps, optionally declared for TypeScript
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

// Initialize the model with attribute definitions and options
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(256),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelize,
    tableName: 'users',
    timestamps: true,
  },
)
