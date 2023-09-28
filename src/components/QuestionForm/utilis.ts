import { ApplicationForm, QuestionTemplate } from "shared/types";


export const questionTypeOptions =  [
	{ label: "Paragraph", value: "Paragraph" },
	{ label: "Short answer", value: "ShortAnswer" },
	{ label: "Yes/No", value: "YesNo" },
	{ label: "Dropdown", value: "Dropdown" },
	{ label: "Multiple choice", value: "MultipleChoice" },
	{ label: "Date", value: "Date" },
	{ label: "Number", value: "Number" },
	{ label: "File upload", value: "FileUpload" },
];

const questionObj = (questionInfo: QuestionTemplate) => {
	const { id, type, question, choices, maxChoice, disqualify, other } =
		questionInfo;

	return {
		id,
		type,
		question,
		choices,
		maxChoice,
		disqualify,
		other,
	};
};

export const formatData = (
	data: ApplicationForm | undefined,
	category: "personalQuestions" | "profileQuestions" | "customisedQuestions",
	questionInfo: QuestionTemplate
) => {
    if (!data) return;
	return {
		...data,
		data: {
			...data.data,
			attributes: {
				...data.data.attributes,
				personalInformation: {
					...data.data.attributes.personalInformation,
					personalQuestions:
						category === "personalQuestions"
							? [
									...(data.data.attributes.personalInformation
										.personalQuestions || []),
									questionObj(questionInfo),
							  ]
							: [
									...(data.data.attributes.personalInformation
										.personalQuestions || []),
							  ],
				},
				profile:
					category === "profileQuestions"
						? {
								...data.data.attributes.profile!,
								profileQuestions: [
									...(data.data.attributes.profile?.profileQuestions ||
										[]),

									questionObj(questionInfo),
								],
						  }
						: data.data.attributes.profile,
				customisedQuestions:
					category === "customisedQuestions"
						? [
								...(data.data.attributes.customisedQuestions || []),
								questionObj(questionInfo),
						  ]
						: data.data.attributes.customisedQuestions,
			},
		},
	};
};
