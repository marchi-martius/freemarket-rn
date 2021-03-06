import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListView } from 'react-native';

import CategoryListRow from '../components/CategoryListRow';

export default class CategoryListView extends Component {
  constructor(props) {
    super(props);

    props.loadCategories();

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id,
    });
    this.dataSource = ds.cloneWithRows([]);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.categories.length !== this.props.categories.length ||
      nextProps.categories.map(cat => cat.id) !== this.props.categories.map(cat => cat.id);
  }

  componentWillUpdate(nextProps) {
    this.dataSource = this.dataSource.cloneWithRows(nextProps.categories);
  }

  onPress(row) {
    const { onCategoryPress, afterCategoryPress } = this.props;
    onCategoryPress(row);
    afterCategoryPress();
  }

  render() {
    const { dataSource } = this;
    const renderRow = row => (
      <CategoryListRow onPress={() => this.onPress(row)} name={row.name} iconName={row.icon} />
    );

    return <ListView {...{ dataSource, renderRow }} />;
  }
}

CategoryListView.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  loadCategories: PropTypes.func.isRequired,
  onCategoryPress: PropTypes.func.isRequired,
  afterCategoryPress: PropTypes.func.isRequired,
};
