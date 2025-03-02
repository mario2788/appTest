const fs = require('fs');


const getJSON_file = (file) => {

     if( !fs.existsSync(file) ){
          return null
     }

     const data = fs.readFileSync( file, { encoding: 'utf-8' });

     if( file.indexOf( '.json') > -1){
          return JSON.parse( data )
     }else{
          return data
     }
};


module.exports = {
     getJSON_file
};
