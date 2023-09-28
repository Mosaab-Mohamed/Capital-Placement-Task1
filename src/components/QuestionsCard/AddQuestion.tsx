import { useState } from "react";
import { Modal, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { QuestionForm, QuestionCard } from "..";
import classes from "./style.module.scss";
import { QuestionCategory } from "shared/types";

type AddQuestionProps = {
	category: QuestionCategory;
};
export default function AddQuestion({ category }: AddQuestionProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleClose = () => {
		setIsModalOpen(false);
	};
	return (
		<>
			<Button className="add" icon={<PlusOutlined />} onClick={showModal}>
				Add a question
			</Button>
			<Modal
				open={isModalOpen}
				onCancel={handleClose}
				closeIcon={null}
				footer={null}
				className={classes.addQuestionModal}
			>
				<QuestionCard title="Questions" addQuestionBtn={false}>
					<QuestionForm category={category} handleClose={handleClose} />
				</QuestionCard>
			</Modal>
		</>
	);
}
