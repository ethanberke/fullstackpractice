
DROP TABLE IF EXISTS numbers;


CREATE TABLE numbers (
    id SERIAL PRIMARY KEY,
    number INT NOT NULL
);

INSERT INTO numbers (number) VALUES (1), (2), (3), (4), (5), (12345);