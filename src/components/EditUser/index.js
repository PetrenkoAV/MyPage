import React, { useContext, useEffect, useState } from 'react'
import{Grid, Typography, TextField, Button} from '@mui/material';
import UserContext from '../../contexts/userContext';
import api from '../../utils/api';

export const EditUser = () => {
    const{user, setUser} = useContext(UserContext);
    const[userName, setUserName] = useState("");
    const[userAbout, setUserAbout] = useState('');

    const handleClick = () => {
        api.editCurrentUser({ name: userName, about: userAbout })
        .then((data) => {
            setUser(data);
        })
        .catch((err)=> alert(err));
    }
    useEffect(() => {
        if(user) {
            setUserName(user.name);
            setUserAbout(user.about)
        }
    },[user])
  return (
    <Grid container flexDirection='column' spacing='10'>
            <Grid item>
                <Typography variant='h3'>Редактировать юзера </Typography>
            </Grid>
            <Grid item>
                <TextField
                    fullWidth
                    label='имя'
                    variant='outlined'
                    value={userName}
                    onChange={({ target }) => {
                        setUserName(target.value);
                    }}
                />
            </Grid>
            <Grid item>
                <TextField
                    fullWidth
                    label='доп инфо'
                    variant='outlined'
                    value={userAbout}
                    onChange={({ target }) => {
                        setUserAbout(target.value);
                    }}
                />
            
            </Grid>
            <Grid item>
                <Button onClick ={handleClick}  variant='contained' color='secondary' size='small'>
                    Сохранить
                </Button>
            </Grid>
        </Grid>
  )
}
