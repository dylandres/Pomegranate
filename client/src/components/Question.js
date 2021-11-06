import React, { Component } from 'react';

class App extends Component {
render() {
	return (
	<div >
		<Person name="kapil" eyeColor="blue" age="23"></Person>
		<Person name="Sachin" eyeColor="blue" ></Person>
		<Person name="Nikhil" age="23"></Person>
		<Person eyeColor="green" age="23"></Person>
	</div>
	);
}
}

class Person extends Component {
render() {
	return (
	<div>
		<p> Name: {this.props.name} </p>
		<p>EyeColor: {this.props.eyeColor}</p>
		<p>Age : {this.props.age} </p>
	</div>
	)
}
}

Person.defaultProps = {
name: "Rahul",
eyeColor: "deepblue",
age: "45"
}

export default App;
