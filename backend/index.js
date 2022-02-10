const express = require("express");
const { getUser, addUser, deleteUser } = require("./routes/user.js");
const cors = require('cors');

const port = 3001;

const app = express();
app.use(express.json());
app.use(cors());

app.post('/user/add', addUser);
app.post('/user/get', getUser);
app.delete('/user', deleteUser);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})