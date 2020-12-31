import HomePage from './homepage.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsCollectionsLoaded } from '../../redux/postings/postings.selectors';
import { compose } from 'redux';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const mapStateToProps = createStructuredSelector({
  isLoading: (state) => !selectIsCollectionsLoaded(state),
});

const HomePageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(HomePage);

export default HomePageContainer;
