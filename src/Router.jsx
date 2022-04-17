import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SplashPage from "./views/SplashPage";
import SignUpPage from "./views/SignUpPage";
import HomePage from "./views/Home/HomePage";
import RecipePage from "./views/Recipe/RecipePage";
import NewRecipe from "./views/Recipe/NewRecipe";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SplashPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/recipe/:recipeId" element={<RecipePage />} />
                <Route path="/new-recipe" element={<NewRecipe />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
