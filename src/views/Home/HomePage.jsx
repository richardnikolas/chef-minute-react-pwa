import React, { useState } from "react";
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
import { StandardLoader } from "../../shared/components";
import { cuisineTypeChips } from "../../shared/constants";
import { getStoredUser } from "../../shared/functions";
import RecipeCard from "./RecipeCard";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db/indexedDb";
import "../../styles/global.css";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "15px 15px",
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
    const [isLoading, setIsLoading] = useState(true);
    const [dbRecipes, setDbRecipes] = useState([]);
    // eslint-disable-next-line no-unused-vars
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

    useLiveQuery(() => {
        db.recipe
            .filter((r) => r.name.toLowerCase().includes(search.toLowerCase()))
            .toArray()
            .then((result) => {
                setDbRecipes(result);
                setTimeout(() => {
                    setIsLoading(false);
                }, [350]);
            });
    }, [search]);

    console.log("dbRecipes", dbRecipes);

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

                    {isLoading ? (
                        <StandardLoader />
                    ) : (
                        <Grid container>
                            {dbRecipes ? (
                                dbRecipes.map((rec, index) => {
                                    return (
                                        <Grid
                                            item
                                            xs={6}
                                            style={{ marginTop: 30 }}
                                            key={`key-recipe-${index}`}
                                        >
                                            <RecipeCard recipe={rec} />
                                        </Grid>
                                    );
                                })
                            ) : (
                                <Grid item xs={12}>
                                    <h2>No recipes created yet.</h2>
                                </Grid>
                            )}
                        </Grid>
                    )}
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
