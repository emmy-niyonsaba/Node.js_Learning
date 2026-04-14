const  fs = require('fs');

fs.readFile('./docs/blog1.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }   
    console.log(data.toString());
});