import { useEffect, useState } from "react";
import { AxiosError, AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axios";

export default function useRequest<T>(
	config: AxiosRequestConfig,
	dependencies: any[] = []
) {
	const [data, setData] = useState<T>();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		const controller = new AbortController();

		const fetchData = async (controller: AbortController) => {
			setIsLoading((prev) => !prev);
			setError("");
			try {
				const { data } = await axiosInstance.request<T>({
					signal: controller.signal,
					...config,
				});
				setData(data);
			} catch (error) {
				if (error instanceof AxiosError && error.code !== "ERR_CANCELED") {
					setError(error.message);
				}
			} finally {
				setIsLoading((prev) => !prev);
			}
		};

		fetchData(controller);
		return () => controller.abort();

		// eslint-disable-next-line
	}, [...dependencies]);

	return { data, isLoading, error };
}
