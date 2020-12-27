import React, { Component, Fragment } from 'react';
import Search from './TaskSearch';
import Sort from './TaskSort';

class Controll extends Component {

    render() {
        return (
            <Fragment>
                <Search onSearch = {this.props.onSearch} />
                <Sort onSort = {this.props.onSort} sort = {this.props.sort}/>
            </Fragment>
        );
    }
}

export default Controll;