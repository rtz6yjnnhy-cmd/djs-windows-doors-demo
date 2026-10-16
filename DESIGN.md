# DESIGN.md — DJ's Windows and Doors Installation LLC

Direção artística do site demo-03.

> **Idioma do site:** inglês (EUA), porque o público é o proprietário de casa em Atlanta e na Geórgia. Este documento está em português; os textos de exemplo ficam em inglês, como aparecem no site.

## Histórico

| Versão | O que mudou |
|---|---|
| v1 | Conceito "The Frame" com a paleta "Georgia Golden Hour" (terracota, verde-pinho, pedra calcária). Conceito aprovado pelo cliente. |
| v2 | Identidade alinhada à **logo oficial**: azul-marinho e azul royal no lugar de terracota e verde-pinho. Logo real no header e no rodapé. Janelas e portas com o mesmo peso. Atlanta e região metropolitana como praça principal. Nova seção 3D do processo de troca. |
| **v3 (atual)** | **Fotos reais** de obras da DJ's no lugar de todas as fotos de banco de imagens (Pexels). Hero dividido para fotos em retrato. Antes/depois com pares reais. |

---

## 0. O que o mercado faz (referências)

| Referência | O que fazem bem | O que fazemos |
|---|---|---|
| **Marvin** | Fundo branco/off-white, fotografia arquitetônica no lugar de cor, tom aspiracional. | Mesma sobriedade, com o azul da marca como assinatura e um acento quente para não esfriar. |
| **Pella** | Hero de foto inteira com casa iluminada, CTA "Schedule Consultation" no header e no hero, antes/depois logo cedo. | Antes/depois interativo (janela de correr) e uma demonstração 3D do processo. |
| **Andersen** | Acento de cor só no CTA, tom amigável, telefone visível no header. | Telefone e orçamento sempre visíveis, com acabamento de estúdio, não de varejo. |
| **Estúdios de arquitetura residencial** | Layout editorial, muito respiro, legendas tipo ficha técnica. | Legendas em mono no estilo prancha de arquiteto ("Fig. 02 — Window replacement"). |

**Padrão a atingir:** a fotografia carrega o site; a cor é escassa e intencional; o CTA de orçamento nunca fica a mais de um scroll de distância; o tom transmite ofício, não promoção.

---

## 1. Logo

Arquivo original enviado pelo cliente: `public/images/logo.png` (1657×949, fundo branco sólido, sem transparência, 1,5 MB). Mantido como fonte; **não é usado diretamente** na página.

A partir dele foram geradas quatro variantes otimizadas, com fundo transparente (cor convertida em alfa contra o branco):

| Arquivo | Conteúdo | Uso |
|---|---|---|
| `logo-compact-white.png` | Ícone da casa + DJS + WINDOWS & DOORS, em branco | **Header** (sempre sobre fundo escuro: foto do hero ou barra marinho) |
| `logo-compact-color.png` | Igual, nas cores originais | Reserva para fundos claros |
| `logo-full-white.png` | Inclui a linha **INSTALLED RIGHT**, em branco | **Rodapé** (fundo marinho) |
| `logo-full-color.png` | Igual, nas cores originais | **Menu do celular** (fundo branco) |

**Regras:**
- A faixa de serviços da arte original ("Window Replacement · Entry Doors · Patio Doors") foi **cortada** das versões do site: no tamanho de header ela ficaria ilegível, e esse conteúdo aparece como texto real na seção de serviços.
- Altura mínima: 44px no header em telas pequenas, 52px no desktop; 96–112px no rodapé.
- Sobre fundo escuro, sempre a versão branca; sobre fundo claro, sempre a colorida. Nunca a colorida sobre a foto do hero.
- O componente `Logo` aceita `decorative` (alt vazio) quando o nome da marca já está no link ao redor.

---

## 2. Paleta de cores

Derivada da logo: degradê de azul-marinho profundo a azul royal, texto em cinza-grafite, fundo branco. Um acento quente (âmbar/dourado) fica reservado a pequenos destaques, para o site não ficar frio.

### Base

