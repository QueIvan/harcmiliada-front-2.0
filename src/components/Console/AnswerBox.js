import { Grid, Skeleton, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

const BackgroundGrid = styled(Grid)(({ theme }) => ({
	marginTop: theme.spacing(2),
	marginBottom: theme.spacing(2),
	justifyContent: "center",
}));

const ButtonGrid = styled(Grid, { shouldForwardProp: (props) => props !== "active" })(({ theme, active }) => ({
	cursor: "pointer",
	padding: theme.spacing(1.5),
	backgroundColor: "#364b3d",
	height: "fit-content",
	border: "1px solid #292929",
	color: "#c1c1c1",
	transition: "color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
	boxShadow: "0px 0px 5px 0px rgb(0 0 0 / 40%)",
	"&:hover": { color: "#ffffff" },
	"&:hover>.MuiTypography-root": { borderColor: "#3C4338" },
	...(active && { backgroundColor: "#415748", color: "#e1e1e1", "&>.MuiTypography-root": { borderColor: "#364b3d" } }),
}));

const ButtonText = styled(Typography)(({ theme }) => ({
	padding: theme.spacing(2),
	textAlign: "center",
	border: "8px solid #415748",
	transition: "border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
	textShadow: "0px 0px 10px #000000",
	boxShadow: "0px 0px 5px 0px rgb(0 0 0 / 90%), inset 0px 0px 5px 0px rgb(0 0 0 / 90%)",
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
				<ButtonGrid item active={active} xs={10}>
					<ButtonText sx={{ width: "100%" }}>{data.content}</ButtonText>
				</ButtonGrid>
			)}
		</BackgroundGrid>
	);
}
