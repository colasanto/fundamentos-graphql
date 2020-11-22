export const usuarios = [
  {
    id: 1,
    nome: 'Fulano da Silva',
    email: 'fulano@gmail.com',
    idade: 33,
    salario: 1420.40,
    vip: false,
    status: 'INATIVO',
    perfil_id: 1
  },
  {
    id: 2,
    nome: 'Ciclano Rodrigues',
    email: 'ciclano@wmail.com',
    idade: 17,
    salario: 5785.10,
    vip: true,
    status: 'BLOQUEADO',
    perfil_id: 1
  },
  {
    id: 3,
    nome: 'Fulana Ciclana',
    email: 'fciclana@tmail.com',
    idade: 24,
    salario: 3700.10,
    vip: true,
    status: 'ATIVO',
    perfil_id: 2
  }
]

export const perfis = [
  { id: 1, nome: 'Administrador' },
  { id: 2, nome: 'Comum' }
]
