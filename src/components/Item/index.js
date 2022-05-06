import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserContext from '../../contexts/userContext';
import api from '../../utils/api';
import './index.css';

import { useLocalStorage } from '../hooks/useLocalStorage';

import Grid from '@mui/material/Grid';
import { Button, IconButton, Typography } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const Item = ({ setPostList }) => {
    const{user} = useContext(UserContext);
    var dayjs = require('dayjs');
    const [item, setItem] = useState(null);
    const [isUser, setIsUser] = useState(false);
    const params = useParams();
    const navigate = useNavigate();
    const { writeLS } = useLocalStorage();

    const handleClick = () => {
        api.deletePost(params.itemID)
            .then((data) => {
                setPostList((prevState) => prevState.filter(el => el._id !== params.itemID));
                navigate('/');
            })
            .catch((err) => alert(err));
    };

    const navigateToEditPage = () => {
        navigate(`edit`);
    };

    useEffect(() => {
        api.getPost(params.itemID)
            .then((data) => {
            setItem(data);
            if(user?._id === data.author._id){setIsUser(() => true )}
            else{ setIsUser(()=> false)}
            })
            .catch((err) => alert(err));
    }, []);
    return (
        <>
            {isUser ? (item && (
                <Grid container spacing={2} className='card' >
                    <Grid item container xs={6} alignContent='flex-start' spacing={3}>
                        <Grid item xs={12}>
                            <img
                                src={item.image}
                                alt='picture'
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <CardHeader
                            avatar={
                            <Avatar aria-label="recipe">
                                <img src = {item.author.avatar} />
                            </Avatar>
                            }
                            title = {item.author.name}
                            subheader= {dayjs(item.created_at).format('DD.MM.YYYY')}
                        />
                         <IconButton onClick={handleClick} sx={{ mb: 2 }}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton onClick={navigateToEditPage} sx={{ mb: 2 }}>
                                        <EditIcon />
                                    </IconButton>
                        
                        <Typography variant='h4' mb={3}>{item.title} </Typography>
                        {/* <Typography variant='caption'>{item.tags}</Typography> */}
                        <Typography variant='subtitle1'>
                            {item.text}
                        </Typography>
                    </Grid>
                </Grid>
            )
            ): (
                item && (
                <Grid container spacing={2} className='card'>
                    <Grid item container xs={6} alignContent='flex-start' spacing={3}>
                        <Grid item xs={12}>
                            <img
                                
                                src={item.image}
                                alt='picture'
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <CardHeader
                            avatar={
                            <Avatar aria-label="recipe">
                                <img src = {item.author.avatar} />
                            </Avatar>
                            }
                            title = {item.author.name}
                            subheader= {dayjs(item.created_at).format('DD.MM.YYYY')}
                        />
                        <Typography variant='h4' mb={3}>{item.title} </Typography>
                        {/* <Typography variant='caption'>{item.tags}</Typography> */}
                        <Typography variant='subtitle1'>
                            {item.text}
                        </Typography>
                    </Grid>
                </Grid>
            ))}
        </>
    );
};
