import { ApolloServer, gql } from 'apollo-server'
import { importSchema } from 'graphql-import'
import resolvers from './resolvers'
import path from 'path'

const schemaPath = './schema/index.graphql'

const server = new ApolloServer({
  typeDefs: importSchema(path.resolve(__dirname, schemaPath)),
  resolvers
})

server.listen().then(({url}) => {
  console.log(`Executando em ${url}`)
})
