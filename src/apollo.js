import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink, split } from 'apollo-link';

import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const httpLink = createHttpLink({ uri: 'http://localhost:5000/graphql' });

const middlewareLink = setContext(() => ({
	headers: {
		'x-token': localStorage.getItem('token'),
		'x-refresh-token': localStorage.getItem('refreshToken'),
	},
}));

const afterwareLink = new ApolloLink((operation, forward) =>
	forward(operation).map(response => {
		const {
			response: { headers },
		} = operation.getContext();
		if (headers) {
			const token = headers.get('x-token') || null;
			const refreshToken = headers.get('x-refresh-token') || null;

			if (token) {
				localStorage.setItem('token', token);
			}

			if (refreshToken) {
				localStorage.setItem('refreshToken', refreshToken);
			}
		}

		return response;
	})
);

const httpLinkWithMiddlewares = afterwareLink.concat(
	middlewareLink.concat(httpLink)
);

export const wsLink = new WebSocketLink({
	uri: `ws://localhost:5000/graphql`,
	options: {
		reconnect: true,
		lazy: true,
		connectionParams: () => ({
			token: localStorage.getItem('token') || null,
			refreshToken: localStorage.getItem('refreshToken') || null,
		}),
	},
});

const link = split(
	({ query }) => {
		const { kind, operation } = getMainDefinition(query);
		return kind === 'OperationDefinition' && operation === 'subscription';
	},
	wsLink,
	httpLinkWithMiddlewares
);

const client = new ApolloClient({
	link,
	cache: new InMemoryCache(),
});

export default client;
