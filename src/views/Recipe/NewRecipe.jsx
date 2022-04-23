import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";
import { StyledSlider, StandardSnackbar, StandardLoader } from "../../shared/components";
import { useStyles as useRecipeStyles } from "../../styles/RecipePageStyles";
import { recipeSchema } from "../../db/schemas";
import { db } from "../../db/indexedDb";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 15,
        paddingBottom: 50
    },
    title: {
        fontFamily: "Quicksand",
        fontWeight: 700,
        fontSize: "1.5rem",
        textAlign: "center",
        margin: "20px 0 15px",
        color: theme.palette.primary.main
    },
    newRecipeFields: {
        justifyContent: "center",
        "& > div": {
            marginTop: 25
        }
    },
    dynamicFields: {
        marginTop: 20,
        padding: "0 25px",
        "& > div": {
            marginTop: 10
        },
        "& h2": {
            fontSize: "1.3rem",
            fontWeight: 600,
            marginBottom: 10,
            "& span": {
                color: theme.palette.primary.main,
                fontSize: "1.2rem"
            }
        }
    },
    addDynamicFieldBtn: {
        backgroundColor: theme.palette.secondary.main,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 45,
        height: 45,
        borderRadius: 15,
        border: 0
    },
    createBtn: {
        backgroundColor: theme.palette.primary.main,
        width: 140,
        height: 50,
        fontWeight: 700,
        border: 0,
        borderRadius: 15,
        color: "#FFF",
        fontSize: "1.3rem",
        marginTop: 30
    }
}));

