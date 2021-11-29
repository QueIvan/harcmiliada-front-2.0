import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import Drawer from "../Miscellaneous/Drawer/Drawer";

export default function Console(props) {
	const { title, userId } = props;
	const id = useParams().id;

	useEffect(() => {
		document.title = `Harcmilliada | ${title}`;
	}, [userId]); //eslint-disable-line

	return (
		<Drawer
			userId={userId}
			header={`Panel kontrolny`}
			headerOptions={
				<Autocomplete
					options={[
						{ label: "Pytanie #1", value: 25 },
						{ label: "Pytanie #2", value: 50 },
					]}
					disablePortal
					disableClearable
					renderInput={(params) => (
						<TextField
							{...params}
							sx={{
								width: "350px",
								"&>*, &>*>*>*": {
									color: "#e1e1e1 !important",
								},
								"&>*>fieldset": {
									borderColor: "#7A7A7A !important",
								},
							}}
							label="Aktualne pytanie"
						/>
					)}
				/>
			}
		>
			<div>{id}</div>
		</Drawer>
	);
}
