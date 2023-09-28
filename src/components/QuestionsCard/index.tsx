import { Card } from "antd";
import { RenderIfTruthy } from "..";
import AddQuestion from "./AddQuestion";
import classes from "./style.module.scss";

type QuestionsCardProps = {
	title: string;
	children: React.ReactNode | React.ReactNode[];
	addQuestionBtn?: boolean;
};

export function QuestionCard(props: QuestionsCardProps) {
	const { title, children, addQuestionBtn = true } = props;
	return (
		<Card color="primary" title={title} className={classes.questionCard}>
			{children}
			<RenderIfTruthy prop={addQuestionBtn} Component={<AddQuestion />} />
		</Card>
	);
}
