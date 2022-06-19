const fs = require('fs');

function writeDataToFile(file, content) {
    fs.writeFileSync(file, JSON.stringify(content), 'utf-8', (err) => {
        console.log(err)
    })
}

module.exports = {
    writeDataToFile
}