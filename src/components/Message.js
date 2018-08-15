import React from 'react';

import { Comment } from 'semantic-ui-react';
import RenderText from '../components/RenderText';

const Message = ({ message: { url, text, filetype } }) => {
	if (url) {
		if (filetype.startsWith('image/')) {
			return <img src={url} alt="" />;
		} else if (filetype === 'text/plain') {
			return <RenderText url={url} />;
		} else if (filetype.startsWith('audio/')) {
			return (
				<div>
					<audio controls>
						<source src={url} type={filetype} />
					</audio>
				</div>
			);
		}
	}

	return <Comment.Text>{text}</Comment.Text>;
};

export default Message;
