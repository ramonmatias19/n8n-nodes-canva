import {
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
	IWebhookFunctions,
} from 'n8n-workflow';

export class CanvaTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Canva Trigger',
		name: 'canvaTrigger',
		icon: 'file:logo.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["event"]}}',
		description: 'Recebe notificações webhook do Canva em tempo real',
		defaults: {
			name: 'Canva Trigger',
		},
		inputs: [],
		outputs: ['main'],
		credentials: [
			{
				name: 'canvaApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'canva-webhook',
			},
		],
		properties: [
			{
				displayName: 'Event',
				name: 'event',
				type: 'options',
				options: [
					{
						name: 'Comment Notification',
						value: 'comment',
						description: 'Eventos relacionados a comentários em designs',
					},
					{
						name: 'Design Access Request',
						value: 'design_access_request',
						description: 'Solicitações de acesso a designs',
					},
					{
						name: 'Design Approval',
						value: 'design_approval',
						description: 'Aprovações de designs',
					},
					{
						name: 'Design Sharing Event',
						value: 'design_sharing',
						description: 'Eventos de compartilhamento de designs',
					},
					{
						name: 'Folder Access Request',
						value: 'folder_access_request',
						description: 'Solicitações de acesso a pastas',
					},
					{
						name: 'Folder Sharing Event',
						value: 'folder_sharing',
						description: 'Eventos de compartilhamento de pastas',
					},
					{
						name: 'Team Access Invitation',
						value: 'team_access_invitation',
						description: 'Convites de acesso à equipe',
					},
					{
						name: 'Suggestion Notification (Preview)',
						value: 'suggestion',
						description: '⚠️ Preview: Notificações de sugestões em Canva Docs',
					},
					{
						name: 'Design Mention Notification (Preview)',
						value: 'design_mention',
						description: '⚠️ Preview: Menções em designs',
					},
				],
				default: 'comment',
				description: 'Tipo de evento do Canva que acionará o webhook',
			},
			{
				displayName: 'Design ID Filter',
				name: 'designIdFilter',
				type: 'string',
				displayOptions: {
					show: {
						event: [
							'design.publish',
							'design.share', 
							'design.update',
							'comment.create',
							'comment.resolve',
							'export.complete',
							'export.failed',
						],
					},
				},
				default: '',
				description: 'Filtrar por ID específico do design (opcional)',
			},
			{
				displayName: 'Folder ID Filter',
				name: 'folderIdFilter',
				type: 'string',
				displayOptions: {
					show: {
						event: [
							'folder.access_requested',
							'folder.share',
						],
					},
				},
				default: '',
				description: 'Filtrar por ID específico da pasta (opcional)',
			},
			{
				displayName: 'User ID Filter',
				name: 'userIdFilter',
				type: 'string',
				displayOptions: {
					show: {
						event: [
							'user.mention',
							'comment.create',
							'suggestion.create',
						],
					},
				},
				default: '',
				description: 'Filtrar por ID específico do usuário (opcional)',
			},
			{
				displayName: 'Validate Signature',
				name: 'validateSignature',
				type: 'boolean',
				default: true,
				description: 'Whether validar assinatura HMAC do webhook para segurança',
			},
			{
				displayName: 'Webhook Secret',
				name: 'webhookSecret',
				type: 'string',
				typeOptions: { password: true },
				displayOptions: {
					show: {
						validateSignature: [true],
					},
				},
				default: '',
				description: 'Segredo compartilhado para validação HMAC do webhook',
			},
		],
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const event = this.getNodeParameter('event') as string;
		const designIdFilter = this.getNodeParameter('designIdFilter', '') as string;
		const folderIdFilter = this.getNodeParameter('folderIdFilter', '') as string;
		const userIdFilter = this.getNodeParameter('userIdFilter', '') as string;
		const validateSignature = this.getNodeParameter('validateSignature', true) as boolean;
		const webhookSecret = this.getNodeParameter('webhookSecret', '') as string;

		const body = this.getBodyData() as any;
		const headers = this.getHeaderData();

		// Validação da assinatura HMAC se habilitada
		if (validateSignature && webhookSecret) {
			const crypto = require('crypto');
			const signature = headers['x-canva-signature'] as string;
			
			if (!signature) {
				console.log('Webhook rejeitado: Assinatura ausente');
				return {
					noWebhookResponse: true,
				};
			}

			const expectedSignature = crypto
				.createHmac('sha256', webhookSecret)
				.update(JSON.stringify(body))
				.digest('hex');

			if (!crypto.timingSafeEqual(
				Buffer.from(signature, 'hex'),
				Buffer.from(expectedSignature, 'hex')
			)) {
				console.log('Webhook rejeitado: Assinatura inválida');
				return {
					noWebhookResponse: true,
				};
			}
		}

		// Verificar se é o evento esperado
		if (body.event_type !== event) {
			return {
				noWebhookResponse: true,
			};
		}

		// Aplicar filtros específicos baseados no tipo de evento
		let shouldProcess = true;

		// Filtros para eventos de design
		if (designIdFilter && ['design.publish', 'design.share', 'design.update', 'comment.create', 'comment.resolve', 'export.complete', 'export.failed'].includes(event)) {
			const designId = body.data?.design?.id || body.data?.design_id;
			shouldProcess = designId === designIdFilter;
		}

		// Filtros para eventos de pasta
		if (folderIdFilter && ['folder.access_requested', 'folder.share'].includes(event)) {
			const folderId = body.data?.folder?.id || body.data?.folder_id;
			shouldProcess = folderId === folderIdFilter;
		}

		// Filtros para eventos de usuário
		if (userIdFilter && ['user.mention', 'comment.create', 'suggestion.create'].includes(event)) {
			const userId = body.data?.user?.id || body.data?.mentioned_user?.id || body.data?.comment?.author?.id;
			shouldProcess = userId === userIdFilter;
		}

		if (!shouldProcess) {
			return {
				noWebhookResponse: true,
			};
		}

		// Enriquecer dados do webhook com informações úteis
		const webhookData = {
			event_type: body.event_type,
			event_id: body.event_id,
			timestamp: body.timestamp,
			created_at: body.created_at,
			data: body.data,
			metadata: {
				webhook_url: this.getNodeWebhookUrl('default'),
				processed_at: new Date().toISOString(),
				filters_applied: {
					event,
					design_id_filter: designIdFilter || null,
					folder_id_filter: folderIdFilter || null,
					user_id_filter: userIdFilter || null,
				},
			},
		};

		return {
			webhookResponse: {
				status: 200,
				body: { received: true },
			},
			workflowData: [
				[
					{
						json: webhookData,
					},
				],
			],
		};
	}
} 