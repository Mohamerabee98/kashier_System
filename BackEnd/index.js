import express from "express"
import cors from "cors";
import bootstrap from "./src/app.controller.js"
const app = express()
app.use(cors());
const port = 3000
bootstrap(app, express)
app.listen(port , ()=>{
    console.log("server is running on port " , port);
});