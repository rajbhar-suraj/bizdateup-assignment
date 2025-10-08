const express = require('express')
require('dotenv').config();
const cors = require('cors')
const todoRouter = require('./routes/todos.route')

const app = express()
app.use(express.json())
app.use(cors({
    origin:"*"
}))

app.use('/api',todoRouter)

app.get('/',(req,res)=>{
    res.json({
        message:"Test route is working"
    })
})

const PORT = process.env.PORT;
app.listen(PORT,()=>console.log(`Server is running on PORT: ${PORT}`))