# DESIGN.md — DJ's Windows and Doors Installation LLC

Direção artística do site demo-03. Este documento é para revisão; nada foi implementado ainda.

> **Idioma do site:** inglês (EUA), porque o público é o proprietário de casa na Geórgia. Este documento está em português; os textos de exemplo ficam em inglês, como vão aparecer no site.

---

## 0. O que o mercado faz (referências)

| Referência | O que fazem bem | O que vamos fazer diferente |
|---|---|---|
| **Marvin** | Fundo branco/off-white, preto como acento, fotografia arquitetônica no lugar de cor. Tom aspiracional ("Design begins with the impossible"). | Mesma sobriedade, mas com uma assinatura de cor quente e regional, sem o branco frio de catálogo. |
| **Pella** | Hero de foto inteira com casa iluminada, CTA "Schedule Consultation" repetido no header e no hero, galeria antes/depois logo após o hero. | Antes/depois vira peça interativa central, não só uma grade de fotos. |
| **Andersen** | Laranja como acento de CTA, tom amigável ("The one that cranks open"), telefone visível no header, prova de longevidade. | Telefone e orçamento sempre visíveis, mas com acabamento de estúdio, não de varejo. |
| **Estúdios de arquitetura residencial** (ex.: Gregory Phillips, The Up Studio) | Layout editorial, muito respiro, legendas pequenas tipo ficha técnica, foto grande sem moldura. | Usar a linguagem de *ficha técnica/planta* nas legendas e nos números. |

**Padrão de excelência que vamos atingir:** fotografia carrega o site; cor é escassa e intencional; CTA de orçamento nunca está a mais de um scroll de distância; o tom transmite ofício, não promoção.

**Como o demo-03 se diferencia:** as grandes marcas são nacionais e neutras. A DJ's é local, então o site assume a luz e os materiais da Geórgia (argila vermelha, pinho, luz de fim de tarde) como identidade.

> ⚠️ Não abri os projetos demo-01 e demo-02 (você pediu para eu não sair deste diretório). Se me disser as paletas e fontes deles, confirmo que não há sobreposição.

---

## 1. Paleta de cores

Conceito: **"Georgia Golden Hour"**: materiais de construção quentes e a luz do sol poente entrando pela janela. Nada de azul corporativo.

### Cores base

| Token | Nome | Hex | Uso |
|---|---|---|---|
| `--limestone` | Limestone | `#F4EFE6` | Fundo principal (off-white quente, não branco puro) |
| `--plaster` | Plaster | `#E8E0D2` | Fundo de seções alternadas, cards |
| `--ink` | Iron Ink | `#1C1B19` | Texto principal, header sobre claro, seções escuras |
| `--graphite` | Graphite | `#4A4743` | Texto secundário, legendas |
| `--mullion` | Mullion | `#CFC5B4` | Linhas de grade, bordas, divisórias (a "esquadria") |

### Cores de assinatura

| Token | Nome | Hex | Uso |
|---|---|---|---|
| `--pine` | Georgia Pine | `#24392F` | Cor institucional: seções escuras, rodapé, botão secundário |
| `--clay` | Red Clay | `#A84B24` | Acento principal: CTA "Get a Free Quote", destaques. A argila vermelha da Geórgia |
| `--clay-deep` | Fired Clay | `#863A1B` | Hover/pressed do CTA, texto de acento sobre fundo claro |
| `--brass` | Brass | `#C39A5B` | Detalhes finos: ícones, números, sublinhados, ferragens |
| `--sunlight` | Golden Hour | `#F2C879` | Usada **só como luz**: gradientes de raio de sol, brilho no hero. Nunca em texto |

### Regras de uso
- Proporção aproximada: **70% limestone/plaster · 20% ink/pine · 7% clay · 3% brass/sunlight**.
- `--clay` é reservado para ação (orçamento, telefone). Se tudo for argila, nada é.
- Texto sobre `--pine` usa `--limestone`; texto sobre `--clay` usa `--limestone` (contraste ≈ 5.0:1, AA para texto normal).
- `--brass` não é cor de texto em corpo pequeno (contraste insuficiente sobre limestone); só ícones, numerais grandes e linhas.

