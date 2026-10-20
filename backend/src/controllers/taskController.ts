import type { Request, Response } from 'express';
import db from '../database/connection.js';

export class tasksController {
    // 1. Listar todos os produtos (GET /produtos)
    async index(req: Request, res: Response) {
        const result = db.prepare("SELECT * FROM tasks").all();
        res.status(200).json(result);
    }

    // 2. Listar um produto específico (GET /produtos/:id)
    async show(req: Request, res: Response) {
        const { id } = req.params;
        const idNumber = Number(id)

        if (!Number.isSafeInteger(idNumber) || idNumber <= 0) {
            return res.status(400).json({ error: "Invalid task ID" });
        }

        const result = db.prepare("SELECT * FROM tasks WHERE id = ?").get(idNumber);

        if (!result) {
            res.status(404).json({ error: "Task not found" });
        } else {
            res.status(200).json(result);
        }
    }

    // 3. Criar um novo produto (POST /produtos)
    async create(req: Request, res: Response) {
        const { title, description } = req.body;

        if (typeof title != "string" || title.trim() === "" || typeof description != "string") {
            return res.status(400).json({ error: "Title and description are required" });
        }

        const result = db.prepare("INSERT INTO tasks (title, description) VALUES (?,?)").run(title, description);

        const idModificado = result.lastInsertRowid;

        res.status(201).json({ message: `create product with ID ${idModificado}`});
    }

    // 4. Atualizar um produto existente (PUT /produtos/:id)
    async update(req: Request, res: Response) {
        const { id } = req.params;

        const { title, description, status } = req.body;

        const idNumber = Number(id);

        if (!Number.isSafeInteger(idNumber) || idNumber <= 0) {
            return res.status(400).json({ error: "Invalid task ID" });
        }
        if (typeof title != "string" || typeof description != "string" || status != "pending" && status != "in_progress" && status != "completed") {
            return res.status(400).json({ error: "Invalid input data" });
        }

        const result = db.prepare("UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?").run(title, description, status, idNumber);

        if (result.changes === 0) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.status(200).json({ message: "Task updated successfully" });
    }

    // 5. Deletar um produto existente (DELETE /produtos/:id)
    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const idNumber = Number(id);

        if (!Number.isSafeInteger(idNumber) || idNumber <= 0) {
            return res.status(400).json({ error: "Invalid task ID" });
        }

        const result = db.prepare("DELETE FROM tasks WHERE id = ?").run(idNumber);

        if (result.changes === 0) {
            return res.status(404).json({ error: "Task not found" });
        }

        return res.sendStatus(204);
    }
}