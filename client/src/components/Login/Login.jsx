import React from "react";

import { app } from "../../config/firebase.config";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  // const loginWithGoogle = async () => {
  //   signInWithPopup(firebaseAuth, provider)
  //     .then((result) => {
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;
  //       // The signed-in user info.
  //       const user = result.user;
  //       console.log(user)
  //       // ...
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.log(errorMessage)
  //       // The email of the user's account used.
  //       const email = error.customData.email;
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //       // ...
  //     });
  // };

  const loginWithGoogle = async () => {
    signInWithPopup(firebaseAuth, provider).then((userCred) => {
      console.log(userCred);
    });
  };

  return (
    <div className="relative w-screen h-screen">
      <div className="absolute inset-0 bg-darkOverlay flex items-center justify-center p-4">
        <div
          className="w-full md:w-375 p-4 bg-lightOverlay shadow-2xl rounded-md
        backdrop-blur-md flex flex-col items-center justify-center"
        >
          <div
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-md
          bg-cardOverlay hover:bg-card hover:shadow-md duration-100 ease-in-out 
          transition-all cursor-pointer"
            onClick={loginWithGoogle}
          >
            <FcGoogle className="text-xl" />
            Sign in with Google
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
