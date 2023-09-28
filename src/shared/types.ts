export type ApplicationForm = {
	data: {
		id: string;
		type: string;
		attributes: ApplicationFormAttributes;
	};
};

export type ApplicationFormAttributes = {
	coverImage?: string;
	personalInformation: {
		firstName: PersonalInformationTemplate;
		lastName: PersonalInformationTemplate;
		emailId: PersonalInformationTemplate;
		phoneNumber: PersonalInformationTemplate;
		nationality: PersonalInformationTemplate;
		currentResidence: PersonalInformationTemplate;
		idNumber: PersonalInformationTemplate;
		dateOfBirth: PersonalInformationTemplate;
		gender: PersonalInformationTemplate;
		personalQuestions?: QuestionTemplate[];
	};
	profile?: {
		education: ProfileTemplate;
		experience: ProfileTemplate;
		resume: ProfileTemplate;
		profileQuestions?: QuestionTemplate[];
	};
	customisedQuestions?: QuestionTemplate[];
};

export type PersonalInformationTemplate = {
	internalUse: boolean;
	show: boolean;
};

export type ProfileTemplate = {
	mandatory: boolean;
	show: boolean;
};

export type QuestionTemplate = {
	id?: string;
	type: QuestionType;
	question: string;
	choices?: string[];
	maxChoice?: number;
	disqualify?: boolean;
	other?: boolean;
};

export type QuestionType =
	| "Paragraph"
	| "ShortAnswer"
	| "YesNo"
	| "Dropdown"
	| "MultipleChoice"
	| "Date"
	| "Number"
	| "FileUpload";

export type QuestionCategory =
	| "personalQuestions"
	| "profileQuestions"
	| "customisedQuestions";
