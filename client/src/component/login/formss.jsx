import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { Alert, Space,Spin } from 'antd';
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin,setSuccess } from "../../state/index";
import { SmileOutlined,FrownOutlined } from '@ant-design/icons';
import {  notification } from 'antd';
/*import Dropzone from "react-dropzone"; */


const registerSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    cnfpassword: yup.string().required("required"),
  
});

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
  });

  const initialValuesRegister = {
 
    email: "",
    password: "",
    cnfpassword:""
    
  };
  
  const initialValuesLogin = {
    email: "",
    password: "",
  };

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const [isLoggedin,setIsloggedin] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [sel,onsel] = useState(false);

  const openNotification = () => {
    api.open({
      message: 'Success',
      description:
        'You have been successfully logged in',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  };
  const openNotificationbad = (ded) => {
    api.open({
      message: 'Error',
      description:ded,
      icon:<FrownOutlined style={{ color: '#108ee9' }} />,
    });
  };

  const openNotificationRegister = () => {
    api.open({
      message: 'Success',
      description:
        'You have been successfully Registred. All set for login!',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  };

  const openNotificationwarnig = (sd) => {
    api.open({
      message: 'Wait',
      description:sd,
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  };

  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    if(values.password === values.cnfpassword){
      const formData = new FormData();
    for (let value in values) {
        console.log(values.password)
      formData.append(value, values[value]);
    }
    

     const savedUserResponse = await fetch(
      "https://interactive-ax75.onrender.com/auth/register",
      {
        method: "POST",
        headers: {  "Access-Control-Allow-Origin":"*",
        "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    const savedUser = await savedUserResponse.json();
    if (savedUser) {
      openNotificationRegister();
      setTimeout(() => setPageType("login"), 300)
      onsel(false)
      
    } 
    
    console.log("register") 

    }else{
      openNotificationbad('Password and Confirm password not matched')
      onsel(false)

    }


    onSubmitProps.resetForm();

  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("https://interactive-ax75.onrender.com/auth/login", {
      method: "POST",
      headers: { "Access-Control-Allow-Origin":"*",
      "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    if(loggedIn.user==null){
      openNotificationbad('Invalid Username and Passowrd');
      onsel(false)
    }
    onSubmitProps.resetForm();
    if (loggedIn && !loggedIn.user.admin) {
      openNotification();
      setIsloggedin(true)
       dispatch(
        setLogin({
          user: loggedIn.user._id,
          token: loggedIn.token,
        }),
      );
      setTimeout(() => navigate("/home"), 100)
       
    }
    else if (loggedIn.user.admin){
      openNotification();
      dispatch(
        setLogin({
          user: loggedIn.user._id,
          token: loggedIn.token,
        }),
      );
       navigate("/admin");

    }
    
  
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
  <>
  {contextHolder}
 {sel &&  <div className="example">
    <Spin />
  </div>}
  <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="13px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            
<TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              
              sx={{ gridColumn: "span 8" ,}}
           
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 8" }}
              className="bor"
            />
            {isRegister && (
              <>
                
                <TextField
                    label="Confirm password"
                   
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.cnfpassword}
                    name="cnfpassword"
                    error={Boolean(touched.password) && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: "span 8" }}
                    />
            
              </>
            )}

          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: '#2D9D75',
                color: '#fff',
                "&:hover": { color: palette.primary.main },
              }}
              onClick={() => {
                openNotificationwarnig("please wait a minute and for better experience login through laptop/desktop")
                onsel(true);
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  </>
  );
};

export default Form;