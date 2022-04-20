import React from "react";
import { useTheme } from "@mui/material/styles";
import Backdrop from "@mui/material/Backdrop";
import { Bars } from "react-loader-spinner";

const StandardLoader = () => {
    const theme = useTheme();

    return (
        <Backdrop style={{ zIndex: 999 }} open>
            <Bars height={120} width={120} color={theme.palette.secondary.main} />
        </Backdrop>
    );
};

export default StandardLoader;
