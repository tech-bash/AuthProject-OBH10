import {useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useAuth} from "../context/AuthContext";

export default Login() {
    const {login, loading} = useAuth();

    const navigate  = useNavigate(); //for js logic
    const location = useLocation(); // for page's requested location or path

    const[email, setEmail] = useState(""); 
    const[password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(true); // button toggle
    const [error, setError] = useState("");

async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
        await login({email, password}, rememberMe);

        // take me to the dashboard page every time I login
        navigate(
           "/dashboard"
        );

    }
    catch (err){
        setError(err.message || "Unable to Login, check credentials");
    }

}

};



return (
    <>
     //TASK
    // task from home, have email and password button for login page test it,
    //whatever we have done till now .. 
    </>
)