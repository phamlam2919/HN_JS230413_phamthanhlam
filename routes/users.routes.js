const express = require("express");
const router = express.Router();
const db = require("../utils/database");

// POST:
router.post("/", async (req, res) => {
    try {
        let { name, email, age } = req.body;
        let data = await db.execute(
            `INSERT INTO users( name, email, age) VALUE(?, ?, ?)`,
            [name, email, age]
        );
        res.json({
            message: "them thanh cong",
        });
    } catch (error) {
        res.json({
            error: error,
        });
    }
});

// GET ALL:
router.get("/", async (req, res) => {
    try {
        let data = await db.execute("SELECT * FROM users");
        let [row] = data;
        res.json({
            users: row,
        });
    } catch (error) {
        res.json({
            message: "Get all users",
        });
    }
});

// GET ONE:
router.get("/:id", async (req, res) => {
    try {
        let { id } = req.params;
        let data = await db.execute(`SELECT * FROM users WHERE users_id = ?`, [
            id,
        ]);
        let row = data[0];
        if (row.length === 0) {
            res.json({
                message: "User with id is not defind",
            });
        } else {
            res.json(row[0]);
        }
    } catch (error) {
        res.json({
            error: error,
        });
    }
});

// PATCH:
router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;

    try {
        const [row] = await db.execute(
            `SELECT * FROM users WHERE users_id = ?`,
            [id]
        );

        if (row.length === 0) {
            return res.json({
                message: "Không tìm thấy người dùng để cập nhật.",
            });
        }

        await db.execute(
            `UPDATE users SET name = ?, email = ?, age = ? WHERE users_id = ?`,
            [name || row[0].name, email || row[0].email, age || row[0].age, id]
        );

        return res.json({
            message: "Cập nhật thông tin người dùng thành công.",
        });
    } catch (error) {
        return res.json({ error: error });
    }
});

// DELETE:
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute("DELETE FROM users WHERE users_id = ?", [id]);
        let data = await db.execute("SELECT * FROM users");
        res.json({
            message: "Đã delete thành công",
            user: data[0],
        });
    } catch (error) {
        res.json({
            message: "Delete one users",
        });
    }
});

module.exports = router;
