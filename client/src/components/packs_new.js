import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createPack } from '../actions/index'

class PacksNew extends Component {
  renderField(field) {
    const { meta: {touched, error }} = field
    const className =  `form-group ${touched && error ? 'has-danger' : ''}`

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    )
  }


  onSubmit(values) {
    this.props.createPack(values, () => {
      this.props.history.push('/')
    })
  }


  render() {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Description"
          name="description"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>

    )
  }
}


function validate(values) {
  const errors = {}

  if (!values.title) {
    errors.title = 'Please enter a title'
  }
  if (!values.description) {
    errors.description = 'Please enter a description'
  }

  //If errors is empty, the form passed validation
  return errors
}


export default reduxForm({
  validate: validate,
  form: 'PacksNewForm'
})(connect(null,{ createPack })(PacksNew))