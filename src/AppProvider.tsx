import { createContext } from "react";

import { ApplicationForm } from "./shared/types";
import useRequest from "./shared/hooks";

type AppContextType = {
	data: ApplicationForm | undefined;
	isLoading: boolean;
	error: string;
};

type AppProviderProps = {
	children: React.ReactNode | React.ReactNode[];
};

export const AppContext = createContext<AppContextType>({
	data: undefined,
	isLoading: false,
	error: "",
});

const PrismUrl =
	import.meta.env.VITE_PRISM_URL ||
	"/api/54516541654/programs/laboriosaddm/application-form";

export default function AppProvider({ children }: AppProviderProps) {
	const { data, isLoading, error } = useRequest<ApplicationForm>({
		method: "get",
		url: PrismUrl,
	});

	return (
		<AppContext.Provider value={{ data, isLoading, error }}>
			{children}
		</AppContext.Provider>
	);
}
