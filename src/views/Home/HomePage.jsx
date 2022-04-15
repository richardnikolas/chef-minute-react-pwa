import React, { useState, useCallback } from "react";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import clsx from "clsx";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HomeIcon from "@mui/icons-material/Home";
import { cuisineTypeChips } from "../../shared/constants";
import RecipeCard from "./RecipeCard";
import "../../styles/global.css";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "15px 15px",
        height: "92vh",
        overflow: "auto"
    },
    controlBar: {
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "8vh",
        backgroundColor: theme.palette.lightGray
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
        width: "45px !important",
        height: "45px !important",
        backgroundColor: `${theme.palette.darkGreen} !important`,
        color: "#FFF !important"
    }
}));

const HomePage = () => {
    const classes = useStyles();
    const storedUser = JSON.parse(localStorage.getItem("storedUser"));

    const [search, setSearch] = useState("");
    const [chipsFiltering, setChipsFiltering] = useState(["All"]);

    const isFilteringByThisChip = useCallback((chip) => {
        return chipsFiltering.find((c) => c === chip);
    }, []);

    const recipeTest = {
        id: 1,
        title: "Chef's Burger",
        photoUrl:
            "https://s2.glbimg.com/9zc9T-9LwXwKG_8XOq_9EF67bSQ=/620x455/e.glbimg.com/og/ed/f/original/2021/04/30/receita-hamburguer-smash-burguer-bacon-cheddaar.jpg"
    };

    return (
        <>
            <Grid container className={classes.root}>
                <Grid item xs={12} className="flexAlignCenter">
                    <p className={classes.greeting}>
                        Hello there, {storedUser.userName.split(" ")[0]}
                    </p>
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
                                    onClick={() => {
                                        const currentChips = chipsFiltering;
                                        currentChips.push(chip);
                                        setChipsFiltering(currentChips);
                                        console.log("Chips: ", currentChips);
                                    }}
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
                                <RecipeCard recipe={{}} />
                            </Grid>

                            <Grid item xs={6} style={{ marginTop: 30 }}>
                                <RecipeCard recipe={{}} />
                            </Grid>

                            <Grid item xs={6} style={{ marginTop: 30 }}>
                                <RecipeCard recipe={{}} />
                            </Grid>

                            <Grid item xs={6} style={{ marginTop: 30 }}>
                                <RecipeCard recipe={{}} />
                            </Grid>

                            <Grid item xs={6} style={{ marginTop: 30 }}>
                                <RecipeCard recipe={{}} />
                            </Grid>
                        </Grid>
                    </section>
                </Grid>
            </Grid>

            <Grid container className={classes.controlBar}>
                <Button startIcon={<HomeIcon />}>Home</Button>

                <Fab arial-label="new-recipe" className={classes.newRecipeBtn}>
                    <AddIcon />
                </Fab>

                <Button startIcon={<FavoriteBorderIcon />}>Favorites</Button>
            </Grid>
        </>
    );
};

export default HomePage;
