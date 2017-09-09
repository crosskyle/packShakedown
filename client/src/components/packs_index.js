import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { readPacks } from '../actions'

class PacksIndex extends Component {
  componentDidMount() {
    this.props.readPacks()
  }

  renderPacks() {
    return _.map(this.props.packs, pack => {
      return (
        <li className="list-group-item" key={pack._id}>
          <Link to={`/packs/${pack._id}`}>
            {pack.title}
          </Link>
        </li>
      )
    })
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/packs/new">
            Add a Pack
          </Link>
        </div>
        <h3>Packs</h3>
        <ul className="list-group">
          {this.renderPacks()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { packs: state.packs }
}

//using readPacks: readPacks instead of mapDispatch
export default connect(mapStateToProps, { readPacks })(PacksIndex)