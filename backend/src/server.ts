import express from "express";
import routes from "./routes/taskRoutes.js";

const app = express();
const PORT = 3000;
app.use(express.json());

app.get("/health", (req, res)=> {
    res.status(200).json({status: "ok"});
})

app.use(routes);

app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`)
}
);


