import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Name is required" }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: { msg: "Must be a valid email" }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  verified_at: {
    type: DataTypes.DATE,
    defaultValue: null
  },
  refresh_token: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true,     // adds created_at & updated_at
  paranoid: true,       // adds deleted_at (soft delete)
  underscored: true,    // snake_case columns
  tableName: "users"
});

export default User;