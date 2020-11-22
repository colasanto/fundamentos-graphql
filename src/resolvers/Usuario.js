import { perfis } from '../data/db'

export default {
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
}
