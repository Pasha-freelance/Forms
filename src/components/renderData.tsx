import { IFormData } from "../App";

export default function renderExistingData(keys: string[], globalData: IFormData) {
	const content = keys.map((key: string, index: number) => {
		return (
			<p key={index}><b>{key}</b>: {(globalData as any)[key]}</p>
		);
	});
	return (
		<div className="existing-data">
			{content}
		</div>
	);
}
