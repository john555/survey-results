const path = require('path');
const bcrypt = require('bcrypt');
const fs = require('fs');

const { passwordStorageFile } = require('./server.config');

const saltRounds = 10;

function generatePassword() {

  if (process.argv.length < 3) {
    throw new Error('You must provide password at the end of the command.');
  }

  const password = process.argv[2];

  if (!password || password === '') {
    throw new Error('You must provide password');
  }

  console.log('\nGenerating hash..... \n');

  bcrypt.genSalt(saltRounds, (error, salt) => {
    if (error) {
      throw error;
    }
  
    bcrypt.hash(password, salt, (error, hash) => {
      if (error) {
        throw error;
      }

      const contents = JSON.stringify({
        value: hash
      });
      fs.writeFileSync(passwordStorageFile, contents, { encoding: 'utf8'});
    });
  });
}

generatePassword();
