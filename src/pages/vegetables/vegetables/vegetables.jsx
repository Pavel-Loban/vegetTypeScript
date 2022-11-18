import React from 'react'
import { useNavigate } from 'react-router';
import { useSelector} from 'react-redux';
import RenderProducts from 'Components/RenderProducts/RenderProducts';

const Vegetables = () => {

  const navigate = useNavigate();
  const {vegetables, status} = useSelector((state) => state.orderCreator)
  const { searchValue } = useSelector((state) => state.sort);

  const sortType = useSelector((state) => state.sort.sort);


  const link = '/vegetables';

  const toItem = (id) => {
    navigate(`${link}/${id}`);
  };

    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
  const sortBy = sortType.sortProperty.replace('-', '');
  const search = searchValue ? `&search=${searchValue}` : '';

  const newArr = `https://63374daf132b46ee0be02302.mockapi.io/nuts?sortBy=${sortBy}&order=${order}${search}`;


    return (

             <div>
              <RenderProducts array={vegetables} newArr={newArr} status={status} toItem={toItem} />
            </div>

    );
};

export default Vegetables;