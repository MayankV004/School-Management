import database from "../config/database.js"
import { calcDistance } from "../utils/geoDistance.js";

// add school

export const addSchool = async(name , address , latitude , longitude)=>{
    try {
        const [row] = await database.query(`INSERT INTO schools (name , address, latitude , longitude ) VALUES (? , ? , ? , ?)`, [name , address , latitude , longitude]);

        return row.insertId;
    }catch(error)
    {
        console.error("Error adding school: ", error);
        throw error;
    }
};

export const listSchools = async(userLat , userlong) =>{
    try {
        const [schools] = await database.query(`SELECT * FROM schools`);
        // now calcuating distance of user from School and Sorting them in ascending Order
        const list = schools.map(school => ({...school , distance: calcDistance(userLat , userlong , school.latitude , school.longitude) })).sort((a,b)=> a.distance - b.distance);

        return list;
    } catch (error) {
        console.error("Error in Listing Schools - ", error )  
        throw error; 
    }
};