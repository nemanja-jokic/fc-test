import React from 'react'

// Components
import Field from './Field'

interface GroupProps {
    group: object;
    onChangeGroup: (groupIndex: number, field: string, value: any) => void;
    index: number;
}

function Group({ group, onChangeGroup, index } : GroupProps) {
    // console.log(`group- ${index}`)
    return (
        <div 
            style={{
                display: 'flex',
                padding:20,
                marginBottom: 10,
                backgroundColor: '#78937d',
                color: 'white',
                overflowX: 'scroll', 
            }}
        >  
            {
                Object.entries(group).map(([field,value], indx) => typeof value !== 'object' && <React.Fragment key={`group-${index}-field${indx}`}>
                    <Field
                        groupIndex={index}
                        field={field}
                        value={value}
                        onChangeGroup={onChangeGroup}
                        indx={indx}                  
                    />
                </React.Fragment>)
            }
        </div>
       
    )
}

function shallowEqual(prev: { [x: string]: any; }, current: { [x: string]: any; }) {
    const prevKeys = Object.keys(prev)
    const currentKeys = Object.keys(current)
    if (prevKeys.length !== currentKeys.length) return false
    for (let key of prevKeys) {
      if (prev[key] !== current[key]) return false
    }
    return true
}

function compareProps(prev: { group: any; },current: { group: any; }) {
    return shallowEqual(prev.group, current.group)
}

export default React.memo(Group, compareProps);
