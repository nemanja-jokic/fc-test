import React, {useState} from 'react'

interface FieldProps {
    field: string;
    value: any;
    onChangeGroup: (groupIndex: number, field: string, value: any) => void;
    groupIndex: number;
    indx: number;
}

function Field({ 
    field,
    value, 
    onChangeGroup, 
    groupIndex, 
    indx
} : FieldProps) {
    console.log(`reRender -> input-index: ${indx}`)
    const [typeGuard, setTypeGuard] = useState(value)
    
    const  whatTargetValueshouldBeUsed = ( e: { target: { type: string; wasChecked: any; value: any } } ) => {
       return e.target.type === 'radio' ? !e.target.wasChecked : e.target.value
    }

    const handleInputChange = ( e: any ) => {
        onChangeGroup(groupIndex, field, whatTargetValueshouldBeUsed( e ))
    }

    const generateInputField = () => {
        // If the id field exists, it will not have an input field for editing.
        if(field === '_id') 
        return null       
       
       
        if(typeof typeGuard === 'string') {  
            // If the value is a date, it will use a html date picker.
            console.log(typeGuard.split('T')[0])
            if(Date.parse(typeGuard.split('T')[0]))  
            return <input 
                type="date"    
                value={`${Date.parse(value.split('T')[0]) ? value.split('T')[0] : value}`}           
                onChange={handleInputChange}
            />  
            // If the field value is a long text, use the textarea field.
            if(typeGuard.length > 25) 
            return <textarea 
                value={value}
                onChange={handleInputChange}
            />
            // If the value is a string, it will create an input field with type text.
            // If the value is email, it will create an input field with email as type.
            return (<input 
                type={validateEmail() ? 'email' : 'text'} 
                value={value}
                onChange={handleInputChange}
            />)
        }

        // If the value is a number, it will create an input field with a number as a type.
        if(typeof typeGuard === 'number') 
        return (<input 
            type='number' 
            value={value}
            onChange={handleInputChange}
        />)
        
        
        // If the value is boolean, it will use a radio button with “true/false”.
        if(typeof typeGuard === 'boolean') 
        return (<input 
            type="radio"
            // how to change default input ts
            value={`${value}`}
            onClick={handleInputChange}
        />)
       
        // If the field value is another JSON, just ignore it.
    }
  
   
    const validateEmail = () =>{
        const trimWhitespaceLowercase = typeGuard.replace(/\s+/g, '').toLowerCase();
        const regEx = /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (regEx.test(trimWhitespaceLowercase)) {
            return trimWhitespaceLowercase;
        }

        return false;
    }
    
    return (
        <div style={{ marginRight:10, display: 'flex', justifyContent: 'space-around', flexDirection: 'column'}}>            
            <div style={{minHeight: 60}}>{`${field} :`}  </div>
            <div>{`${value}`}</div>           
            <div>{generateInputField()}</div>
        </div>
       
    )
}

function compareProps(prev: { value: any },current: { value: any }) {
    return prev.value === current.value
}

export default React.memo(Field, compareProps);
