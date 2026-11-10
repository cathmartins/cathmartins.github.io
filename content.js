/* =============================================================
   CONTEÚDO DO SITE: para mudar textos e projetos, edite só aqui.
   ============================================================= */

const SITE = {
  nome: "Catharini Martins",
  logo: "",                                // depois: "images/logo.svg"
  email: "cathmartins.design@gmail.com",
  telefone: "+55 31 99317-6033",
  whatsapp: "5531993176033",               // só números: 55 + DDD + número
  linkedin: "https://www.linkedin.com/in/cath-m-248747213/",
  cv: {                                    // coloque os PDFs na pasta cv/
    pt: "cv/cv-catharini-martins-pt.pdf",
    en: "cv/cv-catharini-martins-en.pdf",
  },
  instagram: "",                           // cole o link para aparecer no rodapé
  behance: "",
  local: { pt: "Minas Gerais, Brasil", en: "Minas Gerais, Brazil" },
};

/* BANNER DA HOME: projetos que giram no topo, nesta ordem.
   Imagem de cada um: images/projetos/<slug>/banner.jpg
   (horizontal, ex.: 2400 × 1350). Se não existir, usa a capa.jpg. */
const BANNER = ["cepera", "minascentro", "maralto", "memorial-brumadinho"];

const UI = {
  pt: {
    nav: { projetos: "Projetos", sobre: "Sobre", contato: "Contato" },
    heroTitulo: "Leveza para criar com impacto",
    heroTexto: "Sou a Cath, designer de marcas. Crio identidades com essência para negócios únicos, do branding ao editorial.",
    heroServicos: ["branding", "identidade visual", "editorial", "embalagem", "tipografia"],
    banner: "Projetos em destaque",
    selecionados: "Projetos selecionados",
    verTodos: "Ver todos os projetos",
    projetosTitulo: "Projetos",
    projetosTexto: "Branding, projetos editoriais e embalagem para negócios que querem ser lembrados pela sua essência.",
    todos: "Todos",
    categorias: { branding: "Branding", editorial: "Editorial", embalagem: "Embalagem" },
    categoria: "Categoria", ano: "Ano", local: "Local",
    voltar: "Todos os projetos",
    proximo: "Próximo projeto",
    emBreve: "imagem em breve",
    sobreTitulo: "Design é ponte",
    sobreTexto: [
      "Sou a Catharini Martins, a Cath. Designer de marcas, trabalho com branding, identidade visual, projetos editoriais e embalagem.",
      "Acredito que design é ponte: liga o que um negócio é ao jeito como ele é percebido. Meu processo parte da escuta e da estratégia para chegar a identidades com essência, feitas para inspirar, transformar e conectar.",
      "[Complete com sua trajetória: formação, onde trabalhou, clientes e o que te move.]",
    ],
    servicosTitulo: "O que eu faço",
    servicos: ["branding", "identidade visual", "editorial", "diagramação", "embalagem", "tipografia", "redes sociais", "ambientação"],
    ctaTitulo: "Vamos conversar?",
    ctaTexto: "Conte sobre o seu negócio e vamos criar uma marca com essência.",
    cvPt: "CV em português",
    cvEn: "CV em inglês",
    topo: "Topo",
  },
  en: {
    nav: { projetos: "Work", sobre: "About", contato: "Contact" },
    heroTitulo: "Lightness to create with impact",
    heroTexto: "I'm Cath, a brand designer. I create identities with essence for unique businesses, from branding to editorial.",
    heroServicos: ["branding", "visual identity", "editorial", "packaging", "typography"],
    banner: "Featured work",
    selecionados: "Selected work",
    verTodos: "See all projects",
    projetosTitulo: "Work",
    projetosTexto: "Branding, editorial and packaging for businesses that want to be remembered for their essence.",
    todos: "All",
    categorias: { branding: "Branding", editorial: "Editorial", embalagem: "Packaging" },
    categoria: "Category", ano: "Year", local: "Location",
    voltar: "All projects",
    proximo: "Next project",
    emBreve: "image coming soon",
    sobreTitulo: "Design is a bridge",
    sobreTexto: [
      "I'm Catharini Martins, or Cath. I'm a brand designer working across branding, visual identity, editorial design and packaging.",
      "I believe design is a bridge: it connects what a business is with how it's perceived. My process starts with listening and strategy and arrives at identities with essence, made to inspire, transform and connect.",
      "[Add your background: education, where you've worked, clients and what drives you.]",
    ],
    servicosTitulo: "What I do",
    servicos: ["branding", "visual identity", "editorial", "layout", "packaging", "typography", "social media", "environmental design"],
    ctaTitulo: "Let's talk?",
    ctaTexto: "Tell me about your business and let's create a brand with essence.",
    cvPt: "CV in Portuguese",
    cvEn: "CV in English",
    topo: "Top",
  },
};

