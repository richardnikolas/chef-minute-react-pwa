/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { StandardLoader } from "../../shared/components";
import { useStyles } from "../../styles/RecipePageStyles";
import { db } from "../../db/indexedDb";

const RecipePage = () => {
    const classes = useStyles();
    const theme = useTheme();
    const params = useParams();
    const navigate = useNavigate();

    const [recipe, setRecipe] = useState(undefined);
    const [activeTab, setActiveTab] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const { recipeId } = params;

    useEffect(() => {
        const getRecipe = async () => {
            try {
                const storedRecipe = await db.recipe.get(parseInt(recipeId));
                setRecipe(storedRecipe);
            } catch (err) {
                console.error(err);
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            }
        };
        if (!recipe) {
            getRecipe();
        }
    }, [recipeId]);

    const dificultyColor = () => {
        switch (recipe.dificulty) {
            case "easy":
                return theme.palette.darkGreen;
            case "medium":
                return theme.palette.secondary.main;
            case "hard":
                return theme.palette.errorRed;
            default:
                break;
        }
    };

    const toggleFavorite = async () => {
        setIsLoading(true);
        await db.recipe.put({ id: recipe.id, ...recipe, isFavorite: !recipe.isFavorite });

        setTimeout(() => {
            setIsLoading(false);
            setRecipe({ ...recipe, isFavorite: !recipe.isFavorite });
        }, [250]);
    };

    return (
        <>
            {isLoading && !recipe ? (
                <StandardLoader />
            ) : (
                <>
                    <Grid container className={classes.root}>
                        <Grid item xs={12} className="flexSpaceBetween" style={{ padding: 15 }}>
                            <button className={classes.roundBtn} onClick={() => navigate("/home")}>
                                <ArrowBackIcon />
                            </button>
                            <button className={classes.roundBtn} onClick={() => toggleFavorite()}>
                                {recipe.isFavorite ? (
                                    <FavoriteIcon color="primary" />
                                ) : (
                                    <FavoriteBorderIcon color="primary" />
                                )}
                            </button>
                        </Grid>

                        <Grid item xs={12} className="flexJustifyCenter">
                            <div
                                className={classes.recipePhoto}
                                style={{
                                    backgroundColor: theme.palette.secondary.main,
                                    backgroundImage: recipe.photoUrl
                                        ? `url(${recipe.photoUrl})`
                                        : `url("${process.env.PUBLIC_URL}/assets/no-image.png")`
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} className={classes.recipeContent}>
                            <section className={classes.header}>
                                <h1 className={classes.title}>{recipe.name}</h1>

                                <p className={classes.description}>{recipe.description}</p>

                                <div className={classes.details}>
                                    <div className={classes.detailItem}>
                                        <AccessTimeIcon color="primary" fontSize="small" />
                                        <p>{recipe.timeToPrepare} min</p>
                                    </div>

                                    <div className={classes.detailItem}>
                                        <StarBorderIcon color="primary" fontSize="small" />
                                        <p>{recipe.rating}</p>
                                    </div>

                                    <div className={classes.detailItem}>
                                        <div
                                            className={classes.dificultyIcon}
                                            style={{ backgroundColor: dificultyColor() }}
                                        />
                                        <p>{recipe.dificulty}</p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <div className={classes.buttons}>
                                    <button
                                        onClick={() => setActiveTab(0)}
                                        className={activeTab === 0 ? classes.btnActive : ""}
                                        style={{
                                            borderBottomRightRadius: 0,
                                            borderTopRightRadius: 0
                                        }}
                                    >
                                        Ingredients
                                    </button>

                                    <Divider
                                        orientation="vertical"
                                        flexItem
                                        style={{ borderColor: "rgba(0, 0, 0, 0.4)" }}
                                    />

                                    <button
                                        onClick={() => setActiveTab(1)}
                                        className={activeTab === 1 ? classes.btnActive : ""}
                                        style={{
                                            borderBottomLeftRadius: 0,
                                            borderTopLeftRadius: 0
                                        }}
                                    >
                                        Directions
                                    </button>
                                </div>
                            </section>

                            {activeTab === 0 ? (
                                <section className={classes.ingredients}>
                                    {recipe.ingredients.map((ingred) => {
                                        return (
                                            <p key={`key-${ingred}`}>
                                                <span>•</span> {ingred}
                                            </p>
                                        );
                                    })}
                                </section>
                            ) : (
                                <section className={classes.directions}>
                                    {recipe.directions.map((step, index) => {
                                        return (
                                            <div key={`key-direction-${index}`}>
                                                <h2>• Step {index + 1}</h2>
                                                <p>{step}</p>
                                            </div>
                                        );
                                    })}
                                </section>
                            )}
                        </Grid>
                    </Grid>
                    {isLoading ? <StandardLoader /> : null}
                </>
            )}
        </>
    );
};

export default RecipePage;
