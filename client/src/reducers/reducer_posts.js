import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions/index'
import _ from 'lodash'

//transforms array of objects to object of objects
const arrayToObject = (array) =>
  array.reduce((obj, item) => {
    obj[item.id] = item
    return obj
  }, {})


export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return arrayToObject(action.payload.data)

    case FETCH_POST:
      /*const post = action.payload.data
      const newState = { ...state }
      newState[post.id] = post
      return newState*/
      return { ...state, [action.payload.data.id]: action.payload.data }

    case DELETE_POST:
      return _.omit(state, action.payload)

    default:
      return state
  }
}