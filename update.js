var fs = require('fs');
var Buffer = require('buffer').Buffer;

const RAW = "raw_gfwlist.txt";
const TARGET_TXT = "gfwlist.txt";
const TARGET_JS = "gfwlist.js";

fs.readFile(RAW, 'utf8', function(err, data) {
    if (err) throw err;
    var buf = new Buffer(data, 'utf8');
    fs.writeFile(TARGET_TXT, buf.toString('base64'), 'utf8', (err) => {
        if (err) throw err;
        console.log('Updated gfwlist.txt');
    });
});

function isValidRule(line) {
    if (line === '' || line.indexOf('[A') === 0 || line.indexOf('!') === 0) {
        return false;
    } else {
        return true;
    }
}

fs.readFile(RAW, 'utf8', function(err, data) {
    if (err) {
        return console.log(err);
    }
    var rules = [];
    data.split("\n").forEach(function(line) {
        if (isValidRule(line)) {
            rules.push(line);
        }
    });
    fs.readFile(TARGET_JS, 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        var rulesStr = 'var rules = [\n"' + rules.join('",\n"') + '"\n];';
        var result = data.replace(/var rules = [\s\S]*;/gm, rulesStr);
        fs.writeFile(TARGET_JS, result, 'utf8', function(err) {
            if (err) return console.log(err);
            console.log("Updated gfwlist.js");
        });
    });
});
