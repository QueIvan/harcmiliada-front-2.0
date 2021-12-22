import React from "react";
import { Grid, Skeleton, Zoom } from "@mui/material";
import { ButtonGrid, ButtonTextGrid, ButtonInnerGrid } from "../../Miscellaneous/Styled/Grid";
import { ButtonText, ButtonLabel } from "../../Miscellaneous/Styled/Typography";

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
