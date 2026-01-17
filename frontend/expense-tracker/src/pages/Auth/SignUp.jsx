import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";


const SignUp = () => {
 const [profilePic, setProfilePic] = useState(null);
 const [fullName, setFullName] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [confirmPassword, setConfirmPassword] = useState("");
 const [error, setError] = useState(null);

 const navigate = useNavigate();

 const validatePassword = (password) => {
  const minLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasNoSpaces = !/\s/.test(password);

  if (!minLength) return "Password must be at least 8 characters.";
  if (!hasUppercase) return "Password must contain at least one uppercase letter.";
  if (!hasLowercase) return "Password must contain at least one lowercase letter.";
  if (!hasNumber) return "Password must contain at least one number.";
  if (!hasSymbol) return "Password must contain at least one special character.";
  if (!hasNoSpaces) return "Password must not contain spaces.";

  return null; // ✅ valid password
};


 //handle Sign Up Form Submission
const handleSignUp = async (e) => {
  e.preventDefault();

  if (!fullName) {
    setError("Please enter your name.");
    return;
  }

  if (!validateEmail(email)) {
    setError("Please enter a valid email address.");
    return;
  }

  const passwordError = validatePassword(password);
  if (passwordError) {
    setError(passwordError);
    return;
  }

  if (password !== confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  setError("");

  // proceed with signup API call
};


  return (
    <AuthLayout>
     <div className="lg:w-full h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">

       <h3 className="text-xl font-semibold text-black">Create an Account</h3>
       <p className="text-xs text-slate-700 mt-1.5 mb-6">
         Please fill in the information to create your account.
       </p>
       
       <form onSubmit={handleSignUp}>

        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <Input
           value={fullName}
           onChange={setFullName}
           label="Full Name"
           placeholder="John Doe"
           type="text"
         />
          <Input
            value={email}
            onChange={setEmail}
            label="Email Address"
            placeholder="timcook@gmail.com"
            type="email"
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={setPassword}
          />
          <Input 
            label="Confirm Password"
            type="password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={setConfirmPassword}
          />
        </div>
        {error && (
            <p className="text-red-500 text-xs mt-2">{error}</p>
          )}

          <button type="submit" className="btn-primary mt-4">
            Sign Up 
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary underline"
            >
              Login
            </Link>
          </p>
     </form>
    </div>
    </AuthLayout>
  )
}

export default SignUp