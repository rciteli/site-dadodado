// content/posts.ts
export type Section = {
  heading: string;
  paragraphs: string[];
};

export type Post = {
  slug: string;
  title: string;
  keyword: string;
  summary: string;
  cover: string;      // caminho da imagem de capa (ex.: /blog/covers/<slug>.jpg)
  coverAlt?: string;  // alt text opcional
  sections: Section[];
  cta?: { label: string; href: string };
  updatedAt?: string; // ISO (YYYY-MM-DD)
};

export const posts: Post[] = [
  {
    slug: "pendulo-digital-o-que-e-e-como-usar",
    title: "Pêndulo Digital: o que é e como usar o score de influência",
    keyword: "pêndulo digital",
    summary:
      "Entenda como o score acompanha influência e variação: dimensões, painéis e usos práticos para comunicação.",
    cover: "/blog/covers/pendulo-digital-o-que-e-e-como-usar.jpg",
    coverAlt: "Gráfico de rede mostrando nós de influência",
    updatedAt: "2025-09-10",
    sections: [
      {
        heading: "Por que medir influência em rede",
        paragraphs: [
          "O Pêndulo Digital é um score proprietário que sintetiza sinais de popularidade e difusão para estimar quem realmente move o debate em cada janela de tempo. Em vez de olhar apenas contagens brutas, o modelo pondera interações relevantes, alcance potencial, profundidade das cascatas e diversidade dos nós que amplificam determinado ator. O resultado é um indicador que permite comparar perfis, veículos, lideranças e marcas em bases mais sólidas do que o puro volume.",
          "A leitura temporal é central: picos isolados contam história parcial. O Pêndulo observa tendência e variação, destacando quando um ator cresce de forma persistente, quando perde terreno para pares e quando movimentos aparentemente pequenos mudam a hierarquia em nichos específicos. Isso ajuda times de comunicação e estratégia a priorizarem pautas, porta-vozes e territórios com melhor custo-impacto."
        ],
      },
      {
        heading: "Como interpretar o score",
        paragraphs: [
          "Evite leituras absolutas do número. O valor do Pêndulo está na comparação com pares, no comportamento por segmento e na sensibilidade a eventos. Um aumento de poucos pontos pode sinalizar virada relevante se ocorrer em janela curta e acompanhada de difusão em clusters estratégicos. Já um pico alto, porém concentrado em bolhas redundantes, tende a ter efeito efêmero.",
          "Nos painéis, combine série do score com explicações de pico: amostras anotadas e nós-chave que catalisaram a difusão. Isso reduz ambiguidade e facilita ação. Exemplo prático: se a alta decorre de conteúdo negativo, a recomendação pode ser reposicionar mensagem e ativar aliados com alto coeficiente de travessia entre comunidades. Se a alta vem de earned positivo orgânico, a indicação pode ser reforçar narrativa, ampliar repertório e manter cadência."
        ],
      },
      {
        heading: "Aplicações táticas",
        paragraphs: [
          "Para marcas, o Pêndulo apoia a alocação de budget entre influenciadores, veículos e embaixadores, priorizando quem atravessa bolhas e sustenta tração. Para campanhas e mandatos, ajuda a balancear presença de porta-vozes, identificar vácuos de influência regional/temática e medir o efeito de push de conteúdo.",
          "Em reputação, a leitura de variação por dimensão (alcance, engajamento qualificado, difusão entre comunidades) orienta rotas rápidas de resposta. Integrado a alertas, o score antecipa janelas de oportunidade e risco, reduzindo a dependência de relatórios estáticos e privilegiando ação contínua."
        ],
      },
    ],
    cta: { label: "Explorar o produto", href: "/servicos/pendulo-digital" },
  },

  {
    slug: "lupa-social-sentimento-e-temas-na-pratica",
    title: "Lupa Social: sentimento e temas na prática",
    keyword: "lupa social",
    summary:
      "Um passo-a-passo para interpretar polaridade, intensidade, clusters de tópicos e exemplos explicativos.",
    cover: "/blog/covers/lupa-social-sentimento-e-temas-na-pratica.jpg",
    coverAlt: "Dashboard com análise de sentimento e nuvem de tópicos",
    updatedAt: "2025-09-10",
    sections: [
      {
        heading: "Sentimento qualificado",
        paragraphs: [
          "Polaridade sozinha empobrece leitura. A Lupa Social combina direção (positivo/negativo/neutro) com intensidade, mapeando o quão forte é o tom expresso nas postagens. Esse tratamento permite discernir entre críticas brandas e ataques contundentes, ou entre elogios protocolares e advocacy espontânea. Na prática, o score de sentimento ponderado melhora a triagem do que merece resposta e do que pode ser absorvido pelo ciclo natural.",
          "As séries temporais destacam mudanças significativas com marcações automáticas de contexto. Ao lado dos gráficos, a ferramenta exibe amostras explicativas com rótulos de tema, entidade e sub-tópico. Isso reduz a ida-e-volta entre times e acelera a criação de recomendações: a equipe de comunicação passa a ver o 'porquê' da curva e não apenas a curva."
        ],
      },
      {
        heading: "Temas e frames",
        paragraphs: [
          "Os clusters de tópicos conectam termos, entidades e hashtags que coocorrem com frequência. Em vez de nuvens dispersas, você enxerga comunidades temáticas coesas, com a evolução de cada cluster ao longo do tempo. Assim é possível diferenciar ruído passageiro de tendências que estruturam a conversa.",
          "A camada de frames aponta os ângulos recorrentes usados para falar de um assunto: custo, segurança, eficiência, justiça, etc. Entender frames úteis para o seu posicionamento (e contra-frames a evitar) guia ajustes de linguagem, escolha de evidências e seleção de porta-vozes, elevando a taxa de aceitação da mensagem."
        ],
      },
      {
        heading: "Decisão prática",
        paragraphs: [
          "Com sentimento qualificado e mapeamento de frames, a recomendação deixa de ser genérica. É possível ativar rotas de resposta com snippet pronto, direcionar esclarecimentos para comunidades onde o tom azedou e priorizar conteúdos com maior probabilidade de deslocar percepção. Para campanhas, a Lupa ajuda a escolher temas de pauta diária e monitorar riscos em torno de palavras-sinal.",
          "Ao integrar o output com o Pêndulo e o Rastro 360, obtém-se visão 360: quem fala, o que fala, como a mensagem viaja e qual o efeito percebido. Isso sustenta ciclos curtos de aprendizado e ação."
        ],
      },
    ],
    cta: { label: "Ver Lupa Social", href: "/servicos/lupa-social" },
  },

  {
    slug: "rastro-360-narrativas-rotas-e-hubs",
    title: "Rastro 360: narrativas, rotas e hubs",
    keyword: "rastro 360",
    summary:
      "Aprenda a rastrear origens, rotas de difusão e atores-chave de uma narrativa. Compare frames e contra-frames.",
    cover: "/blog/covers/rastro-360-narrativas-rotas-e-hubs.jpg",
    coverAlt: "Mapa de propagação com setas entre canais",
    updatedAt: "2025-09-10",
    sections: [
      {
        heading: "Da origem ao alcance",
        paragraphs: [
          "O Rastro 360 reconstrói como uma narrativa nasce, se acopla a eventos e se espalha entre canais e comunidades. Ele identifica pontos de ignição (postagens, matérias, vídeos) e calcula a progressão temporal por rota: quem pegou a mensagem primeiro, onde ela ganhou forma e quais saltos produziram alcance incremental relevante.",
          "Ao enxergar rotas (em vez de apenas volumes), as equipes conseguem priorizar inserções com melhor custo-impacto. Às vezes, um canal de médio porte com alto coeficiente de travessia rende mais do que um megacanal saturado. O Rastro 360 evidencia essas alavancas."
        ],
      },
      {
        heading: "Hubs e comunidades",
        paragraphs: [
          "Nem todo amplificador é igual. Os hubs que conectam bolhas têm papel desproporcional na vida útil de uma narrativa. O Rastro quantifica essa capacidade de travessia e aponta clusters afinados por tema, território e linguagem. Isso ajuda tanto no reforço (se a narrativa é positiva) quanto no desarme (se é prejudicial).",
          "A ferramenta também mede a resiliência: quando um contra-frame consegue reduzir o ímpeto de difusão, quais atores funcionaram como barreira e em que janelas o desgaste foi mais eficaz."
        ],
      },
      {
        heading: "Tática de campo",
        paragraphs: [
          "Com esses insumos, você pode desenhar rotas de inoculação, decidir onde investir mídia e adaptar criativos por comunidade. Em PR e comunicação pública, o Rastro facilita a coordenação entre porta-vozes, produtores de conteúdo e parceiros locais, evitando redundância e aproveitando alavancas orgânicas.",
          "Integrado ao Pêndulo e à Lupa, o Rastro 360 fecha o ciclo: influência (quem), conteúdo (o que) e circulação (por onde), com leitura de sentimento (efeito percebido)."
        ],
      },
    ],
    cta: { label: "Conhecer Rastro 360", href: "/servicos/rastro-360" },
  },

  {
    slug: "pulso-publico-velocidade-com-rigor",
    title: "Pulso Público: velocidade com rigor estatístico",
    keyword: "pulso público",
    summary:
      "Como questionário, amostra e calibração elevam a qualidade da leitura com cadência rápida.",
    cover: "/blog/covers/pulso-publico-velocidade-com-rigor.jpg",
    coverAlt: "Aplicativo de survey em smartphone",
    updatedAt: "2025-09-10",
    sections: [
      {
        heading: "Questionário e amostra",
        paragraphs: [
          "O Pulso Público foi desenhado para cadências mais rápidas sem abrir mão de critérios técnicos. Questionários curtos e claros reduzem atrito e fadiga, enquanto checagens de atenção e controles de tempo mitigam respostas descuidadas. A amostragem é estratificada por objetivo: nacional, regional, por segmento ou por audiência específica, conforme hipótese a ser testada.",
          "Todos os passos são documentados. Isso inclui filtros, taxas de invalidação e estrutura de pesos. A transparência metodológica aumenta a confiança na leitura e facilita auditoria ou replicação."
        ],
      },
      {
        heading: "Calibração e variação",
        paragraphs: [
          "Após a coleta, aplicamos ponderação e calibração (ex.: pós-estratificação/rake) conforme variáveis de interesse. Os painéis apresentam estimativas com intervalo de confiança, indicam mudanças significativas entre ondas e destacam variações relevantes para decisão, evitando conclusões em cima de ruído.",
          "A leitura de tendência — mais do que o número de uma onda isolada — orienta comunicação e marketing. É possível testar mensagens, avaliar aderência por subgrupos e ajustar repertório com base em evidência."
        ],
      },
      {
        heading: "Integração com digital",
        paragraphs: [
          "O diferencial do Pulso é dialogar com as outras camadas do ecossistema: cruzamos achados de survey com sentimento, frames e influência. Assim, uma hipótese que aparece no social listening pode ser testada rapidamente via survey e, se confirmada, retorna como recomendação prática com estimativa de impacto.",
          "Para campanhas, a cadência semanal/quinzenal permite acompanhar a eficácia de mudanças em agenda, criativos e porta-vozes, com feedback quase em tempo real."
        ],
      },
    ],
    cta: { label: "Ver Pulso Público", href: "/servicos/pulso-publico" },
  },

  {
    slug: "metodologia-sentimento-intensidade-e-exemplos",
    title: "Metodologia: sentimento, intensidade e exemplos",
    keyword: "metodologia nlp",
    summary:
      "Por que combinamos polaridade, intensidade e amostras? Um guia para leituras mais úteis.",
    cover: "/blog/covers/metodologia-sentimento-intensidade-e-exemplos.jpg",
    coverAlt: "Gráfico com escala de sentimento e exemplos",
    updatedAt: "2025-09-10",
    sections: [
      {
        heading: "Polaridade vs. intensidade",
        paragraphs: [
          "Mensurar apenas polaridade (positivo/negativo/neutro) captura direção, mas não magnitude. Duas publicações negativas podem ter impactos muito diferentes conforme a força do tom, a escolha de palavras e o grau de engajamento que provocam. Por isso, o nosso pipeline de NLP incorpora intensidade, produzindo uma escala contínua que qualifica melhor riscos e oportunidades.",
          "Esse tratamento também melhora comparações entre temas: um tópico com volume menor, porém negatividade intensa, pode demandar ação prioritária sobre outro mais barulhento, porém com críticas brandas e passageiras."
        ],
      },
      {
        heading: "Exemplos explicativos",
        paragraphs: [
          "Séries e números precisam de contexto. As amostras explicativas (‘por trás do pico’) são selecionadas por representatividade e ajudam a entender o que ancorou um movimento de curva. Elas incluem o frame utilizado, a entidade principal, menções associadas e, quando relevante, a rota de difusão que amplificou o conteúdo.",
          "Ao oferecer exemplos diretamente no painel, reduzimos o tempo entre detectar um problema e propor uma resposta plausível. Isso acelera playbooks e evita diagnósticos apressados baseados apenas em gráfico."
        ],
      },
      {
        heading: "Boas práticas de leitura",
        paragraphs: [
          "Combine sentimento com influência e circulação: quem está emitindo o conteúdo? Em qual comunidade? Qual é a chance de travessia? Esse cruzamento separa picos inflados em bolhas de movimentos com potencial de agenda.",
          "Documente hipóteses e aprenda com os falsos positivos. Ajustes iterativos em dicionários, aliases e regras de amostragem elevam a precisão ao longo do tempo."
        ],
      },
    ],
  },

  {
    slug: "dicionarios-e-aliases-por-narrativa",
    title: "Dicionários e aliases por narrativa: guia prático",
    keyword: "narrativas",
    summary:
      "Como mapear termos, variações e exclusões para aumentar recall sem perder precisão.",
    cover: "/blog/covers/dicionarios-e-aliases-por-narrativa.jpg",
    coverAlt: "Planilha com termos e aliases destacados",
    updatedAt: "2025-09-10",
    sections: [
      {
        heading: "Cobertura e desambiguação",
        paragraphs: [
          "Dicionários por narrativa são listas vivas de termos que representam um tema. Além da forma canônica, inclua abreviações, grafias alternativas, erros comuns, hashtags concorrentes e apelidos. Isso aumenta recall — ou seja, a capacidade de capturar variações reais de como as pessoas falam do assunto.",
          "Ao mesmo tempo, use exclusões e filtros de contexto para evitar homônimos e ruídos (ex.: nomes iguais em domínios diferentes). A chave é equilibrar abrangência e precisão, priorizando o que é útil para decisão."
        ],
      },
      {
        heading: "Auditoria contínua",
        paragraphs: [
          "As conversas mudam rápido: gírias, memes e códigos internos aparecem e somem. Defina rotinas leves de auditoria com amostras, medindo recall/precisão e registrando o efeito de cada ajuste. Quando a mudança de vocabulário afeta significativamente o recall, sinalize no painel para dar transparência ao histórico.",
          "Em projetos longos, mantenha dicionários por subtema e por ator (marca, concorrente, liderança), pois a evolução semântica difere entre comunidades."
        ],
      },
      {
        heading: "Integração com produtos",
        paragraphs: [
          "Dicionários bem mantidos alimentam a Lupa Social (sentimento e temas), o Rastro 360 (rotas) e o Pêndulo Digital (influência contextual). Assim, um ganho de recall em narrativa crítica se reflete nas leituras e nas recomendações táticas — evitando pontos cegos e melhorando a comparabilidade entre janelas.",
          "Sempre que publicar relatório, registre mudanças relevantes nos dicionários para dar rastreabilidade às séries e facilitar auditoria."
        ],
      },
    ],
  },

  {
    slug: "design-de-dashboard-para-decisao",
    title: "Design de dashboard para decisão",
    keyword: "design de dashboard",
    summary:
      "Princípios para clareza acionável: hierarquia visual, contraste e foco em variação.",
    cover: "/blog/covers/design-de-dashboard-para-decisao.jpg",
    coverAlt: "Dashboard limpo com cards e gráficos",
    updatedAt: "2025-09-10",
    sections: [
      {
        heading: "Menos é mais (com contexto)",
        paragraphs: [
          "Um bom dashboard não é uma prateleira de gráficos: é um roteiro de decisão. Priorize indicadores-chave, destaque a mudança relevante (variação) e anexe contexto útil ao lado (exemplos explicativos, notas de metodologia, links para evidências). Evite painéis saturados que exigem esforço cognitivo alto e geram conclusões inconsistentes entre leitores.",
          "Cards com hierarquia clara — título, valor, variação, status — favorecem leitura rápida. Use tooltips para detalhes e descarte elementos puramente decorativos. Em times executivos, cada segundo de atenção importa."
        ],
      },
      {
        heading: "Consistência visual",
        paragraphs: [
          "Estabeleça um sistema de componentes repetível (tipografia, espaçamentos, ícones, padrões de cor). Mantenha consistência de escalas, rótulos e unidades. Para a DADODADO, as cores de marca (#170d4d, #3b25a1, #38d4b0, #d9d9d9) já comunicam estados e hierarquia, evitando arco-íris semânticos.",
          "Padronizar navegação (abas, filtros, datas) reduz fricção e erros. O usuário aprende uma vez e replica o aprendizado em todo o produto."
        ],
      },
      {
        heading: "Foco em ação",
        paragraphs: [
          "Cada módulo deve responder a perguntas práticas: o que mudou? por quê? o que fazer? Isso pode se materializar com uma seção de recomendações ao lado de cada bloco, conectando evidência a playbooks de comunicação, PR e mídia. Quando possível, inclua o impacto esperado e a janela ideal para execução.",
          "Acompanhe o uso (cliques, tempo de sessão, trilhas recorrentes) e ajuste a arquitetura para o caminho real dos times. Dashboard é produto vivo."
        ],
      },
    ],
  },

  {
    slug: "alertas-e-timing-comunicacao",
    title: "Alertas e timing de comunicação",
    keyword: "alertas",
    summary:
      "Como usar alertas de picos, viradas de sentimento e difusão para agir no tempo certo.",
    cover: "/blog/covers/alertas-e-timing-comunicacao.jpg",
    coverAlt: "Notificações em tela sobre métricas de mídia social",
    updatedAt: "2025-09-10",
    sections: [
      {
        heading: "O que acionar",
        paragraphs: [
          "Nem todo pico merece sirene. Configure alertas para mudanças estruturalmente relevantes: variação súbita e persistente de sentimento, anomalias de difusão entre comunidades, escalada de menções em torno de palavra-sinal de risco, e deslocamentos do Pêndulo em segmentos estratégicos. Isso evita fadiga de notificação e concentra a atenção do time no que pode se desdobrar em agenda.",
          "Os alertas devem trazer contexto mínimo útil: exemplo representativo, comunidades envolvidas, hubs que catalisaram a alta e sugestão de próximo passo (responder, silenciar, reforçar, explicar)."
        ],
      },
      {
        heading: "Timing e coordenação",
        paragraphs: [
          "A velocidade importa, mas coordenação importa mais. Vincule alertas a rotas de aprovação enxutas, com mensagens pré-validadas por tema e frame. Em crises, a primeira hora define a narrativa; em oportunidades, a janela é curta antes da saturação. O sistema deve reduzir o tempo entre detecção e ação, sem perder rigor.",
          "Pós-ação, mensure efeito: o tom estabilizou? a difusão mudou de rota? a influência relativa reagiu? Essa retroalimentação aprimora o playbook e calibra thresholds futuros."
        ],
      },
      {
        heading: "Integração com o ecossistema",
        paragraphs: [
          "Alertas ficam mais inteligentes quando cruzam sinais dos quatro módulos. Uma virada de sentimento acompanhada de salto no Pêndulo em comunidades específicas sugere contra-medidas direcionadas. Um pico de difusão que não altera percepção pode ser mero ruído — ou uma prévia de virada que merece monitoramento mais fino.",
          "Com cadências definidas e métricas estáveis, os alertas passam a ser alavancas de rotina, não exceções. A equipe sabe quando agir e quando observar."
        ],
      },
    ],
    cta: { label: "Solicitar demo", href: "/demo" },
  },
];
