interface IWarning {
  text: string | boolean;
}

export const Warning = ({ text }: IWarning) => {
  return <span className="warn">{text}</span>;
};
