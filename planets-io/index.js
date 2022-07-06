import { parse } from "csv-parse";
import fs from "fs";


const habitablePlanets = [];

/**
 * @param {
 * {
 * koi_disposition:string,
 * koi_insol:string,
 * koi_prad: string
 * }
 * } planet
 */
function isHabitablePlanet(planet) {
    return planet.koi_disposition === 'CONFIRMED'
        && planet.koi_insol > 0.36 && planet.koi_insol < 1.11
        && planet.koi_prad < 1.6;
}

fs.createReadStream('kepler_data.csv')
    .pipe(parse({
        comment: '#',
        columns: true,
    }))  //returns a stream as a result
    .on('data', (data) => {
        if (isHabitablePlanet(data)) {
            habitablePlanets.push(data);
        }
    })
    .on('error', (error) => { console.log(error) })
    .on('end', () => {
        console.log('Completed reading file. Results below:');
        console.log(`${habitablePlanets.length} habitable planets found!`);
        console.log(habitablePlanets.map((planet) => {
            /** @namespace planet.kepler_name **/
            return planet.kepler_name;
        }))
    })