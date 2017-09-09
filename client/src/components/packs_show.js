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

  renderItems() {
    const { pack } = this.props

    return _.map(pack.items, item => {
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
          {this.renderItems()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ packs }, ownProps) {
  return { pack: packs[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { readPack })(PacksShow)