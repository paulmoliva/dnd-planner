import { TextField, Grid, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useDispatch } from 'react-redux';
import { signupUser } from '../redux/thunks/auth';

const useStyles = makeStyles({
    signupForm: {
        height: 1000,
        marginTop: 20
    },
    authFormField: {
        margin: '0 auto',
        marginBottom: '17px',
        width: 500
    }
})

export default function(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [ email, setEmail ] = React.useState('')
    const emailInputHandler = React.useCallback(
        (e) => {
            setEmail(e.target.value)
        },
        [setEmail],
    )
    const [ username, setUsername ] = React.useState('')
    const usernameInputHandler = React.useCallback(
        (e) => {
            setUsername(e.target.value)
        },
        [setUsername],
    )

    const [ password, setPassword ] = React.useState('')
    const passwordInputHandler = React.useCallback(
        (e) => {
            setPassword(e.target.value)
        },
        [setPassword],
    )

    const signupButtonClickHandler = React.useCallback(() => {
        dispatch(signupUser({ email, username, password }))
    })

    const submitEnabled = React.useMemo(() => email.length && username.length && password.length, [email, username, password])

    return (<>
        <Typography variant='h1'>Sign Up</Typography>
            <Grid className={classes.signupForm} container direction='column'>
                <div className={classes.authFormField}>
                    <TextField id='email-input' variant='outlined' onChange={emailInputHandler} value={email} label='Email' size='medium' fullWidth required/>
                </div>
                <div className={classes.authFormField}>
                    <TextField id='username-input' variant='outlined' onChange={usernameInputHandler} value={username} label='Username' size='medium' fullWidth required/>
                </div>
                <div className={classes.authFormField}>
                    <TextField id='password-input' variant='outlined' onChange={passwordInputHandler} value={password} type="password" label='Password' size='medium' fullWidth required/>
                </div>
                <div className={classes.authFormField}>
                    <Button variant='outlined' onClick={signupButtonClickHandler} disabled={!submitEnabled}>Sign Up</Button>
                </div>
            </Grid>
    </>)
}