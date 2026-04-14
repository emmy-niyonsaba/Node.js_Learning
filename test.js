const  fs = require('fs');

const read =()=>{
    fs.readFile('./docs/blog1.txt', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }   
    return data.toString();
});
}
// read()
const write =()=>{
    fs.writeFile('./docs/blog1.txt', 'blog one new text ', (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('File written successfully!');
});
}
// write()