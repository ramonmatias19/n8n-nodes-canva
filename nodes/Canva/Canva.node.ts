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
			baseURL: 'https://api.canva.com/rest/v1',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: '=Bearer {{$credentials.accessToken}}',
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
						name: 'Autofill',
						value: 'autofill',
						description: 'Preencher templates automaticamente com dados',
					},
					{
						name: 'Brand Template',
						value: 'brandTemplates',
						description: 'Gerenciar templates de marca',
					},
					{
						name: 'Comment',
						value: 'comments',
						description: 'Gerenciar comentários em designs',
					},
					{
						name: 'Design',
						value: 'designs',
						description: 'Gerenciar designs e templates',
					},
					{
						name: 'Design Import',
						value: 'designImports',
						description: 'Importar designs de URLs',
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
						name: 'Resize',
						value: 'resizes',
						description: 'Redimensionar designs',
					},
					{
						name: 'User',
						value: 'users',
						description: 'Informações do usuário',
					},
					{
						name: 'Key',
						value: 'keys',
						description: 'Gerenciar chaves de API',
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
						name: 'Clone',
						value: 'clone',
						action: 'Clone design',
						description: 'Clonar um design existente',
						routing: {
							request: {
								method: 'POST',
								url: '=/designs/{{$parameter["designId"]}}/clone',
								body: {
									title: '={{$parameter["cloneTitle"] || undefined}}',
								},
							},
						},
					},
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
						name: 'Delete',
						value: 'delete',
						action: 'Delete design',
						description: 'Deletar um design',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/designs/{{$parameter["designId"]}}',
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
						name: 'Get Pages',
						value: 'getPages',
						action: 'Get design pages',
						description: 'Obter metadata das páginas do design',
						routing: {
							request: {
								method: 'GET',
								url: '=/designs/{{$parameter["designId"]}}/pages',
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
									continuation: '={{$parameter["continuation"] || undefined}}',
								},
							},
						},
					},
					{
						name: 'Update',
						value: 'update',
						action: 'Update design',
						description: 'Atualizar título do design',
						routing: {
							request: {
								method: 'POST',
								url: '=/designs/{{$parameter["designId"]}}',
								body: {
									title: '={{$parameter["newTitle"]}}',
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
										quality: '={{$parameter["quality"] || undefined}}',
										transparent_background: '={{$parameter["transparentBackground"] || undefined}}',
										lossless: '={{$parameter["lossless"] || undefined}}',
									},
									pages: '={{$parameter["pageNumbers"] || undefined}}',
								},
							},
						},
					},
					{
						name: 'Get Export Formats',
						value: 'getFormats',
						action: 'Get export formats',
						description: 'Obter formatos suportados para exportação',
						routing: {
							request: {
								method: 'GET',
								url: '=/designs/{{$parameter["designId"]}}/export-formats',
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
									parent_folder_id: '={{$parameter["parentFolderId"] || undefined}}',
								},
							},
						},
					},
					{
						name: 'Delete',
						value: 'delete',
						action: 'Delete folder',
						description: 'Deletar uma pasta',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/folders/{{$parameter["folderId"]}}',
							},
						},
					},
					{
						name: 'Get',
						value: 'get',
						action: 'Get folder',
						description: 'Obter informações de uma pasta específica',
						routing: {
							request: {
								method: 'GET',
								url: '=/folders/{{$parameter["folderId"]}}',
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
									continuation: '={{$parameter["continuation"] || undefined}}',
								},
							},
						},
					},
					{
						name: 'List Items',
						value: 'listItems',
						action: 'List folder items',
						description: 'Listar itens dentro de uma pasta',
						routing: {
							request: {
								method: 'GET',
								url: '=/folders/{{$parameter["folderId"]}}/items',
								qs: {
									limit: '={{$parameter["limit"] || 10}}',
									item_types: '={{$parameter["itemTypes"] || undefined}}',
									continuation: '={{$parameter["continuation"] || undefined}}',
								},
							},
						},
					},
					{
						name: 'Move Item',
						value: 'moveItem',
						action: 'Move folder item',
						description: 'Mover item para outra pasta',
						routing: {
							request: {
								method: 'POST',
								url: '=/folders/{{$parameter["folderId"]}}/items/move',
								body: {
									item_id: '={{$parameter["itemId"]}}',
									item_type: '={{$parameter["itemType"]}}',
								},
							},
						},
					},
					{
						name: 'Update',
						value: 'update',
						action: 'Update folder',
						description: 'Atualizar nome da pasta',
						routing: {
							request: {
								method: 'POST',
								url: '=/folders/{{$parameter["folderId"]}}',
								body: {
									name: '={{$parameter["newFolderName"]}}',
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
			// KEYS OPERATIONS
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['keys'],
					},
				},
				options: [
					{
						name: 'List',
						value: 'list',
						action: 'List API keys',
						description: 'Listar chaves de API do usuário',
						routing: {
							request: {
								method: 'GET',
								url: '/keys',
							},
						},
					},
				],
				default: 'list',
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
						name: 'Delete',
						value: 'delete',
						action: 'Delete asset',
						description: 'Deletar um asset',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/assets/{{$parameter["assetId"]}}',
							},
						},
					},
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
									tags: '={{$parameter["tags"] || undefined}}',
									continuation: '={{$parameter["continuation"] || undefined}}',
								},
							},
						},
					},
					{
						name: 'Update',
						value: 'update',
						action: 'Update asset',
						description: 'Atualizar metadata de um asset',
						routing: {
							request: {
								method: 'POST',
								url: '=/assets/{{$parameter["assetId"]}}',
								body: {
									name: '={{$parameter["assetName"] || undefined}}',
									tags: '={{$parameter["assetTags"] || undefined}}',
								},
							},
						},
					},
					{
						name: 'Upload',
						value: 'upload',
						action: 'Upload asset',
						description: 'Fazer upload de um novo asset',
						routing: {
							request: {
								method: 'POST',
								url: '/assets',
								headers: {
									'Content-Type': 'multipart/form-data',
								},
								body: {
									file: '={{$parameter["fileData"]}}',
									name: '={{$parameter["fileName"] || undefined}}',
									tags: '={{$parameter["uploadTags"] || undefined}}',
								},
							},
						},
					},
				],
				default: 'get',
			},

			// ===========================================
			// BRAND TEMPLATES OPERATIONS
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['brandTemplates'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						action: 'Get brand template',
						description: 'Obter um template de marca específico',
						routing: {
							request: {
								method: 'GET',
								url: '=/brand-templates/{{$parameter["templateId"]}}',
							},
						},
					},
					{
						name: 'Get Dataset',
						value: 'getDataset',
						action: 'Get brand template dataset',
						description: 'Obter dataset de um template de marca',
						routing: {
							request: {
								method: 'GET',
								url: '=/brand-templates/{{$parameter["templateId"]}}/dataset',
							},
						},
					},
					{
						name: 'List',
						value: 'list',
						action: 'List brand templates',
						description: 'Listar templates de marca',
						routing: {
							request: {
								method: 'GET',
								url: '/brand-templates',
								qs: {
									limit: '={{$parameter["limit"] || 10}}',
									dataset: '={{$parameter["dataset"] || undefined}}',
									continuation: '={{$parameter["continuation"] || undefined}}',
								},
							},
						},
					},
				],
				default: 'list',
			},

			// ===========================================
			// AUTOFILL OPERATIONS
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['autofill'],
					},
				},
				options: [
					{
						name: 'Create Job',
						value: 'createJob',
						action: 'Create autofill job',
						description: 'Criar job de preenchimento automático',
						routing: {
							request: {
								method: 'POST',
								url: '/autofills',
								body: {
									brand_template_id: '={{$parameter["brandTemplateId"]}}',
									title: '={{$parameter["autofillTitle"] || undefined}}',
									data: '={{$parameter["autofillData"]}}',
								},
							},
						},
					},
					{
						name: 'Get Job',
						value: 'getJob',
						action: 'Get autofill job',
						description: 'Verificar status de job de autofill',
						routing: {
							request: {
								method: 'GET',
								url: '=/autofills/{{$parameter["jobId"]}}',
							},
						},
					},
				],
				default: 'createJob',
			},

			// ===========================================
			// COMMENTS OPERATIONS
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['comments'],
					},
				},
				options: [
					{
						name: 'Create Thread',
						value: 'createThread',
						action: 'Create comment thread',
						description: 'Criar nova thread de comentário',
						routing: {
							request: {
								method: 'POST',
								url: '/comments',
								body: {
									design_id: '={{$parameter["designId"]}}',
									message: '={{$parameter["message"]}}',
									anchor_point: '={{$parameter["anchorPoint"] || undefined}}',
								},
							},
						},
					},
					{
						name: 'Create Reply',
						value: 'createReply',
						action: 'Create reply',
						description: 'Responder a um comentário',
						routing: {
							request: {
								method: 'POST',
								url: '=/comments/{{$parameter["threadId"]}}/replies',
								body: {
									message: '={{$parameter["replyMessage"]}}',
								},
							},
						},
					},
					{
						name: 'Get Thread',
						value: 'getThread',
						action: 'Get comment thread',
						description: 'Obter thread de comentário',
						routing: {
							request: {
								method: 'GET',
								url: '=/comments/{{$parameter["threadId"]}}',
							},
						},
					},
					{
						name: 'Get Reply',
						value: 'getReply',
						action: 'Get reply',
						description: 'Obter resposta específica',
						routing: {
							request: {
								method: 'GET',
								url: '=/comments/{{$parameter["threadId"]}}/replies/{{$parameter["replyId"]}}',
							},
						},
					},
					{
						name: 'List Replies',
						value: 'listReplies',
						action: 'List replies',
						description: 'Listar respostas de uma thread',
						routing: {
							request: {
								method: 'GET',
								url: '=/comments/{{$parameter["threadId"]}}/replies',
								qs: {
									limit: '={{$parameter["limit"] || 10}}',
									continuation: '={{$parameter["continuation"] || undefined}}',
								},
							},
						},
					},
				],
				default: 'createThread',
			},

			// ===========================================
			// DESIGN IMPORTS OPERATIONS
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['designImports'],
					},
				},
				options: [
					{
						name: 'Create URL Import Job',
						value: 'createUrlImport',
						action: 'Create URL import job',
						description: 'Importar design de uma URL',
						routing: {
							request: {
								method: 'POST',
								url: '/imports',
								body: {
									import_method: {
										type: 'url',
										url: '={{$parameter["importUrl"]}}',
									},
									title: '={{$parameter["importTitle"] || undefined}}',
								},
							},
						},
					},
					{
						name: 'Get Import Job',
						value: 'getImportJob',
						action: 'Get import job',
						description: 'Verificar status de importação',
						routing: {
							request: {
								method: 'GET',
								url: '=/imports/{{$parameter["importJobId"]}}',
							},
						},
					},
				],
				default: 'createUrlImport',
			},

			// ===========================================
			// RESIZES OPERATIONS
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['resizes'],
					},
				},
				options: [
					{
						name: 'Create Resize Job',
						value: 'createResize',
						action: 'Create resize job',
						description: 'Redimensionar um design',
						routing: {
							request: {
								method: 'POST',
								url: '=/designs/{{$parameter["designId"]}}/resize',
								body: {
									design_type: '={{$parameter["newDesignType"]}}',
									title: '={{$parameter["resizeTitle"] || undefined}}',
								},
							},
						},
					},
					{
						name: 'Get Resize Job',
						value: 'getResizeJob',
						action: 'Get resize job',
						description: 'Verificar status de redimensionamento',
						routing: {
							request: {
								method: 'GET',
								url: '=/resizes/{{$parameter["resizeJobId"]}}',
							},
						},
					},
				],
				default: 'createResize',
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