---

## 2. Tipografia

Todas do Google Fonts, gratuitas e carregadas via `next/font/google`.

| Papel | Fonte | Pesos | Por quê |
|---|---|---|---|
| **Títulos (display)** | **Newsreader** | 300, 400, 500 + itálico | Serifa editorial com eixo óptico: elegante em tamanho grande sem o visual batido de Playfair/Cormorant. O itálico vai nas palavras-chave ("*light*", "*home*"). |
| **Corpo e interface** | **Hanken Grotesk** | 400, 500, 600 | Grotesca limpa e um pouco quente, muito legível em formulário e navegação. |
| **Ficha técnica** | **JetBrains Mono** | 400, 500 | Legendas, números, rótulos ("U-FACTOR 0.27", "PROJECT 014 · MARIETTA, GA"). Remete a planta e medida. |

### Escala (desktop → mobile)
| Estilo | Fonte | Tamanho | Entrelinha | Tracking |
|---|---|---|---|---|
| Display XL (hero) | Newsreader 300 | `clamp(3rem, 7vw, 6.5rem)` | 0.95 | -0.02em |
| H2 de seção | Newsreader 400 | `clamp(2.25rem, 4.5vw, 4rem)` | 1.05 | -0.015em |
| H3 | Newsreader 500 | `1.5rem` | 1.2 | -0.01em |
| Corpo | Hanken Grotesk 400 | `1.0625rem` (17px) | 1.6 | 0 |
| Botões/nav | Hanken Grotesk 500 | `0.9375rem` | 1 | 0.01em |
| Rótulo técnico | JetBrains Mono 500 | `0.75rem` | 1.4 | 0.08em, CAIXA ALTA |

---

## 3. Tom visual e conceito criativo

### Conceito: **"The Frame"**
Uma janela é uma moldura para a vida dentro de casa. O site inteiro é composto *através de molduras*: cada imagem, seção e transição se comporta como uma esquadria que enquadra a luz.

### Os três motivos visuais

1. **Luz entrando**
   Raios de sol diagonais (`--sunlight`, com transparência e blur) atravessam as seções claras, como luz de fim de tarde projetada no piso. Eles se deslocam suavemente com o scroll (Framer Motion, `useScroll` + `transform`, só `opacity`/`transform` para manter 60 fps).

2. **Esquadria (mullion grid)**
   Linhas finas de 1px em `--mullion` dividem o layout como os montantes de uma janela. Na entrada do hero, as linhas *se desenham* e a foto "abre" dentro da moldura. As imagens têm cantos retos, sem cards arredondados: arquitetura, não app.

3. **Ficha técnica**
   Cada projeto e serviço tem uma legenda em mono, como numa prancha de arquiteto: número do projeto, cidade, tipo de produto. Transmite precisão e ofício sem precisar dizer "qualidade".

### Fotografia
- Casas residenciais do Sul dos EUA (craftsman, colonial, ranch, farmhouse moderno), **luz quente de fim de tarde**, interiores com sol entrando pela janela.
- Tons quentes e levemente dessaturados; nada de céu azul saturado de banco de imagem.
- Fonte para a demo: Unsplash/Pexels (licença comercial livre). Substituir por fotos reais de obras da DJ's antes de ir ao ar.

### Movimento (princípios)
- Lento e pesado, como uma janela de qualidade fechando: easing `cubic-bezier(0.22, 1, 0.36, 1)`, 600–900 ms nas entradas de seção.
- Nada de bounce, de flutuação infinita nem de partículas.
- Tudo respeita `prefers-reduced-motion` (raios de luz ficam estáticos, reveals viram fade).

### Tom de voz (copy)
Confiante, local, direto. Fala de *luz, conforto, conta de energia e acabamento*, não de "soluções".
Exemplos: *"Let the Georgia light in."* · *"Installed right. Sealed tight."* · *"From Savannah to the North Georgia mountains."*

---

## 4. Estrutura da home page

