import {styled} from "@mui/system";
import {IconButton} from "@mui/material";

export const Button = styled(IconButton)(({ theme }) => ({
    borderRadius: "50%",
    padding: theme.spacing(2),
    backgroundColor: "#3C5344",
    color: "#f1f1f1",
    border: "1px solid #292929",
    boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    "&:hover": {
        backgroundColor: "#334739",
    },
}));