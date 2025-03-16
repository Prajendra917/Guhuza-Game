import { JSX } from "react";

export interface BadgeInterface {
  text: string;
  filled?: boolean;
}
export interface ButtonInterface {
  text: string;
  type: string;
  filled: boolean;
  icon: JSX.Element;
  onClick?: () => void;
  href?: string;
}

export interface CardInterface {
  indicator?: string;
  badge?: BadgeInterface;
  // image?: string;
  title: string;
  // subtitle: string;
  body: React.ReactNode ;
  btn: ButtonInterface;
}
