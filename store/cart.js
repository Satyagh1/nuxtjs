export const state = () => ({
    items: []
  })
  
  export const mutations = {
    addItem(state, item) {
      !state.items.some(pro => pro.id_product === item.id_product)?state.items.push(item):item.qty++
        console.log(item.qty)
      },
      removeItem(state, item) {
        state.items = state.items.filter(i => i !== item)
        state.count--
    }
  }
  
  export const actions = {
    addToCart({ commit }, item) {
      commit('addItem', item)
    },
    removeFromCart({ commit }, item) {
      commit('removeItem', item)
    }
  }