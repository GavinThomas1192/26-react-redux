import './_category-item.scss';
import React from 'react';
import CategoryForm from '../category-form';
import ExpenseForm from '../expense-form';
import ExpenseItem from '../expense-item';
import { connect } from 'react-redux';
import {categoryUpdate, categoryDelete} from '../../action/category-actions.js';
import {expenseUpdate, expenseDelete, expenseCreate} from '../../action/expense-actions.js';
import { Button, FormControl, Modal, Grid, Row, Col } from 'react-bootstrap';


class CategoryItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editCategory: false,
      expenseBox: false,
    };
    this.toggleCategory = this.toggleCategory.bind(this);
    this.toggleExpense = this.toggleExpense.bind(this);
  }



  toggleCategory() {
    this.setState({editCategory: !this.state.editCategory});

  }

  toggleExpense() {
    this.setState({expenseBox: !this.state.expenseBox});
  }



  render() {
    let {category, categoryUpdate, categoryDelete, expense, expenses} = this.props;
    return(
      <section>
        <div className='list'>
          {// <div className="static-modal">
          //   <Modal.Dialog>
          //     <Modal.Header>
          //       <Modal.Title>Modal title</Modal.Title>
          //     </Modal.Header>
          //
          //     <Modal.Body>
          //       One fine body...
          //     </Modal.Body>
          //
          //     <Modal.Footer>
          //       <Button>Close</Button>
          //       <Button bsStyle="primary">Save changes</Button>
          //     </Modal.Footer>
          //
          //   </Modal.Dialog>
          // </div>
          // <Grid>
          //   <Row className="show-grid">
          //     <Col xs={12} md={8}><code>&lt;{`<h2>{category.title}</h2>`} /&gt;</code></Col>
          //     <Col xs={6} md={4}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
          //   </Row>
          // </Grid>
          }

          <h2>{category.title}</h2>
          <h3>Budget: {category.budget}</h3>
          <button onClick={()=>this.props.categoryDelete(this.props.category)}>X</button>
          <Button bsStyle="primary" bsSize="large" onClick={this.toggleCategory}>Edit category</Button>
          {this.state.editCategory ?
            <CategoryForm
              buttonText='Update'
              category={category}
              onComplete={this.props.categoryUpdate}
            />
            :
            undefined


          }
          <div className='expense-container' responsive>
            <ExpenseForm
              categoryID={category.id}
              buttonText='Create'
              onComplete={this.props.expenseCreate}
            />

            <div className='expense-items'>
              {this.props.expenses.map(expense =>
                <p responsive>
                  <ExpenseItem key={expense.id} expense={expense} category={this.props} />
                </p>
              )}
            </div>
          </div>
        </div>

      </section>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    expenses: state.expenses[props.category.id],
  };
};

const mapDispatchToProps = (dispatch, getState) => {
  return {
    categoryUpdate: (category) => dispatch(categoryUpdate(category)),
    categoryDelete: (category) => dispatch(categoryDelete(category)),
    expenseCreate: (expense) => dispatch(expenseCreate(expense)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);
