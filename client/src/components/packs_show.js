import React, { Component } from 'react'
import { connect } from 'react-redux'
import { readPack } from '../actions'
import _ from 'lodash'

class PacksShow extends Component {
  componentDidMount() {
    //const { id } = this.props.match.params //provided from react-router
    this.props.readPack('59b5b55eed3db3029f698e7b')
  }

  renderCategories() {
    const { pack } = this.props

    return _.map(pack.categories, category => {
      return (
        <div key={category.id}>
          <h4 key={category.title}>{category.title} </h4>
          <ul className="list-group" key={category.id}>
            {this.renderItems(category)}
          </ul>
        </div>
      )
    })
  }

  renderItems(category) {
    return _.map(category.items, item => {
      return (
        <li className="list-group-item" key={item.id}>
          {item.title}
        </li>

      )
    })
  }

  render () {

    const { pack } = this.props

    if (!pack) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <h3>{pack.title}</h3>
        <p>{pack.description}</p>
        <ul className="list-group">
          {this.renderCategories()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ packs }, ownProps) {
  //return { pack: packs[ownProps.match.params.id] }
  return { pack: packs['59b5b55eed3db3029f698e7b']}
}

export default connect(mapStateToProps, { readPack })(PacksShow)