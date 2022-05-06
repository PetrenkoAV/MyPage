import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../utils/api';
import './index.css';


import { useLocalStorage } from '../hooks/useLocalStorage';

import { Card as CardMUI } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { TryRounded } from '@mui/icons-material';
//import MoreVertIcon from '@mui/icons-material/MoreVert';

export const Card = ({ itemPost, isInFavorites, setFavorites }) => {
    const{ writeLS, removeLS } = useLocalStorage();
    var dayjs = require('dayjs');
    const [likes, setLikes] = useState(itemPost.likes.length);
    

    const addFavorite = () => {
        writeLS('favorites', itemPost._id);
        setFavorites((prevState) => [...prevState, itemPost._id]);
        api.addLike(itemPost._id)
            .then((addedItem) => {
                setLikes(() => addedItem.likes.length)
            })
            .catch(() => {
                alert('Не удалось добавить');
            });
    };

    const removeFavorite = () => {
        removeLS('favorites', itemPost._id);
        setFavorites((prevState) => prevState.filter((itemID) => itemPost._id !== itemID));
        api.deleteLike(itemPost._id)
            .then((removedItem) => {
                setLikes(() => removedItem.likes.length)
            })
            .catch(() => {
                alert('Не удалось удалить');
            });
    };

    return (
    
        <CardMUI className='card' >
        <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            <img src = {itemPost.author.avatar} />
          </Avatar>
        }
        title = {itemPost.author.name}
        subheader= {dayjs(itemPost.created_at).format('DD.MM.YYYY')}
        />
        <Link to={`post/${itemPost._id}`}>
            <CardMedia height="220" component='img' image={itemPost.image} alt={itemPost.text} />
        </Link>
            
            <CardContent>
                <Typography className ='zagolovok'  variant='h6' component='div'>
                    {itemPost.title}
                </Typography>
                <Typography className ='zagolovok'  variant='p' component='div'>
                    {itemPost.text}
                </Typography>
            </CardContent>

            <CardActions>
                {isInFavorites ? (
                    <IconButton aria-label='add to favorites' onClick={removeFavorite}>
                        <FavoriteIcon />
                    </IconButton>
                ) : (
                    <IconButton aria-label='add to favorites' onClick={addFavorite}>
                        <FavoriteBorderOutlinedIcon />
                    </IconButton>
                )}
                <Typography>
                    {likes}
                </Typography>
            </CardActions>
        </CardMUI>
    );
};
