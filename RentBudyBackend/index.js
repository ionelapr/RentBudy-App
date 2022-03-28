const express = require('express');
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
const cors = require('cors');
const connection = require('./connection');
const app = express();
const userHandler = require('./handlers/Users');
const flatHandler=require('./handlers/Flats');
const userflatHandler=require('./handlers/Userflatbind');
const tasksHandler = require('./handlers/Tasks');
const port = 3600
const router = express.Router({ mergeParams: true });
//list all routes, methods, middleware
const listEndpoints = require("express-list-endpoints");
console.log(listEndpoints(app));

app.use(cors());
app.set('json spaces', 2);
app.get('/', (req, res) => {
  res.send('Hello World!')
});
app.use(express.json());
app.use('/users', cors(corsOptions), userHandler);
app.use('/flats', cors(corsOptions), flatHandler);
app.use('/tasks', cors(corsOptions), tasksHandler);
app.use('/userflat', cors(corsOptions), userflatHandler);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});




// 