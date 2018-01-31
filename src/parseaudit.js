var parse = require('csv-parse');
var _ = require("lodash");
var json = require("format-json")
var fs = require("fs")
var moment = require("moment")
var parser = parse({delimiter: ',',columns :true}, function(err, data){
    if (err) throw err

    var lines = []

    data.forEach(line => {
        line.AuditData  = JSON.parse(line.AuditData)
        lines.push(line)
    });

    var sortedLines = _.sortBy(data,[function(o) { return o.AuditData.CreationTime; }])

    sortedLines.forEach(line => {
        var mailbox = line.AuditData.MailboxOwnerUPN 
        var dt = moment(line.AuditData.CreationTime).toLocaleString()
        //var action 
        var operations = line.AuditData.Operation

        if (line.AuditData.Item){
            var subject = line.AuditData.Item.Subject
            var path = line.AuditData.Item.ParentFolder.Path
            console.log(dt,mailbox,operations,path,subject)
        }else
        {
            console.log(dt,mailbox,operations)
            
        }
           
    });



    
});

fs.createReadStream(__dirname+'/AuditLog_2018-01-23_2018-01-31.csv',{encoding:'UTF8'}).pipe(parser);