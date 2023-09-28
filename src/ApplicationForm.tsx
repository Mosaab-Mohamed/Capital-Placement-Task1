import { useContext } from "react";
import { Typography } from "antd";
import { AppContext } from "./AppProvider";
import {
	QuestionCard,
	InfoLine,
	SuspenseLoader,
	CoverImgInput,
	RenderIfTruthy,
	QuestionLine,
} from "./components";
import "./styles/main.scss";

export default function ApplicationForm() {
	const { data, isLoading, error } = useContext(AppContext);

	if (isLoading || error || !data)
		return <SuspenseLoader isLoading={isLoading} error={error} data={data} />;

	const { personalInformation, profile, customisedQuestions } =
		data?.data.attributes;
	return (
		<div style={{ padding: "20px 50px", width: "50%" }}>
			<CoverImgInput />
			<QuestionCard title="Personal Information">
				<InfoLine name="First Name" info={personalInformation.firstName} />

				<InfoLine name="Last Name" info={personalInformation.lastName} />
				<InfoLine name="Email" info={personalInformation.emailId} />
				<InfoLine
					name={
						<Typography.Text style={{ flex: 2 }}>
							<strong>Phone </strong>
							<Typography.Text>(without dial code)</Typography.Text>
						</Typography.Text>
					}
					info={personalInformation.phoneNumber}
				/>
				<InfoLine
					name="Nationality"
					info={personalInformation.nationality}
				/>
				<InfoLine
					name="Current Residence"
					info={personalInformation.currentResidence}
				/>
				<InfoLine name="ID Number" info={personalInformation.idNumber} />
				<InfoLine
					name="Date of Birth"
					info={personalInformation.dateOfBirth}
				/>
				<InfoLine name="Gender" info={personalInformation.gender} />
				{personalInformation.personalQuestions?.map((question, index) => (
					<QuestionLine
						question={question}
						key={question.id}
						category="personalQuestions"
						divider={
							index !==
							personalInformation.personalQuestions?.length! - 1
						}
					/>
				))}
			</QuestionCard>

			<RenderIfTruthy
				prop={profile}
				Component={
					<QuestionCard title="Profile">
						<InfoLine name="Education" info={profile?.education!} />
						<InfoLine name="Experience" info={profile?.experience!} />
						<InfoLine name="Resume" info={profile?.resume!} />
						{profile?.profileQuestions?.map((question, index) => (
							<QuestionLine
								category="profileQuestions"
								key={question.id}
								question={question}
								divider={
									index !== profile?.profileQuestions?.length! - 1
								}
							/>
						))}
					</QuestionCard>
				}
			/>

			<QuestionCard title="Additional questions">
				{customisedQuestions?.map((question, index) => (
					<QuestionLine
						category="customisedQuestions"
						key={question.id}
						question={question}
						divider={index !== customisedQuestions.length - 1}
					/>
				))}
			</QuestionCard>
		</div>
	);
}
