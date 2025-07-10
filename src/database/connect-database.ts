import { Sequelize } from 'sequelize';

import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'mysql',
    logging: false,
});

const databaseConnect = async () => {
    try {
        await sequelize.authenticate();
        console.log(
            '\nSuccessful connection to the database.\n----------------------------------\n'
        );
    } catch (error) {
        const err = error as Error;
        console.error(
            `\nDatabase connection error: ${err.message}`,
            '\n--------------------------------------------------------------------\n'
        );
    }
};

export { sequelize, databaseConnect };
