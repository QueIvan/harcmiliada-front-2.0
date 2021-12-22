import React from "react";
import {BackgroundGrid, ButtonGrid} from "../../Miscellaneous/Styled/Grid";
import {ButtonSkeleton} from "../../Miscellaneous/Styled/Skeleton";
import {ButtonText} from "../../Miscellaneous/Styled/Typography";

export default function VisibilityButton(props) {
	const { label, active, onClick, show } = props;

	return (
		<BackgroundGrid container item xs={12}>
			{show ? (
				<ButtonGrid item active={active} xs={10} onClick={onClick}>
					<ButtonText addBorder variant="h6">{label}</ButtonText>
				</ButtonGrid>
			) : (
				<ButtonSkeleton variant="rectangle" />
			)}
		</BackgroundGrid>
	);
}
