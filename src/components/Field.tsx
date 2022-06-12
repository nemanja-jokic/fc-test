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
    const [typeGuard, setTypeGuard] = useState(value)
    const [radioBottonState, setRadioBottonState] = useState(false)
    
    const  whatTargetValueshouldBeUsed = ( e: { target: { id: string; checked: any; value: any } } ) => {
        setRadioBottonState(!radioBottonState)
        return e.target.id === 'radio' ? !radioBottonState : e.target.value
    }

    const handleInputChange = ( e: any ) => {
        onChangeGroup(groupIndex, field, whatTargetValueshouldBeUsed( e ))
    }

    const generateInputField = () => {
        // If the id field exists, it will not have an input field for editing.
        if(field === 'id') 
        return null       
       
       
        if(typeof typeGuard === 'string') {  
            // If the value is a date, it will use a html date picker.
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
        if(typeof typeGuard === 'boolean') {
            return (<div id="radio" style={{display:'flex', justifyContent: 'center'}} onClick={handleInputChange}>
                <input 
                    type="radio" 
                    style={{pointerEvents: 'none'}}
                    onChange={()=>{}}                  
                    checked={value}                   
                />
            </div>)
        }      
        
        return null
    }
  
   
    const validateEmail = () =>{
        const trimWhitespaceLowercase = typeGuard.replace(/\s+/g, '').toLowerCase();
        const regEx = /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (regEx.test(trimWhitespaceLowercase)) {
            return trimWhitespaceLowercase;
        }

        return false;
    }

    const renderValue = () => {
        if(typeof typeGuard === 'boolean') return value ? 'checked' : 'unchecked'

        if(typeof typeGuard === 'string' && Date.parse(typeGuard.split('T')[0])) 
        return `${Date.parse(value.split('T')[0]) ? value.split('T')[0] : value}`

        return value
    }
    return (
        <div style={{ marginRight:10, display: 'flex',alignItems: 'center', justifyContent: 'space-between', flexDirection: 'column'}}>            
           <div style={{marginBottom: 20}}>
                    <div style={{marginBottom: 20}}>{`${field} :`}  </div>
                    <div style={{ 
                        maxWidth: 220,
                        minWidth: 180,
                        border: '1px solid white', 
                        borderRadius: 20, 
                        height:100, 
                        overflowY: 'auto',
                        display: 'flex',
                        alignItems: 'center', 
                        justifyContent: 'center',
                        padding: 5,
                    }}>{renderValue()}</div>   
                </div>
                     
            <div>{generateInputField()}</div>
        </div>
       
    )
}

function compareProps(prev: { value: any },current: { value: any }) {
    return prev.value === current.value
}

export default React.memo(Field, compareProps);
