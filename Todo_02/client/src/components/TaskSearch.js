import React, { Component, Fragment } from 'react';

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword : ''
        }
    }

    onChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState ({
            [name] : value
        });
    }

    onSearch = () => {
        this.props.onSearch(this.state);
    }
    

    render() {

        let {keyword} = this.state

        return (
            <Fragment>
               <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div className="input-group">
                        <input
                         type="text" 
                         name="keyword"
                         className="form-control" 
                         placeholder="Nhập từ khóa..." 
                         value={keyword}
                         onChange={this.onChange}
                         />
                        <span className="input-group-btn">
                            <button 
                                className="btn btn-primary" 
                                type="button"
                                onClick = {this.onSearch}
                            >
                                <span className="fa fa-search mr-5" />Tìm
                            </button>
                        </span>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Search;