import React from 'react';
import { Typography, Button } from '@mui/material'
import { addedGoodInCart } from '../../slice/orderCreatorSlice';
import {  useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { RootState } from 'slice';

// type Good = {
//   id: number,
//     rating: string,
//     price: number,
//     imgSrc: string,
//     title: string,
// }

interface Props  {
  // item: Good[];
  id: number;
  count: number;
  setCount: (count: number) => void;
}

const Buttons: React.FC<Props> = ({id, count, setCount }) => {

  const countGood = useAppSelector((state: RootState) => state.orderCreator.countGood);
  const dispatch = useAppDispatch();
  const beverages = useAppSelector((state: RootState) => state.orderCreator.beverages)

  const counterAdd = () => {
    setCount(count + 1);
  }

  const counterSubtract = () => {
    setCount(count > 1 ? count - 1 : 1);
  }


  const addGood = () => {
    dispatch(addedGoodInCart({ id,count}))
    setCount(1)
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: 100
      }}>
        <Button variant='contained'
          sx={{
            background: 'black',
            minWidth: 30,
            height: 25,
            ':hover': { background: '#7FAD39' },
            padding: 0,
          }}
          onClick={counterSubtract}>
          - </Button>
        <Typography>{count}</Typography>
        <Button
          variant='contained'
          sx={{
            background: 'black',
            minWidth: 30,
            height: 25,
            ':hover': { background: '#7FAD39' },
            padding: 0
          }}
          onClick={() => counterAdd()}

        >+</Button>
      </div>
      <Button variant='contained'
        sx={{
          background: '#7FAD39',
          ':hover': { background: 'black' },
          height: 25,
          padding: 0
        }}
        onClick={() => addGood()}
      >add</Button>
    </div>

  );
};



export default
  (Buttons);