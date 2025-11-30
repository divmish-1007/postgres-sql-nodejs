import express from "express";
import { Client } from "pg";
const app = express();
app.use(express.json());
const pgClient = new Client("postgresql://neondb_owner:npg_IOYWng3r0eSm@ep-holy-cell-adbljmol-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require");
pgClient.connect();
app.post('/signup', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;
        const insertQuery = `INSERT INTO users (username, password, email) VALUES('${username}', '${password}', '${email}')`;
        const response = await pgClient.query(insertQuery);
    }
    catch (e) {
        res.json({
            message: "Error while signing up"
        });
    }
});
app.listen(3000);
