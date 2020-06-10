const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const path = require('path')

class Task {
    constructor(task) {
        this.task = task
        this.id = uuidv4()
    }

    toJSON() {
        return {
            task: this.task,
            id: this.id
        }
    }

    async save() {
        const tasks = await Task.getAll()
        tasks.push(this.toJSON())


        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'tasks.json'),
                JSON.stringify(tasks),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                }
            )
        })

    }


    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'tasks.json'),
                'utf-8',
                (err, content) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(JSON.parse(content))
                    }
                }
            )
        })
    }

}
module.exports = Task
