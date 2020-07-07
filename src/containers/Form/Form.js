import React, {Component} from 'react';
import {func, shape, string} from 'prop-types';
import Input from '../../components/Input/Input';
import classes from './Form.module.scss'
import API_ROOT from '../../api';

class Form extends Component {
    state = {
        employee: {
            name: '',
            job_title: '',
            department: '',
            ly_salary: ''
        }
    };

    generateId = () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    };

    addEmployee = (e) => {
        e.preventDefault();
        const {employee} = this.state;
        const {onFormSubmit} = this.props;
        const newEmployee = {...employee, id: this.generateId()};
        onFormSubmit(newEmployee);
        this.setState({employee: {id: '', name: '', job_title: '', department: '', monthly_salary: ''}});

        try {
            fetch(`${API_ROOT}/employees.json`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEmployee)
            })
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Ошибка:', error);
        }
    };

    setValue = (e) => {
        const {employee} = this.state;
        this.setState({employee: {...employee, [e.target.id]: e.target.value}});
    };

    render() {
        const {employee} = this.state;
        const {fields} = this.props;

        const columns = Object.entries(fields);
        const inputs = columns.map(item =>
            <Input
                key={item[0]}
                field={item}
                value={employee[item[0]]}
                employee={employee}
                changed={e => this.setValue(e)}/>
        );


        return (
            <form className={classes.Form} onSubmit={this.addEmployee} autoComplete='off'>
                <div className={classes.Form__wrap}>
                    {inputs}
                </div>
                <button className={classes.Form__button} type='submit'>Add Row</button>
            </form>
        );
    }
}

Form.propTypes = {
    onFormSubmit: func.isRequired,
    fields: shape({
        name: string.isRequired,
        job_title: string.isRequired,
        department: string.isRequired,
        monthly_salary: string.isRequired
    }).isRequired
};

export default Form;
