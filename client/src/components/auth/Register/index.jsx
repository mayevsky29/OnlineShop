import React, { useRef } from "react";
import { Formik, Form } from "formik";
import authService from "../../../services/auth.service";
import TextBoxField from "../../common/TextBoxField";
import { useNavigate  } from "react-router-dom";
import { useDispatch } from "react-redux";
import validationFields from "./validation";
import { REGISTER } from "../../../constants/actionTypes";
import MyPhotoInput from "../../common/MyPhotoInput";

const RegisterPage = () => {
  const initState = {
    email: "",
    phone: "",
    firstName: "",
    secondName: "",
    photo: null,
    password: "",
    confirmPassword: "",
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const refFormik = useRef();

  const onSubmitHandler = async (values) => {
    try {
      console.log("submit data ", values);

      console.log("Server submit file", JSON.stringify(
          { 
            fileName: values.photo.name, 
            type: values.photo.type,
            size: `${values.photo.size} bytes`
          }
        ));

      //const result = await authService.register(values);
      //console.log("Server is good ", result);
      //dispatch({type: REGISTER, payload: values.email});
      //history.push("/");
    } 
    catch (error) {
      console.log("Server is bad ", error.response);
    }
  };
  return (
    <div className="row">
      <div className="offset-md-3 col-md-6">
        <h1 className="text-center">Реєстрація</h1>
        <Formik
          innerRef={refFormik}
          initialValues={initState}
          validationSchema={validationFields()}
          onSubmit={onSubmitHandler}
        >
          <Form>
            <TextBoxField
              label="Електронна пошта"
              name="email"
              id="email"
              type="email"
            />

            <TextBoxField 
            label="Телефон" 
            name="phone" 
            id="phone" 
            type="text" />

            <TextBoxField
              label="Прізвище"
              name="secondName"
              id="secondName"
              type="text"
            />

            <TextBoxField
              label="Ім'я"
              name="firstName"
              id="firstName"
              type="text"
            />

            <MyPhotoInput
              refFormik={refFormik}
              field="photo"
            />

            <TextBoxField
              label="Пароль"
              name="password"
              id="password"
              type="password"
            />

            <TextBoxField
              label="Підтвердження пароль"
              name="confirmPassword"
              id="confirmPassword"
              type="password"
            />

            <button type="submit" className="btn btn-primary">
              Реєстрація
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default RegisterPage;
