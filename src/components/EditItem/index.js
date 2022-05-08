import React, { useEffect, useState } from 'react';
import { Grid, TextField, Button, Typography } from '@mui/material';

import api from '../../utils/api';
import { useNavigate, useParams } from 'react-router-dom';

export const EditItem = ({ setPostList }) => {
    const params = useParams();
    const navigate = useNavigate();

    const [title, setТitle] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState('');
    const [rawTags, setRawTags] = useState('');

    const handleClick = () => {
        let tags = rawTags.split(',');
        api.editPost(params.itemID, {
            image,
            tags,
            title,
            text,
        })
            .then((data) => {
                navigate('/');
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    useEffect(() => {
        api.getPost(params.itemID).then((data) => {
            setТitle(data.title);
            setText(data.text);
            setImage(data.image);
            setTags(data.tags.join(','));
        });
    }, []);

    return (
        <Grid container flexDirection='column' spacing='10'>
            <Grid item>
                <Typography variant='h3'>Редактировать пост </Typography>
            </Grid>
            <Grid item>
                <TextField
                    fullWidth
                    label='Заголовок поста'
                    variant='outlined'
                    value={title}
                    onChange={({ target }) => {
                        setТitle(target.value);
                    }}
                />
            </Grid>
            <Grid item>
                <TextField
                    fullWidth
                    label='Тэги через запятую'
                    variant='outlined'
                    value={rawTags}
                    onChange={({ target }) => {
                        setRawTags(target.value);
                    }}
                />
            </Grid>
            <Grid item>
                <TextField
                    fullWidth
                    label='Текст поста'
                    variant='outlined'
                    value={text}
                    onChange={({ target }) => {
                        setText(target.value);
                    }}
                />
            </Grid>
            <Grid item>
                <TextField
                    fullWidth
                    label='Ссылка на картинку'
                    variant='outlined'
                    value={image}
                    onChange={({ target }) => {
                        setImage(target.value);
                    }}
                />
            </Grid>
            <Grid item>
                <Button onClick={handleClick} variant='contained' color='secondary' size='small'>
                    Сохранить
                </Button>
            </Grid>
        </Grid>
    );
};
