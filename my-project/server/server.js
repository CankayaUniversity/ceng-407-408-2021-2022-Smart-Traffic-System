import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
PORT = 5000

const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json(), urlencodedParser)

const dbURI =
  'mongodb+srv://ouz:vfrcde561@cluster0.oelrg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

app.post('/Login', (req, res) => {
  const { email, password } = req.body
  User.findone({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: 'login sucess', user: user })
      } else {
        res.send({ message: 'wrong credentials' })
      }
    } else {
      res.send('not register')
    }
  })
})
app.post('/Register', (req, res) => {
  console.log(req.body)
  const { name, email, password } = req.body
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: 'user already exist' })
    } else {
      const user = new User({ name, email, password })
      user.save((err) => {
        if (err) {
          res.send(err)
        } else {
          res.send({ message: 'sucessfull' })
        }
      })
    }
  })
})

mongoose
  .connect(dbURI)
  .then((req, res) => {
    app.listen(PORT, () => console.log('Server is live'))
  })
  .catch((err) => console.log(err))
