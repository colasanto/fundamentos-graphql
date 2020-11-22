import { usuarios, perfis } from '../data/db'

export default {
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
  }
}
