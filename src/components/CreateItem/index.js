import React from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../../utils/api';

import { TextField, Grid, Button, Typography } from '@mui/material';

export const CreateItem = ({ setPostList }) => {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const {
            target: { inputTitle, inputText, inputImg, inputTags },
        } = event;
        api.addPost({
            title: inputTitle.value, 
            text: inputText.value,
            image: inputImg.value,
            tags: inputTags.value.split(','),
        })
            .then((data) => {
                setPostList((prevState) => [...prevState, data]);
                navigate('/');
            })
            .catch((err) => alert(err));
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container flexDirection='column' spacing='10'>
                <Grid item>
                    <Typography variant='h3'>Создать пост </Typography>
                </Grid>
                <Grid item>
                    <TextField fullWidth label='Заголовок' name='inputTitle' variant='outlined' />
                </Grid>
                <Grid item>
                    <TextField fullWidth label='Текст' name='inputText' variant='outlined' />
                </Grid>
                <Grid item>
                    <TextField fullWidth label='Ссылка на изображение' name='inputImg' variant='outlined' />
                </Grid>
                <Grid item>
                    <TextField fullWidth label='Тэги через запятую' name='inputTags' variant='outlined' />
                </Grid>
                <Grid item>
                    <Button type='submit' variant='contained' color='secondary' size='small'>
                        Добавить пост
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};
