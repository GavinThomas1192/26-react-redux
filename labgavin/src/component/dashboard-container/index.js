import React from 'react';
import './_dashboard-container.scss';
import {connect} from 'react-redux';
import {
  categoryCreate,
  categoryUpdate,
  categoryDelete,
} from '../../action/category-actions';
import CategoryForm from '../category-form';
import CategoryItem from '../category-item';

class DashboardContainer extends React.Component {

  componentDidMount() {
    this.props.categoryCreate({title: 'Dining Out', budget: '500'});
  }

  render() {
    return (
      <main className="dashboard-container">
        <h1>Track your Budget</h1>
        <h2>Total Monthly Budget: {this.props.totalMonthly}</h2>
        <h2>Total remaining: {this.props.totalRemaining}</h2>
        <div className='categoryForm'>
          <CategoryForm
            buttonText='Create'
            onComplete={this.props.categoryCreate} />
        </div>
        <div className="categoryList">
          {this.props.categories.map((item) => {
            return (
              <CategoryItem
                key={item.id}
                category={item}
              />
            );
          }
          )}
        </div>
      </main>

    );
  }
}



const mapStateToProps = state => {
  return {
    categories: state.categories,
    totalMonthly: 2000,
  };
};

const mapDispatchToProps = (dispatch, getState) => {
  return {
    categoryCreate: category => dispatch(categoryCreate(category)),
    categoryUpdate: category => dispatch(categoryUpdate(category)),
    categoryDelete: category => dispatch(categoryDelete(category)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
