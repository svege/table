import React, {Component} from 'react';
import Input from "../../components/Input/Input";
import classes from './Form.module.scss'

class Form extends Component {
    state = {
        employee: {
            name: '',
            job_title: '',
            department: '',
            month_salary: ''
        }
    };

    generateId = () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    };

    addEmployee = (e) => {
        e.preventDefault();
        let newEmployee = {...this.state.employee, id: this.generateId()}
        this.props.onFormSubmit(newEmployee);
        this.setState({employee: {id: '', name: '', job_title: '', department: '', month_salary: ''}});

        fetch('https://database-dc5a8.firebaseio.com/employees.json', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEmployee)
        })
    };

    setValue = (e) => {
        this.setState({employee: {...this.state.employee, [e.target.id]: e.target.value}});
    };

    render() {
        let fields = Object.entries(this.props.fields);
        let inputs = fields.map(item =>
            <Input
                key={item[0]}
                field={item}
                value={this.state.employee[item[0]]}
                employee={this.state.employee}
                changed={e => this.setValue(e)}/>
        );


        return (
            <form className={classes.Form} onSubmit={this.addEmployee} autoComplete="off">
                <div className={classes.Form__wrap}>
                    {inputs}
                </div>
                <button className={classes.Form__button} type='submit'>Add Row</button>
            </form>
        );
    }
}

export default Form;
