import React from 'react'
import {useDispatch} from 'react-redux';
import { LOGIN } from '../../../constants/actionTypes';
import { Formik, Form } from 'formik';
import MyTextInput from '../../common/MyTextInput';
import validationFields from './validation';

const LoginPage = () => {
    const initState = {
        email: '',
        password: ''
    }

    const dispatch = useDispatch();
    const onSubmitHandler=(values) => {
        dispatch({type: LOGIN, payload: values.email});
        console.log("values submit vf", values)
    }
    return (
        <div className="row">
        <div className="offset-md-3 col-md-6">
        <h1 className="text-center">Вхід на сайт</h1>

            <Formik
                initialValues={initState}
                validationSchema = {validationFields()}
                onSubmit={onSubmitHandler}
            >
                <Form>
                    <MyTextInput
                        label="Пошта"
                        id="email"
                        name="email"
                        type="text"
                    />

                     <MyTextInput
                        label="Пароль"
                        id="password"
                        name="password"
                        type="password"
                    />
                     <input type="submit" className="btn btn-success" value="Вхід"></input>
                </Form>
            </Formik>

            </div>


            </div>
    )
}

export default LoginPage;  