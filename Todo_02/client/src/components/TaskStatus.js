import React, { Component, Fragment } from 'react';

class Status extends Component {

    onUpdateStatus = () => {
        this.props.onUpdateStatus()
    }

    render() {
        const {status} = this.props;
        return (
            <Fragment>
                <td className="text-center">
                    <span className={status?"label label-success m-w":"label label-primary m-w"}
                        onClick = {this.onUpdateStatus}
                    >
                        {status?'Đã kích hoạt':'Chưa kích hoat'}
                    </span>
                </td>
            </Fragment>
        );
    }
}

export default Status;