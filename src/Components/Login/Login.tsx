import React from 'react';
import Form from 'Components/Form/Form';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { setUser } from 'slice/userSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { useAppDispatch } from 'hooks/redux-hooks';


const Login:React.FC = () => {

  const dispatch = useAppDispatch()
  const push = useNavigate()

  const handleLogin = (email: string, password: string,name: string) => {

    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
            nameUser: name,
          }),
        )
        push('/')
      })
      .catch(() => alert('Invalid user!'))
  }
  return (
  <Form
  title="sign in"
  handlClick={handleLogin}
  />
  )
}

export default Login
