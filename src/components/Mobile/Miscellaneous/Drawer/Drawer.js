import { faClipboardList, faGamepad, faTachometerAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import DrawerLogo from "./DrawerLogo";
import { moveToLink } from "../../../../utils/Anchors";
import { useNavigate } from "react-router";

const BackContainer = styled(Grid)(({ theme }) => ({
	width: "100vw",
	height: "100vh",
	background: theme.background.image,
}));

const HeaderContainer = styled(Grid)(({ theme }) => ({
	marginLeft: theme.spacing(1),
	marginRight: theme.spacing(1),
	paddingBottom: theme.spacing(1),
	alignItems: "center",
	borderBottom: "3px solid #7A7A7A",
}));

const BottomDrawer = styled(Grid)(({ theme }) => ({
	height: "55px",
	width: "100vw",
	boxShadow: "1px 0px 10px #000",
	alignItems: "center",
	position: "fixed",
	bottom: 0,
	"&>*>*": {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	"&::after": {
		content: "''",
		position: "absolute",
		top: "-12px",
		left: "50%",
		boxShadow: "2px 0px 10px #000",
		transform: "translateX(-50%)",
		borderRadius: "16px",
		height: "24px",
		width: "25%",
	},
}));

const OptionHeader = styled(Typography)(({ theme }) => ({
	fontWeight: "bold",
	color: "#ffffff",
	width: "100%",
	textAlign: "center",
	textShadow: "0px 0px 10px #000000",
}));

const IconContainer = styled(Grid)(({ theme }) => ({
	padding: `${theme.spacing(1.5)} ${theme.spacing(2)}`,
	width: "fit-content",
	height: "fit-content",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	borderRadius: "8px",
	backgroundColor: "#304236",
}));

const AccountContainer = styled(Grid)(({ theme }) => ({
	height: "32px",
	marginLeft: "auto",
}));

const CurrentTab = styled(Grid)(({ theme }) => ({
	position: "absolute",
	left: "50%",
	top: "-12px",
	borderRadius: "8px",
	width: "25%",
	background: "#231F1A",
	zIndex: "2",
	transform: "translateX(-50%)",
	padding: theme.spacing(1.5),
}));

const NavBar = styled(Grid)(({ theme }) => ({
	position: "fixed",
	top: "0",
	padding: "0 10px",
	height: "55px",
	maxHeight: "55px",
	alignItems: "center",
	backgroundColor: "#3C4338",
	boxShadow: "0px 1px 10px #000",
}));

const AccountStyling = styled(Grid)(({ theme }) => ({
	height: "100%",
	width: "32px",
	backgroundColor: "#0D4440",
	border: "2px solid #c1c1c1",
	borderRadius: "50%",
	color: "#e1e1e1",
	alignItems: "center",
	justifyContent: "center",
}));

const ButtonContainer = styled(Grid)(({ theme }) => ({
	display: "flex",
	position: "relative",
	height: "100%",
	backgroundColor: "#231F1A",
	"&>*>*>*": { color: "#ffffff !important" },
	"&>*:last-of-type": { marginLeft: "auto" },
}));

const ContentGrid = styled(Grid)(({ theme }) => ({
	marginTop: "68px",
	paddingBottom: "55px",
	height: "fit-content",
}));

export default function Drawer(props) {
	const { href, header } = props;
	const targets = [
		{ href: "/", icon: faTachometerAlt },
		{ href: "/games", icon: faGamepad },
		{ href: "/questions", icon: faClipboardList },
	];
	const nav = useNavigate();

	const moveToFront = () => {
		const index = targets.findIndex((target) => target.href === href);
		if (index !== -1) {
			const target = targets.splice(index, 1)[0];
			targets.unshift(target);
			return targets;
		}
	};

	return (
		<BackContainer container>
			<NavBar container item xs={12}>
				<DrawerLogo onClick={() => moveToLink("/", nav)} />
				<AccountContainer container item xs="auto">
					<AccountStyling container item xs="auto">
						<FontAwesomeIcon size="sm" icon={faUser} />
					</AccountStyling>
				</AccountContainer>
			</NavBar>
			<ContentGrid container item xs={12}>
				<HeaderContainer container item xs={12}>
					<OptionHeader variant="h5">{header}</OptionHeader>
				</HeaderContainer>
				{props.children}
			</ContentGrid>
			<BottomDrawer container item xs={12}>
				<ButtonContainer item xs={12}>
					{moveToFront().map((target, index) => (
						<React.Fragment key={index}>
							{target.href === href ? (
								<CurrentTab container item>
									<IconContainer item p={1}>
										<FontAwesomeIcon size="lg" icon={target.icon} />
									</IconContainer>
								</CurrentTab>
							) : (
								<Grid container item xs={4} sx={{ justifyContent: "center" }}>
									<Grid item p={1}>
										<IconButton size="small" onClick={() => nav(target.href)}>
											<FontAwesomeIcon size="sm" icon={target.icon} />
										</IconButton>
									</Grid>
								</Grid>
							)}
						</React.Fragment>
					))}
				</ButtonContainer>
			</BottomDrawer>
		</BackContainer>
	);
}
