import { useEffect, useRef, useState} from 'react';
import React from "react";
import "./Popup.css";
import FormInput from "./FormInput";
import Register from './Register';

function Login(props){

    const popupRef = useRef();

    const handleClickOutside = (event) => {

        if (popupRef.current === event.target) {
        props.setTrigger(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);

        return () => {
        document.removeEventListener("click", handleClickOutside);
        };
    }, [props.setTrigger]);

    const [values, setValues] = useState({
        username: "",
        password: "",
    });

    const inputs = [
        {
        id: 1,
        name: "username",
        type: "text",
        placeholder: "Username",
        errorMessage:
            "Username should be 3-16 characters and shouldn't include any special character!",
        label: "Username",
        pattern: "^[A-Za-z0-9]{3,16}$",
        required: true,
        },
        {
        id: 2,
        name: "password",
        type: "password",
        placeholder: "Password",
        errorMessage:
            "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
        label: "Password",
        pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
        required: true,
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const [registerPopup, setRegisterPopup] = useState(false);

    return (props.trigger) ? (
        <div className="popup" ref={popupRef}>
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            {inputs.map((input) => (
            <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
            />
            ))}
            <div className="popup-btn">
                <button>Login</button>
            </div>
            <p>
            Don't have an account?{' '}
            <a onClick={() => setRegisterPopup(true)} class="registerLinkStyle">
              Register Now!
            </a>
          </p>
        </form>
        <Register trigger={registerPopup} setTrigger={setRegisterPopup}>
          {/* Add Login component content */}
        </Register>
        </div>
    ) : "";
};

export default Login;