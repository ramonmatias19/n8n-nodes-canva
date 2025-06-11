import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class CanvaApi implements ICredentialType {
	name = 'canvaApi';
	displayName = 'Canva API';
	documentationUrl = 'https://www.canva.dev/docs/connect/';
	properties: INodeProperties[] = [
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Access Token para autenticação na API do Canva',
		},
		{
			displayName: 'Environment',
			name: 'environment',
			type: 'options',
			options: [
				{
					name: 'Production',
					value: 'production',
				},
				{
					name: 'Sandbox',
					value: 'sandbox',
				},
			],
			default: 'production',
			description: 'Ambiente da API do Canva a ser utilizado',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.accessToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.environment === "sandbox" ? "https://api.canva.com/rest/v1" : "https://api.canva.com/rest/v1"}}',
			url: '/users/me',
			method: 'GET',
		},
	};
} 