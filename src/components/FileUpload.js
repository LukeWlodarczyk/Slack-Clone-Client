import React from 'react';
import Dropzone from 'react-dropzone';
import { Mutation } from 'react-apollo';

import { NEW_FILE_MESSAGE } from '../queries/message';

const FileUpload = ({ children, disableClick, channelId, style = {} }) => (
	<Mutation mutation={NEW_FILE_MESSAGE}>
		{mutate => (
			<Dropzone
				style={style}
				className="ignore"
				onDrop={async ([file]) => {
					await mutate({
						variables: {
							channelId,
							file,
						},
					});
				}}
				disableClick={disableClick}
			>
				{children}
			</Dropzone>
		)}
	</Mutation>
);

export default FileUpload;
