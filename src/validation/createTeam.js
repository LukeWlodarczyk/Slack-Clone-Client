export default values => {
	const { name } = values;
	let errors = {};

	if (name.length < 4 || name.length > 20) {
		errors.name = 'Team name needs to be between 5 and 20 characters long';
	}

	if (!name) {
		errors.name = 'Password is required';
	}

	return errors;
};
