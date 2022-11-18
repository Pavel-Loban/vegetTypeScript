import React from 'react';
import { Card, CardContent, CardMedia, Grid,IconButton,ThemeProvider, Typography} from '@mui/material';
import { Container } from '@mui/system';
import Buttons from '../../Buttons/Buttons';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { createTheme } from '@mui/material/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {useDispatch} from 'react-redux';
import  {addLikes, decLikes} from '../../../slice/orderCreatorSlice';

type Props = {
  item: {
    imgSrc: string,
    title: string,
    price: number,
    id:number,
    rating: number,
  }
  toItem: (value: number) => void
}

const Cards:React.FC<Props> = ({item,toItem}) => {
const {id,price, title, imgSrc,rating} = item;

const dispatch = useDispatch();
  const [hearts,setHearts] = React.useState(true);
  const [count, setCount] = React.useState(1);

  const theme = createTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#3f50b5',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: 'red',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  });

  const changeHeart = () => {
    setHearts((previousState ) => !previousState)
    if(hearts){
      dispatch(addLikes())
    }else{
      dispatch(decLikes())
    }
  }


    return (
        <>
                  <Grid item xs={12} sm={6} md={4} key={id}>
                    <Card sx={{ margin: '0 auto',  width: 300 }}>
                      <CardMedia
                        image={imgSrc}
                        component='img'
                        alt={title}
                        title={title}
                        sx={{ height: 200,cursor: 'pointer' }}
                        onClick={() => toItem(id)}
                      />
                      <CardContent sx={{display: 'flex',
                    paddingLeft: '0'}}>
                      <Container>
                      <Typography
                        variant='h6'
                        component='h3'
                        sx={{ cursor: 'pointer',
                        ':hover':{color: '#7FAD39'}, }}
                        onClick={() => toItem(id)}
                        >{title}</Typography>
                        <Typography
                        variant='body1'
                        >{item.price} $</Typography>
                      </Container>
                      <Container style={{paddingLeft: 0}}>
                      <ThemeProvider theme={theme}>
                        <IconButton onClick={changeHeart} style={{ height: 30,width: 30, float: 'right'}}>
                        {hearts ? <FavoriteBorderIcon/> : <FavoriteIcon
                        color='secondary'
                         /> }
                        </IconButton>
                        </ThemeProvider>

                      </Container>
                      </CardContent>
                      <Container sx={{mb:2}}>
                        <Buttons  id={id}  count={count}  setCount={setCount}  />
                      </Container>
                    </Card>
                  </Grid>
        </>
    );
};

export default Cards;