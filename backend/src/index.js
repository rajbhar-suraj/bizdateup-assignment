const express = require('express')
require('dotenv').config();
const cors = require('cors')
const path = require('path')
const todoRouter = require('./routes/todos.route')

const app = express()
app.use(express.json());
const corsOptions = {
  origin: ["https://bizdateup-todos.onrender.com", "http://localhost:5173"],
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); 

app.use('/api', todoRouter);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.get(/.*/, (_, res) =>
  res.sendFile(path.resolve(__dirname, "../../frontend/dist/index.html"))
);


app.get('/', (req, res) => {
  res.json({ message: "Test route is working" });
});

const PORT = process.env.PORT;
app.listen(PORT,()=>console.log(`Server is running on PORT: ${PORT}`))