const NewRecipe = () => {
    const classes = useStyles();
    const recipeClasses = useRecipeStyles();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [ingredients, setIngredients] = useState([""]);
    const [directions, setDirections] = useState([""]);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarInfo, setSnackbarInfo] = useState({
        severity: "error",
        message: "There is something wrong with one field or more"
    });

    const [newRecipe, setNewRecipe] = useState({
        name: "",
        description: "",
        rating: 5.0,
        dificulty: "",
        timeToPrepare: undefined,
        photoUrl: "",
        isFavorite: false,
        ingredients,
        directions
    });

    const updateIngredients = ({ newValue, index }) => {
        const updated = ingredients;
        updated[index] = newValue;

        setIngredients([...updated]);
    };

    const updateDirections = ({ newValue, index }) => {
        const updated = directions;
        updated[index] = newValue;

        setDirections([...updated]);
    };

    const isRecipeValid = async (recipe) => {
        try {
            await recipeSchema.validate(recipe);
            return true;
        } catch (err) {
            const error = { ...err };
            console.error(error);

            if (error.message === "name must be at least 2 characters") {
                setSnackbarInfo({
                    ...snackbarInfo,
                    message: "Name is required and should have at least 2 characters."
                });
            } //
            else if (error.message === "dificulty is a required field") {
                setSnackbarInfo({
                    ...snackbarInfo,
                    message: "Dificulty is a required field. Select one."
                });
            } //
            else if (
                error.message === "timeToPrepare is a required field" ||
                error.message.includes("timeToPrepare")
            ) {
                setSnackbarInfo({
                    ...snackbarInfo,
                    message: "You must add Time To Prepare (Ex: 60)"
                });
            } //
            else if (error.message === "ingredients field must have at least 1 items") {
                setSnackbarInfo({ ...snackbarInfo, message: "You must add at least 1 Ingredient" });
            } //
            else if (error.message === "directions field must have at least 1 items") {
                setSnackbarInfo({ ...snackbarInfo, message: "You must add at least 1 Direction" });
            }

            setIsSnackbarOpen(true);

            return false;
        }
    };

    const createNewRecipe = async () => {
        const onlyValidIngredients = ingredients.filter((i) => i.length > 2);
        const onlyValidDirections = directions.filter((d) => d.length > 5);

        const fullRecipe = {
            ...newRecipe,
            ingredients: onlyValidIngredients,
            directions: onlyValidDirections,
            createdAt: new Date()
        };

        console.log("fullRecipe", fullRecipe);

        if (await isRecipeValid(fullRecipe)) {
            try {
                setIsLoading(true);
                await db.recipe.add(fullRecipe);

                setTimeout(() => {
                    setIsLoading(false);

                    setSnackbarInfo({
                        severity: "success",
                        message: "Time to cook! Your recipe was create with success."
                    });
                    setIsSnackbarOpen(true);

                    navigate("/home");
                }, [1000]);
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <>
            <Grid container className={classes.root}>
                <Grid item xs={3} className="flexSpaceBetween" style={{ padding: 15 }}>
                    <button className={recipeClasses.roundBtn} onClick={() => navigate("/home")}>
                        <ArrowBackIcon />
                    </button>
                </Grid>

                <Grid item xs={6}>
                    <h2 className={classes.title}>New recipe</h2>
                </Grid>

                <Grid item>
                    <Grid container className={classes.newRecipeFields}>
                        <Grid item>
                            <TextField
                                label="Recipe name*"
                                onChange={(e) =>
                                    setNewRecipe({ ...newRecipe, name: e.target.value })
                                }
                                style={{ width: "85vw" }}
                            />
                        </Grid>

                        <Grid item>
                            <TextField
                                label="Brief description"
                                multiline
                                maxRows={2}
                                onChange={(e) =>
                                    setNewRecipe({ ...newRecipe, description: e.target.value })
                                }
                                inputProps={{
                                    maxLength: 99
                                }}
                                helperText="Max of 99 characters"
                                style={{ width: "85vw" }}
                            />
                        </Grid>

                        <Grid item>
                            <TextField
                                label="Photo URL"
                                onChange={(e) =>
                                    setNewRecipe({ ...newRecipe, photoUrl: e.target.value })
                                }
                                style={{ width: "85vw" }}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel id="recipe-dificulty">Dificulty*</InputLabel>
                                <Select
                                    labelId="recipe-dificulty"
                                    label="Dificulty"
                                    value={newRecipe.dificulty}
                                    onChange={(e) =>
                                        setNewRecipe({ ...newRecipe, dificulty: e.target.value })
                                    }
                                >
                                    <MenuItem value="easy">Easy</MenuItem>
                                    <MenuItem value="medium">Medium</MenuItem>
                                    <MenuItem value="hard">Hard</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={1}></Grid>

                        <Grid item xs={5}>
                            <TextField
                                label="Time to prepare*"
                                helperText="In minutes"
                                inputProps={{ maxLength: 3 }}
                                onChange={(e) =>
                                    setNewRecipe({
                                        ...newRecipe,
                                        timeToPrepare: parseInt(e.target.value)
                                    })
                                }
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <p>⭐ Rating</p>
                        </Grid>

                        <Grid item xs={6}>
                            <StyledSlider
                                onChangeCommitted={(_, newValue) =>
                                    setNewRecipe({ ...newRecipe, rating: newValue })
                                }
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item id="ingredientsWrapper">
                    <Grid container className={classes.dynamicFields}>
                        <Grid item xs={12}>
                            <h2>
                                <span>•</span> Ingredients
                            </h2>
                        </Grid>

                        {ingredients.map((ingred, index) => (
                            <Grid item key={`key-ingredients-${index}`}>
                                <TextField
                                    placeholder="Ex: 300g of sugar"
                                    onBlur={(e) =>
                                        updateIngredients({
                                            newValue: e.target.value,
                                            index
                                        })
                                    }
                                    style={{ width: "85vw" }}
                                />
                            </Grid>
                        ))}

                        <Grid
                            item
                            xs={12}
                            className="flexJustifyEnd"
                            style={{ marginRight: "2vw" }}
                        >
                            <button
                                className={classes.addDynamicFieldBtn}
                                onClick={() => setIngredients([...ingredients, ""])}
                            >
                                <AddIcon />
                            </button>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item id="directionsWrapper">
                    <Grid container className={classes.dynamicFields}>
                        <Grid item xs={12}>
                            <h2>
                                <span>•</span> Directions
                            </h2>
                        </Grid>

                        {directions.map((direc, index) => (
                            <Grid item key={`key-directions-${index}`}>
                                <TextField
                                    placeholder="Ex: First, pick up a good pan"
                                    multiline
                                    maxRows={3}
                                    onBlur={(e) =>
                                        updateDirections({
                                            newValue: e.target.value,
                                            index
                                        })
                                    }
                                    style={{ width: "85vw" }}
                                />
                            </Grid>
                        ))}

                        <Grid
                            item
                            xs={12}
                            className="flexJustifyEnd"
                            style={{ marginRight: "2vw" }}
                        >
                            <button
                                className={classes.addDynamicFieldBtn}
                                onClick={() => setDirections([...directions, ""])}
                            >
                                <AddIcon />
                            </button>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} className="flexJustifyCenter">
                    <button className={classes.createBtn} onClick={() => createNewRecipe()}>
                        Create
                    </button>
                </Grid>
            </Grid>

            <StandardSnackbar
                message={snackbarInfo.message}
                severity={snackbarInfo.severity}
                variant="filled"
                open={isSnackbarOpen}
                handleClose={() => setIsSnackbarOpen(false)}
            />

            {isLoading ? <StandardLoader /> : null}
        </>
    );
};

export default NewRecipe;
