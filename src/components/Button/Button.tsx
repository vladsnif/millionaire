import React, {MouseEventHandler, ReactNode} from 'react';
import './Button.css';
interface Props {
    children?: ReactNode,
    onClick?: MouseEventHandler
    // any props that come into the component
}

const Button = ({ children, ...props }: Props) => (
	<button className="button" {...props}>{children}</button>
);
export default Button;