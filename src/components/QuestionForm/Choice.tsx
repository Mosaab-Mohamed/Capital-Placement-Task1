import { Typography, Input, Button } from "antd";
import { UnorderedListOutlined, PlusOutlined } from "@ant-design/icons";
import { RenderIfTruthy } from "..";
import { Action, State } from "./useQuestionForm";

type ChoicePrpos = {
	value: string;
	index: number;
	dispatch: React.Dispatch<Action<keyof State>>;
	lastChoice: boolean;
};
export default function Choice(props: ChoicePrpos) {
	const { value, index, dispatch, lastChoice } = props;

	const addNewChoice = () => {
		dispatch({ type: "choices", payload: { value: "" } });
	};

	const handleChoicesChange = (value: string, index: number) => {
		dispatch({ type: "choices", payload: { value, index } });
	};
	return (
		<div className="portion choice">
			<Typography.Paragraph strong className="label">
				Choice
			</Typography.Paragraph>

			<div className="inputWrapper">
				<UnorderedListOutlined />
				<Input
					value={value}
					onChange={(e) => handleChoicesChange(e.target.value, index)}
					placeholder="Type here"
				/>
				<RenderIfTruthy
					prop={lastChoice}
					Component={
						<Button icon={<PlusOutlined />} onClick={addNewChoice} />
					}
				/>
			</div>
		</div>
	);
}