| # | Seção | Fundo | Conteúdo e composição | Interação (Framer Motion) |
|---|---|---|---|---|
| — | **Header** | Transparente → limestone ao rolar | Wordmark "DJ's" (Newsreader itálico) + "Windows & Doors" (mono) · nav · telefone · botão clay **Get a Free Quote** | Header encolhe e ganha fundo após 80px |
| 1 | **Hero: "Let the Georgia light in."** | Foto em tela cheia | Casa ao entardecer vista *através* de uma moldura de janela; título display à esquerda, subtítulo, 2 CTAs (Free Quote / Call). Faixa inferior em mono: `RESIDENTIAL INSTALLATION · MATERIAL SALES · STATEWIDE GEORGIA` | Linhas da esquadria se desenham; a foto "abre" do centro; raio de luz desliza |
| 2 | **Serviços** | Limestone | 4 blocos em grade com linhas de esquadria (não cards): *Window Installation · Door Installation · Replacement & Retrofit · Material Sales*. Cada um com foto, legenda mono e 2 linhas de texto | Hover: a foto ganha luz quente (overlay sunlight) |
| 3 | **Diferenciais** | Pine (escuro) | Título grande + 4 pontos numerados em brass (`01`–`04`): instalação própria (sem terceirizar), vedação e acabamento, material direto com a empresa, atendimento em toda a Geórgia. Números de destaque (anos, projetos), **a confirmar com o cliente** | Numerais contam ao entrar na tela |
| 4 | **Antes / Depois** | Plaster | Peça central: slider que se comporta como uma **janela de correr**. Arrastar a "folha" revela o depois. 3 projetos com ficha mono (`PROJECT 014 · MARIETTA, GA · 12 DOUBLE-HUNG`) | Drag com mola; troca de projeto com crossfade |
| 5 | **Galeria** | Limestone | Grade editorial assimétrica (estilo estúdio de arquitetura), fotos de proporções variadas com legenda mono | Reveal por máscara (a moldura abre) |
| 6 | **Depoimentos** | Limestone com raio de luz | 1 citação grande por vez em Newsreader itálico, nome + cidade em mono, estrelas em brass | Transição horizontal lenta |
| 7 | **Área de Atendimento** | Pine | Mapa estilizado da Geórgia (SVG, traço em brass) com pontos nas principais regiões (Atlanta Metro, Savannah, Augusta, Macon, Columbus, Athens, North GA) + lista de cidades | Pontos acendem em sequência; contorno se desenha |
| 8 | **Contato / Orçamento** | Limestone, formulário dentro de uma "moldura" | Esquerda: título *"Tell us about your windows."*, telefone, e-mail, horário. Direita: formulário curto (nome, telefone, e-mail, cidade/ZIP, serviço, mensagem) + CTA clay | Validação inline; estado de sucesso animado |
| — | **Rodapé** | Ink | Wordmark, contatos, área de atendimento, "Licensed & Insured" **somente se confirmado**, © | — |

**CTA sempre acessível:** no mobile, uma barra fixa inferior com **Call** e **Free Quote**.

---

## 5. Pendências com o cliente (antes de ir ao ar)

- [ ] Fotos reais de obras (antes/depois principalmente)
- [ ] Telefone, e-mail, endereço/horário
- [ ] Anos de atuação, número de projetos, licença e seguro (não vamos afirmar nada sem confirmação)
- [ ] Depoimentos reais. **Na demo, os depoimentos serão marcados como exemplo**, não apresentados como verdadeiros
- [ ] Marcas de material que revendem (se houver, entram em "Material Sales")
- [ ] Logo: a demo usa um wordmark tipográfico provisório; dá para evoluir para logo próprio depois

---

**Referências consultadas:** [Marvin](https://www.marvin.com) · [Pella](https://www.pella.com) · [Andersen Windows](https://www.andersenwindows.com) · [Gregory Phillips Architects](https://gregoryphillips.com/us/new-houses/) · [The Up Studio](https://www.theupstudio.com/press.html) · [Pac Studio](https://archipro.co.nz/professional/pac-studio-us)
