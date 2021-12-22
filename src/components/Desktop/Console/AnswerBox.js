import React from "react";
import {BackgroundGrid, ButtonGrid, ButtonTextGrid, ButtonInnerGrid} from "../../Miscellaneous/Styled/Grid";
import {ButtonSkeleton} from "../../Miscellaneous/Styled/Skeleton";
import {ButtonText} from "../../Miscellaneous/Styled/Typography";

export default function AnswerBox(props) {
	const { data, active, onClick, showSkeleton, removeHover } = props;

	return (
		<BackgroundGrid container item xs={4} onClick={onClick}>
			{showSkeleton ? (
				<ButtonSkeleton variant="rectangle" />
			) : (
				<ButtonGrid container item removeHover={removeHover} active={active} xs={10}>
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
