"use client";

import { useState, useEffect } from "react";

export default function DashboardPage(){
   
    type Classe = {
        IdClass : number,
        ClassPeriod: number,
        ClasCurso: number,
        IdUser: number
    }

    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false); 
    const [ classes, setClass ] = useState<Classe[]>([])

    async function featchClasse(){
        try{

            const r  = await fetch("")

            if(!r.ok){
                throw new Error("Failed to fetch classes");
            }

            const data = await r.json();
            setClass(data.data);

        }catch(error){
            console.error(error);
            setError(true);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        featchClasse();
    })
   
    return(

    )
}