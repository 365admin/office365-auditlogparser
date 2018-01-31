var parse = require('csv-parse');
var _ = require("lodash");
var json = require("format-json")
var fs = require("fs")
var moment = require("moment")


module.exports.parse = function (filename,cb){
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
            switch (operations) {
                case "SoftDelete":
                    line.AuditData.AffectedItems.forEach(item => {
                        var subject = item.Subject
                        var path = item.ParentFolder.Path
                        console.log(dt,mailbox,operations,path,subject)
                                    
                    });
                    break;
                case "HardDelete":
                    line.AuditData.AffectedItems.forEach(item => {
                        var subject = item.Subject
                        var path = item.ParentFolder.Path
                        console.log(dt,mailbox,operations,path,subject)
                                    
                    });
                    break;
            
                default:
                    console.log(dt,mailbox,operations)
                    break;
            }
            
            
        }
           
    });
    cb(null,sortedLines)


    
});

fs.createReadStream(filename,{encoding:'UTF8'}).pipe(parser);

}