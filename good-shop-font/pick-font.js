// var request = require('request');
const fs = require('fs');
const path = require('path');
const { promises: fsPromises } = require('fs');
const os = require('os');
const process = require('process');
const { exec, spawn } = require('child_process');
var arguments = process.argv.splice(2);

const https = require('https');
let reg = /\S/;
let tailReg = /^\w*\.(js|jsx|ts|tsx|vue|json|css|scss|less|sass|md|mdx)$/;
let timeflag = new Date().getTime();
let lastflag = null;
const filePath = path.resolve('./');
let html = `<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <meta http-equiv="X-UA-Compatible" content="ie=edge" />\n    <title>Document</title>\n    <style>\n      @font-face {\n        font-family: '$$';\n        src: url('./$$.ttf') format('truetype');\n      }\n      body {\n        font-family: '$$';\n      }\n    </style>\n  </head>\n  <body>$2</body>\n</html>`;
// 异步读取文件
let uniqueStr = [];
let fontType = arguments[0] || 'AlibabaPuHuiTi-2-55-Regular';
html = html.replace(/\${2}/gm, fontType);

console.log(arguments);
async function checkIfContainsAsync(filename) {
  try {
    const contents = await fsPromises.readFile(filename, 'utf-8');

    for (let i = 0; i < contents.length; i++) {
      let word = contents[i];

      if (uniqueStr.indexOf(word) == -1 && !!word.match(reg)) {
        uniqueStr.push(word);
      }
      timeflag = new Date().getTime();
    }
  } catch (err) {
    console.log(err);
  }
}

async function fileDisplay(filePath) {
  //根据文件路径读取文件，返回文件列表
  fs.readdir(filePath, function (err, files) {
    if (err) {
      console.warn(err);
      timeflag = new Date().getTime();
    } else {
      //遍历读取到的文件列表
      files.forEach(function (filename) {
        //获取当前文件的绝对路径
        var filedir = path.join(filePath, filename);
        if (filename !== 'node_modules') {
          //根据文件路径获取文件信息，返回一个fs.Stats对象
          fs.stat(filedir, function (eror, stats) {
            if (eror) {
              console.warn('获取文件stats失败', filedir);
              timeflag = new Date().getTime();
            } else {
              var isFile = stats.isFile(); //是文件
              var isDir = stats.isDirectory(); //是文件夹
              if (isFile) {
                if (!!tailReg.exec(filename)) {
                  checkIfContainsAsync(filedir);
                }
              }
              if (isDir) {
                fileDisplay(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
              }
            }
          });
        }
      });
    }
  });
}

fileDisplay(filePath);

const fetchFont = () => {
  return new Promise((resolve) => {
    const file = fs.createWriteStream('./font/' + fontType + '.ttf');
    https.get(`https://static-card.dushu365.com/@npm/font.AlibabaPuHuiTi/${fontType}.ttf`, (res) => {
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    });
  });
};

setInterval(() => {
  if (timeflag == lastflag) {
    uniqueStr.sort();
    console.log('获取字体');
    fetchFont().then(() => {
      html = html.replace('$2', uniqueStr.join(''));

      fs.writeFileSync('./font/index.html', html);
      console.log('字蜘蛛');
      spawn('font-spider', ['./font/*.html']);
      process.exit(0);
    });
  } else {
    lastflag = timeflag;
  }
}, 2000);
