import { useRef, useState } from "react";
import { Button, Typography } from "antd";
import { UploadOutlined, CloseOutlined } from "@ant-design/icons";
import { QuestionCard } from "..";
import classes from "./style.module.scss";
import { RenderIfTruthy } from "..";

export function CoverImgInput() {
	const [imgUrl, setImgUrl] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { files } = e.target;
		if (files && files.length > 0) {
			setImgUrl(URL.createObjectURL(files[0]));
		}
	};

	const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		setImgUrl("");
		if (inputRef.current) {
			inputRef.current.value = "";
			inputRef.current.click();
		}
	};

	return (
		<div className={classes.coverImgInput}>
			<RenderIfTruthy
				prop={!imgUrl}
				Component={
					<QuestionCard title="Cover Image Input" addQuestionBtn={false}>
						<div
							className="imgUploader"
							onClick={() => inputRef.current?.click()}
						>
							<UploadOutlined
								style={{ fontSize: "40px", marginBottom: "10px" }}
								color="action"
							/>
							<Typography.Paragraph strong>
								Upload cover image
							</Typography.Paragraph>
							<Typography.Paragraph type="secondary">
								16:9 ratio is recommended. Max image size 1mb
							</Typography.Paragraph>
						</div>
					</QuestionCard>
				}
			/>

			<input
				ref={inputRef}
				type="file"
				id="imageInput"
				onChange={handleChange}
				accept=".jpg, .jpeg, .png"
			/>

			<RenderIfTruthy
				prop={imgUrl}
				Component={
					<div className="imageViewer">
						<img src={imgUrl} alt="coverImg" className="coverImg" />
						<Button
							icon={<CloseOutlined />}
							className="deleteBtn"
							onClick={handleDelete}
							color="#A80000"
						>
							Delete & re-upload
						</Button>
					</div>
				}
			/>
		</div>
	);
}
