import React, { useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import Cards from '../_common/Cards/Cards';
import { useNavigate } from 'react-router';
import SceletonCard from '../_common/Cards/sceletonCard';
import Sort, { menuListVisible } from '../Sort/Sort';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGoods } from '../../slice/orderCreatorSlice';
import { selectFilters } from '../../slice/sortSlice';
import qs from 'qs';
import { RootState } from 'slice';
import { useAppDispatch } from 'hooks/redux-hooks';

type SortItem = {
  name: string;
  sortProperty: string;
}

type Props = {
  array: any[];
  newArr: string;
  pageName: string;
  toItem: (id: number) => void;
}


const RenderProducts: React.FC<Props> = ({array,pageName, newArr, toItem }) => {
// console.log('array:',array,'newArr:',newArr)
  const navigate = useNavigate();
  // const { array, newArr, toItem } = props;
  const dispatch = useAppDispatch();
  const { status } = useSelector((state: RootState) => state.orderCreator);
  const { searchValue } = useSelector((state:RootState) => state.sort);

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);


  const sortType = useSelector((state:RootState) => state.sort.sort);



  const getProduct = async () => {

    dispatch(

      fetchGoods( {newArr}))

    window.scrollTo(0, 0);
  }

  // Если изменили URL параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
      });

      navigate(`?${queryString}`)
    }
    window.scrollTo(0, 0);
    isMounted.current = true;
  }, [sortType, searchValue]);

  // Если был первый рендер, то проверяем URL параметры и сохраняем их
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = menuListVisible.find((obj) => obj.sortProperty === params.sortProperty)
      // console.log(sort)
      dispatch(
        selectFilters({
          ...params,
          sort,
        }),
      )
      isSearch.current = true;
    }
  }, [])

  useEffect(() => {
    getProduct()
    window.scrollTo(0, 0);
  }, [sortType, searchValue]);



  return (
    (
      <div
      >
        <Container sx={{ pb: 2 }}>
          <Sort />
          <Typography variant="h2" component="h6" sx={{ textAlign: 'center' }}>
            {status === 'loading' ? 'Loading...' : status === 'error' ? 'Something went wrong' : array.length === 0 ? 'Nothing found' : `${pageName}`}
          </Typography>
        </Container>
        <Grid container spacing={2}>
          {status === 'loading' ? [...new Array(6)].map((item, i) => <SceletonCard key={i} />)
            : array.map((item) => <Cards item={item} key={item.id} toItem={toItem}
            />
            )}
        </Grid>
      </div>

    )
  )
}

export default RenderProducts;