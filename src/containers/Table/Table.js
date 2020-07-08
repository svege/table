import React, {Component} from 'react';
import {arrayOf, func, number, shape, string} from 'prop-types';
import classes from './Table.module.scss';
import Row from '../../components/Row/Row';
import API_ROOT from '../../api';

class Table extends Component {
    deleteRow = person => {
        const {initialData, employees, onDeleteClick} = this.props;
        const filtered = [...employees];
        const filteredInitial = [...initialData];
        const result = filtered.filter(item => item.name !== person.name);
        const deletedKey =  Object.keys(filteredInitial).find(key => filteredInitial[key] === person);

        onDeleteClick(result);
        try {
            fetch(`${API_ROOT}/employees/${deletedKey}.json`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(filteredInitial[deletedKey])
            })
        }  catch (error) {
            // eslint-disable-next-line no-console
            console.error('Ошибка:', error);
        }
    };

    render() {
        const {fields, employees} = this.props;

        const columns = Object.entries(fields);
        const headRow = columns.map(item =>
            <th key={`headcell${  item[0]}`}>
                {item[0] === 'monthly_salary' ? `${item[1] }, $` : item[1] }
            </th>);

        let content = '';

        if (employees.length > 0) {
            content = employees.map(person => (
                <Row
                    key={person.id}
                    employee={person}
                    deleted={() => this.deleteRow(person)}
                />)
            );
        }

        return (
            <table className={classes.Table}>
                <thead>
                <tr>
                    {headRow}
                    <th />
                </tr>
                </thead>
                <tbody>
                    {content}
                </tbody>
            </table>
        );
    }
}

Table.propTypes = {
    fields: shape({}).isRequired,
    initialData: arrayOf(shape({
        name: string.isRequired,
        job_title: string.isRequired,
        department: string.isRequired,
        monthly_salary: number.isRequired
    })).isRequired,
    employees: arrayOf(shape({
        name: string.isRequired,
        job_title: string.isRequired,
        department: string.isRequired,
        monthly_salary: number.isRequired
    })).isRequired,
    onDeleteClick: func.isRequired
};

export default Table;
