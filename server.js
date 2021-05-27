import express from "express"
import bodyParser from "body-parser"
import userRouter from "./routers/userRouter"
import authRouter from "./routers/authRouter"
import postRouter from "./routers/postRouter"
import categoryRouter from "./routers/categoryRouter"
import tagRouter from "./routers/tagRouter"

const app = express()

const port = 3002

const db = require('./config/dbConnect');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

db.sequelize.sync();

app.get("/", (req, res) =>{
  res.send("Hello world")
})

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);
app.use('/api/category', categoryRouter);
app.use('/api/tag', tagRouter)

app.listen(port, () =>{
  console.log("Test", port)
})