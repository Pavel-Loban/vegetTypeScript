
import React from 'react';
import { Link } from 'react-router-dom'
import Carusel from '../../Components/Carusel/Carusel';
import { Navigate  } from 'react-router-dom';
import {useAuth} from '../../hooks/use-auth'
import { useDispatch, useSelector} from 'react-redux';
import {removeUser} from '../../slice/userSlice'
import './home.scss';

const Home: React.FC = () => {

  React.useEffect(() => {
    window.scrollTo(0,0);
  },[])

  const {isAuth} = useAuth();

  return (
  // isAuth ? (
    <>
    <div className={'home'}>
      <Carusel />
    </div>
    </>
  // ) : (
  //   <>
  //   <Navigate to='/login'/>
  //   </>
  )
}

export default Home
