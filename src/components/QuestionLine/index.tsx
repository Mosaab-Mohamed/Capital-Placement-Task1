import { useState } from "react";
import { Divider, Typography, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { QuestionCategory, QuestionTemplate } from "shared/types";
import { QuestionForm, RenderIfTruthy } from "..";

type QuestionLineProps = {
	question: QuestionTemplate;
	category: QuestionCategory;
	divider?: boolean;
};

export function QuestionLine(props: QuestionLineProps) {
	const {
		divider = true,
		question: { question, type },
	} = props;
	const [isEdit, setIsEdit] = useState(false);

	const handleToggle = () => setIsEdit(!isEdit);
	const handleClose = () => setIsEdit(false);

	return (
		<div>
			<Typography.Text type="secondary">{type}</Typography.Text>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<Typography.Title level={5}>{question}</Typography.Title>
				<Button icon={<EditOutlined />} onClick={handleToggle} />
			</div>
			<RenderIfTruthy
				prop={isEdit}
				Component={
					<QuestionForm
						question={props.question}
						category={props.category}
						handleClose={handleClose}
					/>
				}
			/>
			<RenderIfTruthy prop={divider} Component={<Divider />} />
		</div>
	);
}
