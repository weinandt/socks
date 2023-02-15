import express from "express"
//import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'
import path from 'path'
import fs from 'fs'

const readSchemaAsString = () => {
    const schemaAsString = fs.readFileSync(path.join(__dirname, '../../schema.graphql'), { encoding: 'utf-8' })

    return schemaAsString
}

export function createGraphqlApp() {
    const schema = buildSchema(readSchemaAsString())
    /*
    const resolvers = new Resolvers(ManualDI.createResolvers())
    const schemaWithResolvers = addResolversToSchema({
        schema,
        resolvers: resolvers.getResolvers(),
    })

    const app = express()
    app.use(cors())
    app.use(express.json())

    app.use('/graphql', graphqlHTTP(async (req, res, graphqlParams) => {
        const context = await Context.createContext(req)

        return {
            schema: schemaWithResolvers,
            graphiql: true,
            context,
        }
    }))
    */

    const app = express()
    app.use(express.json())

    return app
}