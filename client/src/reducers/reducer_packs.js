import {CREATE_PACK, READ_PACKS, READ_PACK} from '../actions/types'

//transforms array of objects to object of objects
const arrayToObject = (array) =>
  array.reduce((obj, item) => {
    obj[item.id] = item
    return obj
  }, {})

export default function(state = {}, action) {
  switch (action.type) {
    case CREATE_PACK:
      return action.payload
    case READ_PACKS:
      return action.payload
    case READ_PACK:
      console.log(action.payload)
      return {...state, [action.payload._id]: action.payload }
    default:
      return state
  }
}