import { User } from '../../database/models/User';
import { Request, Response, NextFunction } from 'express';
import { constMessages } from '../../constants/constMessages';
import bcrypt from 'bcrypt';

export const createNewUser = async (req: Request, res: Response) => {
    const { email, name, lastName, password } = req.body;

    try {
        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) {
            console.log('\nExisting email\n----------------------------------\n');

            return res.status(409).json({ message: constMessages.user.exists });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await User.create({
            email,
            name,
            lastName,
            password: hashedPassword,
        });

        console.log('\nUser has been created\n----------------------------------\n');

        return res.status(201).json({
            message: constMessages.user.created,
            user: {
                id: user.id,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
            },
        });
    } catch (error) {
        const err = error as Error;

        console.error(
            `\nUser creating error: ${err.message}`,
            '\n--------------------------------------------------------------------\n'
        );

        return res.status(500).json({ message: constMessages.server.serverError });
    }
};
