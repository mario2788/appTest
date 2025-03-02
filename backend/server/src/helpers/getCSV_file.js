

const fs = require('fs');
const readline = require('readline');


const getCSV_file = async( csvFilePath, callBack ) => {

    const header = [];
    const data = [];

    const readStream = fs.createReadStream(csvFilePath);
    const readInterface = readline.createInterface({
        input: readStream,
    });

    readInterface.on('line', (line) => {

        const row = line.split(',');

        if (header.length === 0) {
            header.push(...row);
        } else {
            const obj = {};
            row.forEach((value, index) => {
            obj[header[index]] = value;
            });
            data.push(obj);
        }
    });

    readInterface.on('close', () => {

        let time = [], dataColunm = []

        data.forEach( obj => {  
            let dta = Object.entries( obj ) 
            time.push( dta[1][1])
            dataColunm.push( dta[2][1]) 
        });

        const result = {
            time,
            dataColunm
        }

        callBack( result );
    });

}


module.exports = {
    getCSV_file
} 