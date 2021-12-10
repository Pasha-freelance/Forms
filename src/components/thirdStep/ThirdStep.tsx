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
  receipt: yup.string().required("Upload the receipt"),
  picture: yup.string().required("Upload the picture"),
  check: yup.boolean().isTrue("Please submit"),
});

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

  const { step, setStep, globalData, setGlobalData, uploadData } =
    useContext(Context);

  const [submition, setSubmition] = useState(false);
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
      }}>
      <Form className={`column centered`}>
        <h1>Enter purschase/device info</h1>
        <Field
          name="purchaseDate"
          type="date"
          value={formData.purchaseDate}
          onChange={(e: any) =>
            setFormData({ ...formData, purchaseDate: e.target.value })
          }
        />
        <ErrorMessage name="purchaseDate" component="div" className="warn" />

        <Field
          name="phoneModel"
          type="text"
          placeholder="phoneModel"
          value={formData.phoneModel}
          onChange={(e: any) =>
            setFormData({ ...formData, phoneModel: e.target.value })
          }
        />
        <ErrorMessage name="phoneModel" component="div" className="warn" />

        <Field
          name="colorOfDevice"
          type="text"
          placeholder="colorOfDevice"
          value={formData.colorOfDevice}
          onChange={(e: any) =>
            setFormData({ ...formData, colorOfDevice: e.target.value })
          }
        />
        <ErrorMessage name="colorOfDevice" component="div" className="warn" />

        <Field
          name="imei"
          type="text"
          placeholder="IMEI"
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
            onChange={(e: any) =>
              e.target.files &&
              setFormData({ ...formData, receipt: e.target.files[0] })
            }
          />
          Receipt
        </label>
        <ErrorMessage name="receipt" component="div" className="warn" />
        {formData.receipt && <span>File name: {formData.receipt.name}</span>}

        <label className="input">
          <input
            name="picture"
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e: any) =>
              e.target.files &&
              setFormData({ ...formData, picture: e.target.files[0] })
            }
          />
          Picture
        </label>
        <ErrorMessage name="picture" component="div" className="warn" />
        {formData.picture && <span>File name: {formData.picture.name}</span>}

        <div className={`row ${styles.checkboxWrapper}`}>
          <input
            name="check"
            type="checkbox"
            checked={formData.check}
            onChange={() =>
              setFormData({ ...formData, check: !formData.check })
            }
          />
          <ErrorMessage name="check" component="div" className="warn" />
          <span className={`${styles.smallText}`}>
            Please check this box, confirming all information is correct and
            that you understand what is being required.
          </span>
        </div>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};
