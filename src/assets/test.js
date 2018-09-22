const fs = require('fs');

const bossNames = [{title: "Lv75 シュヴァリエ・マグナ"}, {title: "Lv120 シヴァ"}];
const jsonData = JSON.stringify(bossNames);

console.log(jsonData);
fs.writeFile(`${__dirname}/test.txt`, jsonData, function(err) {
    if (err) {
        console.log(err);
    }
});