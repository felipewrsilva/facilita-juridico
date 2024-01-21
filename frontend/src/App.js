import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [clients, setClients] = useState([]);
    const [newClient, setNewClient] = useState({ name: '', email: '', phone: '' });

    // Function to fetch clients from the backend
    const fetchClients = async () => {
        try {
            const response = await axios.get('http://localhost:3001/clients');
            setClients(response.data);
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    };

    // Function to handle form input changes
    const handleInputChange = (e) => {
        setNewClient({ ...newClient, [e.target.name]: e.target.value });
    };

    // Function to submit new client
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/clients', newClient);
            fetchClients(); // Refresh the client list
            setNewClient({ name: '', email: '', phone: '' }); // Reset form
        } catch (error) {
            console.error('Error adding client:', error);
        }
    };

    // Fetch clients on component mount
    useEffect(() => {
        fetchClients();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Client Management System</h1>
            </header>

            <div className="client-form">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={newClient.name}
                        onChange={handleInputChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={newClient.email}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={newClient.phone}
                        onChange={handleInputChange}
                    />
                    <button type="submit">Add Client</button>
                </form>
            </div>

            <div className="client-list">
                <h2>Clients</h2>
                <ul>
                    {clients.map(client => (
                        <li key={client.id}>
                            {client.name} - {client.email} - {client.phone}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
