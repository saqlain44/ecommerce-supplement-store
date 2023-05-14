import React, { useEffect, useState } from 'react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { Button, Form } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

import {
  useFetchProductDetailQuery,
  useUpdateProductMutation,
} from './productApiSlice';

type Inputs = {
  name: string;
  price: number;
  image: string;
  brand: string;
  category: string;
  countInStock: number;
  description: string;
};

const AdminProductEditForm = () => {
  const params = useParams();
  const productId = params.id || '';

  const { isLoading, isError, error, data } = useFetchProductDetailQuery(
    productId,
    { skip: !productId }
  );

  const [
    updateProduct,
    {
      isLoading: isLoadingUpdate,
      isError: isErrorUpdate,
      error: errorUpdate,
      data: dataUpdate,
    },
  ] = useUpdateProductMutation();

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const { register, handleSubmit, setValue } = useForm<Inputs>({
    defaultValues: {
      name: data?.name,
      price: data?.price,
      image: data?.image,
      brand: data?.brand,
      category: data?.category,
      countInStock: data?.countInStock,
      description: data?.description,
    },
  });

  useEffect(() => {
    if (data) {
      setValue('name', data.name);
      setValue('price', data.price);
      setValue('image', data.image);
      setValue('brand', data.brand);
      setValue('category', data.category);
      setValue('countInStock', data.countInStock);
      setValue('description', data.description);
    }
  }, [data]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    updateProduct({
      id: productId,
      name: data.name,
      price: data.price,
      image: data.image,
      brand: data.brand,
      category: data.category,
      countInStock: data.countInStock,
      description: data.description,
    });
  };

  const uploadFileHandler = async (e: unknown) => {
    // eslint-disable-next-line
    const file = ((e as Event).target as HTMLInputElement).files![0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post<string>('/api/upload', formData, config);
      setValue('image', data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploadError((error as AxiosError).message);
      setUploading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            data-cy="form-name"
            {...register('name', { required: false })}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="price" className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            placeholder="Enter price"
            {...register('price', { required: false })}
            data-cy="form-price"
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="countinstock" className="mb-3">
          <Form.Label>Count in stock</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter count in stock"
            {...register('countInStock', { required: false })}
            data-cy="form-count"
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="image" className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image url"
            {...register('image', { required: false })}
          ></Form.Control>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Control type="file" onChange={uploadFileHandler} />
          </Form.Group>
          {uploadError && <Message variant="danger">{uploadError}</Message>}
          {uploading && <Loader />}
        </Form.Group>

        <Form.Group controlId="brand" className="mb-3">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter brand"
            {...register('brand', { required: false })}
            data-cy="form-brand"
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="category" className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category"
            {...register('category', { required: false })}
            data-cy="form-category"
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="description" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            {...register('description', { required: false })}
            data-cy="form-description"
          ></Form.Control>
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="btn-block"
          data-cy="btn-update"
          disabled={isLoadingUpdate}
        >
          Update
        </Button>
      </Form>
      <div className='py-2'>
        {isLoadingUpdate && <Loader />}
        {isErrorUpdate && <ErrorMessage error={errorUpdate} />}
        {dataUpdate && <Message variant='success'>Updated successfully</Message>}
      </div>
    </>
  );
};

export default AdminProductEditForm;
