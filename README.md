# Teste de Programação Desenvolvedor Facilita Jurídico

This is a simple web application for managing clients. The application consists of a Node.js backend and a React frontend, with data stored in a PostgreSQL database.

## Prerequisites

Before you begin, ensure you have installed:

- [Docker](https://docs.docker.com/get-docker/)

## Getting Started

To get the application running, follow these steps:

1. Clone the Repository

```
git clone https://github.com/felipewrsilva/facilita-juridico.git
cd facilita-juridico
```

2. Build and Run with Docker
```bash
docker-compose up --build
```

3. Access the Application
- The Node.js backend will be accessible at http://localhost:3000.
- The React frontend will be available at http://localhost:3001.

## Using the Application
- **List Clients**: Navigate to the main page to view all clients.
- **Add New Client**: Use the form provided on the main page to add new clients.

## Shutting Down
To stop and remove the containers, networks, and volumes:

```docker-compose down```
