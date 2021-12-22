import {styled} from "@mui/system";
import {LoadingButton} from "@mui/lab";

export const ButtonLoading = styled(LoadingButton)(({ theme }) => ({
    height: "fit-content",
    backgroundColor: "#455F4D",
    color: "#f1f1f1",
    padding: `${theme.spacing(1)} ${theme.spacing(3)}`,
    border: "1px solid #292929",
    pointerEvents: "none",
    "&>*:first-of-type": {
        marginRight: theme.spacing(2),
    },
}));