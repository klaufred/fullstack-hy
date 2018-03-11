const reducer = (store = 'HUOM', action) => {
    switch (action.type) {
        case 'SET':
          return action.huom
        default:
          return store
      }
}

export const notificationChange = (change) => {
    return {
      type: 'SET',
      huom: change
    }
  }

  export const notificationClear = () => {
    return {
      type: 'SET',
      huom: ''
    }
  }
  
  export default reducer