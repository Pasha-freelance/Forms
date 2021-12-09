import React, { createContext, useState, useCallback, useEffect } from "react";

import { Stepper } from "./components/stepper/Stepper";
import { FirstStep } from "./components/firstStep/FirstStep";
import { SecondStep } from "./components/secondStep/SecondStep";
import { ThirdStep } from "./components/thirdStep/ThirdStep";

import "./App.scss";

export type GlobalContext = {
  step: number | null;
  setStep: any;
  globalData: IFormData | null;
  setGlobalData: any;
  uploadData: any;
};

export interface IFormData {
  pin: string;
  product: string;
  purchaseDate: string;
  phoneModel: string;
  colorOfDevice: string;
  firstName: string;
  secondName: string;
  email: string;
  imei: string;
  receipt: null | File;
  picture: null | File;
}

export const Context = createContext<GlobalContext>({
  step: null,
  setStep: null,
  globalData: null,
  setGlobalData: null,
  uploadData: null,
});

function App() {
  const [step, setStep] = useState(1);
  const stepsComponents = [<FirstStep />, <SecondStep />, <ThirdStep />];
  const [globalData, setGlobalData] = useState({} as IFormData);

  const uploadData = useCallback(() => {
    const url = `/submit-response.json`;
    console.log("Global data", globalData);
    fetch(url)
      .then((res) => res.json())
      .then((res) => console.log("Final respone", res));
  }, [globalData]);

  return (
    <div className={`column centered`}>
      <Context.Provider
        value={{ step, setStep, globalData, setGlobalData, uploadData }}>
        <Stepper />
        {stepsComponents[step - 1]}
      </Context.Provider>
    </div>
  );
}

export default App;
