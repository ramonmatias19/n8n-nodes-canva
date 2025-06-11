# n8n-nodes-canva

<p align="center"><br>
Este Community Node é uma solução 100% gratuita, criada com o intuito de simplificar e auxiliar toda a comunidade a integrar e utilizar ao máximo os principais recursos oferecidos pela <b>Canva Connect API</b> em seus projetos no N8N.
</p>
<br>
	
<div align="center">
  <img src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fapi.npmjs.org%2Fdownloads%2Fpoint%2Flast-year%2Fn8n-nodes-canva&query=downloads&style=for-the-badge&label=Total%20de%20Downloads&labelColor=%230d1117&color=%23359514&cacheSeconds=30&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fn8n-nodes-agendor" alt="Downloads Badge">
  <img src="https://img.shields.io/npm/v/n8n-nodes-canva?style=for-the-badge&label=Versão&labelColor=%230d1117&color=%23007ACC" alt="Version Badge">
  <img src="https://img.shields.io/npm/l/n8n-nodes-canva?style=for-the-badge&label=Licença&labelColor=%230d1117&color=%23FFA500" alt="License Badge">
</div>
<br>

<p align="center">
  <a href="mailto:contato@lumiaria.com.br"><img src="https://img.shields.io/badge/Email-Suporte-red?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"></a>     
  <a href="https://github.com/ramonmatias19/n8n-nodes-canva"><img src="https://img.shields.io/badge/GitHub-Repositório-black?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"></a>     
  <a href="https://www.npmjs.com/package/n8n-nodes-canva"><img src="https://img.shields.io/badge/NPM-Package-red?style=for-the-badge&logo=npm&logoColor=white" alt="NPM"></a>
</p>

> **Aviso:** Este node foi desenvolvido de forma independente para facilitar integrações com a API pública da Canva no n8n.  
> Não é afiliado, endossado ou mantido pela Canva Pty Ltd.  
> Todas as marcas citadas pertencem aos seus respectivos proprietários.

<h1></h1>

<h3>⚙️ Requisitos</h3>

