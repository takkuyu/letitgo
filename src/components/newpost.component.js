import React from 'react';
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';

const NewPost = () => {
  // uploadImage = async (e) => {
  //   const files = e.target.files;
  //   const data = new FormData();
  //   data.append('file', files[0]);
  //   data.append('upload_preset', 'myreactapp');

  //   this.props.storeLoadning(true);

  //   const res = await fetch(
  //     'https://api.cloudinary.com/v1_1/dh1mwdsag/image/upload',
  //     {
  //       method: 'POST',
  //       body: data,
  //     }
  //   );
  //   const file = await res.json();

  //   this.props.storeImage(file.secure_url);
  //   this.props.storeLoadning(false);
  // };

  const onSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <Container className="sell-item-page">
      <h2>New Post</h2>
      <Form className="form" onSubmit={onSubmit}>
        <Col>
          <FormGroup>
            <Label>Title</Label>
            <Input
              type="text"
              name="text"
              id="title"
              placeholder="Enter a title"
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label>Price</Label>
            <Input
              type="number"
              name="price"
              id="price"
              placeholder="Enter a price"
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for="select">Condition</Label>
            <Input
              type="select"
              name="select"
              id="select"
              defaultValue="desc"
            >
              <option value="desc" disabled>
                Choose one
                </option>
              <option>New</option>
              <option>Very Good</option>
              <option>Good</option>
              <option>Bad</option>
              <option>Very Bad</option>
            </Input>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              id="location"
              placeholder="Enter a location"
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label>Upload Image</Label>
            <Input
              type="file"
              name="file"
              placeholder="Upload an image"
              style={{ marginBottom: '10px' }}
            />
            {/* {this.props.loading ? (
              <h3>Loading...</h3>
            ) : (
                <img src={this.props.image} alt="" style={{ width: '300px' }} />
              )} */}
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label>Description</Label>
            <Input
              type="textarea"
              name="testarea"
              id="Description"
              placeholder="Describe your item here"
              style={{
                height: '200px',
              }}
            />
          </FormGroup>
        </Col>
        {/* {this.props.errorInputs ? (
          <h4 style={{ color: '#ff0000' }}>
            One or more inputs are empty ! Please fill in all the inputs.
          </h4>
        ) : (
            <div></div>
          )} */}
        <Button
          className="btn-danger"
          style={{ color: 'white', width: '100px' }}
        >
          Post
          </Button>
      </Form>
    </Container>
  );
}

export default NewPost;