/* PROJETOS
   slug      → nome da pasta em images/projetos/ (sem acento nem espaço)
   categoria → "branding", "editorial" ou "embalagem"
   destaque  → true = aparece na home
   conceito  → a linha que aparece embaixo do nome
   galeria   → quantas imagens o case tem (01.jpg, 02.jpg...)
   Para separar parágrafos no texto, use \n\n                          */

const PROJETOS = [
  { slug: "cepera", nome: "Cepêra", categoria: "branding", ano: "20XX", destaque: true, galeria: 4,
    local: { pt: "Cidade, UF", en: "City, Brazil" },
    conceito: { pt: "Identidade Visual", en: "Visual Identity" },
    texto: { pt: "Parágrafo sobre o projeto: o desafio, a ideia e o que foi entregue.", en: "A paragraph about the project: the challenge, the idea and what was delivered." } },

  { slug: "tottus", nome: "Tottus", categoria: "branding", ano: "20XX", destaque: false, galeria: 4,
    local: { pt: "Cidade, UF", en: "City, Brazil" },
    conceito: { pt: "Identidade Visual", en: "Visual Identity" },
    texto: { pt: "Parágrafo sobre o projeto: o desafio, a ideia e o que foi entregue.", en: "A paragraph about the project: the challenge, the idea and what was delivered." } },

  { slug: "lovlity", nome: "LOVLITY", categoria: "branding", ano: "20XX", destaque: false, galeria: 4,
    local: { pt: "Cidade, UF", en: "City, Brazil" },
    conceito: { pt: "Identidade Visual", en: "Visual Identity" },
    texto: { pt: "Parágrafo sobre o projeto: o desafio, a ideia e o que foi entregue.", en: "A paragraph about the project: the challenge, the idea and what was delivered." } },

  { slug: "minascentro", nome: "Minascentro", categoria: "branding", ano: "20XX", destaque: true, galeria: 4,
    local: { pt: "Cidade, UF", en: "City, Brazil" },
    conceito: { pt: "Identidade Visual", en: "Visual Identity" },
    texto: { pt: "Parágrafo sobre o projeto: o desafio, a ideia e o que foi entregue.", en: "A paragraph about the project: the challenge, the idea and what was delivered." } },

  { slug: "maralto", nome: "Maralto", categoria: "branding", ano: "20XX", destaque: true, galeria: 4,
    local: { pt: "Cidade, UF", en: "City, Brazil" },
    conceito: { pt: "Identidade Visual", en: "Visual Identity" },
    texto: { pt: "Parágrafo sobre o projeto: o desafio, a ideia e o que foi entregue.", en: "A paragraph about the project: the challenge, the idea and what was delivered." } },

  { slug: "v2i", nome: "V2I", categoria: "branding", ano: "20XX", destaque: false, galeria: 4,
    local: { pt: "Cidade, UF", en: "City, Brazil" },
    conceito: { pt: "Identidade Visual", en: "Visual Identity" },
    texto: { pt: "Parágrafo sobre o projeto: o desafio, a ideia e o que foi entregue.", en: "A paragraph about the project: the challenge, the idea and what was delivered." } },

  { slug: "memorial-brumadinho", nome: "Memorial Brumadinho", categoria: "branding", ano: "20XX", destaque: true, galeria: 4,
    local: { pt: "Brumadinho, MG", en: "Brumadinho, Brazil" },
    conceito: { pt: "Identidade Visual", en: "Visual Identity" },
    texto: { pt: "Parágrafo sobre o projeto: o desafio, a ideia e o que foi entregue.", en: "A paragraph about the project: the challenge, the idea and what was delivered." } },

  { slug: "amapa-40-anos", nome: "Uma gente que não para de sonhar – Amapá 40 anos", categoria: "editorial", ano: "20XX", destaque: false, galeria: 4,
    local: { pt: "Cidade, UF", en: "City, Brazil" },
    conceito: { pt: "Projeto Editorial", en: "Editorial Design" },
    texto: { pt: "Parágrafo sobre o projeto: o desafio, a ideia e o que foi entregue.", en: "A paragraph about the project: the challenge, the idea and what was delivered." } },

  { slug: "ipanema-queijos", nome: "Ipanema Queijos", categoria: "embalagem", ano: "20XX", destaque: true, galeria: 4,
    local: { pt: "Cidade, UF", en: "City, Brazil" },
    conceito: { pt: "Embalagens", en: "Packaging" },
    texto: { pt: "Parágrafo sobre o projeto: o desafio, a ideia e o que foi entregue.", en: "A paragraph about the project: the challenge, the idea and what was delivered." } },

  { slug: "livro-pardini", nome: "Uma história de estratégia com propósito – Hermes Pardini", categoria: "editorial", ano: "20XX", destaque: true, galeria: 4,
    local: { pt: "Cidade, UF", en: "City, Brazil" },
    conceito: { pt: "Projeto Editorial", en: "Editorial Design" },
    texto: { pt: "Parágrafo sobre o projeto: o desafio, a ideia e o que foi entregue.", en: "A paragraph about the project: the challenge, the idea and what was delivered." } },
];