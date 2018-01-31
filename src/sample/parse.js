parser = require("../..")

parser.parse(__dirname+'/sampleauditlog.csv', function (err,lines){

    if (err) throw err

    console.log(lines)
    process.exit(0)
})
