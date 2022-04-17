import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useStyles } from "../../styles/RecipePageStyles";

const RecipePage = ({ recipe }) => {
    const classes = useStyles();
    const theme = useTheme();
    const params = useParams();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState(0);

    const { recipeId } = params;

    const dificultyColor = () => {
        switch ("medium") {
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

    const ingredi = ["2 ovos", "3 bananas", "10L de leite"];
    const steps = [
        "Primeiro, lave as vasilhas",
        "Hora de fritar um ovo e jogar bacon em cima",
        "Agora vc já pode colocar no forno junto com o queijo parmesão e o alface. Sim, o alface também. Confia.",
        "Boa sorte e cuidado pra retirar isso do forno."
    ];

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} className="flexSpaceBetween" style={{ padding: 15 }}>
                <button className={classes.roundBtn} onClick={() => navigate("/home")}>
                    <ArrowBackIcon />
                </button>
                <button className={classes.roundBtn}>
                    {true ? (
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
                        backgroundImage: `url("https://s2.glbimg.com/9zc9T-9LwXwKG_8XOq_9EF67bSQ=/620x455/e.glbimg.com/og/ed/f/original/2021/04/30/receita-hamburguer-smash-burguer-bacon-cheddaar.jpg")`
                    }}
                />
            </Grid>

            <Grid item xs={12} className={classes.recipeContent}>
                <section className={classes.header}>
                    <h1 className={classes.title}>Burgão Sinistro</h1>

                    <p className={classes.description}>
                        Esse hamburguer é realmente muito gostoso, cê tá maluco
                    </p>

                    <div className={classes.details}>
                        <div className={classes.detailItem}>
                            <AccessTimeIcon color="primary" fontSize="small" />
                            <p>60 min</p>
                        </div>

                        <div className={classes.detailItem}>
                            <StarBorderIcon color="primary" fontSize="small" />
                            <p>4.8</p>
                        </div>

                        <div className={classes.detailItem}>
                            <div
                                className={classes.dificultyIcon}
                                style={{ backgroundColor: dificultyColor() }}
                            />
                            <p>Medium</p>
                        </div>
                    </div>
                </section>

                <section>
                    <div className={classes.buttons}>
                        <button
                            onClick={() => setActiveTab(0)}
                            className={activeTab === 0 ? classes.btnActive : ""}
                            style={{ borderBottomRightRadius: 0, borderTopRightRadius: 0 }}
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
                            style={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }}
                        >
                            Directions
                        </button>
                    </div>
                </section>

                {activeTab === 0 ? (
                    <section className={classes.ingredients}>
                        {ingredi.map((ingred) => {
                            return (
                                <p key={`key-${ingred}`}>
                                    <span>•</span> {ingred}
                                </p>
                            );
                        })}
                    </section>
                ) : (
                    <section className={classes.directions}>
                        {steps.map((step, index) => {
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
    );
};

export default RecipePage;
