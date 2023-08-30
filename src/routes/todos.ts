import { Router } from "express";
import {todo} from "../models/todos"

const router = Router()

const todos: todo[] = []

router.get('/', (req, res, next) => {
    res.status(200).json({todos : todos})
})

router.post('/add', (req, res, next) => {
    const newtoDo: todo = {
        id : new Date().toISOString().split(':')[0],
        data : req.body.text

    };
    todos.push(newtoDo)
    res.status(200).json({message : 'Added Successfully'})
});

router.post('/delete/:id', (req, res) => {
    const id = req.params.id
    const index = todos.findIndex((todo) => todo.id === id)
    if(index !==-1){
        todos.splice(index, 1)
        res.status(200).json({message : 'Deleted Successfully'})
    }else{
        res.status(404).json({message : 'Not Found'})
    }
})

router.post('/edit/:id', (req, res) => {
    const id = req.params.id
    const index = todos.findIndex((todo) => todo.id === id)
    if(index !== -1){
        todos[index].data = req.body.text
        res.status(200).json('Updated Successfully')
    }else{
        res.status(404).json('Not Found')
    }
})

export default router