import React, { useState, useContext } from "react";

import { useValidator, IValidationResult } from "../../hooks/useValidator";
import { Context } from "../../App";
import { useProducts, IProduct } from "../../hooks/useProducts";

import { Warning } from "../warning/Warning";

export const FirstStep = () => {
  const { step, setStep, globalData, setGlobalData } = useContext(Context);

  const [formData, setFormData] = useState({ pin: "", product: "" });

  const [validationResults, setValidationResults] = useState(
    {} as IValidationResult
  );

  const products: any = useProducts();

  const validator = useValidator();

  return (
    <form className={`column centered`} onSubmit={(e) => e.preventDefault()}>
      <h1>Enter your pin</h1>
      <input
        placeholder="enter PIN"
        type="text"
        value={formData.pin}
        onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
      />
      {validationResults?.pin && validationResults.pin !== true && (
        <Warning text={validationResults.pin} />
      )}
      {products && (
        <select
          value={formData.product}
          onChange={(e) =>
            setFormData({ ...formData, product: e.target.value })
          }>
          <option disabled>Select model</option>
          {products.map((product: IProduct) => (
            <option key={product.title} value={product.title}>
              {product.title}
            </option>
          ))}
        </select>
      )}
      {validationResults?.product && validationResults.product !== true && (
        <Warning text={validationResults.product} />
      )}
      <button
        onClick={() => {
          const validation = validator(formData);
          setValidationResults(validation.result);
          if (validation.passed) {
            setGlobalData({ ...globalData, ...formData });
            setStep(2);
          }
        }}>
        Verify
      </button>
    </form>
  );
};
