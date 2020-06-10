const { Router } = require('express')
const Task = require('../models/task')
const router = Router()


router.get('/', async (req, res) => {
    const tasks = await Task.getAll()
    
    res.render('index', {
        title: 'Список задач', 
        tasks
    })
})


router.post('/', async (req, res) => {

    const task = new Task(req.body.task)
    await task.save()
    res.redirect('/')
})



module.exports = router