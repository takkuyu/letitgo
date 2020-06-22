import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    Container,
    Row
} from 'reactstrap';
import Card from "../components/card.component";
import Navigation from '../components/navigation.component'
import CollectionOverview from '../components/collection-overview.component'
import { connect } from 'react-redux';
import { storeCurrentUserId, requestPostings } from '../redux/user/user.actions';
import { storeSearchField } from '../redux/inputs/inputs.actions';
import { storePostings } from '../redux/postings/postings.actions';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.deletePosting = this.deletePosting.bind(this);
        // this.onSearchChange = this.onSearchChange.bind(this);
    }

    componentDidMount() {
        this.props.requestPostings();
    }

    // onSearchChange = (event) => {
    //     this.props.storeSearchField(event.target.value);
    // }

    deletePosting(id) {
        if (!window.confirm('Are you sure to delete?')) {
            return;
        }
        axios.post('http://localhost:3000/users/deleteLikeFromAll', { deletedId: id })
            .then(console.log)
            .catch(console.log);
        axios.delete('http://localhost:3000/postings/' + id)
            .then(res => {
                console.log(res.data)
            });
        this.props.storePostings(this.props.postings.filter(el => el._id !== id));
    }

    postingList() {
        const filteredPosts = this.props.postings.filter(posting => {
            return posting.title.toLowerCase().includes(this.props.searchfield.toLowerCase());
        });

        return filteredPosts.map(posting => {

            const date = new Date(posting.createdAt);
            const createdAt = String(date).substring(0, 15);

            return (
                <Card
                    posting={posting}
                    userid={this.props.current_userid} // pass username, userid to cardlist component
                    key={posting._id}
                    deletePosting={this.deletePosting}
                    createdAt={createdAt}
                />
            );
        })
    }

    render() {
        return (
            <div className="homepage">
                <Navigation />
                <div class="homepage__short-content">
                    <p class="icon-check-circle"><b>List in minutes.</b> Take a few photos. Add a description. Set your price.</p>
                </div>
                <div className="homepage__top">
                    <Container>
                        <div className="homepage__top-wrapper">
                            <div className="homepage__top-wrapper-content">
                                <p className="leading">Sell from home</p>
                                <p className="sub-leading">Make a little money.</p>
                                <p className="link-btn"><Link to="">Sell now</Link></p>
                            </div>
                            <img src="https://u-web-assets.mercdn.net/assets/banner/lux-sell-desktop.png" alt="wallet" />
                        </div>
                    </Container>
                </div>
                <Container>
                    <CollectionOverview type="latests" items={this.postingList()}/>
                    <div className="products">
                        <Row className="products-container">
                            {this.postingList()}
                        </Row>
                    </div>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        current_userid: state.user.current_userid,
        postings: state.postings,
        searchfield: state.inputs.searchfield,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        storePostings: (value) => dispatch(storePostings(value)),
        storeCurrentUserId: (value) => dispatch(storeCurrentUserId(value)),
        storeSearchField: (value) => dispatch(storeSearchField(value)),
        requestPostings: () => dispatch(requestPostings()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
