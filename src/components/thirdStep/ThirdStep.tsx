import React, { useState, useContext } from "react";

import { Context } from "../../App";

import styles from "./thirdStep.module.scss";

import { useValidator, IValidationResult } from "../../hooks/useValidator";
import { Warning } from "../warning/Warning";

interface IFormData {
  purchaseDate: string;
  phoneModel: string;
  colorOfDevice: string;
  imei: string;
  receipt: null | File;
  picture: null | File;
}

export const ThirdStep = () => {
  const [formData, setFormData] = useState({
    purchaseDate: "",
    phoneModel: "",
    colorOfDevice: "",
    imei: "",
    receipt: null,
    picture: null,
  } as IFormData);

  const { step, setStep, globalData, setGlobalData, uploadData } =
    useContext(Context);
  const [validationResults, setValidationResults] = useState(
    {} as IValidationResult
  );
  const [submition, setSubmition] = useState(false);

  const validator = useValidator();

  return (
    <form className={`column centered`} onSubmit={(e) => e.preventDefault()}>
      <h1>Enter purschase/device info</h1>
      <input
        type="date"
        placeholder="purchaseDate"
        value={formData.purchaseDate}
        onChange={(e) =>
          setFormData({ ...formData, purchaseDate: e.target.value })
        }
      />

      {validationResults?.purchaseDate &&
        validationResults.purchaseDate !== true && (
          <Warning text={validationResults.purchaseDate} />
        )}

      <input
        type="text"
        placeholder="phoneModel"
        value={formData.phoneModel}
        onChange={(e) =>
          setFormData({ ...formData, phoneModel: e.target.value })
        }
      />

      {validationResults?.phoneModel &&
        validationResults.phoneModel !== true && (
          <Warning text={validationResults.phoneModel} />
        )}

      <input
        type="text"
        placeholder="colorOfDevice"
        value={formData.colorOfDevice}
        onChange={(e) =>
          setFormData({ ...formData, colorOfDevice: e.target.value })
        }
      />

      {validationResults?.colorOfDevice &&
        validationResults.colorOfDevice !== true && (
          <Warning text={validationResults.colorOfDevice} />
        )}

      <input
        type="text"
        placeholder="IMEI"
        value={formData.imei}
        onChange={(e) => setFormData({ ...formData, imei: e.target.value })}
      />

      {validationResults?.imei && validationResults.imei !== true && (
        <Warning text={validationResults.imei} />
      )}

      <label className="input">
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) =>
            e.target.files &&
            setFormData({ ...formData, receipt: e.target.files[0] })
          }
        />
        Receipt
      </label>

      {validationResults?.receipt && validationResults.receipt !== true && (
        <Warning text={validationResults.receipt} />
      )}

      {formData.receipt && <span>File name: {formData.receipt.name}</span>}

      <label className="input">
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) =>
            e.target.files &&
            setFormData({ ...formData, picture: e.target.files[0] })
          }
        />
        Picture
      </label>

      {validationResults?.picture && validationResults.picture !== true && (
        <Warning text={validationResults.picture} />
      )}

      {formData.picture && <span>File name: {formData.picture.name}</span>}

      <div className={`row ${styles.checkboxWrapper}`}>
        <input
          type="checkbox"
          checked={submition}
          onChange={() => setSubmition(!submition)}
        />
        <span className={`${styles.smallText}`}>
          Please check this box, confirming all information is correct and that
          you understand what is being required.
        </span>
      </div>

      <button
        onClick={() => {
          const validation = validator(formData);
          setValidationResults(validation.result);
          if (validation.passed && submition) {
            setGlobalData({ ...globalData, ...formData });
            uploadData();
          }
        }}>
        Submit
      </button>
    </form>
  );
};
