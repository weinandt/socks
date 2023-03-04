import { Express } from "express"
import { buildSchema } from 'graphql'
import path from 'path'
import fs from 'fs'
import { addResolversToSchema } from '@graphql-tools/schema'
import { graphqlHTTP } from "express-graphql"

const readSchemaAsString = () => {
    const schemaAsString = fs.readFileSync(path.join(__dirname, '../schema.graphql'), { encoding: 'utf-8' })

    return schemaAsString
}

export function createGraphqlApp(app: Express, resolvers: any) {
    const schema = buildSchema(readSchemaAsString())
    const schemaWithResolvers = addResolversToSchema({
        schema,
        resolvers: resolvers,
    })

    app.use('/graphql', graphqlHTTP(async (req, res, graphqlParams) => {
        // TODO: add context if wanting to do auth or something.
        //const context = await Context.createContext(req)

        return {
            schema: schemaWithResolvers,
            graphiql: true,
            //context,
        }
    }))

    return app
}