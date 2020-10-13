DROP TABLE IF EXISTS kmoms;
CREATE TABLE IF NOT EXISTS kmoms (
    kmom VARCHAR(20) NOT NULL,
    content text NOT NULL
);

DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    UNIQUE(email)
);
