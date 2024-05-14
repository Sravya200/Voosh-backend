const pool = require('../db');

const User = {};

User.findByUsername = async (username) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0];
};

User.create = async (username, email, password) => {
  await pool.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
};

module.exports = User;
