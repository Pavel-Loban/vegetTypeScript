import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { IconButton } from '@mui/material'
import { green, yellow, red } from '@mui/material/colors'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useDispatch, useSelector } from "react-redux";
import { removeGoodInCart,addGoodInCart, deleteGood} from '../../slice/orderCreatorSlice';

type Props = {
  id: number ;
  name: string;
  count: number;
  total: number;
  index: number;
  price: number;
}

const TableRows: React.FC<Props> = ({
  id,
  name,
  count,
  total,
  index,
  price
}) => {

  const dispatch = useDispatch()


  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell align="right">{name}</TableCell>
        <TableCell align="right">{count}</TableCell>
        <TableCell align="right">{price}</TableCell>
        <TableCell align="right">{total}$</TableCell>
        <TableCell align="right">


          <IconButton
          // onClick={() => dispatch(removeGoodInCart({id}))}
          onClick={() => dispatch(removeGoodInCart({id,count}))}
          >
            <IndeterminateCheckBoxIcon sx={{ color: yellow[900] }} />
          </IconButton>
          <IconButton
          onClick={() => dispatch(addGoodInCart({id, count}))}
          >
            <AddBoxIcon sx={{ color: green[500] }} />
          </IconButton>
          <IconButton
          onClick={() => dispatch(deleteGood({
            id,
            name: '',
            count: 0,
            price: 0,
            total: 0,
            array: '',
            title: '',
            productsName: ''
          }))}
          >
            <DeleteForeverIcon sx={{ color: red[500] }} />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  )
}

const TableCart = () => {
  const cartItems = useSelector((state: any) => state.orderCreator.cartItems);
  const dispatch = useDispatch();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="right">Item</TableCell>
            <TableCell align="right">Count</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.map((item: any, index: number) => {
            return (
              <TableRows
                {...item}
                key={item.id}
                index={index}
                // onIncrease={onIncrease}
                // removeBeveragesInCart={removeBeveragesInCart}
              />
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

//

export default (TableCart)
