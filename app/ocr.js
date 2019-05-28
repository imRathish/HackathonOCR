var Tesseract = require('tesseract.js')
var request = require('request')
var fs = require('fs')
var url = 'http://tesseract.projectnaptha.com/img/eng_bw.png'
var filename = 'pic.png'

var writeFile = fs.createWriteStream(filename)
let inputJSON = [
  {
    fieldName : 'mild',
    fieldLabel : 'Employee Name',
    fieldValue : '',
    coordinates : { x0: 17, y0: 17, x1: 182, y1: 95 }
  },
  {
    fieldName : 'eye',
    fieldLabel : 'Employee ID',
    fieldValue : '',
    coordinates : { x0: 408, y0: 271, x1: 522, y1: 335 }

  },
  {
    fieldName : 'cloud',
    fieldLabel : 'Salay',
    fieldValue : '',
    coordinates : { x0: 1255, y0: 484, x1: 1448, y1: 563 }

  }
];
let outputJSON = inputJSON.slice();
request(url).pipe(writeFile).on('close', function() {
  console.log(url, 'saved to', filename)
  Tesseract.recognize(filename)
    .progress(function  (p) { console.log('progress', p)  })
    .catch(err => console.error(err))
    .then(function (result) {
      wordsArray = result.words;
      console.log(result.words[0].text);
      console.log(result.words[0].bbox);
      for(let i=0;i<wordsArray.length;i++){
        for(let j=0;j<inputJSON.length;j++){
          let xL = inputJSON[j].coordinates.x0;
          let yL = inputJSON[j].coordinates.y0;
          let xR = inputJSON[j].coordinates.x1;
          let yR = inputJSON[j].coordinates.y1;
        //  console.log("before if")
        console.log(wordsArray[i].text+"\n"+wordsArray[i].bbox['x0'] +" "+xL +"\n"+ wordsArray[i].bbox['y0']+" "+yL+"\n"+ wordsArray[i].bbox['x1']+" " +xR +"\n"+ wordsArray[i].bbox['y1']+" "+yR);

          if(wordsArray[i].bbox['x0']>=xL && wordsArray[i].bbox['y0']>=yL && wordsArray[i].bbox['x1']<=xR && wordsArray[i].bbox['y1']<=yR){
            outputJSON[j].fieldValue = wordsArray[i].text
            break;
            
          }
        }
       
      }
     console.log(outputJSON);
      
      process.exit(0)
    })
});