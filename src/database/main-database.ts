import { sequelize } from './connect-database';
import { User, initUserModel } from './models/User';

export const initDatabase = () => {
    try {
        initUserModel(sequelize);
        console.log('\nThe database has been initialized.\n----------------------------------\n');
    } catch (error) {
        const err = error as Error;
        console.error(
            `\nThe database is't initialized: ${err.message}`,
            '\n--------------------------------------------------------------------\n'
        );
    }
};
