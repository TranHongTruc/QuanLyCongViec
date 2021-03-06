import React, { Component } from 'react';

class TaskItem extends Component {

	onUpdateStatus = () => {
		//console.log(this.props.task.id);
		this.props.onUpdateStatus(this.props.task.id);
	}

	onDeleteToDo = () => {
		this.props.onDeleteToDo(this.props.task.id);
	}

	onUpdateToDo = () => {
		this.props.onUpdateToDo(this.props.task.id);
	}

	render() {
        var {task, index, onUpdateStatus} = this.props; // or truyen thang this.prop.task.name.

		return (
			<tr>
				<td> {index +1 } </td>
				<td> {task.name} </td>  
				{/* <td>{this.props.task.name}</td> */}

				<td className="text-center">
					<span 
						className= {task.status === true? 'label label-success' : 'label label-danger'}
						onClick={this.onUpdateStatus}
					>
						{task.status === true ? 'Kích Hoạt' : 'Ẩn' }	
					</span>
				</td>
				<td className="text-center">
					<button type="button" className="btn btn-warning" onClick = {this.onUpdateToDo}>
						<span className="fa fa-pencil mr-5"></span>
						Sửa
					</button>
					&nbsp;
					<button type="button" className="btn btn-danger" onClick = {this.onDeleteToDo}>
						<span className="fa fa-trash mr-5"></span>
						Xóa
					</button>   
				</td>
			</tr>
		);
	}
}

export default TaskItem;
