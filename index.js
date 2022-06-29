import { fetchData } from "./firestore.js";
import { signin, signout, getauth, create, edit } from "./auth.js";
import express from 'express'
import dotenv from "dotenv"
import cors from "cors"
dotenv.config()

const app = express()
const port = process.env.PORT

app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}))
app.use(express.json())

app.get('/', async (req, res) => {
    console.log("/")
    res.send("Woohoo! Leave API is up and running!")
})

app.get('/fetch/:collection', async (req, res) => {
    console.log("FETCH")
    res.send(await fetchData(req.params.collection))
})

app.post('/login', async (req, res) => {
    console.log("LOGIN")
    await signin(req, res)
})

app.post('/auth', async (req, res) => {
    console.log("AUTH")
    await getauth(req, res)
})

app.post('/logout', async (req, res) => {
    console.log("LOGOUT")
    signout(req, res)
})

app.post('/create', async (req, res) => {
    console.log("CREATE")
    await create(req, res)
})

app.post('/edit', async (req, res) => {
    console.log("EDIT")
    await edit(req, res)
})

app.listen(port, () => {
    console.log(`Leave API listening on port ${port}`)
})