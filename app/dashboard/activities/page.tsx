"use client";

import { useState, useEffect } from "react";

export default function ActivitiesPage(){

    type Activity = {
        IdActivities: number,
        IdUser: number,
        IdClass: number,
        ActivitieType: string,
        ActivitieTitle: string,
        ActivitieDescription: string
    }

    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    async function fetchActivities(){

        try{

            const r = await fetch("http://localhost:3001/api/activities");

            if(!r.ok){
                throw new Error("Failed to fetch activities");
            }

            const data = await r.json();

            setActivities(data.data);

        }catch(error){
            console.error(error);
            setError(true);
        }finally{
            setLoading(false);
        }

    }

    useEffect(() => {
        fetchActivities();
    }, []);


    return(
        <div> 
            <h1>Activities</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error fetching activities</p>}
            {activities.length === 0 && !loading && !error && <p>No activities found</p>}
            {!loading && !error && (
                <ul>
                    {activities.map(activity => (
                        <div key={activity.IdActivities}> 
                            <h2>{activity.ActivitieTitle}</h2>
                            <p>{activity.ActivitieDescription}</p>
                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
}