import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const programa = sequelize.define( "Programa", {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true

    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,   
    },
    paradigm: {
        allowNull: false,
        type: DataTypes.ENUM("orientado a obj", "funcional", "otro"),
    },
    release_year:{
        type:DataTypes.INTEGER,
    }
}
);