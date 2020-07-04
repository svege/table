import React, {Component} from 'react';
import classes from "./SortingButtons.module.scss";

class SortingButtons extends Component {
    sortArr = (key) => {
        let sorted = [...this.props.employees];
        let direction = this.props.sorting.direction;

        const check = isNaN(+sorted[0][key]);

        if (this.props.sorting.value === key && this.props.sorting.direction === 'up') {
            direction = 'down';
        } else {
            direction = 'up';
        }

        if (!check) {
            sorted.sort((a, b) => {
                if (+a[key] < +b[key]) return direction === 'up' ? -1 : 1;
                if (+a[key] > +b[key]) return direction === 'up' ? 1 : -1;
                return 0;
            })
        } else {
            sorted.sort((a, b) => {
                if (a[key].toUpperCase() < b[key].toUpperCase()) return direction === 'up' ? -1 : 1;
                if (a[key].toUpperCase() > b[key].toUpperCase()) return direction === 'up' ? 1 : -1;
                return 0;
            })
        }
        this.props.onFilterClick(sorted, key, direction)
    };

    render() {
        let fields = Object.entries(this.props.fields);
        let buttons = fields.map(item => <button
            key={`sort` + item[0]}
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

export default SortingButtons;