| Token | Nome | Hex | Uso |
|---|---|---|---|
| `--color-paper` | Paper | `#FFFFFF` | Fundo principal |
| `--color-mist` | Mist | `#F2F4F7` | Fundo de seções alternadas, chips, caixa do formulário |
| `--color-line` | Line | `#D6DCE5` | Divisórias, bordas de campos, grade |
| `--color-ink` | Graphite Ink | `#1F242C` | Texto principal (o grafite do "WINDOWS & DOORS") |
| `--color-slate` | Slate | `#566170` | Texto secundário, legendas (5,7:1 sobre Mist; AA) |

### Marca

| Token | Nome | Hex | Uso |
|---|---|---|---|
| `--color-navy` | Deep Navy | `#0A1628` | **Primária:** header ao rolar, seções escuras (Diferenciais, Área de Atendimento), rodapé, fundo da cena 3D |
| `--color-navy-800` | Navy 800 | `#11274A` | Variação de profundidade em fundos escuros |
| `--color-royal` | Royal Blue | `#1E4FA3` | **Ação:** todos os CTAs ("Get a Free Quote", "Request My Free Quote"), palavra de destaque em títulos sobre fundo claro, foco (7,8:1 com texto branco) |
| `--color-royal-deep` | Royal Deep | `#173F82` | Hover/pressed dos CTAs, rótulos de seção sobre fundo claro |
| `--color-sky` | Sky | `#A9C4EE` | Detalhes sobre marinho (contorno da área metropolitana no mapa) |

### Acento quente

| Token | Nome | Hex | Uso |
|---|---|---|---|
| `--color-amber` | Amber | `#D4A24C` | Pequenos destaques sobre marinho: numerais dos diferenciais, estrelas, rótulos, vedação na cena 3D, puxador da porta nova |
| `--color-sunlight` | Golden Hour | `#F2C879` | Só como **luz**: palavra em itálico do hero, raios de sol, brilho interno da janela no 3D, marcador de Atlanta no mapa. Nunca em texto pequeno sobre fundo claro |

### Regras de uso
- Proporção aproximada: **65% paper/mist · 25% navy · 7% royal · 3% amber/sunlight**.
- **Royal é exclusivo de ação** (botões, links de orçamento). Navy é estrutura, não botão.
- Amber e sunlight nunca são cor de texto sobre fundo claro (contraste insuficiente); sobre marinho estão liberados.
- Foco visível: contorno de 2px em royal.

---

## 3. Tipografia

Mantida da v1. A logo usa uma sans geométrica pesada; o site **não** tenta imitá-la. A serifa editorial contrasta com a logo e dá o tom de alto padrão residencial.

| Papel | Fonte | Pesos | Por quê |
|---|---|---|---|
| **Títulos** | **Newsreader** | 300, 400, 500 + itálico | Serifa editorial elegante em tamanho grande; o itálico marca a palavra-chave ("*Installed right.*", "*before you sign.*") |
| **Corpo e interface** | **Hanken Grotesk** | 400, 500, 600 | Grotesca limpa e legível em formulário e navegação |
| **Ficha técnica** | **JetBrains Mono** | 400, 500 | Legendas, rótulos e números; remete a planta e medida |

Escala (desktop → mobile): display do hero `clamp(3rem, 7vw, 6.5rem)`; H2 `clamp(2.25rem, 4.5vw, 4rem)`; corpo 17px/1.6; rótulos mono 12px em caixa alta.

---

## 4. Conceito e tom visual

### "The Frame", agora em azul
Uma janela ou uma porta é uma moldura para a vida dentro de casa. O conceito da v1 continua: linhas finas como montantes de esquadria, imagens que "abrem" como uma moldura, legendas tipo ficha técnica, raios de luz quente. O que mudou foi a cor: a estrutura agora é **azul-marinho**, e a **luz quente** virou o acento que aquece o conjunto.

### Janelas e portas com o mesmo peso
- **Hero:** "New windows. New doors. *Installed right.*" Duas linhas iguais, uma para cada produto, fechadas pela tagline da logo.
- **Serviços:** dois painéis idênticos lado a lado (Windows | Doors), com mesmo tamanho de foto, mesma estrutura (título, texto, tipos, CTA "Quote my windows" / "Quote my doors"). Reforma e venda de produto ficam numa faixa compartilhada abaixo.
- **3D, projetos, formulário e depoimentos** citam os dois. O formulário oferece "Windows", "Doors" e "Windows & doors".

