import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { IFormData } from "../../App";

import * as yup from "yup";

import { Context } from "../../App";

const schema = yup.object().shape({
	firstName: yup
		.string()
		.min(2, "Should have at least 2 characters")
		.required("Please enter the firstName"),
	lastName: yup
		.string()
		.min(2, "Should have at least 2 characters")
		.required("Please enter the lastName"),
	email: yup.string().email("Invalid email adress").required("Field is empty"),
});

export const SecondStep = () => {
	const { setStep, globalData, setGlobalData, uploadData } =
		useContext(Context);

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
	} as IFormData);

	return (
		<Formik
			enableReinitialize={true}
			initialValues={formData}
			validationSchema={schema}
			validateOnChange={true}
			onSubmit={(values: IFormData) => {
				console.log(values);
				setGlobalData({ ...globalData, values });
				uploadData(globalData);
				setStep(3);
			}}>
			<Form className={`column centered`}>
				<h1>Enter customer info</h1>
				<Field
					type="text"
					name="firstName"
					placeholder="firstName"
					value={formData.firstName}
					onChange={(e: any) =>
						setFormData({ ...formData, firstName: e.target.value })
					}
				/>
				<ErrorMessage name="firstName" component="div" className="warn" />

				<Field
					type="text"
					name="lastName"
					placeholder="lastName"
					value={formData.lastName}
					onChange={(e: any) =>
						setFormData({ ...formData, lastName: e.target.value })
					}
				/>
				<ErrorMessage name="lastName" component="div" className="warn" />

				<Field
					type="email"
					name="email"
					placeholder="email"
					value={formData.email}
					onChange={(e: any) =>
						setFormData({ ...formData, email: e.target.value })
					}
				/>
				<ErrorMessage name="email" component="div" className="warn" />

				<button type="submit">Submit</button>
			</Form>
		</Formik>
	);
};
