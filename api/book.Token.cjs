const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key'; // Remplacez ceci par une clé secrète unique pour votre application

function generateTemporaryToken(hours) {
  const payload = {};
  const options = { expiresIn: `${hours}m` };
  return jwt.sign(payload, secretKey, options);
}

module.exports = generateTemporaryToken;