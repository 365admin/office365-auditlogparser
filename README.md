> Parse CSV file


## Install

```
$ npm install --save @365admin/office365-auditlogparser
```


## How to enable audit logging
[Search the audit log in the Office 365 Security & Compliance Center](https://support.office.com/en-us/article/Search-the-audit-log-in-the-Office-365-Security-Compliance-Center-0d4d0f35-390b-4518-800e-0c7ec95e946c)

## Usage
Parse CSV data in this format

    CreationDate,UserIds,Operations,AuditData
[Detailed properties](https://support.office.com/en-us/article/detailed-properties-in-the-office-365-audit-log-ce004100-9e7f-443e-942b-9b04098fcfc3)


```js
parser = require("@365admin/office365-auditlogparser")
parser.parse(__dirname+'/sampleauditlog.csv', function (err,lines){

    if (err) throw err

    console.log(lines)
    process.exit(0)
})

```


## License

MIT © [Niels Gregers Johansen](https://www.hexatown.com)
# 

