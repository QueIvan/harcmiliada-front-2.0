import { Grid, Skeleton, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

const BackgroundGrid = styled(Grid)(({ theme }) => ({
	marginTop: theme.spacing(2),
	marginBottom: theme.spacing(2),
	justifyContent: "center",
}));

const ButtonGrid = styled(Grid, { shouldForwardProp: (props) => props !== "active" })(({ theme, active }) => ({
	padding: theme.spacing(1.5),
	backgroundColor: "#364b3d",
	height: "fit-content",
	border: "1px solid #292929",
	color: "#c1c1c1",
	boxShadow: "0px 0px 5px 0px rgb(0 0 0 / 90%)",
	transition: "color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
	cursor: "pointer",
	"&:hover": { color: "#ffffff" },
	"&:hover>.MuiGrid-root>.MuiGrid-root": { borderColor: "#3C4338" },
	...(active && { backgroundColor: "#415748", color: "#e1e1e1", "&>.MuiGrid-root>.MuiGrid-root": { borderColor: "#364b3d" } }),
}));

const ButtonTextGrid = styled(Grid)(({ theme }) => ({
	border: "8px solid #415748",
	transition: "border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
	boxShadow: "inset 0px 0px 5px 0px rgb(0 0 0 / 90%)",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const ButtonInnerGrid = styled(Grid)(({ theme }) => ({
	boxShadow: "0px 0px 5px 0px rgb(0 0 0 / 90%)",
}));

const ButtonText = styled(Typography, { shouldForwardProp: (props) => props !== "hiddenLabel" })(({ theme, hiddenLabel }) => ({
	padding: theme.spacing(2),
	textAlign: "center",
	textShadow: "0px 0px 10px #000000",
}));

const ButtonSkeleton = styled(Skeleton)(({ theme }) => ({
	width: "407px",
	height: "98px",
}));

export default function AnswerBox(props) {
	const { data, active, onClick, showSkeleton } = props;

	return (
		<BackgroundGrid container item xs={4} onClick={onClick}>
			{showSkeleton ? (
				<ButtonSkeleton variant="rectangle" />
			) : (
				<ButtonGrid container item active={active} xs={10}>
					<ButtonInnerGrid container item xs={12}>
						<ButtonTextGrid item xs={10}>
							<ButtonText variant="h6" align="center">
								{data.content}
							</ButtonText>
						</ButtonTextGrid>
						<ButtonTextGrid item xs={2} sx={{ borderLeft: "none" }}>
							<ButtonText variant="h6" align="center">
								{data.score}
							</ButtonText>
						</ButtonTextGrid>
					</ButtonInnerGrid>
				</ButtonGrid>
			)}
		</BackgroundGrid>
	);
}
