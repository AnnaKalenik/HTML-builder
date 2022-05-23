const fs = require('fs');
const path = require('path');

fs.createWriteStream(
  path.join(__dirname, 'text.txt'),
  err => {
    if (err) throw err;
  }
);

const { stdin, stdout } = process;

stdout.write('Hello! Input any text, please.\n');

stdin.on('data', data => {
  const dataToString = data.toString();
  
  if (dataToString.trim() === 'exit') {
    stdout.write('You have completed the input process. Goodbye!');
    process.exit();
  }

  fs.appendFile(
    path.join(__dirname, 'text.txt'),
    data,
    err => {
      if (err) throw err;
    }
  );
});

process.on('SIGINT', () => {
  stdout.write('You have completed the input process. Goodbye!');
  process.exit();
});