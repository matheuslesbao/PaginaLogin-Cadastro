import './App.css';

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

import Axios from "axios";// Ligar o Front com o back-end

function App() {
  // Clicks
  const handleClickLogin = (values) => {
    Axios.post("http://localhost:3001/login", {
      email: values.email,
      password: values.password,
    }).then((response) =>{
        console.log(response);
    });
  }

  const handleClickRegistro = (values) => {
    Axios.post("http://localhost:3001/register", {
      email: values.email,
      password: values.password,
    }).then((response) => {
        console.log(response);
    });
  }
  //Validação

  const validationLogin = yup.object().shape({
    email: yup.string().email("Não é um e-mail").required("Campo Obrigatorio"),
    password: yup.string().min(8, "No minimo 8").required("Campo Obrigatorio"),
  });
  //Validação registro

  const validationRegistro = yup.object().shape({
    email: yup
    .string()
    .email("Não é um e-mail")
    .required("Campo Obrigatorio"),

    password: yup
    .string()
    .min(8, "No minimo 8")
    .required("Campo Obrigatorio"),

    confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Senhas não são iguais"),
  });

  // Separando
  return (
    <div className="container">
      <h1>Login</h1>
      <Formik
      initialValues={{}}
      onSubmit={handleClickLogin}
      validationSchema={validationLogin}
      >
        <Form className="login-form">

          <div className="login-form-group">
            <Field className="form-field"
            name="email" 
            placeholder="Email"
            />
              <ErrorMessage className='form-error'
                component="span"
                name="email"         
              />
          </div>

          <div className="login-form-group">
            <Field className="form-field"
            name="password" 
            placeholder="Senha"
            />
              <ErrorMessage className='form-error'
                component="span"
                type="password"
                name="password"
              
              />
          </div>
              <button className="button"
              type='submit'>Login
              </button>
        </Form>
      </Formik>

    {/* CADASTROOO */}

      <h1>Cadastro</h1>
      <Formik
      initialValues={{}}
      onSubmit={handleClickRegistro}
      validationSchema={validationRegistro}
      >
        <Form className="login-form">

          <div className="login-form-group">
            <Field className="form-field"
            name="email" 
            placeholder="Email"
            />
              <ErrorMessage className='form-error'
                component="span"
                name="email"         
              />
          </div>

          <div className="login-form-group">
            <Field className="form-field"
            name="password" 
            placeholder="Senha"
            />
              <ErrorMessage className='form-error'
                component="span"
                name="password"
              
              />
          </div>

          <div className="login-form-group">
            <Field className="form-field"
            name="confirmPassword" 
            placeholder="Confirme a Senha"
            />
              <ErrorMessage className='form-error'
                component="span"
                name="confirmPassword"
              
              />
          </div>
              <button className="button"
              type='submit'>Cadastrar
              </button>
        </Form>
      </Formik>
      
    </div>
  );
}
export default App;
