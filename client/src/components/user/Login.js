import { Close, Send } from '@mui/icons-material';
import { 
  Button,
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle, 
  IconButton, 
  TextField 
} from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import authService from '../../services/auth.service';
import { useValue } from '../context/ContextProvider'
import GoogleOneTapLogin from './GoogleOneTapLogin';
import PasswordField from './PasswordField';

const Login = () => {
  const {
    state: { openLogin },
    dispatch,
  } = useValue();
  const [title, setTitle] = useState("Login");
  const [isRegistr, setRegistr] = useState(false);
  const firstNameRef = useRef();
  const secondNameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleClose = () => {
    dispatch({ type: "CLOSE_LOGIN" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // if (!isRegister) return login({ email, password }, dispatch);

    const firstName = firstNameRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (password !== confirmPassword) {
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "error",
          message: "Passwords do not match",
        },
      });
      authService.register({email}, dispatch);
    }
  };
// заголовки
  useEffect(() => {
    isRegistr ? setTitle("Реєстрація") : setTitle("Вхід на сайт");
  }, [isRegistr]);
 

  return (
    <Dialog open={openLogin} onClose={handleClose}>
      <DialogTitle>
        {title}
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>
            Будь ласка, заповніть свою інформацію в поля нижче:
          </DialogContentText>
          {isRegistr && (
            <TextField
              autoFocus
              margin="normal"
              variant="standard"
              id="firstName"
              label="Ім’я"
              type="text"
              fullWidth
              inputRef={firstNameRef}
              inputProps={{ minLength: 2 }}
              required
            />
          )}
          {isRegistr && (
            <TextField
              autoFocus
              margin="normal"
              variant="standard"
              id="secondName"
              label="Прізвище"
              type="text"
              fullWidth
              inputRef={secondNameRef}
              inputProps={{ minLength: 2 }}
              required
            />
          )}
          {isRegistr && (
            <TextField
              autoFocus
              margin="normal"
              variant="standard"
              id="phone"
              label="Телефон"
              type="text"
              fullWidth
              inputRef={phoneRef}
              inputProps={{ minLength: 2 }}
              required
            />
          )}
          <TextField
            autoFocus={!isRegistr}
            margin="normal"
            variant="standard"
            id="email"
            label="Пошта"
            type="email"
            fullWidth
            inputRef={emailRef}
            required
          />
          <PasswordField {...{ passwordRef }} />
          {isRegistr && (
            <PasswordField
              passwordRef={confirmPasswordRef}
              id="confirmPassword"
              label="Підтвердіть пароль"
            />
          )}
        </DialogContent>
        <DialogActions sx={{ px: "19px" }}>
          <Button type="submit" variant="contained" endIcon={<Send />}>
            Submit
          </Button>
        </DialogActions>
      </form>
      <DialogActions sx={{ justifyContent: "left", p: "5px 24px" }}>
        {isRegistr
          ? "У вас є обліковий запис? Увійдіть зараз "
          : "У вас немає облікового запису? Створіть його зараз "}
        <Button onClick={() => setRegistr(!isRegistr)}>
          {isRegistr ? "Вхід на сайт" : "Реєстрація"}
        </Button>
      </DialogActions>
      <DialogActions sx={{ justifyContent: "center", py: "24px" }}>
        <GoogleOneTapLogin />
      </DialogActions>
    </Dialog>
  );
};

export default Login;