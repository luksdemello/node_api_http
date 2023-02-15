import { Database } from "./database.js"
import { buildRoutePath } from "./utils/buildRoutePath.js"
import { randomUUID } from 'node:crypto'


const database = new Database();

export const routes = [
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const {title, description} = req.body

      if (!title) {
        res.writeHead(404).end(JSON.stringify({message: 'Title is missing'}))
      }

      if (!description) {
        res.writeHead(404).end(JSON.stringify({message: 'Description is missing'}))
      }

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      }

      database.insert('tasks', task)
      

      res.writeHead(201).end()
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks/upload'),
    handler: (req, res) => {
      console.log(req.body);
      

      res.writeHead(201).end()
    }
  },
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query

      const tasks = database.select('tasks', search ? {
        title: search,
        description: search
      } : null)

      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body

      if (!title) {
        res.writeHead(404).end(JSON.stringify({message: 'Title is missing'}))
      }

      if (!description) {
        res.writeHead(404).end(JSON.stringify({message: 'Description is missing'}))
      }

      const task = database.select('tasks', { id })[0]

      if (!task) {
        res.writeHead(404).end(JSON.stringify({message: 'Task not found'}))
      }

      database.update('tasks', id, {
        title,
        description,
        completed_at: null,
        created_at: task.created_at,
        updated_at: new Date(0)
      })

      res.writeHead(204).end()
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params;

      const task = database.select('tasks', { id })[0]

      if (!task) {
        res.writeHead(404).end(JSON.stringify({message: 'Task not found'}))
      }

      database.update('tasks', id, {
        title: task.title,
        description: task.description,
        completed_at: task.completed_at ?? new Date(),
        created_at: task.created_at,
        updated_at: new Date(0)
      })

      res.writeHead(204).end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const {id} = req.params

      database.delete('tasks', id)

      res.writeHead(204).end()
    }
  }
]