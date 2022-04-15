import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "relative",
        padding: "15px 15px",
        borderRadius: "25px !important",
        height: 150,
        width: "70%",
        boxShadow: "1px 3px 8px 5px rgb(0 0 0 / 18%) !important"
    },
    content: {
        display: "flex",
        height: "inherit",
        justifyContent: "space-evenly"
    },
    title: {
        display: "flex",
        justifyContent: "center",
        fontWeight: 700,
        marginTop: 10,
        fontSize: "0.8rem"
    },
    cardImg: {
        width: 70,
        height: 70,
        borderRadius: 50,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
    },
    recipeDetails: {
        display: "flex",
        alignItems: "center",
        "& p": {
            fontSize: "0.7rem",
            marginLeft: 3
        }
    }
}));

const RecipeCard = (recipe) => {
    const classes = useStyles();

    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container className={classes.content}>
                <FavoriteBorderIcon
                    color="primary"
                    style={{ position: "absolute", top: 12, right: 10 }}
                />

                <Grid item xs={12} className="flexJustifyCenter">
                    <div
                        className={classes.cardImg}
                        style={{
                            backgroundImage:
                                "url('https://s2.glbimg.com/9zc9T-9LwXwKG_8XOq_9EF67bSQ=/620x455/e.glbimg.com/og/ed/f/original/2021/04/30/receita-hamburguer-smash-burguer-bacon-cheddaar.jpg')"
                        }}
                    />
                </Grid>

                <Grid item xs={12} className="flexJustifyCenter">
                    <p className={classes.title}>Chef's Burger</p>
                </Grid>

                <Grid item xs={12} className="flexSpaceBetween">
                    <div className={classes.recipeDetails}>
                        <AccessTimeIcon color="primary" fontSize="small" />
                        <p>40 min</p>
                    </div>

                    <div className={classes.recipeDetails}>
                        <StarBorderIcon color="primary" fontSize="small" />
                        <p>4.5</p>
                    </div>
                </Grid>
            </Grid>
        </Paper>
    );
};

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

export default RecipeCard;
