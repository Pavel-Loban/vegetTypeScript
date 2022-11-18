import React from 'react'
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import RenderProducts from 'Components/RenderProducts/RenderProducts';

const Fruits = () => {

  const navigate = useNavigate();
  const { fruits, status } = useSelector((state) => state.orderCreator);
  const { searchValue } = useSelector((state) => state.sort);

  const sortType = useSelector((state) => state.sort.sort);

  const toItem = (id) => {
    navigate(`/fruits/${id}`)
  };

  const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
  const sortBy = sortType.sortProperty.replace('-', '');
  const search = searchValue ? `&search=${searchValue}` : '';

  const newArr = `https://63374daf132b46ee0be02302.mockapi.io/fruits?sortBy=${sortBy}&order=${order}${search}`;

  return (

    <div>
      <RenderProducts array={fruits} newArr={newArr} status={status} toItem={toItem} />
    </div>

  );
}

export default Fruits
