const LabelName = ({ htmlFor,className,children}) => {
    let inputclass="";
    inputclass=`text-2xl`;
  return (
    <label htmlFor={htmlFor}
    className={inputclass}>
      {children}
    </label>
  );
};
export default LabelName
