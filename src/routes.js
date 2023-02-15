import { Database } from "./database.js"
import { buildRoutePath } from "./utils/buildRoutePath.js"

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
        id: '',
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
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      return res.end(JSON.stringify(''))
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      return res.end(JSON.stringify(''))
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      return res.end(JSON.stringify(''))
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      return res.end(JSON.stringify(''))
    }
  }
]