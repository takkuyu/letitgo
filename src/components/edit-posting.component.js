import React, { Component } from 'react';
import axios from 'axios';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
} from 'reactstrap';

export default class EditPosting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            image: '',
            description: '',
        }
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    componentDidMount() {
        // console.log(this.props.match.params.id)

        axios.get('http://localhost:3000/postings/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    title: response.data.title,
                    image: response.data.image,
                    description: response.data.description,
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value // target is textbox
        });
    }
    onChangeDescription(e) {
        this.setState({
            description: e.target.value // target is textbox
        });
    }
    onChangeImage(e) {
        this.setState({
            image: e.target.value // target is textbox
        });
    }

    onSubmit(e) {
        e.preventDefault(); 
        const posting = {
            title: this.state.title,
            image: this.state.image,
            description: this.state.description,
        }

        console.log(posting);

        axios.post('http://localhost:3000/postings/update/' + this.props.match.params.id, posting)
            .then(res => console.log(res.data)) // this will show 'Exercise added' which is res.json() in the backend code
            .catch(console.log);

        window.location = '/mainscreen'; 
    }


    render() {
        return (
            <Container className="App">
                {/* <Navbar /> */}
                <h2>Edit Post</h2>
                <Form className="form" onSubmit={this.onSubmit}>
                    <Col>
                        <FormGroup>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="text"
                                value={this.state.title}
                                id="exampleImage"
                                onChange={this.onChangeTitle}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>Image</Label>
                            <Input
                                type="text"
                                name="text"
                                value={this.state.image}
                                id="exampleImage"
                                onChange={this.onChangeImage}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>Description</Label>
                            <Input
                                type="textarea"
                                name="testarea"
                                value={this.state.description}
                                id="Description"
                                onChange={this.onChangeDescription}
                                style={{
                                    height: '200px',
                                }}
                            />
                        </FormGroup>
                    </Col>
                    <Button >Post</Button>
                </Form>
            </Container>

            // <div>
            //     <h3>Edit Posting</h3>
            //     <form onSubmit={this.onSubmit}>
            //         <div className="form-group">
            //             <label>Username: </label>
            //             <select ref="userInput"
            //                 required
            //                 className="form-control"
            //                 value={this.state.username}
            //                 onChange={this.onChangeUsername}>
            //                 {
            //                     this.state.users.map((user) => {
            //                         return <option
            //                             key={user}
            //                             value={user}>{user}
            //                         </option>;
            //                     })
            //                 }
            //             </select>
            //         </div>
            //         <div className="form-group">
            //             <label>Description: </label>
            //             <input type="text"
            //                 required
            //                 className="form-control"
            //                 value={this.state.description}
            //                 onChange={this.onChangeDescription}
            //             />
            //         </div>
            //         <div className="form-group">
            //             <label>Duration (in minutes): </label>
            //             <input
            //                 type="text"
            //                 className="form-control"
            //                 value={this.state.duration}
            //                 onChange={this.onChangeDuration}
            //             />
            //         </div>
            //         <div className="form-group">
            //             <label>Date: </label>
            //             <div>
            //                 {/* <DatePicker
            //                     selected={this.state.date}
            //                     onChange={this.onChangeDate}
            //                 /> */}
            //             </div>
            //         </div>

            //         <div className="form-group">
            //             <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
            //         </div>
            //     </form>
            // </div>
        );
    }
}