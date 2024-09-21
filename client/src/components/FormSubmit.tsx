import React from "react";
import 'styles/formStyles.css'
interface FormSubmitProps {
    submitText: string
}
export const FormSubmit = ({ submitText } : FormSubmitProps) => {
    return(
    <div className='inputdiv'>
        <input type="submit" id="submit" value={submitText}/>
    </div>
    );
}