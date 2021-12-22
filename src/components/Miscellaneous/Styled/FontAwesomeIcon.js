import { styled } from "@mui/system";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const WrongBoxIcon = styled(FontAwesomeIcon, {shouldForwardProp: (props) => props !== "inConsole"})(({ theme, inConsole }) => ({
    fontSize: inConsole ? "3rem":"7rem",
    height: "fill-available",
    filter: "drop-shadow(0px 0px 5px rgb(0 0 0 / 90%))",
}));