import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';

export class Canva implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Canva',
		name: 'canva',
		icon: 'file:logo.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Trabalhe com a API Connect do Canva para designs e assets',
		defaults: {
			name: 'Canva',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'canvaApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.environment === "sandbox" ? "https://api.canva.com/rest/v1" : "https://api.canva.com/rest/v1"}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			// Resource selector
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Asset',
						value: 'assets',
						description: 'Gerenciar assets (imagens, vídeos, áudios)',
					},
					{
						name: 'Design',
						value: 'designs',
						description: 'Gerenciar designs e templates',
					},
					{
						name: 'Export',
						value: 'exports',
						description: 'Exportar designs em diferentes formatos',
					},
					{
						name: 'Folder',
						value: 'folders',
						description: 'Gerenciar pastas de organização',
					},
					{
						name: 'User',
						value: 'users',
						description: 'Informações do usuário',
					},
				],
				default: 'designs',
			},

			// ===========================================
			// DESIGNS OPERATIONS
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['designs'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						action: 'Create design',
						description: 'Criar um novo design',
						routing: {
							request: {
								method: 'POST',
								url: '/designs',
								body: {
									design_type: '={{$parameter["designType"]}}',
									title: '={{$parameter["title"] || undefined}}',
								},
							},
						},
					},
					{
						name: 'Get',
						value: 'get',
						action: 'Get design',
						description: 'Buscar um design específico',
						routing: {
							request: {
								method: 'GET',
								url: '=/designs/{{$parameter["designId"]}}',
							},
						},
					},
					{
						name: 'List',
						value: 'list',
						action: 'List designs',
						description: 'Listar designs do usuário',
						routing: {
							request: {
								method: 'GET',
								url: '/designs',
								qs: {
									query: '={{$parameter["searchQuery"] || undefined}}',
									ownership: '={{$parameter["ownership"] || "owned"}}',
									sort_by: '={{$parameter["sortBy"] || "modified"}}',
									limit: '={{$parameter["limit"] || 10}}',
								},
							},
						},
					},
				],
				default: 'create',
			},

			// ===========================================
			// EXPORTS OPERATIONS
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['exports'],
					},
				},
				options: [
					{
						name: 'Create Export Job',
						value: 'createJob',
						action: 'Create export job',
						description: 'Criar um job de exportação',
						routing: {
							request: {
								method: 'POST',
								url: '=/designs/{{$parameter["designId"]}}/export',
								body: {
									format: {
										type: '={{$parameter["exportFormat"]}}',
									},
								},
							},
						},
					},
					{
						name: 'Get Export Job',
						value: 'getJob',
						action: 'Get export job',
						description: 'Verificar status de um job de exportação',
						routing: {
							request: {
								method: 'GET',
								url: '=/exports/{{$parameter["exportId"]}}',
							},
						},
					},
				],
				default: 'createJob',
			},

			// ===========================================
			// FOLDERS OPERATIONS
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['folders'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						action: 'Create folder',
						description: 'Criar uma nova pasta',
						routing: {
							request: {
								method: 'POST',
								url: '/folders',
								body: {
									name: '={{$parameter["folderName"]}}',
								},
							},
						},
					},
					{
						name: 'List',
						value: 'list',
						action: 'List folders',
						description: 'Listar pastas do usuário',
						routing: {
							request: {
								method: 'GET',
								url: '/folders',
								qs: {
									limit: '={{$parameter["limit"] || 10}}',
								},
							},
						},
					},
				],
				default: 'create',
			},

			// ===========================================
			// USERS OPERATIONS
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['users'],
					},
				},
				options: [
					{
						name: 'Get Profile',
						value: 'getProfile',
						action: 'Get user profile',
						description: 'Obter informações do usuário atual',
						routing: {
							request: {
								method: 'GET',
								url: '/users/me',
							},
						},
					},
				],
				default: 'getProfile',
			},

			// ===========================================
			// ASSETS OPERATIONS
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['assets'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						action: 'Get asset',
						description: 'Buscar um asset específico',
						routing: {
							request: {
								method: 'GET',
								url: '=/assets/{{$parameter["assetId"]}}',
							},
						},
					},
					{
						name: 'List',
						value: 'list',
						action: 'List assets',
						description: 'Listar assets do usuário',
						routing: {
							request: {
								method: 'GET',
								url: '/assets',
								qs: {
									limit: '={{$parameter["limit"] || 10}}',
								},
							},
						},
					},
				],
				default: 'get',
			},

			// ===========================================
			// PARAMETERS
			// ===========================================

			// Design parameters
			{
				displayName: 'Design ID',
				name: 'designId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['designs'],
						operation: ['get'],
					},
				},
				default: '',
				description: 'ID do design',
			},
			{
				displayName: 'Design ID',
				name: 'designId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['exports'],
						operation: ['createJob'],
					},
				},
				default: '',
				description: 'ID do design para exportar',
			},
			{
				displayName: 'Design Type',
				name: 'designType',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['designs'],
						operation: ['create'],
					},
				},
				options: [
					{
						name: 'Document',
						value: 'document',
					},
					{
						name: 'Instagram Post',
						value: 'instagram_post',
					},
					{
						name: 'Logo',
						value: 'logo',
					},
					{
						name: 'Poster',
						value: 'poster',
					},
					{
						name: 'Presentation',
						value: 'presentation',
					},
					{
						name: 'Video',
						value: 'video',
					},
				],
				default: 'presentation',
				description: 'Tipo de design a ser criado',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['designs'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'Título do design',
			},

			// Export parameters
			{
				displayName: 'Export ID',
				name: 'exportId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['exports'],
						operation: ['getJob'],
					},
				},
				default: '',
				description: 'ID do job de exportação',
			},
			{
				displayName: 'Export Format',
				name: 'exportFormat',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['exports'],
						operation: ['createJob'],
					},
				},
				options: [
					{
						name: 'PDF',
						value: 'pdf',
					},
					{
						name: 'PNG',
						value: 'png',
					},
					{
						name: 'JPG',
						value: 'jpg',
					},
					{
						name: 'MP4',
						value: 'mp4',
					},
				],
				default: 'pdf',
				description: 'Formato de exportação',
			},

			// Folder parameters
			{
				displayName: 'Folder Name',
				name: 'folderName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['folders'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'Nome da pasta',
			},

			// Asset parameters
			{
				displayName: 'Asset ID',
				name: 'assetId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['assets'],
						operation: ['get'],
					},
				},
				default: '',
				description: 'ID do asset',
			},

			// Common parameters
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				displayOptions: {
					show: {
						operation: ['list'],
					},
				},
				default: 50,
				description: 'Max number of results to return',
			},
			{
				displayName: 'Search Query',
				name: 'searchQuery',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['designs'],
						operation: ['list'],
					},
				},
				default: '',
				description: 'Texto para buscar designs',
			},
			{
				displayName: 'Ownership',
				name: 'ownership',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['designs'],
						operation: ['list'],
					},
				},
				options: [
					{
						name: 'Owned',
						value: 'owned',
					},
					{
						name: 'Shared',
						value: 'shared',
					},
					{
						name: 'All',
						value: 'all',
					},
				],
				default: 'owned',
				description: 'Filtro de propriedade dos designs',
			},
			{
				displayName: 'Sort By',
				name: 'sortBy',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['designs'],
						operation: ['list'],
					},
				},
				options: [
					{
						name: 'Modified',
						value: 'modified',
					},
					{
						name: 'Created',
						value: 'created',
					},
				],
				default: 'modified',
				description: 'Ordenação dos resultados',
			},
		],
	};
} 