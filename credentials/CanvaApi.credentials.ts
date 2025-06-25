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
	extends = ['oAuth2Api'];
	properties: INodeProperties[] = [
		{
			displayName: 'Grant Type',
			name: 'grantType',
			type: 'hidden',
			default: 'pkce',
		},
		{
			displayName: 'Authorization URL',
			name: 'authUrl',
			type: 'hidden',
			default: 'https://www.canva.com/api/oauth/authorize',
			required: true,
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'hidden',
			default: 'https://api.canva.com/rest/v1/oauth/token',
			required: true,
		},
		{
			displayName: 'Client ID',
			name: 'clientId',
			type: 'string',
			default: '',
			required: true,
			description: 'Client ID obtido no Canva Developer Portal',
		},
		{
			displayName: 'Client Secret',
			name: 'clientSecret',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'Client Secret gerado no Canva Developer Portal',
		},
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'hidden',
			default: 'app:read app:write asset:read asset:write brandtemplate:content:read brandtemplate:meta:read comment:read comment:write design:content:read design:content:write design:meta:read design:permission:read design:permission:write folder:read folder:write folder:permission:read folder:permission:write profile:read',
				},
				{
			displayName: 'Auth URI Query Parameters',
			name: 'authQueryParameters',
			type: 'hidden',
			default: 'response_type=code&code_challenge_method=S256',
		},
		{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'hidden',
			default: 'header',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.oauthTokenData.access_token}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.canva.com/rest/v1',
			url: '/users/me',
			method: 'GET',
		},
	};
} 