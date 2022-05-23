const fs = require('fs');
const path = require('path');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));
fs.writeFile(path.join(__dirname, 'text.txt'), ' ',
  (err) => {
  if (err) throw err;
  console.log('Write text, please');
}
);
readline.on('line', data => {
    writeStream.write(`${data}\n`, err => {
      if (err) throw err;
    });
    if (data.trim() === 'exit') {
    readline.close();
  }
});


process.on('exit', code => {
  if (code === 0) {
    console.log('\nThanks for your attention!');
  } else {
    console.log(`Error with ${code}`);
  }
});
readline.on('close', () => {
  process.exit();
});
process.on('SIGINT', () => {
  process.exit();
});