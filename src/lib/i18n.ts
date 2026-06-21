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
  nav_guides: { en: "Guides", es: "Guías", fr: "Guides", pt: "Guias" },
  nav_treasure: { en: "Treasure Collection", es: "Colección Treasure", fr: "Collection Treasure", pt: "Coleção Treasure" },
  footer_pages: { en: "Pages", es: "Páginas", fr: "Pages", pt: "Páginas" },

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
  footer_disclaimer: {
    en: "Disclaimer: Noyis Africa products are traditional herbal wellness formulas designed to support overall vitality and are not intended to diagnose, treat, cure or prevent any disease. Consult a healthcare professional if you have a medical condition. Individual results may vary.",
    es: "Aviso: los productos Noyis Africa son fórmulas herbales tradicionales para apoyar el bienestar general y no están destinados a diagnosticar, tratar, curar ni prevenir ninguna enfermedad. Consulte a un profesional de la salud si tiene alguna condición. Los resultados individuales pueden variar.",
    fr: "Avertissement : les produits Noyis Africa sont des formules à base de plantes traditionnelles pour soutenir le bien-être général et ne sont pas destinés à diagnostiquer, traiter, guérir ou prévenir une maladie. Consultez un professionnel de santé. Les résultats individuels peuvent varier.",
    pt: "Aviso: os produtos Noyis Africa são fórmulas herbais tradicionais para apoiar o bem-estar geral e não se destinam a diagnosticar, tratar, curar ou prevenir qualquer doença. Consulte um profissional de saúde. Os resultados individuais podem variar.",
  },

  who_title: { en: "Who We Are", es: "Quiénes Somos", fr: "Qui Sommes-nous", pt: "Quem Somos" },
  who_body: {
    en: "Noyis Africa is a Caribbean-based wellness, beverage, wholesale and retail company headquartered in St. John's, Antigua. We serve customers and partners across Antigua & Barbuda, the wider Caribbean, North America and Latin America with traditional herbal wellness formulas, commercial beverages, wholesale supply and African-inspired cuisines.",
    es: "Noyis Africa es una empresa caribeña de bienestar, bebidas, mayoreo y retail con sede en St. John's, Antigua. Atendemos a clientes y socios en Antigua y Barbuda, el Caribe, Norteamérica y América Latina con fórmulas herbales tradicionales, bebidas comerciales, suministro al mayoreo y cocina de inspiración africana.",
    fr: "Noyis Africa est une entreprise caribéenne de bien-être, boissons, gros et retail basée à St. John's, Antigua. Nous servons clients et partenaires à Antigua-et-Barbuda, dans les Caraïbes, en Amérique du Nord et en Amérique latine avec des formules à base de plantes traditionnelles, des boissons commerciales, du gros et une cuisine d'inspiration africaine.",
    pt: "Noyis Africa é uma empresa caribenha de bem-estar, bebidas, atacado e varejo com sede em St. John's, Antígua. Atendemos clientes e parceiros em Antígua e Barbuda, no Caribe, América do Norte e América Latina com fórmulas herbais tradicionais, bebidas comerciais, fornecimento no atacado e culinária de inspiração africana.",
  },

  divisions_title: { en: "Our Divisions", es: "Nuestras Divisiones", fr: "Nos Divisions", pt: "Nossas Divisões" },
  div_wellness_title: { en: "Natural Wellness", es: "Bienestar Natural", fr: "Bien-être Naturel", pt: "Bem-estar Natural" },
  div_wellness_body: {
    en: "Traditional herbal wellness formulas including the Treasure line, wellness teas and botanical oils.",
    es: "Fórmulas herbales tradicionales, incluida la línea Treasure, tés de bienestar y aceites botánicos.",
    fr: "Formules traditionnelles à base de plantes, dont la gamme Treasure, tisanes et huiles botaniques.",
    pt: "Fórmulas herbais tradicionais, incluindo a linha Treasure, chás de bem-estar e óleos botânicos.",
  },
  div_beverages_title: { en: "Commercial Beverages", es: "Bebidas Comerciales", fr: "Boissons Commerciales", pt: "Bebidas Comerciais" },
  div_beverages_body: {
    en: "Caribbean and African-bottled soft drinks and bulk beverage supply for retailers and events.",
    es: "Refrescos embotellados en el Caribe y África y suministro al por mayor para tiendas y eventos.",
    fr: "Sodas embouteillés en Afrique et dans les Caraïbes, et fourniture en gros pour détaillants et événements.",
    pt: "Refrigerantes engarrafados no Caribe e na África e fornecimento a granel para varejistas e eventos.",
  },
  div_wholesale_title: { en: "Wholesale Distribution", es: "Distribución al Mayoreo", fr: "Distribution en Gros", pt: "Distribuição no Atacado" },
  div_wholesale_body: {
    en: "Retail and wholesale warehouse serving Antigua & Barbuda, the Caribbean, the US, Canada and Latin America.",
    es: "Almacén minorista y mayorista para Antigua y Barbuda, el Caribe, EE. UU., Canadá y América Latina.",
    fr: "Entrepôt de gros et retail desservant Antigua-et-Barbuda, les Caraïbes, les USA, le Canada et l'Amérique latine.",
    pt: "Armazém de atacado e varejo para Antígua e Barbuda, Caribe, EUA, Canadá e América Latina.",
  },
  div_cuisine_title: { en: "Noyis Africa Cuisines", es: "Cocina Noyis Africa", fr: "Cuisines Noyis Africa", pt: "Culinária Noyis Africa" },
  div_cuisine_body: {
    en: "Snack boxes, lunch packs, catering and African-inspired food offerings prepared in-house.",
    es: "Cajas de snacks, lunch packs, catering y propuestas gastronómicas de inspiración africana, preparadas en casa.",
    fr: "Boîtes snacks, lunch packs, traiteur et offres gastronomiques d'inspiration africaine, préparées en interne.",
    pt: "Snack boxes, lunch packs, catering e propostas gastronômicas de inspiração africana, preparadas internamente.",
  },

  experiences_title: { en: "Customer Experiences", es: "Experiencias de Clientes", fr: "Témoignages Clients", pt: "Experiências de Clientes" },
  experiences_sub: {
    en: "What our community across the Caribbean is sharing about Noyis Africa.",
    es: "Lo que nuestra comunidad en el Caribe comparte sobre Noyis Africa.",
    fr: "Ce que notre communauté caribéenne partage à propos de Noyis Africa.",
    pt: "O que a nossa comunidade pelo Caribe compartilha sobre a Noyis Africa.",
  },
  exp_1: {
    en: "\"Reliable wholesale partner. Orders ship on time and the Treasure line moves quickly in our store.\" — Retail partner, Antigua",
    es: "\"Socio mayorista confiable. Los pedidos llegan a tiempo y la línea Treasure se mueve rápido en nuestra tienda.\" — Socio minorista, Antigua",
    fr: "\"Partenaire de gros fiable. Les commandes arrivent à l'heure et la gamme Treasure se vend très vite.\" — Partenaire détaillant, Antigua",
    pt: "\"Parceiro de atacado confiável. Os pedidos chegam no prazo e a linha Treasure tem ótima saída.\" — Parceiro varejista, Antígua",
  },
  exp_2: {
    en: "\"Friendly staff at the Lower Nevis Street store and quick WhatsApp ordering. We restock for our café every month.\" — Café owner, St. John's",
    es: "\"Equipo amable en la tienda de Lower Nevis Street y pedidos rápidos por WhatsApp. Reabastecemos cada mes.\" — Dueño de café, St. John's",
    fr: "\"Équipe accueillante à la boutique de Lower Nevis Street et commandes rapides sur WhatsApp. Nous nous réapprovisionnons chaque mois.\" — Propriétaire de café, St. John's",
    pt: "\"Equipe simpática na loja da Lower Nevis Street e pedidos rápidos pelo WhatsApp. Reabastecemos todo mês.\" — Dono de café, St. John's",
  },
  exp_3: {
    en: "\"Love that everything feels natural and well sourced. The Treasure herbal line is part of our family wellness routine.\" — Customer, Caribbean",
    es: "\"Me encanta que todo se sienta natural y bien seleccionado. La línea Treasure es parte del bienestar de mi familia.\" — Cliente, Caribe",
    fr: "\"J'adore le côté naturel et bien sourcé. La gamme Treasure fait partie de notre routine bien-être familiale.\" — Cliente, Caraïbes",
    pt: "\"Amo que tudo é natural e bem selecionado. A linha Treasure faz parte da rotina de bem-estar da família.\" — Cliente, Caribe",
  },

  whatsapp_intro: {
    en: "Hello Noyis Africa,\n\nI'd like to place an order for:",
    es: "Hola Noyis Africa,\n\nMe gustaría hacer un pedido de:",
    fr: "Bonjour Noyis Africa,\n\nJe souhaite passer commande pour :",
    pt: "Olá Noyis Africa,\n\nGostaria de fazer um pedido de:",
  },
  whatsapp_outro: {
    en: "\n\nPlease send me the total price for these items and the available delivery options.\n\nThank you!",
    es: "\n\n¿Podrían enviarme el precio total y las opciones de entrega disponibles?\n\n¡Gracias!",
    fr: "\n\nMerci de m'indiquer le prix total et les options de livraison disponibles.\n\nMerci !",
    pt: "\n\nPor favor, me enviem o preço total e as opções de entrega disponíveis.\n\nObrigado!",
  },
  price_on_request: {
    en: "Price confirmed on order",
    es: "Precio confirmado al pedir",
    fr: "Prix confirmé à la commande",
    pt: "Preço confirmado no pedido",
  },
  request_quote: {
    en: "Request Quote on WhatsApp",
    es: "Solicitar precio por WhatsApp",
    fr: "Demander un devis sur WhatsApp",
    pt: "Solicitar orçamento no WhatsApp",
  },
  cart_quote_note: {
    en: "We'll confirm the total price and delivery options with you on WhatsApp.",
    es: "Confirmaremos el precio total y las opciones de entrega por WhatsApp.",
    fr: "Nous confirmerons le prix total et la livraison sur WhatsApp.",
    pt: "Confirmaremos o preço total e a entrega pelo WhatsApp.",
  },

  carn_eyebrow: {
    en: "Antigua Carnival 2026 · Jul 25 – Aug 4",
    es: "Carnaval de Antigua 2026 · 25 jul – 4 ago",
    fr: "Carnaval d'Antigua 2026 · 25 juil – 4 août",
    pt: "Carnaval de Antígua 2026 · 25 jul – 4 ago",
  },
  carn_s1_title: {
    en: "Feel the Rhythm. Power Your Day.",
    es: "Siente el Ritmo. Energiza tu Día.",
    fr: "Ressentez le Rythme. Boostez votre Journée.",
    pt: "Sinta o Ritmo. Energize seu Dia.",
  },
  carn_s1_sub: {
    en: "Get ready for the road with Treasure Man and Treasure Woman — herbal wellness formulas crafted to support everyday vitality from T-Shirt Mas to Last Lap.",
    es: "Prepárate para la ruta con Treasure Man y Treasure Woman — fórmulas herbales para apoyar la vitalidad diaria desde T-Shirt Mas hasta Last Lap.",
    fr: "Préparez-vous pour la route avec Treasure Man et Treasure Woman — formules à base de plantes pour soutenir la vitalité quotidienne, du T-Shirt Mas au Last Lap.",
    pt: "Prepare-se para a estrada com Treasure Man e Treasure Woman — fórmulas herbais para apoiar a vitalidade diária do T-Shirt Mas ao Last Lap.",
  },
  carn_s1_cta: {
    en: "Shop the Wellness Line",
    es: "Comprar la Línea de Bienestar",
    fr: "Voir la Gamme Bien-être",
    pt: "Comprar a Linha de Bem-estar",
  },
  carn_s2_title: {
    en: "Refresh & Reset After Carnival.",
    es: "Renueva y Recupera Después del Carnaval.",
    fr: "Renouvelez-vous Après le Carnaval.",
    pt: "Renove-se Após o Carnaval.",
  },
  carn_s2_sub: {
    en: "Wash off the paint, the powder and the long nights. Rehydrate and feel refreshed with Treasure Herbs and our daily herbal wellness blends.",
    es: "Quita la pintura, el polvo y el cansancio del festival. Rehidrátate y siéntete renovado con Treasure Herbs y nuestras mezclas herbales diarias.",
    fr: "Éliminez peinture, poudre et fatigue du festival. Réhydratez-vous et sentez-vous frais avec Treasure Herbs et nos mélanges quotidiens.",
    pt: "Lave a tinta, o pó e o cansaço do festival. Reidrate-se e sinta-se renovado com Treasure Herbs e nossas misturas herbais diárias.",
  },
  carn_s2_cta: {
    en: "Browse Wellness Teas",
    es: "Ver Tés de Bienestar",
    fr: "Voir les Tisanes Bien-être",
    pt: "Ver Chás de Bem-estar",
  },
  carn_s3_kicker: {
    en: "Lower Nevis Street, St. John's",
    es: "Lower Nevis Street, St. John's",
    fr: "Lower Nevis Street, St. John's",
    pt: "Lower Nevis Street, St. John's",
  },
  carn_s3_title: {
    en: "Stock Up Locally in St. John's.",
    es: "Abastécete Localmente en St. John's.",
    fr: "Faites le Plein à St. John's.",
    pt: "Abasteça-se Localmente em St. John's.",
  },
  carn_s3_sub: {
    en: "By Cherry Jamdon Club. Pop in before Carnival City or tap to order on WhatsApp for quick regional delivery.",
    es: "Junto a Cherry Jamdon Club. Pasa antes de Carnival City o pide por WhatsApp para entrega regional rápida.",
    fr: "Près du Cherry Jamdon Club. Passez avant Carnival City ou commandez sur WhatsApp pour une livraison régionale rapide.",
    pt: "Ao lado do Cherry Jamdon Club. Passe antes da Carnival City ou peça pelo WhatsApp para entrega regional rápida.",
  },
  carn_s3_cta: {
    en: "Message to Order Instantly",
    es: "Pedir al instante por WhatsApp",
    fr: "Commander sur WhatsApp",
    pt: "Pedir já pelo WhatsApp",
  },
  carn_s3_directions: {
    en: "Get directions",
    es: "Cómo llegar",
    fr: "Itinéraire",
    pt: "Como chegar",
  },
  carn_grounding: {
    en: "Crafted with Caribbean and African botanicals for everyday hydration and wellness support.",
    es: "Elaborado con botánicos del Caribe y África para apoyar la hidratación y el bienestar diario.",
    fr: "Élaboré avec des plantes des Caraïbes et d'Afrique pour soutenir l'hydratation et le bien-être au quotidien.",
    pt: "Elaborado com botânicos do Caribe e da África para apoiar a hidratação e o bem-estar diário.",
  },

  slide1_title: {
    en: "Your Health, Our Priority",
    es: "Tu Salud, Nuestra Prioridad",
    fr: "Votre Santé, Notre Priorité",
    pt: "Sua Saúde, Nossa Prioridade",
  },
  slide1_sub: {
    en: "Experience 100% pure natural Caribbean distribution and premium holistic wellness formulas inspired by nature.",
    es: "Vive la distribución 100% natural caribeña y fórmulas holísticas premium inspiradas en la naturaleza.",
    fr: "Découvrez la distribution caribéenne 100% naturelle et nos formules holistiques premium inspirées par la nature.",
    pt: "Experimente a distribuição caribenha 100% natural e fórmulas holísticas premium inspiradas na natureza.",
  },
  slide1_cta: {
    en: "Explore Our Story",
    es: "Conoce Nuestra Historia",
    fr: "Découvrir Notre Histoire",
    pt: "Conheça Nossa História",
  },
  slide1_alt: {
    en: "Noyis Africa natural wellness in Saint John, Antigua — Treasure Man, Treasure Herbs, Treasure Woman",
    es: "Noyis Africa bienestar natural en Saint John, Antigua",
    fr: "Noyis Africa bien-être naturel à Saint John, Antigua",
    pt: "Noyis Africa bem-estar natural em Saint John, Antígua",
  },

  slide2_title: {
    en: "Feel the Rhythm. Power Your Day.",
    es: "Siente el Ritmo. Energiza tu Día.",
    fr: "Ressentez le Rythme. Boostez votre Journée.",
    pt: "Sinta o Ritmo. Energize seu Dia.",
  },
  slide2_sub: {
    en: "Get ready for the road with Treasure Man, Treasure Herbs and Treasure Woman — traditional herbal wellness formulas crafted to support everyday vitality from T-Shirt Mas to Last Lap.",
    es: "Prepárate para la ruta con Treasure Man, Treasure Herbs y Treasure Woman — fórmulas herbales tradicionales para apoyar la vitalidad diaria desde T-Shirt Mas hasta Last Lap.",
    fr: "Préparez-vous pour la route avec Treasure Man, Treasure Herbs et Treasure Woman — formules traditionnelles à base de plantes pour soutenir la vitalité quotidienne, du T-Shirt Mas au Last Lap.",
    pt: "Prepare-se para a estrada com Treasure Man, Treasure Herbs e Treasure Woman — fórmulas herbais tradicionais para apoiar a vitalidade diária do T-Shirt Mas ao Last Lap.",
  },
  slide2_cta: {
    en: "Shop the Wellness Line",
    es: "Comprar la Línea de Bienestar",
    fr: "Voir la Gamme Bien-être",
    pt: "Comprar a Linha de Bem-estar",
  },
  slide2_alt: {
    en: "Antigua Carnival 2026 wellness essentials — Treasure Man, Treasure Herbs and Treasure Woman herbal bottles",
    es: "Esenciales de bienestar para el Carnaval de Antigua 2026 — botellas Treasure",
    fr: "Essentiels bien-être pour le Carnaval d'Antigua 2026 — flacons Treasure",
    pt: "Essenciais de bem-estar para o Carnaval de Antígua 2026 — frascos Treasure",
  },

  slide3_title: {
    en: "Refresh & Reset After Carnival.",
    es: "Renueva y Recupera Después del Carnaval.",
    fr: "Renouvelez-vous Après le Carnaval.",
    pt: "Renove-se Após o Carnaval.",
  },
  slide3_sub: {
    en: "Wash away the paint, the powder and the long nights. Rehydrate your system and feel refreshed with our daily herbal wellness formulas.",
    es: "Quita la pintura, el polvo y el cansancio del festival. Rehidrátate y siéntete renovado con nuestras fórmulas herbales diarias.",
    fr: "Éliminez peinture, poudre et fatigue du festival. Réhydratez-vous et sentez-vous frais avec nos formules à base de plantes du quotidien.",
    pt: "Lave a tinta, o pó e o cansaço do festival. Reidrate-se e sinta-se renovado com nossas fórmulas herbais diárias.",
  },
  slide3_cta: {
    en: "Browse Wellness Blends",
    es: "Ver Mezclas de Bienestar",
    fr: "Voir les Mélanges Bien-être",
    pt: "Ver Misturas de Bem-estar",
  },
  slide3_alt: {
    en: "Antigua Carnival 2026 wellness essentials — Treasure Man herbal hydration",
    es: "Bienestar para el Carnaval de Antigua 2026 — Treasure Man hidratación",
    fr: "Bien-être pour le Carnaval d'Antigua 2026 — Treasure Man hydratation",
    pt: "Bem-estar para o Carnaval de Antígua 2026 — Treasure Man hidratação",
  },

  slide4_title: {
    en: "A Rare Taste You've Likely Never Experienced.",
    es: "Un Sabor Único Que Probablemente Nunca Has Probado.",
    fr: "Un Goût Rare Que Vous N'avez Probablement Jamais Connu.",
    pt: "Um Sabor Raro Que Você Provavelmente Nunca Provou.",
  },
  slide4_sub: {
    en: "This isn't your standard soda — discover the uniquely crisp, rich flavor of real African-bottled Coca-Cola. A refreshing, one-in-a-million formulation available right here in the Caribbean.",
    es: "No es una soda común — descubre el sabor único y refrescante de la auténtica Coca-Cola embotellada en África, disponible aquí en el Caribe.",
    fr: "Ce n'est pas un soda ordinaire — découvrez le goût unique et rafraîchissant du vrai Coca-Cola embouteillé en Afrique, disponible dans les Caraïbes.",
    pt: "Não é um refrigerante comum — descubra o sabor único e refrescante da autêntica Coca-Cola engarrafada na África, disponível no Caribe.",
  },
  slide4_cta: {
    en: "Order African Coke Instantly",
    es: "Pide la Coca Africana ya",
    fr: "Commander le Coca Africain",
    pt: "Pedir Coca Africana Já",
  },
  slide4_alt: {
    en: "Exclusive African Coca-Cola bulk case wholesale in Antigua — EC$60 per 24-can case",
    es: "Coca-Cola africana exclusiva al por mayor en Antigua",
    fr: "Coca-Cola africain exclusif en gros à Antigua",
    pt: "Coca-Cola africana exclusiva no atacado em Antígua",
  },

  slide5_title: {
    en: "Stock Up Locally in St. John's!",
    es: "¡Abastécete Localmente en St. John's!",
    fr: "Faites le Plein à St. John's !",
    pt: "Abasteça-se Localmente em St. John's!",
  },
  slide5_sub: {
    en: "Located on Lower Nevis Street, right by Cherry Jamdon Club. Pop into our Antigua store before heading to Carnival City, or order via WhatsApp for seamless distribution.",
    es: "En Lower Nevis Street, junto a Cherry Jamdon Club. Visita nuestra tienda en Antigua antes de Carnival City, o pide por WhatsApp.",
    fr: "Situé sur Lower Nevis Street, près du Cherry Jamdon Club. Passez à notre boutique d'Antigua avant Carnival City, ou commandez sur WhatsApp.",
    pt: "Na Lower Nevis Street, ao lado do Cherry Jamdon Club. Visite nossa loja em Antígua antes da Carnival City, ou peça pelo WhatsApp.",
  },
  slide5_cta: {
    en: "Message to Order on WhatsApp",
    es: "Pedir por WhatsApp",
    fr: "Commander sur WhatsApp",
    pt: "Pedir pelo WhatsApp",
  },
  slide5_alt: {
    en: "Noyis Africa wholesale & retail warehouse on Lower Nevis Street, Saint John, Antigua",
    es: "Almacén Noyis Africa en Lower Nevis Street, Saint John, Antigua",
    fr: "Entrepôt Noyis Africa sur Lower Nevis Street, Saint John, Antigua",
    pt: "Armazém Noyis Africa na Lower Nevis Street, Saint John, Antígua",
  },
};

export function tr(key: keyof typeof t, lang: Lang): string {
  return t[key]?.[lang] ?? t[key]?.[DEFAULT_LANG] ?? key;
}
