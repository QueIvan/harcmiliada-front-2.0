import React from "react";
import { styled } from "@mui/system";
import { Grid, Typography, Skeleton, Zoom } from "@mui/material";

const ButtonGrid = styled(Grid, { shouldForwardProp: (props) => props !== "active" })(({ theme, active }) => ({
	padding: theme.spacing(1),
	backgroundColor: "#364b3d",
	height: "fit-content",
	border: "1px solid #292929",
	minHeight: "100px",
	color: "#c1c1c1",
	transition: "color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
	boxShadow: "0px 0px 5px 0px rgb(0 0 0 / 90%)",
	...(active && { backgroundColor: "#415748", color: "#e1e1e1", "&>.MuiGrid-root>.MuiGrid-root": { borderColor: "#364b3d" } }),
}));

const ButtonTextGrid = styled(Grid)(({ theme }) => ({
	border: "8px solid #415748",
	boxShadow: "inset 0px 0px 5px 0px rgb(0 0 0 / 90%)",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const ButtonInnerGrid = styled(Grid)(({ theme }) => ({
	boxShadow: "0px 0px 5px 0px rgb(0 0 0 / 90%)",
}));

const ButtonText = styled(Typography, { shouldForwardProp: (props) => props !== "hiddenLabel" })(({ theme, hiddenLabel }) => ({
	padding: theme.spacing(1.5),
	textAlign: "center",
	userSelect: "none",
	color: "#ffffff",
	transition: "border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
	textShadow: "0px 0px 10px #000000",
	...(hiddenLabel && { display: "flex", justifyContent: "center" }),
}));

const ButtonLabel = styled(Typography)(({ theme }) => ({
	backgroundColor: "#415748",
	display: "flex",
	justifyContent: "center",
	width: "75px",
	padding: `${theme.spacing(0.5)} 0`,
	borderRadius: "50%",
	boxShadow: "0px 0px 5px 0px rgb(0 0 0 / 90%)",
}));

export default function AnswerBox(props) {
	const { answer, active, showId, empty, shown, zoomStatus } = props;

	return (
		<Grid container item xs={12} mt={4} sx={{ justifyContent: "center" }}>
			<ButtonGrid container item xs={10} active={active}>
				<ButtonInnerGrid container item xs={12}>
					<React.Fragment>
						{active ? (
							<React.Fragment>
								<ButtonTextGrid item xs={10}>
									<ButtonText variant="h6" align="center">
										{answer.content}
									</ButtonText>
								</ButtonTextGrid>
								<ButtonTextGrid item xs={2} sx={{ borderLeft: "none" }}>
									<ButtonText variant="h6" align="center">
										{answer.score}
									</ButtonText>
								</ButtonTextGrid>
							</React.Fragment>
						) : (
							<ButtonTextGrid item xs={12} sx={{ ...(!shown && { display: "flex", justifyContent: "center" }) }}>
								{!empty && shown && (
									<Zoom in={zoomStatus} timeout={750}>
										<ButtonText hiddenLabel variant="h6" align="center">
											<ButtonLabel variant="span" align="center">
												{showId}
											</ButtonLabel>
										</ButtonText>
									</Zoom>
								)}
								{!shown && <Skeleton variant="text" width="95%" height="100%" />}
							</ButtonTextGrid>
						)}
					</React.Fragment>
				</ButtonInnerGrid>
			</ButtonGrid>
		</Grid>
	);
}
