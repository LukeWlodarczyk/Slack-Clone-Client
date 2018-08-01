export default values => {
	const { name } = values;
	let errors = {};

	// if (name.length < 3 || name.length > 16) {
	// 	errors.name = 'Team name needs to be between 3 and 16 characters long';
	// }

	if (!name) {
		errors.name = 'Team name is required';
	}

	return errors;
};
