import { Model, DataTypes, Sequelize } from 'sequelize';

class User extends Model {
    public id!: string;
    public email!: string;
    public name!: string;
    public lastName!: string;
    public password!: string;
    public status!: string;
    public role!: string;
}

const initUserModel = (sequelize: Sequelize) => {
    User.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },

            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },

            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },

            lastName: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            password: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },

            status: {
                type: DataTypes.ENUM('pending', 'active', 'blocked'),
                defaultValue: 'pending',
                allowNull: false,
            },

            role: {
                type: DataTypes.ENUM('user', 'admin', 'creator'),
                defaultValue: 'user',
                allowNull: false,
            },
        },
        {
            sequelize,
            timestamps: true,
            modelName: 'User',
            tableName: 'users',
        }
    );
};

export { User, initUserModel };
