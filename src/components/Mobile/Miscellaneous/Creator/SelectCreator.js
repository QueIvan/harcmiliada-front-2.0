import React from "react";
import { Grid, Typography, Select, MenuItem, OutlinedInput } from "@mui/material";

const MenuProps = {
	PaperProps: {
		style: {
			backgroundColor: "#3C5344",
			color: "#f1f1f1",
		},
	},
};

export default function SelectCreator(props) {
	const { groups, creator, userId } = props;

	return (
		<React.Fragment>
			{groups?.length > 0 && (
				<Grid item xs="auto">
					<Typography variant="span" sx={{ fontWeight: "bold", textShadow: "0px 0px 10px #000000" }}>
						Twórca:
					</Typography>
					<Select
						displayEmpty
						size="small"
						value={creator.variable}
						onChange={(e) => {
							creator.handler(e.target.value);
						}}
						sx={{
							marginLeft: "16px",
							"&>*": {
								color: "#e1e1e1 !important",
							},
							"&>fieldset": {
								borderColor: "#7A7A7A !important",
							},
						}}
						inputProps={{ style: { color: "#e1e1e1" } }}
						input={<OutlinedInput size="small" />}
						MenuProps={MenuProps}
					>
						<MenuItem value={userId}>Użytkownik</MenuItem>
						{groups.map((group) => (
							<MenuItem key={group.id} value={group.id}>
								{group.name}
							</MenuItem>
						))}
					</Select>
				</Grid>
			)}
		</React.Fragment>
	);
}
