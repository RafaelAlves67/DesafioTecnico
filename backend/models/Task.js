import { DataTypes } from "sequelize";
import db from "../data/db.js";

const Task = db.define('Task', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false
    },

    status: {
        type: DataTypes.STRING,
        allowNull: false,
        enum: ['Pendente', 'Em progesso', 'Concluída'],
        defaultValue: 'Pendente'
    },
},{ timestamps: true});

export default Task