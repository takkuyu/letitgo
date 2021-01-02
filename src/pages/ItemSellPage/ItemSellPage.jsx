import React, { useState } from 'react';
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { gql, useMutation } from '@apollo/client';
import { default as categories } from '../../constants/directory';

const CREATE_POST = gql`
  mutation CreatePost(
    $createdby: Int!, 
    $title: String!,
    $category: String!,
    $location: String!,
    $price: Int!,
    $condition: String!,
    $imageurl: String!,
    $description: String!
    ) {
    createPost(
      createdby: $createdby,
      title:  $title, 
      category:$category, 
      location: $location, 
      price:   $price,
      condition: $condition, 
      imageurl: $imageurl, 
      description: $description
    ) {
      pid
      category
    }
  }
`;

const ItemSellPage = ({ ...props }) => {
  const [createPost, { error }] = useMutation(CREATE_POST, {
    onCompleted({ createPost }) {
      if (createPost) {
        const category = Object.values(categories).find(category => category.category === createPost.category);
        props.history.push(`/${category.linkUrl}`)
      }
    }
  });

  const [formValues, setFormValues] = useState({
    title: '',
    price: '',
    category: '',
    condition: '',
    location: '',
    imageurl: '',
    description: '',
  })

  const [isImageLoading, setIsImageLoading] = useState(false)

  const {
    title,
    price,
    category,
    location,
    condition,
    imageurl,
    description,
  } = formValues

  const onChange = (e) => {
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (isImageLoading) return;

    createPost({
      variables: {
        createdby: 1,
        title: title,
        category: category,
        location: location,
        price: Number(price),
        condition: condition,
        imageurl: imageurl,
        description: description,
      }
    })
  }

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'myreactapp');
    setIsImageLoading(true);

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dh1mwdsag/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );
    const file = await res.json();

    setFormValues({ ...formValues, imageurl: file.secure_url });
    setIsImageLoading(false);
  };

  return (
    <Container className="item-sell-page">
      <h2 className="item-sell-page-title">Sell your item</h2>
      <Form className="item-sell-page-form" onSubmit={onSubmit}>
        <FormGroup>
          <Label><span className="required-field">*</span>Title</Label>
          <Input
            type="text"
            name="title"
            placeholder="Enter a title"
            onChange={onChange}
            value={title}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label><span className="required-field">*</span>Price</Label>
          <Input
            type="number"
            name="price"
            placeholder="Enter a price"
            onChange={onChange}
            value={price}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="select"><span className="required-field">*</span>Category</Label>
          <Input
            type="select"
            name="category"
            onChange={onChange}
            required
          >
            <option value="">--Choose an option--</option>
            {
              Object.values(categories).map(category => (
                <option key={category.id}>{category.category}</option>
              ))
            }
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="select"><span className="required-field">*</span>Condition</Label>
          <Input
            type="select"
            name="condition"
            onChange={onChange}
            required
          >
            <option value="">--Choose an option--</option>
            <option>New</option>
            <option>Like New</option>
            <option>Good</option>
            <option>Fair</option>
            <option>Poor</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label><span className="required-field">*</span>Location</Label>
          <Input
            type="text"
            name="location"
            placeholder="Enter a location"
            onChange={onChange}
            value={location}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label><span className="required-field">*</span>Upload Image</Label>
          <Input
            type="file"
            name="imageurl"
            placeholder="Upload an image"
            onChange={uploadImage}
            required
          />
          {isImageLoading ? (
            <p>uploading...</p>
          ) : (
              imageurl && <img src={imageurl} alt="item image" style={{ width: '300px' }} />
            )}
        </FormGroup>
        <FormGroup>
          <Label><span className="required-field">*</span>Description</Label>
          <Input
            type="textarea"
            name="description"
            placeholder="Describe your item here"
            onChange={onChange}
            value={description}
            required
            style={{
              height: '200px',
            }}
          />
        </FormGroup>
        <button className="button" type="submit">Sell your item</button>
      </Form>
    </Container>
  );
}

export default ItemSellPage;
