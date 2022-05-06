import React from 'react';
import './index.css';
import telegram from '../../../public/assets/svg/telegram.svg';
import instagram from '../../../public/assets/svg/instagram.svg';
import viber from '../../../public/assets/svg/viber.svg';
import whatsapp from '../../../public/assets/svg/whatsapp.svg';
import vk from '../../../public/assets/svg/vk.svg';
import Logo from '../Logo';

export const Footer = () => {
    return (
        <footer className='footer'>
                    <div className='footer__col'>
                        {/* <Logo className='logo footer__logo' href='#' title='Логотип' /> */}
                        <p className='footer__copyright'>© «ReactPosts»</p>
                    </div>
        </footer>
    );
};
