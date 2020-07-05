import React from 'react';
import {func, shape, string} from 'prop-types';

const Input = ({field, changed, value}) => {
    return (
        <div>
            <label htmlFor={field[0]}>
                {field[1]}
                {field[0] === 'month_salary'
                    ? <span style={{textTransform: 'lowercase'}}> (numbers only)</span>
                    : ''
                }
            </label>

            <input
                id={field[0]}
                placeholder={`Add ${field[1]}`}
                value={value}
                onChange={changed}
                type={field[0] === 'month_salary' ? 'number' : 'text'}
                required/>
        </div>
    );
};

Input.propTypes = {
    field: shape([]).isRequired,
    value: string.isRequired,
    changed: func.isRequired,
};

export default Input;
