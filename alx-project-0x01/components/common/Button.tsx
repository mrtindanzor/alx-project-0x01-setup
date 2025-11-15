import { ButtonProps } from "@/interfaces";

const Button: React.FC<ButtonProps> = ({ ...props }) => {
  return <button {...props} />;
};

export default Button;
