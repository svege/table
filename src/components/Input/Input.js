import React from 'react';

const Input = (props) => {
    return (
        <div>
            <label htmlFor={props.field[0]}>
                {props.field[1]}
                {props.field[0]==='month_salary'
                    ? <span style={{textTransform: 'lowercase'}}> (numbers only)</span>
                    : ''
                }
            </label>

            <input
                id={props.field[0]}
                placeholder={`Add ${props.field[1]}`}
                value={props.value}
                onChange={props.changed}
                type={props.field[0]==='month_salary' ? 'number' : 'text'}
                required/>
        </div>
    );
};

export default Input;
