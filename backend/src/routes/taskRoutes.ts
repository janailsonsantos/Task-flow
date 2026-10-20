import { Router } from "express";
import { tasksController } from "../controllers/taskController.js";

const taskscontroller = new tasksController();

const routes = Router();

routes.get("/tasks", (req, res) => {
    taskscontroller.index(req, res);
})

routes.get("/tasks/:id", (req, res) => {
    taskscontroller.show(req, res);
})

routes.post("/tasks", (req, res) => {
    taskscontroller.create(req, res);
})

routes.put("/tasks/:id", (req, res) => {
    taskscontroller.update(req, res);
})

routes.delete("/tasks/:id", (req, res) => {
    taskscontroller.delete(req, res);
})

export default routes;