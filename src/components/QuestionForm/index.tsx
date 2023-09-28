import { Typography, Select, Input, Checkbox, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { QuestionTemplate, QuestionCategory } from "shared/types";
import Choice from "./Choice";
import { RenderIfTruthy } from "..";
import useQuestionForm from "./useQuestionForm";
import { questionTypeOptions } from "./utilis";
import classes from "./style.module.scss";

type QuestionFormProps = {
	question?: QuestionTemplate;
	category: QuestionCategory;
	handleClose?: () => void;
};

export function QuestionForm(props: QuestionFormProps) {
	const {
		state: { type, question, choices, maxChoice, disqualify, other },
		dispatch,
		updateQuestion,
		contextHolder,
	} = useQuestionForm( props.category, props.question);

	return (
		<div className={classes.question}>
			{contextHolder}
			<div className="portion">
				<Typography.Paragraph strong className="label">
					Type
				</Typography.Paragraph>
				<Select
					value={type}
					onChange={(value) => dispatch({ type: "type", payload: value })}
					options={questionTypeOptions}
				/>
			</div>
			<div className="portion">
				<Typography.Paragraph strong className="label">
					Question
				</Typography.Paragraph>
				<Input
					placeholder="Type here"
					value={question}
					onChange={(e) =>
						dispatch({ type: "question", payload: e.target.value })
					}
				/>
			</div>

			<RenderIfTruthy
				prop={type === "Dropdown" || type === "MultipleChoice"}
				Component={
					<div className="portion">
						{choices.map((choice, index) => (
							<Choice
								key={index}
								value={choice}
								index={index}
								dispatch={dispatch}
								lastChoice={index === choices.length - 1}
							/>
						))}
						<Checkbox
							value={other}
							onChange={(e) =>
								dispatch({ type: "other", payload: e.target.checked })
							}
						>
							Enable "Other" option
						</Checkbox>
					</div>
				}
			/>

			<RenderIfTruthy
				prop={type === "MultipleChoice"}
				Component={
					<div className="portion">
						<Typography.Paragraph strong>
							Max Choices Allowed
						</Typography.Paragraph>
						<Input
							placeholder="Enter number of choice allowed here"
							type="number"
							min={1}
							value={maxChoice}
							onChange={(e) =>
								dispatch({ type: "maxChoice", payload: e.target.value })
							}
						/>
					</div>
				}
			/>

			<RenderIfTruthy
				prop={type === "YesNo"}
				Component={
					<div className="portion">
						<Checkbox
							value={disqualify}
							onChange={(e) =>
								dispatch({
									type: "disqualify",
									payload: e.target.checked,
								})
							}
						>
							Disqualify candidate if the answer is no
						</Checkbox>
					</div>
				}
			/>

			<div className="actions">
				<Button
					icon={<CloseOutlined />}
					className="delete"
					onClick={props.handleClose}
				>
					Delete question
				</Button>
				<Button type="primary" className="save" onClick={updateQuestion}>
					Save
				</Button>
			</div>
		</div>
	);
}