Para utilizar o nosso **Community Node**, é necessário atender aos seguintes requisitos:  
- **N8N** na versão **1.54.4** ou superior  
- **Node.js** na versão **16.0.0** ou superior  
- **Conta ativa** na **Canva** com acesso à Connect API  
- **Application registrada** no [Canva Developer Portal](https://www.canva.dev/)

<h1></h1>

<h3>📌 Recursos Disponíveis</h3>

<h3>🎨 Designs</h3>
✨ Este recurso oferece acesso completo às principais funcionalidades relacionadas ao gerenciamento de designs no Canva. Ele permite criar novos projetos, buscar designs existentes, listar seus trabalhos e gerenciar todo o ciclo de vida dos designs de forma prática e eficiente.
<br>
<details>
  <summary><b>Lista de operações</b></summary>
	<details>
  	<summary>   ✅ <b> Criar Design</b></summary>
	</details>
	<details>
  	<summary>   ✅ <b> Buscar Design</b></summary>
	</details>
	<details>
  	<summary>   ✅ <b> Listar Designs</b></summary>
	</details>
	<details>
  	<summary>   ✅ <b> Tipos Suportados</b></summary>
	</details>
</details>

<h3>📤 Exportações</h3>
🔄 Com este recurso, você conta com funcionalidades completas para exportar seus designs em diferentes formatos. Ele abrange desde a criação de jobs de exportação até o monitoramento do status de processamento, permitindo obter seus arquivos finalizados nos formatos PDF, PNG, JPG e MP4.
<br>
<details>
  <summary><b>Lista de operações</b></summary>
	<details>
  	<summary>   ✅ <b> Criar Job de Exportação</b></summary>
	</details>
	<details>
  	<summary>   ✅ <b> Verificar Status da Exportação</b></summary>
	</details>
	<details>
  	<summary>   ✅ <b> Formatos PDF</b></summary>
	</details>
	<details>
  	<summary>   ✅ <b> Formatos PNG/JPG</b></summary>
	</details>
	<details>
  	<summary>   ✅ <b> Formatos MP4</b></summary>
	</details>
</details>

<h3>📁 Pastas</h3>
🗂️ Este recurso disponibiliza ferramentas essenciais para organização e gerenciamento de pastas no Canva. Com ele, é possível criar novas pastas, organizar seus designs de forma estruturada e manter um workspace organizado para melhor produtividade.
<br>
<details>
  <summary><b>Lista de operações</b></summary>
	<details>
  	<summary>   ✅ <b> Criar Pasta</b></summary>
	</details>
	<details>
  	<summary>   ✅ <b> Listar Pastas</b></summary>
	</details>
	<details>
  	<summary>   ✅ <b> Organizar Conteúdo</b></summary>
	</details>
</details>

<h3>🖼️ Assets</h3>
📷 Com este recurso, você tem acesso ao gerenciamento de assets e elementos visuais no Canva. Ele permite buscar assets específicos, listar elementos disponíveis e gerenciar recursos visuais para seus projetos de forma eficiente.
<br>
<details>
  <summary><b>Lista de operações</b></summary>
	<details>
  	<summary>   ✅ <b> Buscar Asset</b></summary>
	</details>
	<details>
  	<summary>   ✅ <b> Listar Assets</b></summary>
	</details>
	<details>
  	<summary>   ✅ <b> Gerenciar Recursos</b></summary>
	</details>
</details>

<h3>👤 Usuários</h3>
🔐 Este recurso oferece funcionalidades para gerenciamento de informações de usuário e perfil. Com ele, é possível obter dados do usuário atual, verificar permissões e acessar informações de conta de forma segura.
<br>
<details>
  <summary><b>Lista de operações</b></summary>
	<details>
  	<summary>   ✅ <b> Obter Perfil</b></summary>
	</details>
	<details>
  	<summary>   ✅ <b> Verificar Permissões</b></summary>
	</details>
	<details>
  	<summary>   ✅ <b> Informações da Conta</b></summary>
	</details>
</details>

<h3>🔔 Webhooks</h3>
📡 Este recurso oferece funcionalidades completas para receber notificações em tempo real de eventos do Canva através de webhooks. Com ele, você pode monitorar criação de designs, atualizações, exportações concluídas e outros eventos importantes, permitindo automações instantâneas baseadas nas atividades da sua conta.
<br>
<details>
  <summary><b>Lista de operações</b></summary>
	<details>
  	<summary>   ✅ <b> Design Criado</b></summary>
	</details>
	<details>
  	<summary>   ✅ <b> Design Atualizado</b></summary>
	</details>
	<details>
  	<summary>   ✅ <b> Exportação Concluída</b></summary>
	</details>
	<details>
  	<summary>   ✅ <b> Asset Eventos</b></summary>
	</details>
	<details>
  	<summary>   ✅ <b> Pasta Eventos</b></summary>
	</details>
	<details>
  	<summary>   ✅ <b> Comentário Eventos</b></summary>
	</details>
	<details>
  	<summary>   ✅ <b> Filtros Personalizados</b></summary>
	</details>
</details>

<h1></h1>

<h3>🚀 Instalação</h3>

**Via n8n Community Nodes:**
1. Abra sua instância do n8n
2. Vá para **Settings** → **Community Nodes**
3. Instale o pacote: `n8n-nodes-canva`
4. Reinicie o n8n

**Via NPM:**
```bash
npm install n8n-nodes-canva
```

### 🔑 Configuração de Credenciais

Para usar este node, você precisa configurar suas credenciais da API do Canva seguindo o fluxo OAuth 2.0 oficial:

1. **Crie uma integração no [Canva Developer Portal](https://www.canva.dev/)**
   - Faça login no Developer Portal
   - Ative a MFA (Multi-Factor Authentication) se necessário
   - Vá para "Your Integrations" e clique em "Create an integration"
   - Escolha entre integração "Public" ou "Private"

2. **Configure sua integração:**
   - Defina um nome para sua integração
   - **Copie o Client ID** (será necessário no n8n)
   - **Gere e salve o Client Secret** (será necessário no n8n)
   - Configure os scopes necessários para suas operações
   - Adicione uma URL de redirecionamento (se usando OAuth completo)

3. **No n8n, crie uma nova credencial "Canva API":**
   - **Client ID**: Cole o Client ID obtido no Developer Portal
   - **Client Secret**: Cole o Client Secret gerado no Developer Portal
   - **Access Token**: Pode ser obtido manualmente ou via OAuth (opcional)
   - **Refresh Token**: Para renovação automática do Access Token (opcional)
   - **Environment**: Selecione Production ou Sandbox

4. **Obtenha Access Token (se necessário):**
   - Use o fluxo OAuth 2.0 com PKCE conforme documentação oficial
   - Ou obtenha manualmente via API testing tools

> **Nota**: A implementação agora segue as melhores práticas de segurança da Canva Connect API com suporte completo ao OAuth 2.0.

### 📡 Configuração de Webhooks

Para usar o **Canva Trigger**:

1. Adicione o node **Canva Trigger** ao seu workflow
2. Configure os eventos que deseja escutar
3. Ative o workflow
4. O webhook será automaticamente registrado no Canva
5. Quando desativar o workflow, o webhook será removido automaticamente

<h1></h1>

<h3>🤝 Contribuição</h3>

Contribua para o crescimento deste projeto! Você pode ajudar de diversas formas:  
- **Pull Requests**: Envie melhorias, correções ou novas funcionalidades.  
- **Issues**: Relate problemas ou sugira novas ideias.  
- **Sugestões**: Compartilhe suas opiniões e feedbacks.  
- **Documentação**: Ajude a melhorar ou expandir a documentação existente.  

<h1></h1>

<p align="center">
Desenvolvido com ❤️ por <b>Ramon Matias</b>
</p> 