import React, { useState, useContext } from "react";

import { Context } from "../../App";
import { useValidator, IValidationResult } from "../../hooks/useValidator";

import { Warning } from "../warning/Warning";

export const SecondStep = () => {
  const { step, setStep, globalData, setGlobalData } = useContext(Context);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [validationResults, setValidationResults] = useState(
    {} as IValidationResult
  );

  const validator = useValidator();

  return (
    <form className={`column centered`} onSubmit={(e) => e.preventDefault()}>
      <h1>Enter customer info</h1>
      <input
        type="text"
        placeholder="firstName"
        value={formData.firstName}
        onChange={(e) =>
          setFormData({ ...formData, firstName: e.target.value })
        }
      />
      {validationResults?.firstName && validationResults.firstName !== true && (
        <Warning text={validationResults.firstName} />
      )}
      <input
        type="text"
        placeholder="secondName"
        value={formData.lastName}
        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
      />
      {validationResults?.lastName && validationResults.lastName !== true && (
        <Warning text={validationResults.lastName} />
      )}
      <input
        type="email"
        placeholder="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      {validationResults?.email && validationResults.email !== true && (
        <Warning text={validationResults.email} />
      )}
      <button
        onClick={() => {
          const validation = validator(formData);
          setValidationResults(validation.result);
          if (validation.passed) {
            setGlobalData({ ...globalData, ...formData });
            setStep(3);
          }
        }}>
        Submit
      </button>
    </form>
  );
};
