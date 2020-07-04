import React from 'react';

const Row = (props) => {
    return (
        <tr>
            <td>{props.employee.name}</td>
            <td>{props.employee.job_title}</td>
            <td>{props.employee.department}</td>
            <td>{props.employee.month_salary}</td>
            <td><button onClick={props.deleted}>&#x2715;</button></td>
        </tr>
    );
};

export default Row;
