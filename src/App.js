import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Routes from './components/routes/routes';
import Header from './components/header/header.component'
import Footer from './components/footer/footer.component'
import Navigation from './components/navigation/navigation.component'
import TopShortContent from './components/top-short-content/top-short-content'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectDirectoryCategories } from './redux/directory/directory.selectors';

class App extends React.Component {
  state = {
    headerHeight: 0
  }

  componentDidMount() {
    const height = document.getElementById('header').clientHeight;
    this.setState({ headerHeight: height })
  }

  render() {
    const { categories } = this.props;

    return (
      <div className="App">
        <BrowserRouter>
          <Header />
          <main className="main" style={{ paddingTop: this.state.headerHeight }}>
            <Navigation categories={categories} />
            <TopShortContent />
            <Route component={Routes} />
          </main>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  categories: selectDirectoryCategories,
})

export default connect(mapStateToProps)(App);
