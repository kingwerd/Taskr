const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const verifyToken = require('./backend/security/verify-token');
const path = require('path');
const app = express();

const PORT = 8000;

// app.use(express.static(path.join(__dirname, "./client/public")));
app.use(bodyParser.json());

app.use(cors());

require("./backend/config/mongoose")('taskr');


const auth = require('./backend/routes/auth.routes');
app.use('/api/auth', auth);
const user = require('./backend/routes/user.routes');
app.use('/api/user', verifyToken, user);
const task = require('./backend/routes/task.routes');
app.use('/api/task', verifyToken, task);
const category = require('./backend/routes/category.routes');
app.use('/api/category', verifyToken, category);

// app.all('*', (req, res, next) => {
//     res.sendFile(path.resolve('./client/public/index.html'));
// });

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});