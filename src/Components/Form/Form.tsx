import React, { useState } from 'react';
import styles from './form.module.scss'

interface Props  {
    title: string;
    handlClick: (email: string, password: string,name: string) => void;
}


const Form: React.FC<Props> = ({title, handlClick}) => {

    const [email,setEmail] = useState('');
    const [pass,setPass] = useState('');
    const [name,setName] = useState('');



    return (
        <div style={{display:'flex',
        flexDirection:'column'}}>
            <input className={styles.input}
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='email'

            />
            <input className={styles.input}
            type='password'
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder='password'
            />
            <input className={styles.input}
            type='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='name'
            maxLength={15}
            />

            <button className={styles.button_login} onClick={() => handlClick(email,pass,name)} >
                {title}
            </button>
        </div>
    );
};

export default Form;