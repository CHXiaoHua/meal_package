require('dotenv').config();
var config = {
    service: process.env.emailService, 
  secureConnection: true,
    auth: {
        user: process.env.emailUser, 
        pass: process.env.emailPass 
    }
}

module.exports = config;