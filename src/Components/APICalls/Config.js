import { Component } from 'react';

let axios = require('axios');
const apiUrl = "http://localhost:5000";
const initialAppState = {
			authenticated: false,
			loginError: null,
			registrationError: null,
			token: null,
			username: null,
			bucketlists: null,
			items: null,
			bucketlistOnFocus: null,
};

class Requests extends Component {
	constructor(){
		super();
		this.state = initialAppState;
	}

	resetState(){
		this.setState(initialAppState);
	}

	setHeaders(token){
		return {
			headers: {
				"Authorization": "Bearer " + token,
				"Content-Type": "application/json",
			}
		};
	}

	authenticate(endPoint,credentials){
		/* 
			Authenticate User so that they may be able to access resources.
		*/
		axios.post(apiUrl + endPoint, credentials)
    .then((response) => {
      console.log(response.data.message);
      let responseData = response.data.message,
      		registrationMsg = "registered successfully";
      if(responseData.info === undefined){
      	if(responseData.includes(registrationMsg)){
	      	console.log("should login");
	      	this.handleLogin(credentials);
	      }
      } else {
      	this.setState({
	      	authenticated: response.data,
	      });
      }   
    })
    .catch((error) => {
      console.log(error.response.data);
      let desiredEndPoint = endPoint,
      		resource = "register";
      if(desiredEndPoint.includes(resource)){
	      this.setState({
	      	registrationError: error.response.data.error,
	      	loginError: null,
	      	authenticated: false,
	      });
	    } else {
	    	this.setState({
      	loginError: error.response.data.error,
      	registrationError: null,
      	authenticated: false,
      });
	    }
    });
	}

	getResource(resourceName, resourceUrl, token){
		/* 
			Get Resource Method does perform the get requests to API.
			The response is loaded to state to be shared across components.
		*/
		axios.get(apiUrl+resourceUrl, this.setHeaders(token))
		.then((response) => {
			const configs = this.state;
			console.log(":::::",configs);
			configs[resourceName] = response.data.message;
			console.log("::::",configs);
			this.setState(configs);
		})
		.catch((error) => {
			console.log(error.response.data.error);
			return error.response.data;
		})
	}	

	createResource(resourceUrl, details){
		const token = this.state.authenticated.message.access_token;
		const headers = this.setHeaders(token);
		let payload = details;
		axios.post(apiUrl + resourceUrl, payload, headers)
		.then((response) => {
			console.log(response.data);
			console.log(this.state);
		})
		.catch(error => {
			console.log(error.response)
		})
	}

	deleteResource(){
		console.log("Resource Deleted");
	}
}


export default Requests;