### Atlanta como praça principal
- Seção "Atlanta & the *metro area.*" com 16 cidades da região metropolitana em destaque.
- No mapa, a área metropolitana é um círculo azul com o rótulo "METRO ATLANTA · HOME BASE"; as demais cidades da Geórgia aparecem pequenas e discretas.
- A Geórgia como um todo continua mencionada, em segundo plano: uma linha "Also serving the rest of Georgia…", o rodapé ("statewide on request") e o hero ("serving homeowners across Georgia").

### Movimento
- Lento e pesado, como uma janela de qualidade fechando: `cubic-bezier(0.22, 1, 0.36, 1)`; entradas de 600–900ms, interface (menus, cliques) até 450ms, saídas mais rápidas que entradas.
- Botões encolhem a 0,97 ao serem pressionados.
- Tudo respeita `prefers-reduced-motion`: revelações viram fade; parallax, raios, pulsos e câmera do 3D ficam parados.

---

## 5. Seção 3D: "See the result *before you sign.*"

**Objetivo:** mostrar o processo de troca e fazer o cliente "ver o resultado antes de contratar".

**Como funciona:**
- A seção fica fixa na tela por cerca de 2,6 alturas de tela enquanto o usuário rola; **o scroll conduz a animação**.
- Um botão alterna entre **Window** e **Door**, com o mesmo roteiro e o mesmo peso.
- Quatro etapas, com texto que muda junto com a cena:

| Etapa | Na cena |
|---|---|
| 01 Measure | Linhas de cota em azul royal se desenham em volta da abertura |
| 02 Remove | A unidade velha (moldura bege desbotada, vidro embaçado, fora de esquadro; a porta com painéis marrons e maçaneta redonda) sai em direção ao usuário e some |
| 03 Install | A unidade nova em azul-marinho desliza para dentro da abertura (a porta nova tem visor de vidro vertical e puxador longo âmbar, como na logo) |
| 04 Seal & finish | Um cordão âmbar de vedação percorre o contorno, e uma luz quente acende por dentro |

**Decisões técnicas:**
- Three.js puro (sem React Three Fiber), em `src/components/process/scene.ts`. A biblioteca é **carregada sob demanda** só quando a seção se aproxima da tela, então não pesa no carregamento inicial.
- Estilo low-poly com materiais simples: parede com textura de siding desenhada em canvas, reflexo de ambiente (`RoomEnvironment`), sem sombras (desempenho).
- Renderiza só enquanto a seção está visível; libera a memória da GPU ao sair da página.
- O mouse inclina levemente a câmera (desligado com movimento reduzido).
- **Acessibilidade:** as etapas são botões que levam ao ponto certo da animação (alternativa ao scroll); o canvas tem descrição que muda por etapa; o texto da etapa é anunciado ao leitor de tela.
- **Fallback:** se o navegador não suportar WebGL, aparece uma foto no lugar da cena e as etapas continuam funcionando.

---

## 6. Estrutura da home page

| # | Seção | Fundo | Conteúdo |
|---|---|---|---|
| — | **Header** | Transparente sobre o hero → marinho ao rolar | Logo branca, navegação (Services, Process, Projects, Service Area, Contact), telefone, CTA royal |
| — | **Hero** | Navy, dividido | Esquerda: "New windows. New doors. *Installed right.*", subtítulo com Metro Atlanta, CTAs Quote/Call. Direita: duas fotos reais em moldura (janela + porta) |
| 01 | **Serviços** | Paper | Painéis iguais Windows / Doors + faixa de reforma e venda |
| 02 | **Processo 3D** | Mist, cena sobre marinho | Janela/porta, 4 etapas, scroll conduz a animação |
| 03 | **Diferenciais** | Navy | "Installed right. *Sealed tight.*", 4 pontos, numerais em âmbar |
| 04 | **Antes / Depois** | Mist | Slider como janela de correr, 3 projetos de exemplo |
| 05 | **Galeria** | Paper | Grade editorial assimétrica |
| 06 | **Depoimentos** | Paper | Exemplos marcados como tal, com pausa |
| 07 | **Área de Atendimento** | Navy | Atlanta e região em destaque; Geórgia em segundo plano |
| 08 | **Orçamento** | Paper | Formulário (Windows / Doors / Windows & doors) |
| — | **Rodapé** | Navy | Logo completa branca com INSTALLED RIGHT, contatos |

