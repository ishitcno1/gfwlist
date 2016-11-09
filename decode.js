var fs = require('fs')
var Buffer = require('buffer').Buffer;

const RAW = "raw_gfwlist.txt";
const TARGET_TXT = "gfwlist.txt";

fs.readFile(TARGET_TXT, 'utf8', function(err, data) {
    if (err) {
        return console.log(err);
    }
    var buf = new Buffer(data, 'base64');
    fs.writeFile(RAW, buf, (err) => {
        if (err) throw err;
        console.log('Decoded');
    });
});
