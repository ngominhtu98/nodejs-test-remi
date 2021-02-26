const bcrypt = require('bcryptjs');

const dfPass = bcrypt.hashSync('123123', 10);

module.exports = [
  {
    email: 'admin@gmail.com',
    username: "admin",
    password: dfPass,
    role: 'ADMIN',
  },
  {
    email: 'staff-1@abc.com',
    username: "ketoan",
    password: dfPass,
    role: 'ACCOUNTANT_CP',
  },
  {
    email: 'chef-1@abc.com',
    username: "ketoanbophan",
    password: dfPass,
    role: 'ACCOUNTANT_BR',
  }
];
