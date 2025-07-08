import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

class DbConnect {
    private sequelize: Sequelize;

    constructor() {
        this.sequelize = new Sequelize({
            database: process.env.DB_NAME,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            dialect: 'mysql',
            logging: false,
        });
    }

    public async connect() {
        try {
            await this.sequelize.authenticate();
            console.log(
                '\nSuccessful connection to the database.\n----------------------------------\n'
            );

            await this.sequelize.sync();
            console.log('\nModel synchronization completed.\n----------------------------------\n');
        } catch (error) {
            const err = error as Error;
            console.error(
                `\nDatabase connection error: ${err.message}`,
                '\n--------------------------------------------------------------------\n'
            );
        }
    }

    public getSuquelize(): Sequelize {
        return this.sequelize;
    }
}

export default DbConnect;
