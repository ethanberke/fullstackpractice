import express from "express";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { PORT, DATABASE_URL } = process.env

const client = new pg.Client({
    connectionString: DATABASE_URL,
})

await client.connect();

const app = express ();

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
        res.json(`Whats up mang`);
    });

app.get("/numbers", (req, res) => {
    client.query("SELECT * FROM numbers").then((result) => {
        res.json(result.rows);
    })
});

app.get("/numbers/:id", (req, res) => {
    const id = req.params.id;
    client.query(
        `SELECT * FROM numbers WHERE id = $1`,
        [id]
    ).then((data) => {
        if (data.rows.length === 0) {
            res.sendStatus(404);
        }
        res.json(data.rows[0]);
    }).catch((err) => {
        console.error(err);
        res.sendStatus(500);
    })
})

app.post("/numbers", (req, res) => {
    const { number } = req.body;
    client
    .query(
        `INSERT INTO numbers (number) VALUES ($1) RETURNING *`,
    [number]
    )
    .then(result => {
        res.json(result.rows[0]);
    })
    .catch((error) => {
        console.error("Error generating new number", error)
        res.status(500).json({error: "Internal server error"});
    })
});

app.delete("/numbers/:id", (req, res) => {
    const { id } = req.params;
  
    client.query("DELETE FROM numbers WHERE id = $1", [id]).then(() => {
      res.sendStatus(204);
    });
  });

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})