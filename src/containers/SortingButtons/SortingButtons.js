import React, {Component} from 'react';
import {arrayOf, func, number, shape, string} from 'prop-types';
import classes from './SortingButtons.module.scss';

class SortingButtons extends Component {
    sortArr = (key) => {
        const {employees, sorting, onFilterClick} = this.props;
        const sorted = [...employees];
        let sortDirection = sorting.direction;

        // eslint-disable-next-line no-restricted-globals
        const check = isNaN(+sorted[0][key]);

        if (sorting.value === key && sorting.direction === 'up') {
            sortDirection = 'down';
        } else {
            sortDirection = 'up';
        }

        if (!check) {
            sorted.sort((a, b) => {
                if (+a[key] < +b[key]) return sortDirection === 'up' ? -1 : 1;
                if (+a[key] > +b[key]) return sortDirection === 'up' ? 1 : -1;
                return 0;
            })
        } else {
            sorted.sort((a, b) => {
                if (a[key].toUpperCase() < b[key].toUpperCase()) return sortDirection === 'up' ? -1 : 1;
                if (a[key].toUpperCase() > b[key].toUpperCase()) return sortDirection === 'up' ? 1 : -1;
                return 0;
            })
        }
        onFilterClick(sorted, key, sortDirection)
    };

    render() {
        const {fields} = this.props;

        const columns = Object.entries(fields);
        const buttons = columns.map(item => <button
            type='button'
            key={`sort${  item[0]}`}
            className={classes.Button}
            onClick={() => this.sortArr(item[0])}>
            {item[1]}
        </button>);


        return (
            <div className={classes.Sorting}>
                <p>Sort by</p>
                {buttons}
            </div>
        );
    }
}

SortingButtons.propTypes = {
    sorting: shape({
        direction: string.isRequired,
        value: string.isRequired
    }).isRequired,
    fields: shape({
        name: string.isRequired,
        job_title: string.isRequired,
        department: string.isRequired,
        monthly_salary: string.isRequired
    }).isRequired,
    employees: arrayOf(shape({
        name: string.isRequired,
        job_title: string.isRequired,
        department: string.isRequired,
        monthly_salary: number.isRequired
    })).isRequired,
    onFilterClick: func.isRequired
};

export default SortingButtons;
