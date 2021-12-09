import React, { useContext } from "react";

import { Context } from "../../App";

import styles from "./stepper.module.scss";

export const Stepper = () => {
  const steps = [1, 2, 3];
  const { step, setStep } = useContext(Context);

  return (
    <div className={`row centered ${styles.stepper}`}>
      {steps.map((st, i) => (
        <div key={st + i} className={`row centered`}>
          <button
            key={st}
            className={`row centered ${styles.stepBtn} ${
              step === st && styles.active
            }`}
            onClick={() => setStep(st)}>
            {st}
          </button>
          {i + 1 < steps.length && <div className={styles.stepperLine}></div>}
        </div>
      ))}
    </div>
  );
};
