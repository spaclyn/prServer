require("dotenv").config()
const Express = require("express")
const app = Express();
const dbConnection = require("./db")

const cors = require('cors')
app.use(require('./middleware/headers'))
app.use(cors())

const controllers = require("./controllers")

app.use(Express.json())

app.use('/user', controllers.userController)
app.use(require("./middleware/validate-jwt"))
app.use('/entry', controllers.entryController)
app.use('/test', (req, res) => {
    res.send('this is a message from the test endpoint of the server')
})

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[Server]: App is listening on ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`)
    })