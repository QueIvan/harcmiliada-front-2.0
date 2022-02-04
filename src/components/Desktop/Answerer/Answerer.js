import React, { useEffect } from "react";
import { LoadingButton as MuiLoadingButton } from "@mui/lab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import { useParams } from "react-router";
import io from "socket.io-client";
import {faBlind, faChild, faMale} from "@fortawesome/free-solid-svg-icons";
import HeaderButton from "../Miscellaneous/Drawer/HeaderButton";

const BackContainer = styled(Grid)(({ theme }) => ({
    minWidth: "100vw",
    minHeight: "100vh",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: theme.background.image,
}));

const ButtonText = styled(Typography, { shouldForwardProp: (props) => props !== "smallHeader" })(({ theme, smallHeader }) => ({
    ...(!smallHeader && { fontWeight: "bold", padding: theme.spacing(2) }),
    ...(smallHeader && { width: "100%", display: "block" }),
    textAlign: "center",
    userSelect: "none",
    color: "#ffffff",
    transition: "border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    textShadow: "0px 0px 10px #000000",
}));

const LoadingButton = styled(MuiLoadingButton)(({ theme }) => ({
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

export default function Answerer(props) {
    const { title } = props;
    const id = useParams().id;
    const side = useParams().side;
    const [myQuestion, setMyQuestion] = React.useState(null);

    const socket = io("https://harcmiliada-socket.herokuapp.com");

    const initiateSocket = (room, gameId) => {
        if (socket && room) socket.emit("join", room, gameId);
    };

    const disconnectSocket = () => {
        if (socket) socket.disconnect();
    };

    const listenForCommand = () => {
        socket.on("setAnswerer", (receivedSide) => {
            setMyQuestion(side === receivedSide);
            setTimeout(() => {
                setMyQuestion(null);
            }, 5000);
        });
    }

    useEffect(() => {
        document.title = `Harcmilliada | ${title}`;

        initiateSocket("answerer", id);

        listenForCommand();

        return () => disconnectSocket();
    }, []); // eslint-disable-line

    return (
        <BackContainer container>
            <Grid container item xs={11}>
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                    <LoadingButton
                        startIcon={<FontAwesomeIcon size="lg" icon={myQuestion !== null ? myQuestion ? faChild : faBlind : faMale} />}
                        loadingPosition="center"
                        variant="contained"
                    >
                        {myQuestion !== null ? myQuestion ? "Odpowiadasz!" : "Przeciwnik odpowiada" : "Możesz zgłosić chęć odpowiedzi"}
                    </LoadingButton>
                </Grid>
                <Grid item xs={12}>
                    <ButtonText variant="h3" align="center">
                        Aby zgłosić chęć odpowidzi wciśnij przycisk poniżej
                    </ButtonText>
                </Grid>
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <HeaderButton
                    sx={{ padding: "10px", minWidth: "125px" }}
                    tooltip="Zgłoś chęć odpowiedzi"
                    placement="bottom"
                    size="lg"
                    onClick={() => {
                        if(myQuestion === null) {
                            socket.emit("setAnswerer", id, side);
                        }
                    }}
                    icon={faChild}/>
            </Grid>
            </Grid>
        </BackContainer>
    );
}
