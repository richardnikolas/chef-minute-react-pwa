import React, { useState, useEffect, useMemo, useCallback } from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import clsx from "clsx";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { cuisineTypeChips } from "../../shared/constants";
import { getStoredUser } from "../../shared/functions";
import RecipeCard from "./RecipeCard";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db/indexedDb";
import "../../styles/global.css";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "15px 15px",
        height: "100vh",
        overflow: "auto"
    },
    title: {
        fontFamily: "Quicksand",
        fontWeight: 700,
        fontSize: "1.3rem",
        marginTop: 10
    },
    greeting: {
        fontFamily: "'Quicksand', sans-serif"
    },
    profileBtn: {
        marginLeft: "auto",
        fontSize: "30px !important"
    },
    newRecipeBtn: {
        position: "absolute !important",
        right: 25,
        bottom: 15,
        backgroundColor: `${theme.palette.darkGreen} !important`,
        color: "#FFF !important",
        "& svg": {
            fontSize: "2rem"
        }
    }
}));

const HomePage = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const storedUser = getStoredUser();

    const [search, setSearch] = useState("");
    const [chipsFilter, setChipsFilter] = useState(["All"]);

    const isFilteringByThisChip = (chip) => {
        return chipsFilter.find((c) => c === chip);
    };

    const updateChipsFilter = (chip) => {
        const index = chipsFilter.indexOf(chip);

        if (index > -1) {
            chipsFilter.splice(index, 1);
        } else {
            chipsFilter.push(chip);
        }
    };

    const recipeTest = {
        id: 1,
        title: "Burgão do Chef",
        photoUrl:
            "https://s2.glbimg.com/9zc9T-9LwXwKG_8XOq_9EF67bSQ=/620x455/e.glbimg.com/og/ed/f/original/2021/04/30/receita-hamburguer-smash-burguer-bacon-cheddaar.jpg",
        description: "Muito delícia bom demais, recomendo",
        rating: 4.5,
        dificulty: "easy",
        timeToPrepare: 55,
        isFavorite: false
    };

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} className="flexAlignCenter">
                <p className={classes.greeting}>Hello there, {storedUser.userName.split(" ")[0]}</p>
                <AccountCircleOutlinedIcon color="primary" className={classes.profileBtn} />
            </Grid>

            <Grid item xs={12} className="searchSection">
                <h1>
                    What do you want
                    <br />
                    to <span className="textOrange">cook</span> today?
                </h1>

                <FormControl fullWidth>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search here"
                        className="searchInput"
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <section className="chipsSection">
                    {cuisineTypeChips.map((chip) => {
                        return (
                            <button
                                className={clsx("filterChip", {
                                    filterChipActive: isFilteringByThisChip(chip)
                                })}
                                onClick={() => updateChipsFilter(chip)}
                                key={`key-${chip}`}
                            >
                                {chip}
                            </button>
                        );
                    })}
                </section>
            </Grid>

            <Grid item xs={12}>
                <section className="recipesSection">
                    <h1>Your recipes</h1>

                    <Grid container>
                        <Grid item xs={6} style={{ marginTop: 30 }}>
                            <RecipeCard recipe={recipeTest} />
                        </Grid>

                        <Grid item xs={6} style={{ marginTop: 30 }}>
                            <RecipeCard recipe={recipeTest} />
                        </Grid>

                        <Grid item xs={6} style={{ marginTop: 30 }}>
                            <RecipeCard recipe={recipeTest} />
                        </Grid>

                        <Grid item xs={6} style={{ marginTop: 30 }}>
                            <RecipeCard recipe={recipeTest} />
                        </Grid>

                        <Grid item xs={6} style={{ marginTop: 30 }}>
                            <RecipeCard recipe={recipeTest} />
                        </Grid>
                    </Grid>
                </section>

                <Fab
                    arial-label="new-recipe"
                    className={classes.newRecipeBtn}
                    size="large"
                    onClick={() => navigate("/new-recipe")}
                >
                    <AddIcon />
                </Fab>
            </Grid>
        </Grid>
    );
};

export default HomePage;
