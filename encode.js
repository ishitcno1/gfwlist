var fs = require('fs');
var Buffer = require('buffer').Buffer;

fs.readFile('raw_gfwlist.txt', 'utf8', function(err, data) {
    if (err) throw err;
    var buf = new Buffer(data, 'utf8');
    fs.writeFile('gfwlist.txt', buf.toString('base64'), 'utf8', (err) => {
        if (err) throw err;
        console.log('Encoded!');
        fs.unlink('raw_gfwlist.txt', (err) => {
            if (err) throw err;
            console.log('Deleted raw file.');
        });
    });
});
