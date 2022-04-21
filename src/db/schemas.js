import * as yup from "yup";

export const userSchema = yup.object().shape({
    userName: yup.string().min(3).required(),
    userEmail: yup.string().email().required(),
    chefLevel: yup.string().required(),
    favoriteCuisine: yup.string().required()
});

export const recipeSchema = yup.object().shape({
    name: yup.string().min(2).required(),
    description: yup.string(),
    rating: yup.number().required(),
    timeToPrepare: yup.number().integer().max(999).required(),
    dificulty: yup.string().required(),
    photoUrl: yup.string(),
    isFavorite: yup.boolean(),
    ingredients: yup.array().min(1).required(),
    directions: yup.array().min(1).required()
});
