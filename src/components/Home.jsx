import { Button, Typography } from '@mui/material';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../hooks/useAuth';
import { logout } from '../redux/auth';


export default function(props) {
    const { currentUser } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    useAuth();

    const logoutButtonClickHandler = React.useCallback(() => {
        dispatch(logout())
    }, [])
    return (<>
        <Typography variant='h1'>Home</Typography>
        {currentUser && <Typography>Welcome, {currentUser.username}</Typography>}
        <Button variant='outlined' onClick={logoutButtonClickHandler}>Log Out</Button>
    </>)
}