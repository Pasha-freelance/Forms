import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { IFormData } from "../../App";

import * as yup from "yup";

import { Context } from "../../App";
import { useProducts, IProduct } from "../../hooks/useProducts";

const schema = yup.object().shape({
	pin: yup
		.string()
		.min(4, "Should have at least 4 characters")
		.required("Please enter the pin"),
	product: yup.string().required("Select product"),
});

export const FirstStep = () => {
	const { setStep, globalData, setGlobalData } = useContext(Context);

	const [formData, setFormData] = useState({
		pin: "",
		product: "",
	} as IFormData);

	const products: any = useProducts();

	return (
		<Formik
			enableReinitialize={true}
			initialValues={formData}
			validationSchema={schema}
			validateOnChange={true}
			onSubmit={(values: IFormData) => {
				console.log(values);
				setGlobalData({ ...globalData, ...values });
				setStep(2);
			}}>
			<Form className={`column centered`}>
				<h1>Enter your pin</h1>
				<Field
					type="text"
					name="pin"
					placeholder="enter PIN*"
					value={formData.pin}
					onChange={(e: any) =>
						setFormData({ ...formData, pin: e.target.value })
					}
				/>
				<ErrorMessage name="pin" component="div" className="warn" />

				{products && (
					<Field
						name="product"
						as="select"
						onChange={(e: any) =>
							setFormData({ ...formData, product: e.target.value })
						}
						value={formData.product || "select product"}>
						<option value="select product" disabled>
							Select your product*
						</option>
						{products.map((product: IProduct) => (
							<option key={product.title} value={product.title}>
								{product.title}
							</option>
						))}
					</Field>
				)}
				<ErrorMessage name="product" component="div" className="warn" />

				<button type="submit">Verify</button>
			</Form>
		</Formik>
	);
};
