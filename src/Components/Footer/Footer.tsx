import { Container } from '@mui/system';
import React from 'react';
import styles from './footer.module.scss'
import FooterLeft from './FooterLeft/FooterLeft';
import FooterRight from './FooterRight/FooterRight';


const Footer:React.FC = () => {
    return (
        <Container className={styles.footer}
        sx={{background: 'black',
        color: 'white',
        display: 'flex',
        paddingTop: '52px'
           }}
           >
            <FooterLeft />
           <FooterRight />
        </Container>
    );
};

export default Footer;