"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const todos = [];
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/add', (req, res, next) => {
    const newtoDo = {
        id: new Date().toISOString().split(':')[0],
        data: req.body.text
    };
    todos.push(newtoDo);
    res.status(200).json({ message: 'Added Successfully' });
});
router.post('/delete/:id', (req, res) => {
    const id = req.params.id;
    const index = todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
        todos.splice(index, 1);
        res.status(200).json({ message: 'Deleted Successfully' });
    }
    else {
        res.status(404).json({ message: 'Not Found' });
    }
});
router.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const index = todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
        todos[index].data = req.body.text;
        res.status(200).json('Updated Successfully');
    }
    else {
        res.status(404).json('Not Found');
    }
});
exports.default = router;
