type RenderIfTruthyProps<T> = {
	prop: T;
	Component: React.ReactNode;
};

export function RenderIfTruthy<T>({ prop, Component }: RenderIfTruthyProps<T>) {
	if (!prop) return null;
	return <>{Component}</>;
}
