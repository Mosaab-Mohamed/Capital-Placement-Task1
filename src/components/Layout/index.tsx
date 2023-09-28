import { Button, Typography } from "antd";
import { MenuOutlined, HomeOutlined, ProfileOutlined } from "@ant-design/icons";
import classes from "./style.module.scss";

type LayoutProps = {
	children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
	return (
		<div className={classes.layout}>
			<div className="sidebar">
				<Button style={{ marginBottom: "50px" }} icon={<MenuOutlined />} />
				<Button style={{ marginBottom: "30px" }} icon={<HomeOutlined />} />
				<Button icon={<ProfileOutlined />} />
			</div>
			<div className="main">
				<div className="navbar">
					<div className="navItem">
						<Typography.Text strong>Program Details</Typography.Text>
					</div>
					<div className="navItem active">
						<Typography.Text strong>Application Form</Typography.Text>
					</div>
					<div className="navItem">
						<Typography.Text strong>Workflow</Typography.Text>
					</div>
					<div className="navItem">
						<Typography.Text strong>Reviewv</Typography.Text>
					</div>
				</div>
				{children}
			</div>
		</div>
	);
}
