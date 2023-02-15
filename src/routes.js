

export const routes = [
  {
    method: 'POST',
    path: '/tasks',
    handler: (req, res) => {
      return res.end(JSON.stringify(''))
    }
  },
  {
    method: 'GET',
    path: '/tasks',
    handler: (req, res) => {
      return res.end(JSON.stringify(''))
    }
  },
  {
    method: 'PUT',
    path: '/tasks/:id',
    handler: (req, res) => {
      return res.end(JSON.stringify(''))
    }
  },
  {
    method: 'PATCH',
    path: '/tasks/:id/complete',
    handler: (req, res) => {
      return res.end(JSON.stringify(''))
    }
  },
  {
    method: 'DELETE',
    path: '/tasks/:id',
    handler: (req, res) => {
      return res.end(JSON.stringify(''))
    }
  }
]