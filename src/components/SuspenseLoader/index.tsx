import { PropsWithChildren } from "react";
import { Spin, Alert } from "antd";
import classes from "./style.module.scss";

type SuspenseLoaderProps = {
	isLoading: boolean;
	error: string;
	data: any;
};

export function SuspenseLoader(props: PropsWithChildren<SuspenseLoaderProps>) {
	const { isLoading, error, data, children } = props;

	if (isLoading)
		return <Spin size="large" className={classes.suspenseLoader} />;
	if (error)
		return (
			<Alert
				message={error}
				type="error"
				showIcon
				className={classes.suspenseLoader}
			/>
		);
	if (!data)
		return (
			<Alert
				message="No data to display"
				type="warning"
				showIcon
				className={classes.suspenseLoader}
			/>
		);

	return children;
}
