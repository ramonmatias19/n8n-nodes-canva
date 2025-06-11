# 🎣 Configuração de Webhooks Canva

Este guia mostra como configurar webhooks do Canva Connect API para receber notificações em tempo real sobre eventos em designs, comentários, exportações e mais.

## 📋 Pré-requisitos

- Conta Canva com acesso ao [Developer Portal](https://www.canva.dev/)
- Integração Canva configurada com as permissões necessárias
- n8n instalado e funcionando
- URL pública acessível para receber webhooks

## ⚡ Eventos Suportados

O **CanvaTrigger** suporta os seguintes eventos da Canva Connect API:

### 🎨 Eventos de Design
- **`design.publish`** - Design é publicado
- **`design.share`** - Design é compartilhado
- **`design.update`** - Design é atualizado

### 💬 Eventos de Comentários
- **`comment.create`** - Comentário é criado
- **`comment.resolve`** - Comentário é resolvido

### 📤 Eventos de Exportação
- **`export.complete`** - Exportação concluída com sucesso
- **`export.failed`** - Exportação falhou

### 📁 Eventos de Pastas
- **`folder.access_requested`** - Acesso à pasta é solicitado
- **`folder.share`** - Pasta é compartilhada

### 💡 Eventos de Sugestões
- **`suggestion.create`** - Sugestão é criada (Canva Docs)

### 👤 Eventos de Usuário
- **`user.mention`** - Usuário é mencionado

## 🛠 Configuração no Developer Portal

### 1. Configurar Webhook na Integração Canva

1. Acesse o [Canva Developer Portal](https://www.canva.dev/)
2. Navegue para **Your integrations**
3. Selecione sua integração
4. Vá para **Configuration** → **Webhooks**
5. Clique em **Add webhook endpoint**

### 2. URL do Webhook

A URL do webhook no n8n segue o padrão:
```
https://seu-n8n.com/webhook/canva-webhook
```

### 3. Eventos a Configurar

Selecione os eventos que deseja receber:
- `design.publish`
- `design.share`
- `design.update`
- `comment.create`
- `comment.resolve`
- `export.complete`
- `export.failed`
- `folder.access_requested`
- `folder.share`
- `suggestion.create`
- `user.mention`

### 4. Configurar Segredo (Opcional mas Recomendado)

1. Gere um segredo aleatório forte
2. Configure no Developer Portal
3. Anote o segredo para usar no n8n

## 🔧 Configuração no n8n

### 1. Adicionar Node CanvaTrigger

1. Crie um novo workflow
2. Adicione o node **Canva Trigger**
3. Configure as credenciais **Canva API**

### 2. Configurar Parâmetros

#### Parâmetros Principais:
- **Event**: Selecione o evento específico
- **Validate Signature**: ✅ Recomendado para segurança
- **Webhook Secret**: Cole o segredo configurado no Developer Portal

#### Filtros Opcionais:
- **Design ID Filter**: Filtrar por design específico
- **Folder ID Filter**: Filtrar por pasta específica  
- **User ID Filter**: Filtrar por usuário específico

### 3. Exemplo de Configuração

```json
{
  "event": "design.publish",
  "designIdFilter": "DAF123abc456",
  "validateSignature": true,
  "webhookSecret": "seu-segredo-super-secreto"
}
```

## 📊 Estrutura de Dados Recebidos

### Payload do Webhook

```json
{
  "event_type": "design.publish",
  "event_id": "evt_123abc456def",
  "timestamp": 1699123456,
  "created_at": 1699123456,
  "data": {
    "design": {
      "id": "DAF123abc456",
      "title": "Meu Design Incrível",
      "urls": {
        "edit_url": "https://www.canva.com/design/...",
        "view_url": "https://www.canva.com/design/..."
      },
      "created_at": 1699120000,
      "updated_at": 1699123456,
      "page_count": 1
    },
    "user": {
      "id": "user123",
      "name": "João Silva"
    }
  },
  "metadata": {
    "webhook_url": "https://seu-n8n.com/webhook/canva-webhook",
    "processed_at": "2023-11-04T15:30:56.789Z",
    "filters_applied": {
      "event": "design.publish",
      "design_id_filter": "DAF123abc456",
      "folder_id_filter": null,
      "user_id_filter": null
    }
  }
}
```

### Dados por Tipo de Evento

#### Design Events
```json
{
  "data": {
    "design": {
      "id": "DAF123abc456",
      "title": "Nome do Design",
      "urls": { "edit_url": "...", "view_url": "..." },
      "page_count": 3,
      "created_at": 1699120000,
      "updated_at": 1699123456
    }
  }
}
```

#### Comment Events
```json
{
  "data": {
    "comment": {
      "id": "comment123",
      "message": "Ótimo trabalho!",
      "author": {
        "id": "user123",
        "name": "João Silva"
      }
    },
    "design": {
      "id": "DAF123abc456",
      "title": "Design Comentado"
    }
  }
}
```

#### Export Events
```json
{
  "data": {
    "export": {
      "id": "export123",
      "format": "pdf",
      "status": "completed",
      "download_url": "https://..."
    },
    "design": {
      "id": "DAF123abc456",
      "title": "Design Exportado"
    }
  }
}
```

## 🔒 Segurança

### Validação de Assinatura HMAC

**Fortemente recomendado** para produção:

1. ✅ **Habilite** `Validate Signature`
2. 🔑 **Configure** um segredo forte no Developer Portal
3. 🔐 **Use** o mesmo segredo no n8n

### Como Funciona:

1. Canva assina cada webhook com HMAC-SHA256
2. n8n verifica a assinatura usando o segredo compartilhado
3. Webhooks com assinatura inválida são rejeitados

## 🎯 Casos de Uso

### 1. Notificação de Publicação
```json
{
  "event": "design.publish",
  "designIdFilter": "",
  "validateSignature": true
}
```
**Uso**: Notificar equipe quando designs são publicados

### 2. Monitoramento de Comentários
```json
{
  "event": "comment.create",
  "userIdFilter": "user123",
  "validateSignature": true
}
```
**Uso**: Alertar quando usuário específico comenta

### 3. Backup Automático
```json
{
  "event": "export.complete",
  "validateSignature": true
}
```
**Uso**: Fazer backup quando exportações são concluídas

## 🔧 Troubleshooting

### Webhook Não Está Sendo Recebido

1. ✅ **Verifique** se a URL está acessível publicamente
2. 🔗 **Teste** a URL no browser ou curl
3. 📋 **Confirme** que o evento está configurado no Developer Portal

### Erro de Assinatura

1. 🔑 **Verifique** se o segredo está correto
2. 📝 **Confirme** que não há espaços extras
3. ⚙️ **Desabilite** temporariamente para testar

### Eventos Não Filtrados

1. 🎯 **Verifique** se os filtros estão corretos
2. 📋 **Confirme** os IDs de design/pasta/usuário
3. 🔍 **Teste** sem filtros primeiro

## 📚 Recursos Adicionais

- [📖 Documentação Canva Connect API](https://www.canva.dev/docs/connect/)
- [🎣 Webhook Notifications](https://www.canva.dev/docs/connect/webhooks/)
- [🔐 Security Best Practices](https://www.canva.dev/docs/connect/security/)

---

⚠️ **Importante**: Webhooks são essenciais para automações em tempo real. Configure a validação de assinatura em produção para garantir segurança. 