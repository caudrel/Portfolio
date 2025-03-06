import 'reflect-metadata'
import express from 'express'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import cors from 'cors'
import db from './db'
import schema from './schema'
import http from 'http'
import { User } from './entities/user'
import { jwtVerify } from 'jose'
import Cookies from 'cookies'
import { findUserById } from './resolvers/usersResolver'

require('events').EventEmitter.defaultMaxListeners = 20

const port = 4000

export interface MyContext {
    req: express.Request
    res: express.Response
    user: User | null
}

export interface Payload {
    id: number
}

const app = express()

// ✅ Active la gestion des proxys (Caddy/Nginx)
app.set('trust proxy', 1)

const httpServer = http.createServer(app)

// 🆕 Endpoint de healthcheck
app.get('/health', (req, res) => {
    res.status(200).send('OK')
})

schema
    .then(async schema => {
        await db.initialize()

        const server = new ApolloServer<MyContext>({
            schema,
            plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        })

        await server.start()

        app.use(
            '/',
            cors<cors.CorsRequest>({
                origin: [
                    'http://localhost:3000',
                    'https://studio.apollographql.com',
                    'https://staging.caudrel.com',
                    'https://caudrel.com',
                ],
                credentials: true,
            }),
            express.json(),
            expressMiddleware(server, {
                context: async ({ req, res }) => {
                    let user: User | null = null

                    const cookies = new Cookies(req, res)
                    const token = cookies.get('accessToken')

                    if (token) {
                        try {
                            const verify = await jwtVerify<Payload>(
                                token,
                                new TextEncoder().encode(process.env.SECRET_KEY)
                            )

                            user = await findUserById(verify.payload.id)
                        } catch (error) {
                            console.error(
                                'Error during JWT verification, ',
                                error
                            )
                        }
                    }
                    return { req, res, user }
                },
            })
        )

        await new Promise<void>(resolve => httpServer.listen({ port }, resolve))
        console.log(`graphql server listening on http://localhost:${port}/`)
    })
    .catch(err => console.error('🔥 Erreur au démarrage du serveur:', err))
