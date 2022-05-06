import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import  UserContext  from '../../contexts/userContext'

import { Chip } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

export const Info = () => {
    const navigate = useNavigate();

    const { user } = useContext(UserContext);

    const navigateToCreatePage = () => {
        navigate('post/create');
    };
    const navigateToEditPage = () => {
        navigate('user/edit');
    }
    return (
        <div className='info'>
            <Stack direction="row" spacing={2}>
                    <Chip icon={<AddCircleOutlineIcon />} onClick ={navigateToCreatePage} label='Создать пост'  color="info" variant="outlined" />
                    <Chip avatar={<Avatar alt="Natacha" src = {user?.avatar} />} onClick ={navigateToEditPage} label={user?.name}  color="info" variant="outlined" />
            </Stack>
        </div>
    );
};