---

## 7. Fotografia

Todas as fotos do site são **obras reais da DJ's** (11 fotos de celular enviadas pelo cliente). As fotos de banco de imagens foram removidas.

**Arquivos:**
- `public/images/real/real-01…11.jpg`: originais, mantidos como **backup** e não publicados (o passo `postbuild` os remove do site exportado). A `real-04` é na verdade um PNG com extensão `.jpg`.
- `public/images/work/`: versões otimizadas para a web (1000px de largura, JPEG progressivo, qualidade 74, sem metadados). Total de 2,9 MB, contra 6,3 MB dos originais. Os originais não tinham EXIF nem GPS.

**O que cada foto mostra e onde está:**

| Original | Conteúdo | Uso no site |
|---|---|---|
| real-01 | Porta de entrada **antiga**, vista de dentro (vidro oval, laterais, bandeira em meia-lua coberta por cortina plissada) | Antes/Depois 02: **Before** |
| real-02 | Porta de entrada branca com laterais e bandeira em meia-lua, fachada de pedra, vista de fora | Galeria; foto do Contato |
| real-03 | **Mesma entrada da 01, depois**: porta, laterais e bandeira novas (vidro com outro desenho, bandeira com raios) | Antes/Depois 02: **After**; Galeria |
| real-04 | Porta de entrada azul-marinho com meio vidro e laterais, entrada de tijolo | **Hero** (Doors); Galeria |
| real-05 | Porta de entrada vermelha com laterais, fachada cinza | Serviços: painel **Doors** |
| real-06 | Três janelas em arco ao entardecer, com luz quente por dentro | **Hero** (Windows); Galeria |
| real-07 | Porta francesa dupla branca (pátio) | Galeria |
| real-08 | **Mesma janela da 09, depois**: janela em arco nova, branca, com grades | Antes/Depois 01: **After**; Serviços: painel **Windows** |
| real-09 | Janela em arco **antiga** (moldura bege), com lona protegendo as plantas no dia da obra | Antes/Depois 01: **Before** |
| real-10 | Janela em arco **durante a instalação** (perfis antigos e mangueira no chão, etiqueta no vidro, sem acabamento) | Antes/Depois 03: **During**; Diferenciais ("On the job") |
| real-11 | **Mesma janela da 10, pronta**, com acabamento e persianas internas | Antes/Depois 03: **After**; Galeria |

**Pares antes/depois:** 09→08 (janela), 01→03 (porta, vista interna), 10→11 (durante→pronto). Cada par foi **recortado para alinhar o mesmo vão** nas duas fotos (`work/ba-*.jpg`), para o slider comparar de verdade. As fotos do par 09→08 foram feitas em dias com luz diferente (nublado/sol).

**Por que o hero mudou:** todas as fotos reais são verticais (3:4). Esticar uma delas numa faixa horizontal de tela cheia deixaria a imagem borrada. O hero passou a ser **dividido**: texto sobre marinho à esquerda e duas molduras verticais à direita, uma janela (real-06) e uma porta (real-04), coerente com o peso igual entre os dois produtos.

---

## 8. Pendências com o cliente

- [x] Fotos reais de obras (11 fotos integradas)
- [ ] Confirmar que as fotos podem ser publicadas (as casas são de clientes) e se há cidades para as legendas
- [ ] Mais pares antes/depois de **portas** vistas de fora, e fotos horizontais se possível (para usos em faixa larga)
- [ ] E-mail real de contato (o atual `quotes@djswindowsanddoors.com` é provisório)
- [ ] Confirmar afirmações: equipe própria do início ao fim, orçamento grátis, horário, atendimento estadual em projetos maiores
- [ ] Depoimentos reais (os atuais são exemplos e estão marcados como tal)
- [ ] Lista final de cidades da região metropolitana atendidas
- [ ] Versão vetorial da logo (SVG ou PDF), para nitidez máxima; as variantes atuais foram geradas a partir do PNG
