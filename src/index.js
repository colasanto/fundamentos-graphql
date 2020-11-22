import { ApolloServer, gql } from 'apollo-server'

const typeDefs = gql`
  scalar Date

  type Usuario {
    id: ID!
    nome: String!
    email: String!
    idade: Int
    salario: Float
    vip: Boolean
    nascimento: Date
  }

  type Produto {
    nome: String!
    preco: Float!
    desconto: Float
    precoComDesconto: Float
    descontoValor: Float
  }

  # Pontos de entrada da API!
  type Query {
    ola: String!
    horaAtual: String!
    usuarioLogado: Usuario,
    produtoEmDestaque: Produto
  }
`

const resolvers = {
  Usuario: {
    salario(parent) {
      return parent.salario_real
    }
  },

  Produto: {
    precoComDesconto(parent) {
      if (parent.desconto) {
        return parent.preco * (1 - parent.desconto)
      } else {
        return parent.preco
      }
    },

    descontoValor(parent) {
      if (parent.desconto) {
        return (parent.preco - (parent.preco * (1 - parent.desconto)))
      } else {
        return parent.preco
      }
    }
  },

  Query: {
    ola() {
      return 'Uma string no retorno'
    },

    horaAtual() {
      const data = new Date().toLocaleDateString()
      return data.split('-').reverse().join('/')
    },

    usuarioLogado() {
      return {
        id: 1,
        nome: 'Fulano',
        idade: 32,
        email: 'fulano@gmail.com',
        salario_real: 1500.50,
        vip: false,
        nascimento: new Date('1938-08-30')
      }
    },

    produtoEmDestaque() {
      return {
        nome: 'Caneta BIC Azul',
        preco: 1.50,
        desconto: 0.10
      }
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({url}) => {
  console.log(`Executando em ${url}`)
})