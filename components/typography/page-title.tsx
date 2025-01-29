import React from "react";
import { ApText } from "./text";

interface IProps {
  title: string;
}

export const ApPageTitle: React.FC<IProps> = ({ title }) => {
  return <ApText className="text-lg mb-2 font-bold">{title}</ApText>;
};
