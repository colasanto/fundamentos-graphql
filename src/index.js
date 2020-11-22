import { ApolloServer, gql } from 'apollo-server'

const usuarios = [
  {
    id: 1,
    nome: 'Fulano da Silva',
    email: 'fulano@gmail.com',
    idade: 33,
    salario: 1420.40,
    vip: false,
    perfil_id: 1
  },
  {
    id: 2,
    nome: 'Ciclano Rodrigues',
    email: 'ciclano@wmail.com',
    idade: 17,
    salario: 5785.10,
    vip: true,
    perfil_id: 1
  },
  {
    id: 3,
    nome: 'Fulana Ciclana',
    email: 'fciclana@tmail.com',
    idade: 24,
    salario: 3700.10,
    vip: true,
    perfil_id: 2
  }
]

const perfis = [
  { id: 1, nome: 'Administrador' },
  { id: 2, nome: 'Comum' }
]

const typeDefs = gql`
  scalar Date

  type Usuario {
    # Podemos utilizar o tipo ID, porém ele é entendido como STRING e não como INT
    id: Int! #ID!
    nome: String!
    email: String!
    idade: Int
    salario: Float
    vip: Boolean
    nascimento: Date
    perfil: Perfil
  }

  type Produto {
    nome: String!
    preco: Float!
    desconto: Float
    precoComDesconto: Float
    descontoValor: Float
  }

  type Perfil {
    id: Int!
    nome: String!
  }

  # Pontos de entrada da API!
  type Query {
    ola: String!
    horaAtual: String!
    usuarioLogado: Usuario,
    produtoEmDestaque: Produto,
    numerosMegaSena: [Int!]!,
    usuarios: [Usuario],
    usuario(id: Int): Usuario,
    perfis: [Perfil],
    perfil(id: Int): Perfil,
  }
`

const resolvers = {
  Usuario: {
    salario(parent) {
      return parent.salario_real 
        ? parent.salario_real 
        : parent.salario
    },

    perfil(usuario) {
      const perfiLSelecionado = perfis
        .filter(perfil => perfil.id === usuario.perfil_id)
      
      return perfiLSelecionado ? perfiLSelecionado[0] : null
    }
  },

  Produto: {
    precoComDesconto(parent) {
      return parent.desconto 
        ? parent.preco * (1 - parent.desconto) 
        : parent.preco
    },

    descontoValor(parent) {
      return parent.desconto 
        ? (parent.preco - (parent.preco * (1 - parent.desconto))) 
        : 0
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
        desconto: .5
      }
    },

    numerosMegaSena() {
      const crescente = (a, b) => a - b
      const arr = []

      while(arr.length < 6){
          const r = Math.floor(Math.random() * 60) + 1

          if (arr.indexOf(r) === -1) {
            arr.push(r)
          }
      }
        
      return arr.sort(crescente)
    },

    usuarios() {
      return usuarios
    },

    usuario(_, { id }) {
      const usuarioSelecionado = usuarios
        .filter(user => user.id === id)

      return usuarioSelecionado ? usuarioSelecionado[0] : null
    },

    perfis() {
      return perfis
    },

    perfil(_, { id }) {
      const perfilSelecionado = perfis
        .filter(perfil => perfil.id === id)

      return perfilSelecionado ? perfilSelecionado[0] : null
    },
    
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({url}) => {
  console.log(`Executando em ${url}`)
})