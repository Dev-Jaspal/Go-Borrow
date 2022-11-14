import React, {useState} from 'react';
import '../App.css';
import LogIn from './logIn';

function SignUp() {
    const [toSignIn, setToSignIn] = useState(false);
    // eslint-disable-next-line space-before-blocks
    if (toSignIn){
        return <LogIn />
    }

    return <>
        <div className='signUp'>
            <div className='divInsideSignIn'>
                <p className='email'>Email</p>
                <input name='email' placeholder='' />
                <p className='pw'>Password</p>
                <input name='pw' placeholder='' type='password' />
                <p className='pwConfirm'>Password confirm</p>
                <input name='pwConfirm' placeholder='' type='password' />
                <div className='agreeDiv'>
                    <p className='agreeTerm'>I agree terms of use</p>
                    <input className='agreeTermCheck' name='agreeTermCheck' type='checkbox' />
                </div>
                <button>Sign up</button>
                <p className='signInPara'>already have an account?<span onClick={() => setToSignIn(true)}>Sign in</span></p>
            </div>
        </div>
    </>;
}

export default SignUp;