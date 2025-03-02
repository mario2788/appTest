const fs = require('fs');

const saveFile = ( namefile, data ) => {
     fs.writeFileSync( namefile, JSON.stringify( data, null, 2 ) ) ;
};

module.exports = {
     saveFile
}
