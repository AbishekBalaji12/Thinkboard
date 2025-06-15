import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import notesroutes from "./routes/notesroutes.js";
import { connectDB } from "./Config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001

app.use(cors({
    origin:"http://localhost:5173"
}));
app.use(express.json());
app.use(rateLimiter);


app.use("/api/notes", notesroutes);
connectDB().then(() => {
//app.use((req,res,next) => {
   // console.log("we got a new request");
    //next();

//});

app.listen(PORT,() => {
    console.log("server started on port :",PORT);
});

});
