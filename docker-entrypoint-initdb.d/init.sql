-- Create the 'clients' table
CREATE TABLE clients
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    x_coordinate INTEGER,
    y_coordinate INTEGER,
    created_at TIMESTAMP DEFAULT current_timestamp
);
