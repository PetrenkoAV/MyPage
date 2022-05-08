import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import api from './utils/api';

import Logo from './components/Logo';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { List } from './components/List';
import { Item } from './components/Item';
import { CreateItem } from './components/CreateItem';
import { EditItem } from './components/EditItem';
import  UserContext from './contexts/userContext';
import { EditUser } from './components/EditUser';

import './index.css';
import { Info } from './components/Info';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#fed700;',
        },
        secondary: {
            main: '#FF0000',
        },
        info: {
            main: '#212121',
        },
    },
});

export const App = () => {
    const [postList, setPostList] = useState(null);
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
    const [user, setUser] = useState(null);


    useEffect(() => {
        api.getCurentUser().then((user) => setUser(user));
    }, []);

    useEffect(() => {
        api.getPosts().then((list) => setPostList(list));
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <UserContext.Provider value={{user, setUser}}>
            <div className='appContainer'>
                <Header>
                    <Logo />
                    <Info favorites={favorites} />
                </Header>
                <div className='content container'>
                    <Routes>
                        <Route
                            path='/'
                            element={
                                <div className='content__cards'>
                                    <List
                                        list={postList}
                                        favorites={favorites}
                                        setFavorites={setFavorites}
                                    />
                                </div>
                            }
                        />
                        <Route path='post/:itemID' element={<Item setPostList={setPostList}/>} />
                        <Route path='post/:itemID/edit' element={<EditItem setPostList={setPostList} />} />
                        <Route path='post/create' element={<CreateItem />} />
                        <Route path='user/edit' element={<EditUser />} />
                    </Routes>
                </div>
                <Footer />
                
            </div>
            </UserContext.Provider>
        </ThemeProvider>
    );
};
