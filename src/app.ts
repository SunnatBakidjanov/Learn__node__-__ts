import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { databaseConnect } from './database/connect-database';

dotenv.config();

const port = process.env.APP_PORT || 3000;

class App {
    private app: Express;

    constructor() {
        this.app = express();
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(cors());
    }

    public init = async () => {
        try {
            this.app.listen(port, () => {
                console.log(
                    `\n\nServer is started on ${port}\n----------------------------------\n`
                );
            });

            this.app.get('/', (req: Request, res: Response) => {
                res.send(`Server is running on port ${port}`);
            });

            await databaseConnect();
        } catch (error) {
            const err = error as Error;
            console.error(`\n${err.message}\n----------------------------------\n`);
        }
    };
}

const app = new App();

app.init();
