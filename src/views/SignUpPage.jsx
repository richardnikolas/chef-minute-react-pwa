import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { StandardSnackbar } from "../shared/components";
import { userSchema } from "../db/schemas";
import "../styles/global.css";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    title: {
        fontFamily: "Quicksand",
        fontWeight: 700,
        fontSize: "1.3rem",
        marginTop: 10
    },
    logoCircle: {
        width: "30vw"
    }
}));

const SignUpPage = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const [isErrorSnackOpen, setIsErrorSnackOpen] = useState(false);
    const [userInfo, setUserInfo] = useState({
        userEmail: null,
        userName: null,
        chefLevel: "",
        favoriteCuisine: ""
    });

    const validateFields = async () => {
        try {
            await userSchema.validate(userInfo);
            localStorage.setItem("storedUser", JSON.stringify(userInfo));

            navigate("/home");
        } catch {
            setIsErrorSnackOpen(true);
        }
    };

    return (
        <>
            <Grid container direction="column" className={classes.root}>
                <Grid
                    item
                    xs={2}
                    className="flexAlignCenter"
                    style={{ flexDirection: "column", marginBottom: 15 }}
                >
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/logo-circle.png`}
                        className={classes.logoCircle}
                        alt="Logo circle"
                    />
                    <h6 className={classes.title}>Sign Up</h6>
                </Grid>

                <Grid item>
                    <TextField
                        label="Name*"
                        onChange={(e) => setUserInfo({ ...userInfo, userName: e.target.value })}
                        style={{ width: "75vw" }}
                    />
                </Grid>

                <Grid item>
                    <TextField
                        label="Email*"
                        onChange={(e) => setUserInfo({ ...userInfo, userEmail: e.target.value })}
                        style={{ width: "75vw" }}
                    />
                </Grid>

                <Grid item>
                    <FormControl fullWidth>
                        <InputLabel id="user-chef-level">Chef Level*</InputLabel>
                        <Select
                            labelId="user-chef-level"
                            value={userInfo.chefLevel}
                            label="Chef Level"
                            onChange={(e) =>
                                setUserInfo({ ...userInfo, chefLevel: e.target.value })
                            }
                            style={{ width: "75vw" }}
                        >
                            <MenuItem value="beginner">Beginner</MenuItem>
                            <MenuItem value="medium">Medium</MenuItem>
                            <MenuItem value="expert">Expert</MenuItem>
                            <MenuItem value="master">Master</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item>
                    <FormControl fullWidth>
                        <InputLabel id="user-favorite-cuisine">Favorite Cuisine*</InputLabel>
                        <Select
                            labelId="user-favorite-cuisine"
                            value={userInfo.favoriteCuisine}
                            label="Favorite Cuisine"
                            onChange={(e) =>
                                setUserInfo({ ...userInfo, favoriteCuisine: e.target.value })
                            }
                            style={{ width: "75vw" }}
                        >
                            <MenuItem value="brazilian">Brazilian</MenuItem>
                            <MenuItem value="italian">Italian</MenuItem>
                            <MenuItem value="french">French</MenuItem>
                            <MenuItem value="japanese">Japanese</MenuItem>
                            <MenuItem value="mexican">Mexican</MenuItem>
                            <MenuItem value="thai">Thai</MenuItem>
                            <MenuItem value="greek">Greek</MenuItem>
                            <MenuItem value="indian">Indian</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item>
                    <button className="getStartedBtn" onClick={() => validateFields()}>
                        Get Started
                    </button>
                </Grid>
            </Grid>

            <StandardSnackbar
                message="Some fields are invalid"
                severity="error"
                variant="filled"
                open={isErrorSnackOpen}
                handleClose={() => setIsErrorSnackOpen(false)}
            />
        </>
    );
};

export default SignUpPage;
