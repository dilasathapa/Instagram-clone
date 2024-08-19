import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = window.location.origin.replace('3000', '5000');

export default function SignUp() {
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if(validatePassword()){
      signup();
    }
  };

  const validatePassword = ()=>{
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&\*]).{8,})/
    if(!passwordPattern.test(password)){
      toast.error("Password must contain at least 8 characters, including at least 1 number and 1 includes both lower and uppercase letters and special characters for example #,?,!")
      return false
    }
    return true
  }
  // .* just means "0 or more of any character".
  // to  follow the pattern within the parenthesis

  const signup = async () => {
    try {
      const res = await fetch(`${API_URL}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userName,
          fullname: fullName,
          email: email,
          password: password,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        setUserName('');
        setFullName('');
        setEmail('');
        setPassword('');
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* main contianer  */}
      <ToastContainer />
      <div className="flex w-full max-w-4xl rounded-lg overflow-hidden justify-center">
        {/* signup form contiane r */}
        <div className="w-full md:w-1/2 p-8 md:border-gray-300 md:rouded-lg">
          <div className="flex flex-col items-center">
            <img
              className="h-12 mb-6"
              src="https://kq-storage.s3.ap-south-1.amazonaws.com/logo.png"
              alt="Logo"
            />
            <p className="text-gray-600 text-sm text-center my-5">
              Sign up to see photos and videos from you friends
            </p>
            <form className="space-y-4 w-full" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
                className="block w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-gray-100 text-sm"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="block w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-gray-100 text-sm"
              />
              <input
                type="text"
                placeholder="Username"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                className="block w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-gray-100 text-sm"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="block w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-gray-100 text-sm"
              />
              <p className="text-gray-500 text-xs text-center my-5">
                By signing up, you agree to our <a href="/terms">Terms</a> and{' '}
                <a href="">Privacy Policy</a>
              </p>
              <button
                type="submit"
                className="block w-full bg-blue-500 text-white font-semibold py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              >
                {' '}
                Sign Up{' '}
              </button>
            </form>
            <div className="flex items-center my-4 w-full">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-4 text-gray-400">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <button className="flex items-center justify-center w-full bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 rounded-md focus:outline-none focus:ring focus:borde-blue=300">
              Continue With Google{' '}
            </button>
            <div className="mt-4 text-center text-gray-700">
              <p>
                Have an account? <a href="">Log In </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
