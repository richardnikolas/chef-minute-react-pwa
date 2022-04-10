import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SplashPage from "./views/SplashPage";
import LoginPage from "./views/LoginPage";

const Router = () => {
    const something = undefined;

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SplashPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/sign-up" element={<></>} />
                <Route path="/home" element={<></>} />
                <Route path="/recipe" element={<></>} />
                <Route path="/new-recipe" element={<></>} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
