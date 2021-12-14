import React, { createContext, useState, useCallback } from "react";

import { Stepper } from "./components/stepper/Stepper";
import { FirstStep } from "./components/firstStep/FirstStep";
import { SecondStep } from "./components/secondStep/SecondStep";
import { ThirdStep } from "./components/thirdStep/ThirdStep";

import "./App.css";

export type GlobalContext = {
	step: number | null;
	setStep: any;
	globalData: IFormData | null;
	setGlobalData: any;
	uploadData: any;
	submitForm: any;
};

export interface IFormData {
	pin: string;
	product: string;
	purchaseDate: string;
	phoneModel: string;
	colorOfDevice: string;
	firstName: string;
	lastName: string;
	email: string;
	imei: string;
	receipt: any;
	picture: any;
	check: boolean;
}

export const Context = createContext<GlobalContext>({
	step: null,
	setStep: null,
	globalData: null,
	setGlobalData: null,
	uploadData: null,
	submitForm: null,
});

function App() {
	const [step, setStep] = useState(1);
	const stepsComponents = [<FirstStep />, <SecondStep />, <ThirdStep />];
	const [globalData, setGlobalData] = useState({} as IFormData);
	const [loading, setLoading] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const uploadData = useCallback(() => {
		const url = `/submit-response.json`;
		console.log("Global data", globalData);
		setLoading(true);
		fetch(url)
			.then((res) => res.json())
			.then((res) => {
				setLoading(false);
				console.log("Final respone", res);
			});
	}, [globalData]);

	const submitForm = useCallback(() => {
		const url = `/submit-response.json`;
		console.log("submit the form", globalData);
		setLoading(true);
		fetch(url)
			.then((res) => res.json())
			.then((res) => {
				setLoading(false);
				console.log("Final respone", res);
				setSubmitted(true);
			});
	}, [globalData]);

	if (submitted) {
		return (
			<div className="sucessWrapper">
				<h1>Successfully registered the product</h1>
			</div>
		);
	}

	return (
		<div className={`column centered`}>
			<Context.Provider
				value={{ step, setStep, globalData, setGlobalData, uploadData, submitForm }}>
				<Stepper />
				{stepsComponents[step - 1]}
				{loading && (
					<div className="loading row centered">
						<h1>Loading...</h1>
					</div>
				)}
			</Context.Provider>
		</div>
	);
}

export default App;
