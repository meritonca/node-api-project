import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import authRouter from "./routes/authRoutes.js"
import studentRouter from "./routes/studentRoutes.js"
import { errorHandler } from "./middleware/errorHandler.js"

const app = express()
app.use(express.json())
app.use(cors())
dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(()=> console.log("U lidh")).catch(err => console.log(err.message))

app.use("/api",authRouter)
app.use("/studentet",studentRouter)
app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(`Serveri po punon ne ${process.env.PORT}`)
})

