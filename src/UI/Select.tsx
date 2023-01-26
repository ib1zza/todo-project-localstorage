import React from "react";
import s from "../css/Select.module.scss";
interface SelectProps {
  children?: React.ReactNode;
  className?: string;
  params?: any[];
  [x: string]: any;
}
const Select: React.FC<SelectProps> = ({ children,className, ...params }) => {
  return (
    <select className={s.select + (className ? " " + className : "") } {...params}>
      {children}
    </select>
  );
};

export default Select;
