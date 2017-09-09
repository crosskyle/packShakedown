import { combineReducers } from 'redux'
import PacksReducer from './reducer_packs'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  packs: PacksReducer,
  form: formReducer
})

export default rootReducer