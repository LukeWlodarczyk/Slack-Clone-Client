export default values => {
	const { email, password, passwordConf, username } = values;
	let errors = {};

	if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
		errors.email = 'Invalid email address';
	}

	if (!email) {
		errors.email = 'Email is required';
	}

	if (username.length < 3 || username.length > 25) {
		errors.username =
			'The username needs to be between 3 and 25 characters long';
	}

	if (!username) {
		errors.username = 'Username is required';
	}

	if (password !== passwordConf) {
		errors.password = 'Passwords do not match';
	}

	if (password.length < 6 || password.length > 25) {
		errors.password =
			'The password needs to be between 6 and 25 characters long';
	}

	if (!password) {
		errors.password = 'Password is required';
	}

	if (!passwordConf) {
		errors.passwordConf = 'Password confirmation is required';
	}

	return errors;
};
