import {ReactNode} from "react";

export const Responsive = (props: { children: ReactNode, wide?: boolean }) => {
  return (
    <div className={`mx-auto px-4 ${props.wide ? 'max-w-6xl' : 'max-w-4xl'}`}>
      {props.children}
    </div>
  );
};
