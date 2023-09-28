import { useReducer, useContext } from "react";
import { message } from "antd";
import { AxiosError } from "axios";
import { QuestionCategory, QuestionTemplate, QuestionType } from "shared/types";
import { formatData } from "./utilis";
import { axiosInstance } from "../../shared/axios";
import { AppContext } from "../../AppProvider";

export type State = {
	type: QuestionType;
	question: string;
	choices: string[];
	maxChoice: number;
	disqualify: boolean;
	other: boolean;
};

type Choice = { value: string; index?: number };

export type Action<T extends keyof State> = {
	type: T;
	payload: T extends "choices" ? Choice : State[T];
};

type Reducer = <T extends keyof State>(
	state: State,
	action: Action<T>
) => State;

const reducer: Reducer = (state, action) => {
	switch (action.type) {
		case "type":
			return { ...state, type: action.payload as QuestionType };
		case "question":
			return { ...state, question: action.payload as string };
		case "choices": {
			if (!(action.payload as Choice).index) {
				return {
					...state,
					choices: [...state.choices, (action.payload as Choice).value],
				};
			}
			const newChoices = [...state.choices];
			newChoices[(action.payload as Choice).index!] = (
				action.payload as Choice
			).value;
			return { ...state, newChoices };
		}
		case "maxChoice":
			return { ...state, maxChoice: action.payload as number };
		case "disqualify":
			return { ...state, disqualify: action.payload as boolean };
		case "other":
			return { ...state, other: action.payload as boolean };
		default:
			return state;
	}
};

const PrismUrl =
	import.meta.env.VITE_PRISM_URL ||
	"/api/54516541654/programs/laboriosaddm/application-form";

export default function useQuestionForm(
	category: QuestionCategory,
	currentQuestion: QuestionTemplate | undefined
) {
	const { data } = useContext(AppContext);

	const [state, dispatch] = useReducer(reducer, {
		type: currentQuestion?.type || "Paragraph",
		question: currentQuestion?.question || "",
		choices: currentQuestion?.choices || [""],
		maxChoice: currentQuestion?.maxChoice || 1,
		disqualify: currentQuestion?.disqualify || false,
		other: currentQuestion?.other || false,
	});
	const [messageApi, contextHolder] = message.useMessage();
	const { type, question, choices, maxChoice, disqualify, other } = state;

	const notifySuccess = (content: string) => {
		messageApi.open({
			type: "success",
			content: content,
		});
	};

	const notifyError = (content: string) => {
		messageApi.open({
			type: "error",
			content: content,
		});
	};

	const updateQuestion = async () => {
		try {
			const response = await axiosInstance.put(
				PrismUrl,
				formatData(data, category, {
					id: currentQuestion?.id,
					type,
					question,
					choices,
					maxChoice,
					disqualify,
					other,
				})
			);
			if (response.status === 204)
				notifySuccess("Question is updated successfully");
		} catch (error) {
			if (error instanceof AxiosError) {
				notifyError(error.message);
			}
		}
	};

	return { state, dispatch, contextHolder, updateQuestion };
}
