const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000
const {PythonShell} =require( 'python-shell');

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/users', require('./routes/userRoutes'))

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  )
} else {
  app.get('/', (req, res) => res.send('Please set to production'))
}

app.get('/api/python', (req, res) =>{

  res.send('Welcome')

  let options = {
      mode: 'text',
      pythonOptions: ['-u'], // get print results in real-time
  };

  PythonShell.run('Python/final.py', options, function (err) {
      if (err) throw err;
      console.log('finished');
    });
  }
  )


app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
