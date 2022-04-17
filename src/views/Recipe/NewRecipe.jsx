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
import { StyledSlider } from "../../shared/components";
import { useStyles as useRecipeStyles } from "../../styles/RecipePageStyles";

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

    const [ingredients, setIngredients] = useState([""]);
    const [directions, setDirections] = useState([""]);

    const updateIngredients = ({ newValue, index }) => {
        const updated = ingredients;
        updated[index] = newValue;

        setIngredients(updated);
    };

    const updateDirections = ({ newValue, index }) => {
        const updated = directions;
        updated[index] = newValue;

        setDirections(updated);
    };

    console.log("ingredientss", ingredients);

    /*
    recipe {
        id: UUID,
        name: string,
        description: string,
        rating: float,
        dificulty: string,
        timeToPrepare: integer,
        photoUrl: string,
        isFavorite: boolean,
        ingredients: string/array/text,
        directions: string/text
    }
*/

    return (
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
                            onChange={(e) => {}}
                            style={{ width: "85vw" }}
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            label="Brief description"
                            multiline
                            maxRows={2}
                            onChange={(e) => {}}
                            style={{ width: "85vw" }}
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            label="Photo URL"
                            onChange={(e) => {}}
                            style={{ width: "85vw" }}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="recipe-dificulty">Dificulty*</InputLabel>
                            <Select
                                labelId="recipe-dificulty"
                                label="Dificulty"
                                onChange={(e) => {}}
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
                            label="Time to prepare"
                            helperText="In minutes"
                            inputProps={{ maxLength: 3 }}
                            onChange={(e) => {}}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <p>⭐ Rating</p>
                    </Grid>

                    <Grid item xs={6}>
                        <StyledSlider
                            onChangeCommitted={(_, newValue) =>
                                console.log("New value slide", newValue)
                            }
                        />
                    </Grid>
                </Grid>
            </Grid>

            <Grid item>
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
                                onChange={(e) =>
                                    updateIngredients({
                                        newValue: e.target.value,
                                        index
                                    })
                                }
                                style={{ width: "85vw" }}
                            />
                        </Grid>
                    ))}

                    <Grid item xs={12} className="flexJustifyEnd" style={{ marginRight: "2vw" }}>
                        <button
                            className={classes.addDynamicFieldBtn}
                            onClick={() => setIngredients([...ingredients, ""])}
                        >
                            <AddIcon />
                        </button>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item>
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
                                onChange={(e) =>
                                    updateDirections({
                                        newValue: e.target.value,
                                        index
                                    })
                                }
                                style={{ width: "85vw" }}
                            />
                        </Grid>
                    ))}

                    <Grid item xs={12} className="flexJustifyEnd" style={{ marginRight: "2vw" }}>
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
                <button className={classes.createBtn}>Create</button>
            </Grid>
        </Grid>
    );
};

export default NewRecipe;
