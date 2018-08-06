import React from 'react';
import { Button, Form, Input, Modal } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import Downshift from 'downshift';

import { TEAM_MEMBER } from '../queries/team';

const DirectMessageModal = ({ open, onClose, teamId, history }) => (
	<Query query={TEAM_MEMBER} variables={{ teamId }}>
		{({ data: { teamMembers }, loading }) => (
			<Modal open={open} onClose={onClose}>
				<Modal.Header>New conversation</Modal.Header>
				<Modal.Content>
					<Form>
						<Form.Field>
							{!loading && (
								<Downshift
									onChange={selectedUser => {
										history.push(
											`/view-team/user/${teamId}/${selectedUser.id}`
										);
										onClose();
									}}
								>
									{({
										getInputProps,
										getItemProps,
										isOpen,
										inputValue,
										selectedItem,
										highlightedIndex,
									}) => (
										<div>
											<Input
												{...getInputProps({ placeholder: 'Select user...' })}
												fluid
											/>
											{isOpen && (
												<div style={{ border: '1px solid #ccc' }}>
													{teamMembers
														.filter(
															i =>
																!inputValue ||
																i.username
																	.toLowerCase()
																	.includes(inputValue.toLowerCase())
														)
														.map((item, index) => (
															<div
																{...getItemProps({ item })}
																key={item.id}
																style={{
																	backgroundColor:
																		highlightedIndex === index
																			? 'gray'
																			: 'white',
																	fontWeight:
																		selectedItem === item ? 'bold' : 'normal',
																}}
															>
																{item.username}
															</div>
														))}
												</div>
											)}
										</div>
									)}
								</Downshift>
							)}
						</Form.Field>
						<Button fluid onClick={onClose}>
							Cancel
						</Button>
					</Form>
				</Modal.Content>
			</Modal>
		)}
	</Query>
);

export default DirectMessageModal;
