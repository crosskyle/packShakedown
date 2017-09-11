import {CREATE_PACK, READ_PACKS, READ_PACK} from '../actions/types'
import _ from 'lodash'

export default function(state = {}, action) {
  switch (action.type) {
    case CREATE_PACK:
      return action.payload
    case READ_PACKS:
      return _.mapKeys(action.payload, "id")
    case READ_PACK:
      console.log({...state, [action.payload.id]: action.payload })
      return {...state, [action.payload._id]: action.payload }
    default:
      return state
  }
}