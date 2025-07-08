import express, { Express, Request, Response } from 'express';
import DbConnect from './database/db_connect';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();

const dbConnect = new DbConnect();

const port = process.env.APP_PORT || 3000;

class App {
    private app: Express;

    constructor() {
        this.app = express();
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(cors());
    }

    public init = async () => {
        try {
            this.app.listen(port, () => {
                console.log(`\nServer is started on ${port}\n----------------------------------\n`);
            });

            this.app.get('/', (req: Request, res: Response) => {
                res.send(`Server is running on port ${port}`);
            });

            dbConnect.connect();
        } catch (error) {
            const err = error as Error;
            console.error(`\n${err.message}\n----------------------------------\n`);
        }
    };
}

const app = new App();

app.init();
