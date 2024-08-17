interface ContainerData {
  children: React.ReactNode;
}

const UserFormContainer: React.FC<ContainerData> = ({ children }) => {
  return <div className="user-form--container">{children}</div>;
};

export { UserFormContainer };
