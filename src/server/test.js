const fs = require('fs');

// 從 assets/test.txt 把 boss 資料讀出來
var bossData;
fs.readFile(__dirname + '/../assets/normalRaidBoss.txt', 'utf-8', (err, data) => {
    if(err){
        throw err;
    }
    bossData = data;
    // console.log(bossData)
    console.log(JSON.parse(bossData));
})