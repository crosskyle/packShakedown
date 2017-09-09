import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { readPack } from '../actions'
import _ from 'lodash'

class PacksShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params //provided from react-router
    this.props.readPack(id)
  }

  renderCategories() {
    const { pack } = this.props

    return _.map(pack.categories, category => {
      return (
        <div>
          <h4>{category.category}</h4>
          <ul className="list-group" key={category.category}>
            {this.renderItems(category)}
          </ul>
        </div>

      )
    })
  }

  renderItems(category) {
    return _.map(category.items, item => {
      return (
        <li className="list-group-item" key={item._id}>
          {item.title}
        </li>

      )
    })
  }

  onDeleteClick() {


  }

  render () {
    const { pack } = this.props

    if (!pack) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <Link to ="/" className="btn btn-primary">Back To Index</Link>
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
  return { pack: packs[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { readPack })(PacksShow)