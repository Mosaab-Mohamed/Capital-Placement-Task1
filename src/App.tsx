import { Layout } from "./components";
import ApplicationForm from "./ApplicationForm";
import AppProvider from "./AppProvider";

export default function App() {
	return (
		<Layout>
			<AppProvider>
				<ApplicationForm />
			</AppProvider>
		</Layout>
	);
}
