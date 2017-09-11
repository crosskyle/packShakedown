import React, { Component } from 'react'
import PacksShow from './packs_show'
import PacksIndex from './packs_index'

class App extends Component {

  render() {
    return (
      <div>
        <PacksIndex/>
        <PacksShow/>
      </div>
    )
  }
}

export default App