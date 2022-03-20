import axios from 'axios';

export const createProduct = async (arg) => {
  const response = await axios.post('http://localhost:5656/commonroutes', arg);
  const { data } = response;
  const { status } = data;
  if (status !== 'success') {
    throw new Error(status);
  }
  return data;
};

export const uploadImageToAwsS3 = async (photo) => {
  //  console.log('rohan',photo)
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };

  const response = await axios.post(
    'http://3.16.128.64:8000/api/v1/upload',
    photo,
    config
  );

  // const { data } = response;
  // const { status } = data;
  // if(status !== "success") {
  //   throw new Error(status);
  // }
  return response.data;
};
