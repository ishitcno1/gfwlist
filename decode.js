var fs = require('fs')
var Buffer = require('buffer').Buffer;

fs.readFile('./gfwlist.txt', 'utf8', function(err, data) {
    if (err) {
        return console.log(err);
    }
    var buf = new Buffer(data, 'base64');
    fs.writeFile('raw_gfwlist.txt', buf, (err) => {
        if (err) throw err;
        console.log('Decoded!');
    });
});
