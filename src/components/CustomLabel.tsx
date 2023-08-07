import React from 'react';

interface CustomLabelProps {
	htmlFor: string;
	labelClass?: string;
	children: React.ReactNode;
}

const CustomLabel: React.FC<CustomLabelProps> = ({ htmlFor, labelClass, children }) => {
	return (
		<label htmlFor={htmlFor} className={labelClass}>
			{children}
		</label>
	);
};

export default CustomLabel;
