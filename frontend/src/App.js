import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn, SignIn, SignUp } from "@clerk/clerk-react";
import Home from './Pages/Home/Home';
import SetAvatar from './Pages/Avatar/SetAvatar';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SignedIn>
                  <Home />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/login"
            element={
              <div className="flex items-center justify-center min-h-screen bg-slate-50">
                <SignIn routing="path" path="/login" signUpUrl="/register" />
              </div>
            }
          />
          <Route
            path="/register"
            element={
              <div className="flex items-center justify-center min-h-screen bg-slate-50">
                <SignUp routing="path" path="/register" signInUrl="/login" />
              </div>
            }
          />
          <Route
            path="/setAvatar"
            element={
              <>
                <SignedIn>
                  <SetAvatar />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;