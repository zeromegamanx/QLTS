import React, {useState, useEffect} from 'react'; 
import PropTypes from 'prop-types';
import {useSnackbar} from 'notistack'; 
import { 
    Grid, 
    Box, 
    Button, 
    FormControl, 
    FormHelperText, 
    IconButton, 
    InputAdornment, 
    InputLabel, 
    OutlinedInput, 
    Stack, 
    Typography, 
    TextField, 
    Hidden,
    Paper,
} from '@mui/material'; 
import {useForm, Controller} from 'react-hook-form'; 
import CircularProgress from '@mui/material/CircularProgress';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {makeStyles} from '@mui/styles'; 
import { useNavigate } from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import logoImage from '../../images/logos/kse_logo.png'; 
import imageLogin from '../../images/loginImage.ipg'; 

function LoginForm(props) {
    const {loginPage, onLogin, onReset, onGetUserDataAction, pathname, onSetPathNameAction} = props;
    const {t} = useTranslation(); 
    const classes = useStyle(); 
    const {enqueueSnackbar} = useSnackbar(); 
    const navigate = useNavigate();
    const {
        control,
        handleSubmit, 
        formState: {errors}, 
    } = useForm({
        defaultValues: {
            userName: '', 
            password: '',
        },
    });
    const [showPassword, setShowPassword] = useState(false); 
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword); 
    }; 

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }; 
    
    const onSubmit = (data) => {
        onLogin({
            ...data, 
            isLdap: false, 
        });
    };

    useEffect(() => {
        if (loginPage.success) {
            enqueueSnackbar(t('authPage.dangNhapThanhCong'), {variant: 'success'}); 
            onReset();
            onGetUserDataAction(); 
            if (pathname && pathname !== '/auth/login') {
                navigate(pathname);
                onSetPathNameAction(null); 
            } else {
                navigate('/');
            }
        }
    }, [loginPage.success]);
    
    useEffect(() => {
        if (loginPage.error) {
            if(
                loginPage.data && 
                (loginPage.data.message === 'Wrong credential' ||
                    loginPage.data.message === 'Invalid username/password')
            ) {
                enqueueSnackbar(t('authPage.thongTinDangNhapKhongDung'), {variant:'error'}); 
            } else if (loginPage.data && loginPage.data.message === 'Employed is locked') {
                enqueueSnackbar(t('authPage.taiKhoanBiKhoa'), {variant: 'error'});
            } else {
                enqueueSnackbar(t('authPage.heThongDangBan'), {variant: 'error'});
            }
            onReset(); 
        }
    }, [loginPage.error]);

    return ( 
        <> 
        <Paper className={classes.containerForm}>
            <Grid container>
                <Grid item md={6} xs={12} sm={6} style={{padding:'40px'}}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={3}>
                            <Grid item md={12} sm={12} xs={12} textAligh="center">
                                <Typography sx={{fontWeight: 'bold', fontSize:'20px'}} color='primary'>
                                    {t('authPage.dangNhapThanhCong')}
                                </Typography>
                            </Grid>
                            <Grid item md={12} sm={12} xs={12}>
                                <Controller
                                    rules={{
                                        required: {
                                            value: true, 
                                            message: t('khongDuocDeTrong'),
                                        },
                                    }}
                                    name="userName"
                                    control={control}
                                    render={({ field: {onChange, value}}) => (
                                        <TextField 
                                            label={t('authPage.userName')}
                                            value={value}
                                            onChange={onChange}
                                            fullWidth
                                        />
                                    )}/>
                                <FormHelperText error> {errors.userName?.message} </FormHelperText>
                            </Grid>
                            <Grid item md={12} sm={12} xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel>{t('authPage.matKhau')}</InputLabel>
                                    <Controller
                                        rules={{
                                            required: {
                                                value: true, 
                                                message: t('khongDuocDeTrong'),
                                            },
                                        }}
                                        name="password"
                                        control={control}
                                        render={({field: {onChange, value}})=> (
                                            <OutlinedInput 
                                                label={t('authPage.matKhau')}
                                                type={showPassword ? 'text': 'password'}
                                                value={value || ''}
                                                onChange={onChange}
                                                endAdorment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                            size="large"
                                                        >
                                                            {showPassword ? <Visibility/> : <VisibilityOff/>}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        )}
                                        />
                                        <FormHelperText sx={{m: 0}} error>
                                            {errors.password?.message}
                                        </FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item md={12}>
                                <Stack 
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    spacing={1}>
                                </Stack>
                            </Grid>
                        </Grid>
                        {errors.submit &&(
                            <Box sx={{mt: 3}}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}
                        <Box sx={{mt:2}}>
                            <Button 
                                fullWidth
                                size="large"
                                type="submit"
                                variant="container"
                                color="primary"
                                disabled={loginPage.loading}>
                                    {loginPage.loading ? <CircularProgress size={24}/>: 'ĐĂNG NHẬP' }
                            </Button>
                        </Box>
                    </form>
                </Grid>
            </Grid>
        </Paper>
        </>
    );
}

LoginForm.propTypes = {
    onLogin: PropTypes.func, 
    onReset: PropTypes.func, 
    loginPage: PropTypes.object, 
    onGetUserDataAction: PropTypes.func,
}; 

export default LoginForm 
