import {styled} from "@mui/system";
import {Skeleton} from "@mui/material";

export const ButtonSkeleton = styled(Skeleton, {shouldForwardProp: (props) => props !== "visibility"})(({ theme, visibility }) => ({
    ...(visibility ? {
        width: "720px",
        height: "106px",}
        : {
        width: "407px",
        height: "98px",})
}));

export const BoxSkeleton = styled(Skeleton)(({ theme }) => ({
    width: "575px",
    height: "113px",
    borderRadius: theme.spacing(2),
}));