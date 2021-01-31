import express from 'express'
import chatSocket from './websocket/chat'
import cors from 'cors'
import { routes } from './Routes'
import RouteViews from './Routes/public'

import './database'

class App {
    constructor() {
        this.app = express()
        this.server = require('http').createServer(this.app)
        this.middleware()
        this.routes()
        this.views()
    }

    middleware() {
        this.app.use(cors())
        chatSocket(this.server)
    }
    routes() {
        this.app.use('/api', routes)

    }
    views() {
        this.app.use('/', RouteViews)
    }
}

export default new App().server