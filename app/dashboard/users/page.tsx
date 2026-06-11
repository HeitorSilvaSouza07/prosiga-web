"use client";

import { useState, useEffect } from "react";

export default function UserPage() {

    type User = {
        IdUser: number,
        UserName: string,
        UserCpf: string,
        UseAdmin: boolean
    }

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    async function fetchUsers() {
        try {
            const r = await fetch("http://localhost:3001/api/users");

            if (!r.ok) {
                throw new Error("Failed to fetch users");
            }

            const data = await r.json();

            setUsers(data.data);
            setError(false);

        } catch (error) {
            console.error(error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Users</h1>

            {loading && <p>Loading...</p>}

            {error && <p>Error fetching users</p>}

            {!loading && !error && (
                <ul>
                    {users.map(user => (
                        <div key={user.IdUser}>
                            <p>Name: {user.UserName}</p>
                            <p>CPF: {user.UserCpf}</p>
                            <p>Admin: {user.UseAdmin == true ? <div className='bg-green-500 text-white w-5 h-5 rounded-2xl'></div> : <div className='bg-red-500 text-white w-5 h-5 rounded-2xl'></div>}</p>
                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
}