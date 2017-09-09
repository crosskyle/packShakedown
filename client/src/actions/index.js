import axios from 'axios'

import {
  CREATE_PACK,
  READ_PACK,
  READ_PACKS
} from './types'

const ROOT_URL = 'http://localhost:3050'

const USER_ID = '59b2fb62bd394f28d80ebb4a'


export function createPack(values) {
  const response = axios.post(`${ROOT_URL}/api/users/${USER_ID}/packs`, values)

  return {
    type: CREATE_PACK,
    payload: response
  }
}

export function readPack(packId) {
  const response = axios.get(`${ROOT_URL}/api/users/${USER_ID}/packs/${packId}`)
    .then((resp) => {

      let categories = new Set()
      let payload = {
        title: resp.data.title,
        description: resp.data.description,
        _id: resp.data._id,
        categories: []
      }

      resp.data.items.forEach(item => {
        if (!(categories.has(item.category))) {
          categories.add(item.category)
          payload.categories.push({ category: item.category, items: []})
        }
      })

      resp.data.items.forEach(item => {
        let index = payload.categories.findIndex(c => c.category === item.category)
        payload.categories[index].items.push(item)
      })

      console.log(payload)
      console.log(resp.data)

      return payload
    })

  return {
    type: READ_PACK,
    payload: response
  }
}

export function readPacks() {
  const response = axios.get(`${ROOT_URL}/api/users/${USER_ID}`)
    .then((resp) => resp.data.packs)

  return {
    type: READ_PACKS,
    payload: response
  }
}
