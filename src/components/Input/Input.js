import React from 'react';
import {func, arrayOf, string} from 'prop-types';

const Input = ({field, changed, value}) => {
    return (
        <div>
            <label htmlFor={field[0]}>
                {field[1]}
                {field[0] === 'monthly_salary'
                    ? <span style={{textTransform: 'lowercase'}}> (numbers only)</span>
                    : ''
                }
            </label>

            <input
                id={field[0]}
                placeholder={`Add ${field[1]}`}
                value={value}
                onChange={changed}
                type={field[0] === 'monthly_salary' ? 'number' : 'text'}
                required/>
        </div>
    );
};

Input.propTypes = {
    field: arrayOf(string).isRequired,
    value: string.isRequired,
    changed: func.isRequired,
};

export default Input;
