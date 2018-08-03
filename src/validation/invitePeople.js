export default values => {
	const { email } = values;
	let errors = {};

	if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
		errors.email = 'Invalid email address';
	}

	if (!email) {
		errors.email = 'Email is required';
	}

	return errors;
};
