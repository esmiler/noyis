// Lightweight i18n for Noyis Africa.
// Routes use /$lang/... with lang in SUPPORTED_LANGS.
// Localized DB fields are JSONB { en, es, fr, pt }.

export const SUPPORTED_LANGS = ["en", "es", "fr", "pt"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];
export const DEFAULT_LANG: Lang = "en";

export function isLang(value: string | undefined): value is Lang {
  return !!value && (SUPPORTED_LANGS as readonly string[]).includes(value);
}

export const LANG_LABELS: Record<Lang, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  pt: "Português",
};

export const LANG_HREFLANG: Record<Lang, string> = {
  en: "en",
  es: "es",
  fr: "fr",
  pt: "pt",
};

type LocalizedJson = Record<string, string> | unknown;

export function localized(value: LocalizedJson, lang: Lang, fallback: Lang = DEFAULT_LANG): string {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const obj = value as Record<string, string>;
    return obj[lang] ?? obj[fallback] ?? Object.values(obj)[0] ?? "";
  }
  return typeof value === "string" ? value : "";
}

// UI dictionary
type Dict = Record<string, Record<Lang, string>>;

export const t: Dict = {
  nav_home: { en: "Home", es: "Inicio", fr: "Accueil", pt: "Início" },
  nav_wellness: { en: "Wellness", es: "Bienestar", fr: "Bien-être", pt: "Bem-estar" },
  nav_beverages: { en: "Beverages", es: "Bebidas", fr: "Boissons", pt: "Bebidas" },
  nav_wholesale: { en: "Wholesale", es: "Mayoreo", fr: "Gros", pt: "Atacado" },
  nav_about: { en: "About", es: "Nosotros", fr: "À propos", pt: "Sobre" },
  nav_contact: { en: "Contact", es: "Contacto", fr: "Contact", pt: "Contato" },
  nav_locator: { en: "Store Locator", es: "Tienda", fr: "Magasin", pt: "Loja" },
  nav_faq: { en: "FAQ", es: "Preguntas", fr: "FAQ", pt: "Perguntas" },
  nav_products: { en: "All Products", es: "Productos", fr: "Produits", pt: "Produtos" },

  cart: { en: "Cart", es: "Carrito", fr: "Panier", pt: "Carrinho" },
  cart_empty: { en: "Your cart is empty.", es: "Tu carrito está vacío.", fr: "Votre panier est vide.", pt: "Seu carrinho está vazio." },
  cart_send_whatsapp: {
    en: "Send Order via WhatsApp",
    es: "Enviar pedido por WhatsApp",
    fr: "Envoyer la commande par WhatsApp",
    pt: "Enviar pedido pelo WhatsApp",
  },
  cart_clear: { en: "Clear cart", es: "Vaciar", fr: "Vider", pt: "Limpar" },
  add_to_cart: { en: "Add to Cart", es: "Agregar al Carrito", fr: "Ajouter au Panier", pt: "Adicionar ao Carrinho" },
  out_of_stock: { en: "Out of Stock", es: "Agotado", fr: "Épuisé", pt: "Esgotado" },
  contact_for_availability: {
    en: "Contact Us for Availability",
    es: "Consulta disponibilidad",
    fr: "Vérifier la disponibilité",
    pt: "Consulte disponibilidade",
  },
  in_stock: { en: "In stock", es: "En stock", fr: "En stock", pt: "Em estoque" },

  hero_title: {
    en: "Natural Wellness, Functional Beverages & Wholesale Distribution Across The Caribbean",
    es: "Bienestar Natural, Bebidas Funcionales y Distribución al Mayoreo en el Caribe",
    fr: "Bien-être Naturel, Boissons Fonctionnelles et Distribution en Gros dans les Caraïbes",
    pt: "Bem-estar Natural, Bebidas Funcionais e Distribuição no Atacado pelo Caribe",
  },
  hero_sub: {
    en: "Premium herbal formulas, therapeutic oils, functional coffees, commercial beverages and wholesale inventory — shipped across Antigua, the Caribbean, the US, Canada and Latin America.",
    es: "Fórmulas herbales premium, aceites terapéuticos, cafés funcionales, bebidas comerciales e inventario al por mayor — enviados a Antigua, el Caribe, EE. UU., Canadá y América Latina.",
    fr: "Formules à base de plantes premium, huiles thérapeutiques, cafés fonctionnels, boissons commerciales et stock de gros — expédiés à Antigua, dans les Caraïbes, aux États-Unis, au Canada et en Amérique latine.",
    pt: "Fórmulas herbais premium, óleos terapêuticos, cafés funcionais, bebidas comerciais e estoque no atacado — enviados para Antígua, Caribe, EUA, Canadá e América Latina.",
  },
  hero_cta_wellness: { en: "Browse Wellness", es: "Ver Bienestar", fr: "Voir Bien-être", pt: "Ver Bem-estar" },
  hero_cta_beverages: { en: "Browse Beverages", es: "Ver Bebidas", fr: "Voir Boissons", pt: "Ver Bebidas" },
  hero_cta_wholesale: { en: "Wholesale Catalog", es: "Catálogo Mayoreo", fr: "Catalogue Gros", pt: "Catálogo Atacado" },
  hero_cta_whatsapp: { en: "Contact via WhatsApp", es: "WhatsApp", fr: "WhatsApp", pt: "WhatsApp" },

  smart_title: {
    en: "What are you looking for today?",
    es: "¿Qué estás buscando hoy?",
    fr: "Que cherchez-vous aujourd'hui ?",
    pt: "O que você procura hoje?",
  },

  featured_title: {
    en: "Featured Products",
    es: "Productos Destacados",
    fr: "Produits Phares",
    pt: "Produtos em Destaque",
  },
  view_all: { en: "View all", es: "Ver todo", fr: "Voir tout", pt: "Ver tudo" },

  why_title: { en: "Why Noyis Africa", es: "Por qué Noyis Africa", fr: "Pourquoi Noyis Africa", pt: "Por que Noyis Africa" },
  why_distribution: {
    en: "Caribbean Distribution",
    es: "Distribución Caribeña",
    fr: "Distribution Caribéenne",
    pt: "Distribuição Caribenha",
  },
  why_premium: {
    en: "Premium Wellness Products",
    es: "Productos de Bienestar Premium",
    fr: "Produits de Bien-être Premium",
    pt: "Produtos de Bem-estar Premium",
  },
  why_wholesale: {
    en: "Wholesale Inventory",
    es: "Inventario al por Mayor",
    fr: "Stock en Gros",
    pt: "Estoque no Atacado",
  },
  why_shipping: {
    en: "International Shipping",
    es: "Envío Internacional",
    fr: "Expédition Internationale",
    pt: "Envio Internacional",
  },
  why_language: {
    en: "Multilingual Service",
    es: "Servicio Multilingüe",
    fr: "Service Multilingue",
    pt: "Atendimento Multilíngue",
  },

  product_benefits: { en: "Benefits", es: "Beneficios", fr: "Bienfaits", pt: "Benefícios" },
  product_ingredients: { en: "Ingredients", es: "Ingredientes", fr: "Ingrédients", pt: "Ingredientes" },
  product_usage: { en: "How to use", es: "Modo de uso", fr: "Mode d'emploi", pt: "Como usar" },
  product_warnings: { en: "Warnings", es: "Advertencias", fr: "Avertissements", pt: "Avisos" },
  product_origin: { en: "Origin", es: "Origen", fr: "Origine", pt: "Origem" },

  store_title: { en: "Visit Our Warehouse", es: "Visita Nuestro Almacén", fr: "Visitez Notre Entrepôt", pt: "Visite Nosso Armazém" },
  store_hours: { en: "Business hours", es: "Horario", fr: "Horaires", pt: "Horário" },
  store_call: { en: "Call", es: "Llamar", fr: "Appeler", pt: "Ligar" },
  store_directions: { en: "Get directions", es: "Cómo llegar", fr: "Itinéraire", pt: "Como chegar" },

  footer_tagline: { en: "Your Health, Our Priority", es: "Tu Salud, Nuestra Prioridad", fr: "Votre Santé, Notre Priorité", pt: "Sua Saúde, Nossa Prioridade" },

  whatsapp_intro: {
    en: "Hello Noyis Africa,\n\nI would like to order:",
    es: "Hola Noyis Africa,\n\nMe gustaría pedir:",
    fr: "Bonjour Noyis Africa,\n\nJe souhaite commander :",
    pt: "Olá Noyis Africa,\n\nGostaria de pedir:",
  },
  whatsapp_outro: {
    en: "\n\nPlease confirm availability and delivery options.\n\nThank you.",
    es: "\n\nPor favor confirmen disponibilidad y opciones de entrega.\n\nGracias.",
    fr: "\n\nMerci de confirmer la disponibilité et les options de livraison.\n\nMerci.",
    pt: "\n\nPor favor confirmem disponibilidade e opções de entrega.\n\nObrigado.",
  },
};

export function tr(key: keyof typeof t, lang: Lang): string {
  return t[key]?.[lang] ?? t[key]?.[DEFAULT_LANG] ?? key;
}
