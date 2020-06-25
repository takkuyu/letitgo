import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Routes from './components/routes/routes';
import Header from './components/header/header.component'
import Footer from './components/footer/footer.component'

class App extends React.Component {
  state = {
    headerHeight: 0
  }

  componentDidMount() {
    const height = document.getElementById('header').clientHeight;
    this.setState({ headerHeight: height })
  }

  render() {
    return (
      <BrowserRouter>
        <Header />
        <main className="main" style={{ paddingTop: this.state.headerHeight }}>
          <Route component={Routes} />
        </main>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;

