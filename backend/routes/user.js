const fs = require('fs');
const path = require('path');

function getUser(req, res) {
  const body = req.body;

  const file = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../users.json')));
  const user = file[body.name] ? { name: body.name, pwd: file[body.name] } : {};

  res.json(user);
}

function addUser(req, res) {
  const body = req.body;

  const file = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../users.json')));
  file[body.name] = body.pwd;

  fs.writeFileSync(path.resolve(__dirname, '../users.json'), JSON.stringify(file));

  res.json(body);
}

function deleteUser(req, res) {
  const body = req.body;

  const file = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../users.json')));
  delete file[body.name];

  fs.writeFileSync(path.resolve(__dirname, '../users.json'), JSON.stringify(file));

  res.json(body);
}

module.exports = {
  getUser,
  addUser,
  deleteUser
}