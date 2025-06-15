import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import notesroutes from "./routes/notesroutes.js";
import { connectDB } from "./Config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001
const __dirname = path.resolve();

if(process.env.NODE_ENV !== "production"){

app.use(cors({
    origin:"http://localhost:5173"
}));
}
app.use(express.json());
app.use(rateLimiter);

// our simple custom middleware
// app.use((req, res, next) => {
//   console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//   next();
// });



app.use("/api/notes", notesroutes);
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../Frontend/dist")))
app.get("*",(req,res) =>{
    res.sendFile(path.join(__dirname,"../Frontend","dist","index.html"))
});
}
connectDB().then(() => {
//app.use((req,res,next) => {
   // console.log("we got a new request");
    //next();

//});

app.listen(PORT,() => {
    console.log("server started on port :",PORT);
});

});
