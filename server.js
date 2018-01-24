
var node_xj = require("xls-to-json"),
 mongoose = require('mongoose'),
 TargetCompany = require('./model/targetcompany.server.model');
 Deal = require('./model/deal.server.model');

let dataSheet = null;
let mappingSheet = null;

(function(){
  mongoose.Promise = Promise;
  mongoose.connect("mongodb://ds143907.mlab.com:43907/chabiodev",{ user: 'admin',pass: 'admin'});
  mongoose.connection.on("error", console.error.bind(console, "An error ocurred with the DB connection: "));
})();

let readDataSheet = new Promise((resolve,reject) => {
    node_xj({
      input: "test.xlsx",  // input xls
      output: "output.json", // output json
      sheet: "Sheet1"  // specific sheetname
    }, function(err, result) {
      if(err) {
        console.error(err);
      } else {
        console.log(result[0]);
        dataSheet = result;
        resolve('Data Sheet1 Reading finished.');
      }
    });
})

let readMappingSheet = new Promise((resolve,reject) => {
    node_xj({
      input: "test.xlsx",  // input xls
      output: "mapping.json", // output json
      sheet: "Sheet2"  // specific sheetname
    }, function(err, mappings) {
      if(err) {
        console.error(err);
      } else {
        mappings.forEach(function(mapping,index){
          mapping["Attribute Name"] =  mapping["Attribute Name"].split(',').map(function(elm){
          elm = elm.replace(/[\r\n]/g, '');
            return elm;
          });
          mapping["Column Name"] =  mapping["Column Name"].split(',').map(function(elm){
          elm = elm.replace(/[\r\n]/g, '');
            return elm;
          });
        });
        mappingSheet = mappings;
       resolve('Mapping Sheet2 Reading finished.');
      }
    });
})

function main(){
  Promise.all([readDataSheet,readMappingSheet]).then(result => {
    
     mappingSheet.forEach(mapping =>{
        
        dataSheet.forEach(row =>{
          var persist = {};
          for(column in row){
            var index = mapping["Attribute Name"].indexOf(column);
            if(index != -1){
              persist[mapping["Column Name"][index]] = row[column];
            }
          }

          switch(mapping["Collection Name"]){
            case 'deal': 
                var d= new Deal(persist);
                d.save((err, saved) => {
                  err ? console.log(err) :   console.log(saved);
                });
                break;
            case 'targetcompany': 
                var d= new TargetCompany(persist);
                d.save((err, saved) => { 
                  err ? console.log(err) :   console.log(saved); 
                });
                break;    
            default:
              console.log('one..');
          }

        })
     })
  });
}

main(); 



  



