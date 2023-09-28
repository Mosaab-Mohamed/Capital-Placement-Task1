import { useState } from "react";
import { Checkbox, Switch, Typography, Divider } from "antd";
import { PersonalInformationTemplate, ProfileTemplate } from "shared/types";
import classes from "./style.module.scss";

type InfoLineProps = {
	name: string | React.ReactNode;
	info: PersonalInformationTemplate | ProfileTemplate;
	divider?: boolean;
};

export function InfoLine(props: InfoLineProps) {
	const { name, info, divider = true } = props;
	const [isInternalUse, setIsInternalUse] = useState(
		"internalUse" in info ? info.internalUse : info.mandatory
	);
	const [isShown, setIsShown] = useState(info.show);

	return (
		<>
			<div className={classes.infoLine}>
				{typeof name === "string" ? (
					<Typography.Text strong>{name}</Typography.Text>
				) : (
					name
				)}
				<Checkbox
					value={isInternalUse}
					onChange={(e) => setIsInternalUse(e.target.checked)}
				>
					{"internalUse" in info ? "Internal" : "mandatory"}
				</Checkbox>
				<div className="switch-wrapper">
					<Switch
						id={name as string}
						checked={isShown}
						onChange={(e) => setIsShown(e)}
						size="small"
					/>
					<label htmlFor={name as string}>
						{isShown ? "Hide" : "show"}
					</label>
				</div>
			</div>
			{divider && <Divider />}
		</>
	);
}
