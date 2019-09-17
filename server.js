const PORT = 3000
const express = require('express')
const app = express()
const ctrl = require('./usersCtrl')

app.use(express.json())


app.get('/api/user', ctrl.getAllUsers)
app.get('/api/user/:id', ctrl.getUserById)
app.get('/api/admin', ctrl.getUserAdmin)
app.get('/api/nonadmin', ctrl.nonAdmin)
app.get('/api/type/:type', ctrl.userByType)
app.put('/api/user/:id', ctrl.updateUser)
app.post('/api/user', ctrl.addUser)
app.delete('/api/user/:id', ctrl.deleteUser)

app.listen(PORT,()=>console.log(`Running on ${PORT}`))