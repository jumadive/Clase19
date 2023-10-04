import express from 'express'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import {engine} from 'express-handlebars'
import { __dirname } from './utils.js'
import viewsRouter from './routes/views.router.js'
import { Server } from 'socket.io'
import { manager1 } from './ProductManager.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

// handlebars
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

// routes
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/views', viewsRouter)

const httpServer = app.listen(8080, () => {
	console.log("Escuchando Puerto 8080")
})

const socketServer = new Server(httpServer)

socketServer.on('connection', (socket)=> {
	console.log('cliente conectado')
	try {
		socket.on('product', async (product)  => {
			await manager1.addProduct(product)
		})
	} catch (error) {
		return error
	}
	try {
		socket.on('id', async (id)  => {
			await manager1.deleteProduct(+id)
		})
	} catch (error) {
		return error
	}
})
