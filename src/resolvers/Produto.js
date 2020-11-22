export default {
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
}
