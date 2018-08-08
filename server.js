const path = require('path');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { passwordStorageFile, env, secret, port, loginDuration } = require('./server.config');
const hash = require(passwordStorageFile);

const app = express();

app.use(cors());
app.use(bodyParser.json());

if (env === 'production') {
  app.use(express.static(path.resolve(__dirname, 'build')));
  
  app.get('*', (request, response) => {
    return response.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

app.post('/login', (request, response) => {
  const { password } = request.body;

  if (!password || password.trim() === '') {
    return response.send({
      status: false,
    });
  }

  bcrypt.compare(password, hash.value, (error, same) => {
    if (error) {
      return response.json({
        status: false,
      });
    }
    let token = null;

    if (same) {
      token = generateToken();
    }

    return response.json({
      status: same,
      token,
    });
  })
  
});


app.post('/verify', (request, response) => {
  const { token } = request.body;

  if (!token || token.trim() === '') {
    return response.send({
      status: false,
      token: null,
    });
  }


  jwt.verify(token, secret, (error, decoded) => {
    if (error) {
      return response.send({
        status: false,
        token: null,
      });
    }
    
    return response.send({
      status: true,
      token: generateToken(),
    });
  });
  
});

function generateToken() {
  return jwt.sign({
    exp: Math.floor(Date.now() / 1000) + loginDuration,
  }, secret);
}

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
