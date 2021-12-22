import { Grid, IconButton, Skeleton } from "@mui/material";
import { styled } from "@mui/system";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import {BoxSkeleton} from "../../Miscellaneous/Styled/Skeleton";
import { Button } from "../../Miscellaneous/Styled/IconButton";
import {BackgroundGrid, ButtonGrid, InnerGrid} from "../../Miscellaneous/Styled/Grid";
import React from "react";

export default function WrongAnswerBox(props) {
	const { quantity, onClick, show } = props;

	return (
		<BackgroundGrid container item xs={12}>
			{show ? (
				<ButtonGrid wrongAnswer container item xs={10}>
					<InnerGrid container item xs={12}>
						<Grid item xs={1.5}>
							<Button size="small" onClick={() => onClick("minus")}>
								<FontAwesomeIcon size="xs" icon={faMinus} />
							</Button>
						</Grid>
						<Grid item xs={0.5}></Grid>
						<Grid container item xs={8} py={1.5}>
							{Array.from(Array(3).keys()).map((i, index, arr) => (
								<WrongBoxGrid key={i} active={i < quantity} container item xs={12 / arr.length}>
									<WrongBoxBackground container item>
										<WrongBoxIcon icon={faTimes} />
									</WrongBoxBackground>
								</WrongBoxGrid>
							))}
						</Grid>
						<Grid item xs={0.5}></Grid>
						<Grid item xs={1.5}>
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
