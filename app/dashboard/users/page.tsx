"use client";
import { useState, useEffect } from "react"

export default function UsersPage(){

    const [ users, setUsers ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        async function buscaUsuarios(){
            try{

                const response = await fetch("http://localhost:3001/api/users");

                const data = await response.json();

                setUsers(data);

            }catch(error){
                console.error("Erro ao buscar usuários:", error);
            }finally{
                setLoading(false);
            }
        }
        buscaUsuarios();
    }, []);

    return(
        <div>
            <div>
                {users.map((user) => (
                    <div key={user.UserId}>
                        <h3>{user.UserName}</h3>
                        <p>{user.UserCpf}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}