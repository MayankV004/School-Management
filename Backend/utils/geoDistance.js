export const calcDistance = (lat1, long1 , lat2 , long2) =>{
    const R = 6371;

    const toRadians = (degree) => degree * (Math.PI / 180);

    const degreeLat = toRadians(lat2 - lat1);
    const degreeLong = toRadians(long2 - long1);

    //Use Haversine Formula for calculation of Distance
    const a =
    Math.sin(degreeLat / 2) * Math.sin(degreeLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
    Math.sin(degreeLong/2) * Math.sin(degreeLong/2);

    const c = 2 * Math.atan2(Math.sqrt(a) , Math.sin(1-a));

    return R * c;
}