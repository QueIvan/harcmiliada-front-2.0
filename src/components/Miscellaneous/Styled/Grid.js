import { styled } from "@mui/system";
import {Grid} from "@mui/material";

/* AnswerBox styled components */

export const BackgroundGrid = styled(Grid)(({ theme }) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    justifyContent: "center",
}));

export const ButtonGrid = styled(Grid, { shouldForwardProp: (props) => props !== "wrongAnswer" && props !== "active" && props !== "removeHover" })(({ theme, wrongAnswer, active, removeHover }) => ({
    padding: theme.spacing(1),
    backgroundColor: "#364b3d",
    height: "fit-content",
    border: "1px solid #292929",
    color: "#c1c1c1",
    transition: "color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    ...(!wrongAnswer && {minHeight: "100px"}),
    ...(wrongAnswer && {borderRadius: "16px"}),
    ...(wrongAnswer ? {boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"}:{boxShadow: "0px 0px 5px 0px rgb(0 0 0 / 90%)"}),
    ...(!removeHover && {
        cursor: "pointer",
        "&:hover": { color: "#ffffff" },
        "&:hover>.MuiGrid-root>.MuiGrid-root": { borderColor: "#3C4338" },
        ...(active && { backgroundColor: "#415748", color: "#e1e1e1", "&>.MuiGrid-root>.MuiGrid-root": { borderColor: "#364b3d" } }),
    }),}));

export const ButtonTextGrid = styled(Grid)(({ theme }) => ({
    border: "8px solid #415748",
    boxShadow: "inset 0px 0px 5px 0px rgb(0 0 0 / 90%)",
    transition: "border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

export const ButtonInnerGrid = styled(Grid)(({ theme }) => ({
    boxShadow: "0px 0px 5px 0px rgb(0 0 0 / 90%)",
}));

/* Board styled components */

export const BackContainer = styled(Grid)(({ theme }) => ({
    width: "100vw",
    height: "100vh",
    position: "relative",
    backgroundImage: theme.background.image,
}));

export const WrongBoxGrid = styled(Grid, { shouldForwardProp: (props) => props !== "active" })(({ theme, active }) => ({
    justifyContent: "center",
    transition: "border-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    visibility: active ? "visible" : "hidden",
    ...(active && {
        "&>.MuiGrid-root": {
            borderColor: "#d90429",
            color: "#d90429",
        },
    }),
}));

export const WrongBoxBackground = styled(Grid, {shouldForwardProps: (props) => props !== "inConsole"})(({ theme, inConsole }) => ({
    border: "6px solid",
    borderRadius: theme.spacing(2),
    ...(inConsole ? {color: "#506557",
        width: "clamp(55px, 55px, 55px) !important",
        height: "clamp(55px, 55px, 55px)",
    borderColor: "#506557",}: {
        color: "#d90429",
        width: "clamp(90px, 90px, 90px) !important",
        height: "clamp(90px, 90px, 90px)",
        borderColor: "#d90429",
    }),
        boxShadow: "0px 0px 5px 0px rgb(0 0 0 / 90%), inset 0px 0px 5px 0px rgb(0 0 0 / 90%)",
    justifyContent: "center",
    alignItems: "center",
}));

export const InnerGrid = styled(Grid)(({ theme }) => ({
    borderRadius: "16px",
    border: "8px solid #415748",
    boxShadow: "0px 0px 5px 0px rgb(0 0 0 / 90%), inset 0px 0px 5px 0px rgb(0 0 0 / 90%)",
    "&>*": { display: "flex", justifyContent: "center", alignItems: "center" },
}));