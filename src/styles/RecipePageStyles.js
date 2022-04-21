import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
        height: "98vh",
        backgroundColor: theme.palette.primary.main
    },
    recipePhoto: {
        width: "45vw",
        height: "45vw",
        borderRadius: 90,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        zIndex: 5
    },
    roundBtn: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 42,
        height: 42,
        border: 0,
        borderRadius: 25,
        "& svg": {
            fontSize: 25
        }
    },
    recipeContent: {
        width: "100vw",
        height: "80vh",
        marginTop: "-10vh !important",
        backgroundColor: "#FFF",
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45,
        padding: "12vh 20px"
    },
    title: {
        textAlign: "center",
        fontSize: "1.6rem",
        fontFamily: "'Quicksand', sans-serif",
        fontWeight: "700",
        marginBottom: 20
    },
    description: {
        textAlign: "center",
        fontSize: "0.9rem",
        padding: "0 25px",
        marginBottom: 20
    },
    details: {
        display: "flex",
        justifyContent: "space-evenly"
    },
    detailItem: {
        display: "flex",
        alignItems: "center",
        "& p": {
            fontSize: "0.9rem",
            marginLeft: 3,
            textTransform: "capitalize"
        }
    },
    dificultyIcon: {
        width: 12,
        height: 12,
        border: 0,
        borderRadius: 15,
        backgroundColor: "#000"
    },
    buttons: {
        display: "flex",
        justifyContent: "space-evenly",
        marginTop: 30,
        height: 50,
        width: "90vw",
        borderRadius: 40,
        backgroundColor: theme.palette.lightGray,
        "& button": {
            width: "inherit",
            fontFamily: "'Quicksand', sans-serif",
            fontWeight: 600,
            backgroundColor: theme.palette.lightGray,
            borderRadius: 40,
            border: 0
        }
    },
    btnActive: {
        backgroundColor: `${theme.palette.primary.main} !important`,
        color: "#FFF"
    },
    ingredients: {
        padding: "20px 15px",
        "& span": {
            color: theme.palette.primary.main,
            fontSize: "1.2rem"
        },
        "& p": {
            paddingBottom: 8,
            textAlign: "justify"
        }
    },
    directions: {
        padding: "20px 15px",
        "& h2": {
            fontWeight: 700,
            color: theme.palette.primary.main,
            paddingBottom: 5
        },
        "& p": {
            paddingBottom: 15,
            textAlign: "justify"
        }
    }
}));
