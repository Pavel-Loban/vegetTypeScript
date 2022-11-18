import React from 'react';
import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'Components/Form/Form';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {setUser} from 'slice/userSlice'
import { useAppDispatch } from 'hooks/redux-hooks';

const SingUp:React.FC = () => {


    const dispatch = useAppDispatch();
    const push = useNavigate();

    const handleRegister = (email: string,password: string,name: string) => {

        const auth = getAuth();
        console.log(auth)
        createUserWithEmailAndPassword(auth,email,password)
        .then(({user}) => {
            console.log(user);
            dispatch(setUser({
                email: user.email,
                id: user.uid,
                token: user.refreshToken,
                nameUser: name,
            }));
            push('/')
        })
        .catch(console.error)
    }

    return (
        <Form
        title='register'
        handlClick={handleRegister}
        />
    );
};

export default SingUp;

function RootState(arg0: { email: string | null; id: string; token: any; nameUser: string; }): any {
    throw new Error('Function not implemented.');
}
