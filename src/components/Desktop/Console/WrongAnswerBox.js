import { Grid, IconButton, Skeleton } from "@mui/material";
import { styled } from "@mui/system";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const BackgroundGrid = styled(Grid)(({ theme }) => ({
	marginTop: theme.spacing(1.5),
	marginBottom: theme.spacing(1.5),
	justifyContent: "center",
}));

const ButtonGrid = styled(Grid)(({ theme }) => ({
	backgroundColor: "#364b3d",
	padding: theme.spacing(1),
	borderRadius: "16px",
	border: "1px solid #292929",
	boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
}));

const InnerGrid = styled(Grid)(() => ({
	borderRadius: "16px",
	border: "8px solid #415748",
	boxShadow: "0px 0px 5px 0px rgb(0 0 0 / 90%), inset 0px 0px 5px 0px rgb(0 0 0 / 90%)",
	"&>*": { display: "flex", justifyContent: "center", alignItems: "center" },
}));

const Button = styled(IconButton)(({ theme }) => ({
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

const WrongBoxGrid = styled(Grid, { shouldForwardProp: (props) => props !== "active" })(({ theme, active }) => ({
	justifyContent: "center",
	transition: "border-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
	...(active && {
		"&>.MuiGrid-root": {
			borderColor: "#d90429",
			color: "#d90429",
		},
	}),
}));

const WrongBoxBackground = styled(Grid)(({ theme }) => ({
	border: "6px solid #506557",
	borderRadius: theme.spacing(2),
	color: "#506557",
	width: "clamp(55px, 55px, 55px) !important",
	height: "clamp(55px, 55px, 55px)",
	boxShadow: "0px 0px 5px 0px rgb(0 0 0 / 90%), inset 0px 0px 5px 0px rgb(0 0 0 / 90%)",
	justifyContent: "center",
	alignItems: "center",
}));

const WrongBoxIcon = styled(FontAwesomeIcon)(( ) => ({
	fontSize: "3rem",
	height: "fill-available",
	filter: "drop-shadow(0px 0px 5px rgb(0 0 0 / 90%))",
}));

const BoxSkeleton = styled(Skeleton)(({ theme }) => ({
	width: "575px",
	height: "113px",
	borderRadius: theme.spacing(2),
}));

export default function WrongAnswerBox(props) {
	const { quantity, onClick, show } = props;

	return (
		<BackgroundGrid container item xs={12}>
			{show ? (
				<ButtonGrid container item xs={12}>
					<InnerGrid container item xs={12}>
						<Grid item xs={2}>
							<Button size="small" onClick={() => onClick("minus")}>
								<FontAwesomeIcon size="xs" icon={faMinus} />
							</Button>
						</Grid>
						<Grid container item xs={8} py={1.5}>
							{Array.from(Array(3).keys()).map((i, index, arr) => (
								<WrongBoxGrid key={i} active={i < quantity} container item xs={12 / arr.length}>
									<WrongBoxBackground container item>
										<WrongBoxIcon icon={faTimes} />
									</WrongBoxBackground>
								</WrongBoxGrid>
							))}
						</Grid>
						<Grid item xs={2}>
							<Button size="small" onClick={() => onClick("plus")}>
								<FontAwesomeIcon size="xs" icon={faPlus} />
							</Button>
						</Grid>
					</InnerGrid>
				</ButtonGrid>
			) : (
				<BoxSkeleton variant="rectangle" />
			)}
		</BackgroundGrid>
	);
}
