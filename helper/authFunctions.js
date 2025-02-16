const crypto = require('crypto')

// Function to hash the password
exports.hashPassword = (password) => {
  // Generate a random salt
  const salt = crypto.randomBytes(16).toString('hex');

  // Hash the password with the salt using PBKDF2
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

  return { salt, hash };
}

// Function to validate the password
exports.validatePassword  = (password,salt , hash) => {
  const hashToValidate = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === hashToValidate;
}

// Example usage
// const password = 'mySecretPassword';
// const { salt, hash } = hashPassword(password);
// console.log(`Password: ${password}`);
// console.log(`Salt: ${salt}`);
// console.log(`Hash: ${hash}`);

// // Validate the password
// const isValid = validatePassword(password, salt, hash);
// console.log(`Is password valid? ${isValid}`);
