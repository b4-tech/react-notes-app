import { UseFormRegister } from "react-hook-form";
import { FormData } from "../models/models";

type InputProps = {
    registerOptions?: {
        required: boolean;
    };
    label: string;
    id:  keyof FormData;
    type?: string;
    defaultChecked?: boolean;
    elementType?: 'input' | 'textarea' | 'select' | 'checkbox';
    children?: React.ReactNode;
    register: UseFormRegister<FormData>
};

const InputWithLabel: React.FC<InputProps> = ({
    registerOptions,
    label,
    id,
    type = 'text',
    defaultChecked,
    elementType = 'input',
    children,
    register
}) => {
    return (
        <>
            {elementType === 'textarea' ? (
                <>
                    <label htmlFor={id} className="form-note__label3">
                        {label}
                    </label>
                    <textarea className="form-note__content" {...register(id, registerOptions)} />
                </>
            ) : elementType === 'select' ? (
                <>
                    <label htmlFor={id} className="form-note__label2">
                        {label}
                    </label>
                    <select className="form-note__select" {...register(id, registerOptions)}>
                        {children}
                    </select>
                </>
            ) : elementType === 'checkbox' ? (
                <label htmlFor={id} className="form-note__label4">
                    {label}
                    <input type="checkbox" defaultChecked={defaultChecked} className="form-note__checkbox" {...register(id, registerOptions)} />
                </label>
            ) : (
                <>
                    <label htmlFor={id} className="form-note__label1">
                        {label}
                    </label>
                    <input type={type} defaultChecked={defaultChecked} className="form-note__name" {...register(id, registerOptions)} />
                </>
            )}
        </>
    );
};

export default InputWithLabel
