import { ApolloServer, gql } from 'apollo-server'

const usuarios = [
  {
    id: '1',
    nome: 'Fulano da Silva',
    email: 'fulano@gmail.com',
    idade: 33,
    salario: 1420.40,
    vip: false
  },
  {
    id: '2',
    nome: 'Ciclano Rodrigues',
    email: 'ciclano@wmail.com',
    idade: 17,
    salario: 5785.10,
    vip: true
  },
  {
    id: '3',
    nome: 'Fulana Ciclana',
    email: 'fciclana@tmail.com',
    idade: 24,
    salario: 3700.10,
    vip: true
  }
]

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
    produtoEmDestaque: Produto,
    numerosMegaSena: [Int!]!,
    usuarios: [Usuario],
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
    },
    numerosMegaSena() {
      const crescente = (a, b) => a - b;

      const arr = [];
      while(arr.length < 6){
          const r = Math.floor(Math.random() * 60) + 1;

          if (arr.indexOf(r) === -1) {
            arr.push(r);
          }
      }
        
      return arr.sort(crescente)
    },
    usuarios() {
      return usuarios ? usuarios : null
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({url}) => {
  console.log(`Executando em ${url}`)
})