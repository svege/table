import React from 'react';
import {func, number, shape, string} from 'prop-types';

const Row = ({employee, deleted}) => {
    return (
        <tr>
            <td>{employee.name}</td>
            <td>{employee.job_title}</td>
            <td>{employee.department}</td>
            <td>{employee.monthly_salary}</td>
            <td><button type='button' onClick={deleted}>&#x2715;</button></td>
        </tr>
    );
};

Row.propTypes = {
    employee: shape({
        name: string.isRequired,
        job_title: string.isRequired,
        department: string.isRequired,
        monthly_salary: number.isRequired,

    }).isRequired,
    deleted: func.isRequired,
};

export default Row;
