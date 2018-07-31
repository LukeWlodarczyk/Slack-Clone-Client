export default errors =>
	errors.reduce((acc, error) => {
		acc[error.path] = error.message;
		return acc;
	}, {});
