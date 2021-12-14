import React, { useState, useContext } from "react";

import { Context, IFormData } from "../../App";

import { Formik, Form, Field, ErrorMessage } from "formik";

import * as yup from "yup";

import styles from "./thirdStep.module.scss";

const schema = yup.object().shape({
	purchaseDate: yup.date().required("Please select the date"),
	phoneModel: yup.string().required("Please enter the phone model"),
	colorOfDevice: yup.string().required("Please enter the color of device"),
	imei: yup.string().required("Please enter the IMEI"),
	receipt: yup.object().required("Upload the receipt"),
	picture: yup.object().required("Upload the picture"),
	check: yup.boolean().isTrue("Please accept T&C"),
});

function getBase64(file: any) {
	return new Promise((resolve) => {
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function() {
			console.log(reader.result);
			resolve(reader.result);
		};
		reader.onerror = function(error) {
			console.log('Error: ', error);
		};
	});
}

export const ThirdStep = () => {
	const [formData, setFormData] = useState({
		purchaseDate: "",
		phoneModel: "",
		colorOfDevice: "",
		imei: "",
		receipt: "",
		picture: "",
		check: false,
	} as IFormData);

	const { globalData, setGlobalData, submitForm } =
		useContext(Context);

	return (
		<Formik
			enableReinitialize={true}
			initialValues={formData}
			validationSchema={schema}
			validateOnChange={true}
			onSubmit={(values: IFormData) => {
				console.log(values);
				setGlobalData({ ...globalData, ...values });
				submitForm(globalData);
			}}>
			<Form className={`column centered`}>
				<h3 className={`${styles.introHeading}`}>
					Please submit the below information<br />
					failure to do may result in deniel of claim
				</h3>

				<h1>Enter purschase/device info</h1>

				<p className="field-label">
					Purchase date*
				</p>
				<Field
					name="purchaseDate"
					type="date"
					value={formData.purchaseDate}
					className="input"
					onChange={(e: any) =>
						setFormData({ ...formData, purchaseDate: e.target.value })
					}
				/>
				<ErrorMessage name="purchaseDate" component="div" className="warn" />

				<Field
					name="phoneModel"
					type="text"
					placeholder="Phone model (example: iPhone 12 Pro)*"
					value={formData.phoneModel}
					onChange={(e: any) =>
						setFormData({ ...formData, phoneModel: e.target.value })
					}
				/>
				<ErrorMessage name="phoneModel" component="div" className="warn" />

				<Field
					name="colorOfDevice"
					type="text"
					placeholder="Color of device*"
					value={formData.colorOfDevice}
					onChange={(e: any) =>
						setFormData({ ...formData, colorOfDevice: e.target.value })
					}
				/>
				<ErrorMessage name="colorOfDevice" component="div" className="warn" />

				<Field
					name="imei"
					type="text"
					placeholder="Enter your IMEI*"
					value={formData.imei}
					onChange={(e: any) =>
						setFormData({ ...formData, imei: e.target.value })
					}
				/>
				<ErrorMessage name="imei" component="div" className="warn" />

				<label className="input">
					<input
						name="receipt"
						type="file"
						accept="image/png, image/jpeg"
						onChange={async (e: any) => {
							if (!e.target.files) {
								return;
							}

							// Upload the file
							const base64 = await getBase64(e.target.files[0]);
							setFormData({
								...formData,
								receipt: {
									file: e.target.files[0],
									base64,
								},
							});
						}}
					/>
					Click to upload purchase receipt*
				</label>
				<ErrorMessage name="receipt" component="div" className="warn" />
				{formData.receipt && <img src={formData.receipt.base64} alt="" width="100" />}

				<label className="input">
					<input
						name="picture"
						type="file"
						accept="image/png, image/jpeg"
						placeholder="Click to upload picture of device"
						onChange={async (e: any) => {
							if (!e.target.files) {
								return;
							}

							// Upload the file
							const base64 = await getBase64(e.target.files[0]);
							setFormData({
								...formData,
								picture: {
									file: e.target.files[0],
									base64,
								},
							});
						}}
					/>
					Click to upload picture of device*
				</label>
				<ErrorMessage name="picture" component="div" className="warn" />
				{formData.picture && <img src={formData.picture.base64} alt="" width="100" />}

				<div className={`row ${styles.checkboxWrapper}`}>
					<input
						name="check"
						type="checkbox"
						checked={formData.check}
						onChange={() =>
							setFormData({ ...formData, check: !formData.check })
						}
					/>
					<span className={`${styles.smallText}`}>
						Please check this box, confirming all information is correct and
						that you understand what is being required.
					</span>
				</div>
				<ErrorMessage name="check" component="div" className="warn" />

				<button type="submit">Submit</button>
			</Form>
		</Formik >
	);
};
