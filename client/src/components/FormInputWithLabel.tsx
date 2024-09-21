import React from "react";
import 'styles/formStyles.css'
interface FormInputWithLabelProps {
    children: React.ReactNode,
    labelText: string
}
export const FormInputWithLabel = ({ children, labelText } : FormInputWithLabelProps) => {
    return(
    <div className='inputdiv'>
        {children}
        <span className='inputlabel'>{labelText}</span>       
    </div>
    );
}