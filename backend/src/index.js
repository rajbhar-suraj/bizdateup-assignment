const express = require('express')
require('dotenv').config();
const cors = require('cors')
const path = require('path')
const todoRouter = require('./routes/todos.route')

const app = express()
app.use(express.json());

app.use(cors({
    origin:["http://localhost:5173"]
}));

app.use('/api', todoRouter);

const frontendPath = path.join(__dirname, "../../frontend/dist");

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(frontendPath))

    app.get(/^\/(?!api).*/, (req, res) => {
        res.sendFile(path.join(frontendPath, 'index.html'))
    })
}


app.get('/', (req, res) => {
  res.json({ message: "Test route is working" });
});

const PORT = process.env.PORT;
app.listen(PORT,()=>console.log(`Server is running on PORT: ${PORT}`))