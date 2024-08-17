interface FormContainerData {
  children: React.ReactNode;
}

const FormContainer: React.FC<FormContainerData> = ({ children }) => {
  return <div className="user-form--form-container">{children}</div>;
};

export { FormContainer };
