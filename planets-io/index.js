import { parse } from "csv-parse";
import fs from "fs";


const results = [];

/**
 * @param {{koi_disposition:string}} planet
 */
function isHabitablePlanet(planet) {
    return planet.koi_disposition === 'CONFIRMED';
}

fs.createReadStream('kepler_data.csv')
    .pipe(parse({
        comment: '#',
        columns: true,
    }))  //returns a stream as a result
    .on('data', (data) => {
        results.push(data);
    })
    .on('error', (error) => { console.log(error) })
    .on('end', () => {
        console.log('Completed reading file. Contents below:');
        console.log(results);
    })