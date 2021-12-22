import { styled } from "@mui/system";
import { Typography } from "@mui/material";

export const ButtonText = styled(Typography, { shouldForwardProp: (props) => props !== "hiddenLabel" && props !== "addBorder" })(({ theme, hiddenLabel, addBorder }) => ({
    padding: theme.spacing(1.5),
    textAlign: "center",
    userSelect: "none",
    color: "#ffffff",
    transition: "border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    textShadow: "0px 0px 10px #000000",
    ...(addBorder && {border: "8px solid #415748",
        boxShadow: "0px 0px 5px 0px rgb(0 0 0 / 90%), inset 0px 0px 5px 0px rgb(0 0 0 / 90%)",
    }),
    ...(hiddenLabel && { display: "flex", justifyContent: "center" }),
}));

export const ButtonLabel = styled(Typography)(({ theme }) => ({
    backgroundColor: "#415748",
    display: "flex",
    justifyContent: "center",
    width: "75px",
    padding: `${theme.spacing(0.5)} 0`,
    borderRadius: "50%",
    boxShadow: "0px 0px 5px 0px rgb(0 0 0 / 90%)",
}));

export const CategoryHeader = styled(Typography, { shouldForwardProp: (props) => props !== "align" })(({ theme, align }) => ({
    fontWeight: "bold",
    color: "#ffffff",
    textShadow: "0px 0px 10px #000000",
    ...(align && {textAlign: align}),
}));