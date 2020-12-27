import React, { Component, Fragment } from 'react';

class Sort extends Component {

    constructor(props) {
        super(props);
         this.state = {
            sort : {
                by : 'name',
                value : 1
            }
         }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.sort){
            this.setState({
                sort :  nextProps.sort
            });
        }
    }
    
    onSort = (by, value) => {
        let sort = {by, value}
        this.props.onSort(sort)
    }

    render() {
        return (
            <Fragment>
                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div className="dropdown">
                        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Sắp Xếp <span className="fa fa-caret-square-o-down ml-5" />
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                            <li onClick={() => this.onSort('name' , 1)}>
                                <a role="button">
                                    <span className="fa fa-sort-alpha-asc pr-5">
                                        Tên A-Z
                                    </span>
                                </a>
                            </li>
                            <li onClick={() => this.onSort('name' , -1)}>
                                <a role="button">
                                    <span className="fa fa-sort-alpha-desc pr-5">
                                        Tên Z-A
                                    </span>
                                </a>
                            </li>
                            <li role="separator" className="divider" />
                            <li onClick={() => this.onSort('status' , 1)}>
                                <a role="button">
                                    Đã Kích Hoạt
                                </a>
                            </li>
                            <li onClick={() => this.onSort('status' , -1)}>
                                <a role="button">
                                    Chưa Kích Hoạt
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Sort;