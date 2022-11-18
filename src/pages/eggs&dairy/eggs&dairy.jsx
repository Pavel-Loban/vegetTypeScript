import React from 'react'
import { useNavigate } from 'react-router';
import { useSelector} from 'react-redux';
import RenderProducts from 'Components/RenderProducts/RenderProducts';

const EggsDairy = () => {

  const navigate = useNavigate();
  const {eggs,status} = useSelector((state) => state.orderCreator);
  const { searchValue } = useSelector((state) => state.sort);



  const sortType = useSelector((state) => state.sort.sort);

  const toItem = (id) => {
    navigate(`/eggs&dairy/${id}`)
  };



    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
  const sortBy = sortType.sortProperty.replace('-', '');
  const search = searchValue ? `&search=${searchValue}` : '';

  const newArr = `https://63374daf132b46ee0be02302.mockapi.io/eggs?sortBy=${sortBy}&order=${order}${search}`;

    return (
             <div>
              <RenderProducts array={eggs} newArr={newArr} status={status} toItem={toItem} />
            </div>

    );
}

export default EggsDairy;