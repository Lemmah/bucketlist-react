import React, { Component } from 'react'

class DataTable extends Component {
	
	formOpen(){
		this.props.formOpen()
	}
	
	tableHeader(){
		if(!this.props.bucketlist){
			return (
				<tr>
					<th>
						<h3> Welcome, before you die? </h3>
					</th>
					<th>Create Some Bucketlists</th>
				</tr>
			);
		} else {
			return (
				<tr>
          <th><h3>{this.props.bucketlist.name} Activities</h3></th>
          <th>
            <button
              className="btn btn-success btn-sm"
              onClick={this.formOpen.bind(this)}
            >
            Add Activity
            </button>{' '}
            <button
              className="btn btn-info btn-sm"
            >
            Edit Details
            </button>{' '}
            <button
              className="btn btn-danger btn-sm"
            >
            Delete
            </button>
          </th>
        </tr>
			)
		}
	}

	tableBody(){
		if(!this.props.items){
			return (
				<tbody>
					<tr style={{ cursor: "pointer" }}>
		          <td>This Bucketlist is empty.</td>
		          <td></td>
		      </tr>
		    </tbody>
			)
		} else {
			return (
				<tbody>
					{this.props.items.map((bucketlistItem) => {
	          if(!bucketlistItem){
	            return null;
	          } else {
	            return (
	              <tr style={{ cursor: "pointer" }}
	                  key={bucketlistItem.id}>
	              <td
	                className='bucketlistItem'
	              >
	              {bucketlistItem.name}
	              </td>
	              <td>
	                <button
	                  className="btn btn-info btn-sm"
	                >
	                Edit Details
	                </button>{' '}
	                <button
	                  className="btn btn-danger btn-sm"
	                >
	                Delete
	                </button>
	              </td>
	              </tr>)
	          }
	        })}
	      </tbody>
		)
		}
	}
	render(){
		return (
	    <table className="table">
	      <thead>
	        {this.tableHeader()}
	      </thead>
	      {this.tableBody()}
	    </table>
		)
	}
}

export default DataTable