import React from 'react';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.expense ? props.expense.name : '',
      price: props.expense ? props.expense.price : '',
      categoryID: props.expense ? props.expense.categoryID  : props.categoryID,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentWillReceiveProps(props) {
  //   if (props.expense) {
  //     this.setState(props.expense);
  //   }
  // }

  handleChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value,
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.props.categoryID);
    console.log(this.state, 'staterss');
    this.props.onComplete(this.state);
    if(!this.props.expense) {
      this.setState({ content: '' });
    }
  }

  render() {
    return (
      <form className='expense-form' onSubmit={this.handleSubmit}>
        <input
          name='title'
          type='text'
          placeholder='title'
          value={this.state.value}
          onChange={this.handleChange} />
        <input
          name='price'
          type='number'
          placeholder='price'
          value={this.state.value}
          onChange={this.handleChange} />
        <button type='submit'>{this.props.buttonText}</button>
      </form>
    );
  }
}

export default ExpenseForm;