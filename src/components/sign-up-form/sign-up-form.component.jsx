import { useState } from "react";
import { createAuthUserWithEmailAndPassword, creatUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss';
import Button from "../button/button.component";


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    console.log(formFields);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value })
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password != confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try{
            const { user } = await createAuthUserWithEmailAndPassword(email, password);

            await creatUserDocumentFromAuth(user, { displayName });
            resetFormFields();
            
        } catch(error){
            if(error.code ==='auth/email-already-in-use'){
                alert('Cannot create user, email already in use');
            }
            else {
                console.log('user creation encountered an error', error);
            }            
        }
        

        // if(!authenticated){
        //     alert("not authenticated");
        //     return;
        // } 

    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName}/>
                <FormInput label="Email" type="text" required onChange={handleChange} name="email" value={displayName}/>
                <FormInput label="Password" type="text" required onChange={handleChange} name="password" value={displayName}/>
                <FormInput label="Confirm Password" type="text" required onChange={handleChange} name="confirmPassword" value={displayName}/>
                <Button buttonType="inverted">Sign Up</Button>




                {/* <label>Email</label>
                <input type="email" required onChange={handleChange} name = "email" value={email}/>

                <label>Password</label>
                <input type="password" required onChange={handleChange} name="password" value={password}/>

                <label>Confirm Password</label>
                <input type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
                <button type="submit">Sign Up</button> */}
            </form>
        </div>
    )
}

export default SignUpForm