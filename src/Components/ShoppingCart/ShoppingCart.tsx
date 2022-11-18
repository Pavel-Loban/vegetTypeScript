import React from 'react';
import styles from './shopping.module.scss';
import TableCart from '../Table/TableCart';
import { useSelector } from "react-redux";
import Button from 'Components/Button/Button';


const ShoppingCart:React.FC = () => {
  const total = useSelector((state:any) => state.orderCreator.totalPrice);

    return (
      <>
  {  total ? <div>
    <TableCart />

<div className={styles.total}>
  Total: $ {total}
</div>
<div className={styles.order} >
<Button text='Order'/>
</div>
</div>
: <div style = {{display: 'flex',
justifyContent: 'center',
alignItems: 'center',
fontSize: '30px',
fontWeight: '900'}}>Cart is empty</div> }

    </>
    );
};



export default  ShoppingCart;