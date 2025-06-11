# n8n-nodes-canva

![n8n.io - Workflow Automation](https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-logo.png)

Este é um pacote de community node para n8n que permite integração com a [API Connect do Canva](https://www.canva.dev/docs/connect/).

[n8n](https://n8n.io/) é uma ferramenta de automação de workflow [fair-code](http://faircode.io) distribuída.

**DISCLAMER**: Este node foi desenvolvido de forma independente e não é afiliado à Canva Pty Ltd. É um projeto desenvolvido pela comunidade para facilitar a integração com os serviços da Canva.

## Instalação

Para usar este community node, você precisa tê-lo instalado em sua instância n8n.

### Community Nodes (Recomendado)

1. Vá para **Settings > Community Nodes**
2. Selecione **Install**
3. Digite `n8n-nodes-canva` na caixa **Enter npm package name**
4. Aceite os riscos de usar um community node: clique **I understand the risks of installing unverified code from a public source**
5. Selecione **Install**

Após a instalação, você encontrará **Canva** e **Canva Trigger** disponíveis como nodes.

### Manual installation

Para instalar manualmente o community node para sua instância n8n:

1. [Instale o npm com o Node.js](https://nodejs.org/en/download/)
2. Instale o pacote no diretório da sua instância n8n:
   ```
   cd ~/.n8n # ou o diretório onde sua instância n8n está localizada
   npm install n8n-nodes-canva
   ```
3. Reinicie n8n

## Funcionalidades

Este pacote contém dois nodes:

### Canva Node

Permite realizar operações através da API Connect do Canva:

#### Designs
- **Create**: Criar novos designs
- **Get**: Buscar informações de um design específico
- **List**: Listar designs do usuário

#### Exports
- **Create Export Job**: Iniciar exportação de um design
- **Get Export Job**: Verificar status de uma exportação

#### Folders
- **Create**: Criar novas pastas
- **List**: Listar pastas do usuário

#### Assets
- **Get**: Buscar informações de um asset específico
- **List**: Listar assets do usuário

#### Users
- **Get Profile**: Obter informações do usuário atual

### Canva Trigger

Node trigger que escuta eventos do Canva via webhooks:

#### Eventos Suportados
- **Asset Events**: Created, Updated, Deleted
- **Comment Events**: Created, Updated, Deleted  
- **Design Events**: Created, Updated, Deleted
- **Export Events**: Completed, Failed
- **Folder Events**: Created, Updated, Deleted

#### Funcionalidades
- **Multi-eventos**: Escutar múltiplos tipos de eventos
- **Filtros por usuário**: Filtrar eventos por usuários específicos
- **Metadata adicional**: Incluir metadados extras no payload

## Configuração

### Credenciais da API

Para usar este node, você precisa configurar suas credenciais da API do Canva:

1. Crie uma aplicação no [Canva Developer Portal](https://www.canva.dev/)
2. Obtenha seu Access Token
3. No n8n, crie uma nova credencial **Canva API**
4. Insira seu Access Token
5. Selecione o ambiente (Production ou Sandbox)

### Configuração de Webhooks

Para usar o **Canva Trigger**:

1. Adicione o node **Canva Trigger** ao seu workflow
2. Configure os eventos que deseja escutar
3. Ative o workflow
4. O webhook será automaticamente registrado no Canva
5. Quando desativar o workflow, o webhook será removido automaticamente

## Formatos Suportados

### Tipos de Design
- Presentation
- Document
- Video
- Logo
- Poster
- Instagram Post

### Formatos de Exportação
- PDF
- PNG
- JPG
- MP4

## Compatibilidade

Testado com:
- n8n v1.0.0+
- Node.js 18+

## Recursos

- [Canva Connect API Documentation](https://www.canva.dev/docs/connect/)
- [n8n Community Nodes](https://docs.n8n.io/integrations/community-nodes/)
- [Creating n8n nodes](https://docs.n8n.io/integrations/creating-nodes/)

## Versões

Consulte [Changelog](CHANGELOG.md) para uma lista detalhada das mudanças para cada versão.

## Licença

[MIT](https://github.com/ramonmatias19/n8n-nodes-canva/blob/main/LICENSE.md)

## Desenvolvimento

### Setup

```bash
# Clone o repositório
git clone https://github.com/ramonmatias19/n8n-nodes-canva.git
cd n8n-nodes-canva

# Instale as dependências
npm install

# Build do projeto
npm run build
```

### Scripts

- `npm run build` - Compila o projeto
- `npm run dev` - Executa TypeScript em modo watch
- `npm run format` - Formata o código usando Prettier
- `npm run lint` - Executa ESLint
- `npm run lintfix` - Corrige automaticamente problemas de lint

## Contribuição

Contribuições são bem-vindas! Por favor, abra uma issue primeiro para discutir o que você gostaria de mudar.

## Suporte

Se você encontrar algum problema ou tiver alguma dúvida:

1. Verifique a [documentação oficial da API do Canva](https://www.canva.dev/docs/connect/)
2. Procure em issues existentes no GitHub
3. Crie uma nova issue com detalhes do problema 