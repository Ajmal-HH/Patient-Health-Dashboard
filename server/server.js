import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import patient_router from './Router/patientRouter.js'
import connectDB from './config/db.js'

dotenv.config()

const app = express()
connectDB()

app.use(cors({
    origin: 'http://localhost:5173',
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    credentials: true
}))
app.use(express.json())



const PORT = process.env.PORT || 5001
const JWT_SECRET = process.env.JWT_SECRET

//patientRouter
app.use('/',patient_router)



app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`))