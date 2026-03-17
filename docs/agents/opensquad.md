# opensquad — Orquestração multi-agente no void system

## O que é

OpenSquad é um framework de orquestração de agentes IA que permite criar **squads**
(times de agentes especializados) que executam tarefas em sequência, com checkpoints
de aprovação humana e dashboard visual em tempo real.

Repositório: https://github.com/renatoasse/opensquad

## Setup no projeto

```bash
# Na raiz do void system v1.3
npx opensquad init

# Inicia o dashboard visual (localhost:3000)
npx opensquad dashboard
```

Isso cria:
```
_opensquad/          ← configurações do framework
squads/              ← seus squads (criados por você)
skills/              ← módulos de capacidade instalados
```

---

## Conceitos aplicados ao void system

| Conceito OpenSquad | Uso no void system |
|---|---|
| **Squad** | Time de agentes para uma tarefa completa (ex: "criar campanha de lançamento") |
| **Agent** | Especialista single-task (ex: copywriter, dev, analista CRM) |
| **Skill** | Capacidade instalável (ex: publicar no Instagram, gerar imagem) |
| **Checkpoint** | Ponto de aprovação antes de publicar ou alterar dados reais |
| **Pipeline** | Sequência de steps que compõem um squad |

---

## Squads úteis para o void system

### 1. Squad de CRM — follow-up de clientes

**Propósito:** Analisar clientes sem agendamento recente e gerar comunicações personalizadas.

```bash
/opensquad create
# Descreva: "Analise clientes sem sessão nos últimos 30 dias e crie
# mensagens de reativação personalizadas para WhatsApp"
```

Steps gerados automaticamente:
```
1. [agent] analista-crm       → lê lista de clientes inativos
2. [agent] copywriter-void    → escreve mensagem por perfil de cliente
3. [checkpoint] ← revisão humana das mensagens
4. [agent] publisher-whatsapp → envia via API
```

### 2. Squad de conteúdo — lançamento de pacotes

**Propósito:** Gerar copy, imagens e sequência de posts para novos pacotes de flutuação.

```bash
/opensquad create
# Descreva: "Crie campanha para lançamento do pacote combo float+massagem:
# post feed, stories, copy de e-mail e landing page"
```

Steps:
```
1. [agent] pesquisador        → pesquisa benchmarks do setor wellness
2. [agent] copywriter         → escreve todos os textos
3. [checkpoint] ← aprovação de copy
4. [agent] designer-canva     → cria imagens via Canva skill
5. [checkpoint] ← aprovação visual
6. [agent] publisher          → agenda posts
```

### 3. Squad de features — desenvolvimento guiado

**Propósito:** Gerar código para novas telas/componentes seguindo o padrão do sistema.

```bash
/opensquad create
# Descreva: "Crie a tela de histórico de sessões do cliente com filtro por
# mês, seguindo o padrão visual do ClientDashboard"
```

Steps:
```
1. [agent] arquiteto-frontend → lê CLAUDE.md + docs/, propõe estrutura
2. [checkpoint] ← aprovação da arquitetura
3. [agent] dev-react          → escreve o código
4. [agent] revisor            → revisa contra o padrão do projeto
```

---

## Comandos essenciais

```bash
# Criar novo squad (modo interativo)
/opensquad create

# Executar um squad existente
/opensquad run <nome-do-squad>

# Listar squads disponíveis
/opensquad

# Ver dashboard visual
/opensquad dashboard
```

---

## Skills úteis para instalar

```bash
# Geração de imagens (para campanhas)
opensquad skills install image-creator

# Publicação no Instagram
opensquad skills install instagram-publisher

# Busca de imagens externas
opensquad skills install image-fetcher

# Ferramentas de criação de skills novas
opensquad skills install opensquad-skill-creator
```

---

## Integração com o fluxo de dados do void system

Os agentes do OpenSquad podem ler os dados do sistema para personalizar outputs.
Exponha dados relevantes via arquivos locais ou variáveis:

### Dados de clientes (CRM)
```
_opensquad/_memory/clientes-inativos.json   ← export do Supabase
_opensquad/_memory/proximas-sessoes.json    ← agendamentos futuros
```

### Configuração de preferências do projeto
```
_opensquad/_memory/preferences.md
```

Exemplo de `preferences.md` para o void system:
```markdown
name: Marcos
language: pt-BR
ide: vscode
projeto: void system v1.3 — estúdio de flutuação sensorial
tom-de-voz: sofisticado, direto, sem emojis em excesso
```

---

## Regras de uso no void system

1. **Checkpoints obrigatórios** antes de qualquer publicação (redes sociais, e-mail, WhatsApp)
2. **Checkpoints obrigatórios** antes de qualquer alteração no banco de dados real
3. Squads de código seguem as regras de `docs/agents/PROTOCOL.md` e `frontend-dev.md`
4. Agentes de código nunca modificam `src/db/` sem aprovação explícita
5. Outputs de squads ficam em `squads/<nome>/output/` — nunca em `src/` diretamente

---

## Última atualização

2026-03-17 — documentação criada a partir de https://github.com/renatoasse/opensquad v0.1.8
