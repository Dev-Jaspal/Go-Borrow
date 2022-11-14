import React, { Component, useEffect, useState} from 'react';
import SignUp from './signUp';

function LogIn() {
	const [toSignUP, setToSignUp] = React.useState(false);
	if (toSignUP){
		return <SignUp />;
	}

    return <>
        <div className='logIn'>
			<div className='divInsideLogIn'>
				<p className='inputName'>User name</p>
				<input name='username' placeholder='' />
				<p className='inputName'>Password</p>
				<input name='password' placeholder='' type='password' /><br/>
				<button>Sign in</button>
				<p onClick={() => setToSignUp(true)} className='signUpPara'>Sign up</p>
			</div>
		</div>
    </>;
}
 
export default LogIn;