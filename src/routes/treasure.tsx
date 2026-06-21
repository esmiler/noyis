import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Leaf,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { useLang } from "@/components/lang-context";
import { type Lang } from "@/lib/i18n";
import lineup from "@/assets/treasure-lineup-funnel.png.asset.json";
import treasureMan from "@/assets/treasure-man-funnel.png.asset.json";
import treasureWoman from "@/assets/treasure-woman-funnel.png.asset.json";
import treasureHerbs from "@/assets/treasure-herbs-funnel.png.asset.json";

const CANONICAL = "https://noyisafrica.com/treasure";
const TITLE = "Treasure Collection — Premium Organic Wellness by Noyis Africa";
const DESCRIPTION =
  "Explore the Treasure Collection by Noyis Africa — Treasure Man, Treasure Woman, and Treasure Herbs. A dedicated page for premium organic wellness formulas presented with a refined brand standard and direct WhatsApp ordering.";

type L = Record<Lang, string>;
type LArr = Record<Lang, string[]>;

const tx = (v: L, lang: Lang) => v[lang] ?? v.en;
const txArr = (v: LArr, lang: Lang) => v[lang] ?? v.en;

const PRODUCTS: ReadonlyArray<{
  slug: string;
  name: string;
  image: string;
  eyebrow: L;
  headline: L;
  description: L;
  benefits: LArr;
  formula: LArr;
  whatsapp: L;
}> = [
  {
    slug: "treasure-man",
    name: "Treasure Man",
    image: treasureMan.url,
    eyebrow: {
      en: "Men's vitality support",
      es: "Vitalidad masculina",
      fr: "Vitalité masculine",
      pt: "Vitalidade masculina",
    },
    headline: {
      en: "A refined daily formula for stamina, confidence, and male vitality.",
      es: "Una fórmula diaria refinada para resistencia, confianza y vitalidad masculina.",
      fr: "Une formule quotidienne raffinée pour l'endurance, la confiance et la vitalité masculine.",
      pt: "Uma fórmula diária refinada para resistência, confiança e vitalidade masculina.",
    },
    description: {
      en: "Treasure Man is positioned as a premium herbal wellness formula for men who value consistency, strength, and everyday performance. It is presented for customers seeking a plant-based addition to a disciplined lifestyle, with a brand focus on quality handling, premium presentation, and dependable customer care.",
      es: "Treasure Man se presenta como una fórmula herbal premium para hombres que valoran la constancia, la fuerza y el rendimiento diario. Está pensada para clientes que buscan una opción a base de plantas dentro de un estilo de vida disciplinado, con un enfoque de marca en el cuidado, la presentación premium y un servicio confiable.",
      fr: "Treasure Man est une formule à base de plantes premium pour les hommes qui privilégient la constance, la force et la performance au quotidien. Pensée pour les clients en quête d'un complément végétal à un mode de vie discipliné, avec une exigence de qualité, de présentation soignée et d'un service client fiable.",
      pt: "Treasure Man é uma fórmula herbal premium para homens que valorizam constância, força e desempenho no dia a dia. Pensada para clientes que buscam uma opção à base de plantas em um estilo de vida disciplinado, com foco em qualidade, apresentação premium e atendimento confiável.",
    },
    benefits: {
      en: [
        "Supports everyday vitality and active-lifestyle stamina",
        "Designed for men seeking a premium plant-based wellness option",
        "Presented as part of a disciplined, confidence-led routine",
        "Backed by the Noyis Africa standard for careful handling and presentation",
      ],
      es: [
        "Apoya la vitalidad diaria y la resistencia para un estilo de vida activo",
        "Diseñado para hombres que buscan una opción premium a base de plantas",
        "Pensado como parte de una rutina disciplinada y con confianza",
        "Respaldado por el estándar Noyis Africa de cuidado y presentación",
      ],
      fr: [
        "Soutient la vitalité quotidienne et l'endurance d'un mode de vie actif",
        "Conçu pour les hommes qui veulent une option végétale premium",
        "S'inscrit dans une routine disciplinée et porteuse de confiance",
        "Soutenu par le standard Noyis Africa de soin et de présentation",
      ],
      pt: [
        "Apoia a vitalidade diária e a resistência de um estilo de vida ativo",
        "Pensado para homens que buscam uma opção premium à base de plantas",
        "Faz parte de uma rotina disciplinada e cheia de confiança",
        "Sustentado pelo padrão Noyis Africa de cuidado e apresentação",
      ],
    },
    formula: {
      en: [
        "Plant-based herbal wellness blend",
        "Naturally inspired botanical profile",
        "Prepared for customers who prefer organic-forward wellness choices",
        "Full label and ordering guidance available on request via WhatsApp",
      ],
      es: [
        "Mezcla herbal de bienestar a base de plantas",
        "Perfil botánico de inspiración natural",
        "Pensado para clientes que prefieren opciones orgánicas",
        "Etiqueta completa y guía de pedido disponibles por WhatsApp",
      ],
      fr: [
        "Mélange bien-être à base de plantes",
        "Profil botanique d'inspiration naturelle",
        "Pensé pour les clients qui privilégient les choix bio",
        "Étiquette complète et conseils de commande disponibles sur WhatsApp",
      ],
      pt: [
        "Mistura herbal de bem-estar à base de plantas",
        "Perfil botânico de inspiração natural",
        "Pensado para clientes que preferem opções orgânicas",
        "Rótulo completo e orientação de pedido disponíveis pelo WhatsApp",
      ],
    },
    whatsapp: {
      en: "Hello, I would like to place an order for Treasure Man. Please share availability and the best purchase option.",
      es: "Hola, me gustaría hacer un pedido de Treasure Man. ¿Podrían indicarme disponibilidad y la mejor opción de compra?",
      fr: "Bonjour, je souhaite commander Treasure Man. Pouvez-vous m'indiquer la disponibilité et la meilleure option d'achat ?",
      pt: "Olá, gostaria de fazer um pedido de Treasure Man. Podem me informar a disponibilidade e a melhor opção de compra?",
    },
  },
  {
    slug: "treasure-woman",
    name: "Treasure Woman",
    image: treasureWoman.url,
    eyebrow: {
      en: "Women's wellness support",
      es: "Bienestar femenino",
      fr: "Bien-être féminin",
      pt: "Bem-estar feminino",
    },
    headline: {
      en: "A polished herbal formula created to support feminine balance and everyday wellness.",
      es: "Una fórmula herbal cuidada para apoyar el equilibrio femenino y el bienestar diario.",
      fr: "Une formule à base de plantes soignée pour soutenir l'équilibre féminin et le bien-être quotidien.",
      pt: "Uma fórmula herbal cuidada para apoiar o equilíbrio feminino e o bem-estar diário.",
    },
    description: {
      en: "Treasure Woman is presented as a premium wellness companion for women who want a graceful, plant-based formula that fits naturally into modern routines. The product is positioned with a focus on feminine vitality, brand care, and premium-quality presentation for customers who value both wellness and trust.",
      es: "Treasure Woman es un compañero de bienestar premium para mujeres que buscan una fórmula a base de plantas elegante y fácil de integrar en rutinas modernas. Se enfoca en la vitalidad femenina, el cuidado de marca y una presentación de calidad premium.",
      fr: "Treasure Woman est un compagnon bien-être premium pour les femmes qui veulent une formule végétale élégante, intégrée naturellement à leurs routines modernes. Vitalité féminine, soin de la marque et présentation haut de gamme.",
      pt: "Treasure Woman é um companheiro de bem-estar premium para mulheres que querem uma fórmula vegetal elegante e fácil de integrar nas rotinas modernas. Foco em vitalidade feminina, cuidado de marca e apresentação premium.",
    },
    benefits: {
      en: [
        "Supports feminine wellness and daily balance",
        "Plant-based positioning for customers who prefer natural lifestyle options",
        "Suitable for a polished, premium self-care routine",
        "Delivered with the same quality-led Noyis Africa brand standard",
      ],
      es: [
        "Apoya el bienestar femenino y el equilibrio diario",
        "Opción a base de plantas para un estilo de vida natural",
        "Ideal para una rutina de autocuidado premium",
        "Con el estándar de calidad de la marca Noyis Africa",
      ],
      fr: [
        "Soutient le bien-être féminin et l'équilibre quotidien",
        "Option végétale pour un mode de vie naturel",
        "Adapté à une routine de soin de soi haut de gamme",
        "Au standard qualité de la marque Noyis Africa",
      ],
      pt: [
        "Apoia o bem-estar feminino e o equilíbrio diário",
        "Opção à base de plantas para um estilo de vida natural",
        "Ideal para uma rotina de autocuidado premium",
        "Com o padrão de qualidade da marca Noyis Africa",
      ],
    },
    formula: {
      en: [
        "Botanical wellness blend for women",
        "Naturally derived plant-based profile",
        "Organic-forward sourcing and presentation standard",
        "Full label and ordering guidance available on request via WhatsApp",
      ],
      es: [
        "Mezcla botánica de bienestar para mujeres",
        "Perfil a base de plantas de origen natural",
        "Estándar orgánico de aprovisionamiento y presentación",
        "Etiqueta completa y guía de pedido por WhatsApp",
      ],
      fr: [
        "Mélange botanique bien-être pour femmes",
        "Profil végétal d'origine naturelle",
        "Approvisionnement et présentation à orientation bio",
        "Étiquette complète et conseils de commande sur WhatsApp",
      ],
      pt: [
        "Mistura botânica de bem-estar para mulheres",
        "Perfil vegetal de origem natural",
        "Padrão de origem e apresentação orgânica",
        "Rótulo completo e orientação de pedido pelo WhatsApp",
      ],
    },
    whatsapp: {
      en: "Hello, I would like to place an order for Treasure Woman. Please share availability and the best purchase option.",
      es: "Hola, me gustaría hacer un pedido de Treasure Woman. ¿Podrían indicarme disponibilidad y la mejor opción de compra?",
      fr: "Bonjour, je souhaite commander Treasure Woman. Pouvez-vous m'indiquer la disponibilité et la meilleure option d'achat ?",
      pt: "Olá, gostaria de fazer um pedido de Treasure Woman. Podem me informar a disponibilidade e a melhor opção de compra?",
    },
  },
  {
    slug: "treasure-herbs",
    name: "Treasure Herbs",
    image: treasureHerbs.url,
    eyebrow: {
      en: "Daily herbal support",
      es: "Apoyo herbal diario",
      fr: "Soutien à base de plantes au quotidien",
      pt: "Apoio herbal diário",
    },
    headline: {
      en: "A versatile herbal wellness formula designed for broad everyday support.",
      es: "Una fórmula herbal versátil diseñada para un apoyo diario amplio.",
      fr: "Une formule à base de plantes polyvalente conçue pour un soutien quotidien large.",
      pt: "Uma fórmula herbal versátil para um apoio diário amplo.",
    },
    description: {
      en: "Treasure Herbs sits at the center of the collection as a practical, everyday herbal option for customers who want a dependable wellness staple. It is presented as an accessible formula within a premium brand system — cleanly packaged, carefully handled, and aligned with the Noyis Africa organic-first promise.",
      es: "Treasure Herbs es el centro de la colección: una opción herbal práctica y diaria, presentada como una fórmula accesible dentro de un sistema de marca premium, con cuidado y alineada con la promesa orgánica de Noyis Africa.",
      fr: "Treasure Herbs est au cœur de la collection : une option à base de plantes pratique et quotidienne, accessible dans un univers de marque premium, soigneusement préparée et alignée sur la promesse bio de Noyis Africa.",
      pt: "Treasure Herbs está no centro da coleção: uma opção herbal prática e diária, apresentada como fórmula acessível dentro de um sistema de marca premium, cuidadosamente preparada e alinhada à promessa orgânica da Noyis Africa.",
    },
    benefits: {
      en: [
        "Supports a consistent herbal wellness routine",
        "Suitable for customers seeking an everyday plant-based option",
        "Presented as a practical foundation within the Treasure line",
        "Handled and delivered with premium brand care",
      ],
      es: [
        "Apoya una rutina herbal constante",
        "Ideal para clientes que buscan una opción diaria a base de plantas",
        "Base práctica dentro de la línea Treasure",
        "Gestionado y entregado con cuidado de marca premium",
      ],
      fr: [
        "Soutient une routine bien-être à base de plantes régulière",
        "Adapté aux clients en quête d'une option végétale quotidienne",
        "Base pratique au sein de la gamme Treasure",
        "Préparé et livré avec le soin d'une marque premium",
      ],
      pt: [
        "Apoia uma rotina herbal constante",
        "Ideal para quem busca uma opção diária à base de plantas",
        "Base prática dentro da linha Treasure",
        "Preparado e entregue com cuidado de marca premium",
      ],
    },
    formula: {
      en: [
        "General herbal wellness blend",
        "Naturally inspired botanical composition",
        "Organic-forward product positioning for daily use",
        "Full label and ordering guidance available on request via WhatsApp",
      ],
      es: [
        "Mezcla herbal de bienestar general",
        "Composición botánica de inspiración natural",
        "Posicionamiento orgánico para uso diario",
        "Etiqueta completa y guía de pedido por WhatsApp",
      ],
      fr: [
        "Mélange bien-être à base de plantes polyvalent",
        "Composition botanique d'inspiration naturelle",
        "Positionnement bio pour un usage quotidien",
        "Étiquette complète et conseils de commande sur WhatsApp",
      ],
      pt: [
        "Mistura herbal de bem-estar geral",
        "Composição botânica de inspiração natural",
        "Posicionamento orgânico para uso diário",
        "Rótulo completo e orientação de pedido pelo WhatsApp",
      ],
    },
    whatsapp: {
      en: "Hello, I would like to place an order for Treasure Herbs. Please share availability and the best purchase option.",
      es: "Hola, me gustaría hacer un pedido de Treasure Herbs. ¿Podrían indicarme disponibilidad y la mejor opción de compra?",
      fr: "Bonjour, je souhaite commander Treasure Herbs. Pouvez-vous m'indiquer la disponibilité et la meilleure option d'achat ?",
      pt: "Olá, gostaria de fazer um pedido de Treasure Herbs. Podem me informar a disponibilidade e a melhor opção de compra?",
    },
  },
];

const FAQS: ReadonlyArray<{ q: L; a: L }> = [
  {
    q: {
      en: "What is the Treasure Collection by Noyis Africa?",
      es: "¿Qué es la Colección Treasure de Noyis Africa?",
      fr: "Qu'est-ce que la Collection Treasure de Noyis Africa ?",
      pt: "O que é a Coleção Treasure da Noyis Africa?",
    },
    a: {
      en: "The Treasure Collection is a focused line of premium herbal wellness products under the Noyis Africa brand, featuring Treasure Man, Treasure Woman, and Treasure Herbs. The line is presented as an organic-forward wellness offering with a strong emphasis on brand trust, careful handling, and direct customer support.",
      es: "La Colección Treasure es una línea premium de productos herbales de bienestar de la marca Noyis Africa: Treasure Man, Treasure Woman y Treasure Herbs. Se presenta con un enfoque orgánico, énfasis en la confianza de marca, el cuidado y un servicio directo al cliente.",
      fr: "La Collection Treasure est une gamme premium de produits bien-être à base de plantes de la marque Noyis Africa : Treasure Man, Treasure Woman et Treasure Herbs. Présentée avec une orientation bio, un fort accent sur la confiance, le soin et un service client direct.",
      pt: "A Coleção Treasure é uma linha premium de produtos herbais de bem-estar da marca Noyis Africa: Treasure Man, Treasure Woman e Treasure Herbs. Apresentada com foco orgânico, ênfase em confiança de marca, cuidado e atendimento direto ao cliente.",
    },
  },
  {
    q: {
      en: "Are the Treasure products positioned as organic and non-GMO?",
      es: "¿Los productos Treasure se presentan como orgánicos y sin transgénicos?",
      fr: "Les produits Treasure sont-ils présentés comme bio et sans OGM ?",
      pt: "Os produtos Treasure são apresentados como orgânicos e sem transgênicos?",
    },
    a: {
      en: "Yes. This page presents the Treasure line within the broader Noyis Africa organic-first brand standard, with an emphasis on natural, plant-based, and non-GMO-conscious positioning across the brand's wellness offerings.",
      es: "Sí. La línea Treasure se presenta dentro del estándar orgánico de la marca Noyis Africa, con un enfoque natural, a base de plantas y consciente con los transgénicos.",
      fr: "Oui. La gamme Treasure s'inscrit dans le standard bio de la marque Noyis Africa, avec une orientation naturelle, végétale et attentive aux OGM.",
      pt: "Sim. A linha Treasure é apresentada dentro do padrão orgânico da marca Noyis Africa, com posicionamento natural, à base de plantas e consciente quanto a transgênicos.",
    },
  },
  {
    q: {
      en: "Can I order directly through WhatsApp?",
      es: "¿Puedo pedir directamente por WhatsApp?",
      fr: "Puis-je commander directement via WhatsApp ?",
      pt: "Posso fazer pedidos diretamente pelo WhatsApp?",
    },
    a: {
      en: "Yes. Each product section includes a direct WhatsApp action so interested buyers can request availability, ordering details, and product guidance immediately.",
      es: "Sí. Cada sección de producto incluye un botón directo de WhatsApp para consultar disponibilidad, detalles del pedido y orientación.",
      fr: "Oui. Chaque section produit propose un bouton WhatsApp direct pour demander disponibilité, détails de commande et conseils.",
      pt: "Sim. Cada seção de produto tem um botão direto de WhatsApp para consultar disponibilidade, detalhes do pedido e orientação.",
    },
  },
  {
    q: {
      en: "Does this page replace the home page?",
      es: "¿Esta página reemplaza la página de inicio?",
      fr: "Cette page remplace-t-elle la page d'accueil ?",
      pt: "Esta página substitui a página inicial?",
    },
    a: {
      en: "No. This is a standalone page dedicated to the Treasure line. The main home page remains separate and continues to serve as the primary entry point to the broader Noyis Africa brand.",
      es: "No. Es una página independiente dedicada a la línea Treasure. La página de inicio principal sigue siendo la entrada principal a la marca Noyis Africa.",
      fr: "Non. C'est une page autonome dédiée à la gamme Treasure. La page d'accueil principale reste l'entrée principale de la marque Noyis Africa.",
      pt: "Não. É uma página independente dedicada à linha Treasure. A página inicial principal continua sendo a entrada principal da marca Noyis Africa.",
    },
  },
];

const UI = {
  hero_badge: {
    en: "Premium Organic Wellness Line",
    es: "Línea Premium de Bienestar Orgánico",
    fr: "Gamme Bien-être Bio Premium",
    pt: "Linha Premium de Bem-estar Orgânico",
  } satisfies L,
  hero_title: {
    en: "Treasure Man, Treasure Woman & Treasure Herbs",
    es: "Treasure Man, Treasure Woman y Treasure Herbs",
    fr: "Treasure Man, Treasure Woman et Treasure Herbs",
    pt: "Treasure Man, Treasure Woman e Treasure Herbs",
  } satisfies L,
  hero_sub: {
    en: "Discover a dedicated page for the Treasure line — a premium Noyis Africa collection presented with a stronger corporate voice, a cleaner wellness standard, and direct paths to purchase. This collection is positioned for customers who value organic-forward, plant-based, non-GMO-conscious products handled with care from presentation to delivery.",
    es: "Descubre una página dedicada a la línea Treasure: una colección premium de Noyis Africa presentada con una voz más corporativa, un estándar de bienestar más limpio y rutas directas de compra. Pensada para clientes que valoran productos orgánicos, a base de plantas y conscientes con los transgénicos, cuidados desde la presentación hasta la entrega.",
    fr: "Découvrez une page dédiée à la gamme Treasure : une collection premium de Noyis Africa avec une voix plus corporate, un standard bien-être plus net et un parcours d'achat direct. Pensée pour les clients qui recherchent des produits bio, végétaux, attentifs aux OGM, soignés de la présentation à la livraison.",
    pt: "Descubra uma página dedicada à linha Treasure: uma coleção premium da Noyis Africa apresentada com voz mais corporativa, padrão de bem-estar mais limpo e caminhos diretos de compra. Pensada para clientes que valorizam produtos orgânicos, à base de plantas e conscientes quanto a transgênicos, cuidados da apresentação à entrega.",
  } satisfies L,
  cta_order_whatsapp: {
    en: "Order via WhatsApp",
    es: "Pedir por WhatsApp",
    fr: "Commander via WhatsApp",
    pt: "Pedir pelo WhatsApp",
  } satisfies L,
  cta_browse_wellness: {
    en: "Browse wellness products",
    es: "Ver productos de bienestar",
    fr: "Voir les produits bien-être",
    pt: "Ver produtos de bem-estar",
  } satisfies L,
  hero_whatsapp_msg: {
    en: "Hello, I am interested in the Treasure Collection. Please share availability and ordering details.",
    es: "Hola, me interesa la Colección Treasure. ¿Podrían indicarme disponibilidad y detalles de pedido?",
    fr: "Bonjour, je m'intéresse à la Collection Treasure. Pouvez-vous m'indiquer la disponibilité et les détails de commande ?",
    pt: "Olá, tenho interesse na Coleção Treasure. Podem me informar a disponibilidade e os detalhes do pedido?",
  } satisfies L,
  brand_eyebrow: {
    en: "Brand standard",
    es: "Estándar de marca",
    fr: "Standard de marque",
    pt: "Padrão de marca",
  } satisfies L,
  brand_title: {
    en: "An organic-first Noyis Africa promise across wellness and food offerings.",
    es: "Una promesa Noyis Africa orgánica en todo el bienestar y la oferta gastronómica.",
    fr: "Une promesse Noyis Africa bio sur l'ensemble du bien-être et de l'offre alimentaire.",
    pt: "Uma promessa Noyis Africa orgânica em todo o bem-estar e na oferta gastronômica.",
  } satisfies L,
  brand_body: {
    en: "Noyis Africa presents itself as a brand built around organic-forward decisions, careful handling, and premium customer presentation. From herbal wellness products to prepared food offerings and small chops, the brand message on this page is clear: ingredient quality, natural positioning, clean brand standards, and thoughtful delivery remain central to how Noyis Africa creates, manages, sells, and supports its products.",
    es: "Noyis Africa se presenta como una marca construida sobre decisiones orgánicas, cuidado en el manejo y una presentación premium. Desde productos herbales de bienestar hasta alimentos preparados y small chops, el mensaje es claro: calidad de ingredientes, posicionamiento natural, estándares limpios y entrega cuidada siguen siendo el centro de cómo Noyis Africa crea, gestiona, vende y respalda sus productos.",
    fr: "Noyis Africa se présente comme une marque construite autour de choix bio, d'un manipulation soignée et d'une présentation client premium. Des produits bien-être à base de plantes aux plats préparés et small chops, le message est clair : qualité des ingrédients, positionnement naturel, standards propres et livraison soignée restent au cœur de la manière dont Noyis Africa crée, gère, vend et accompagne ses produits.",
    pt: "A Noyis Africa se apresenta como uma marca construída sobre decisões orgânicas, cuidado no manuseio e apresentação premium ao cliente. De produtos herbais de bem-estar a refeições preparadas e small chops, a mensagem é clara: qualidade dos ingredientes, posicionamento natural, padrões limpos e entrega cuidadosa continuam no centro de como a Noyis Africa cria, gerencia, vende e apoia seus produtos.",
  } satisfies L,
  pillar_organic_title: {
    en: "100% Organic-forward",
    es: "100% orientación orgánica",
    fr: "100 % orientation bio",
    pt: "100% com foco orgânico",
  } satisfies L,
  pillar_organic_body: {
    en: "Presented with a clean, plant-based, nature-led brand standard.",
    es: "Presentado con un estándar limpio, a base de plantas y guiado por la naturaleza.",
    fr: "Présenté avec un standard propre, végétal et inspiré par la nature.",
    pt: "Apresentado com um padrão limpo, à base de plantas e guiado pela natureza.",
  } satisfies L,
  pillar_nongmo_title: {
    en: "Non-GMO-conscious",
    es: "Consciente con los transgénicos",
    fr: "Conscient des OGM",
    pt: "Consciente quanto a transgênicos",
  } satisfies L,
  pillar_nongmo_body: {
    en: "Framed for customers seeking naturally positioned, quality-led options.",
    es: "Para clientes que buscan opciones naturales y de calidad.",
    fr: "Pour les clients en quête d'options naturelles et qualitatives.",
    pt: "Para clientes que buscam opções naturais e de qualidade.",
  } satisfies L,
  pillar_handled_title: {
    en: "Professionally handled",
    es: "Manejo profesional",
    fr: "Géré professionnellement",
    pt: "Tratamento profissional",
  } satisfies L,
  pillar_handled_body: {
    en: "From sourcing and presentation to customer support and delivery.",
    es: "Desde el abastecimiento y la presentación hasta el soporte y la entrega.",
    fr: "De l'approvisionnement et de la présentation au support et à la livraison.",
    pt: "Da origem e apresentação ao suporte e entrega.",
  } satisfies L,
  benefits: { en: "Benefits", es: "Beneficios", fr: "Bienfaits", pt: "Benefícios" } satisfies L,
  formula_profile: { en: "Formula profile", es: "Perfil de la fórmula", fr: "Profil de la formule", pt: "Perfil da fórmula" } satisfies L,
  view_product: {
    en: "View product page",
    es: "Ver página del producto",
    fr: "Voir la page produit",
    pt: "Ver página do produto",
  } satisfies L,
  ask_whatsapp: {
    en: "Ask on WhatsApp",
    es: "Consultar por WhatsApp",
    fr: "Demander sur WhatsApp",
    pt: "Perguntar pelo WhatsApp",
  } satisfies L,
  why_eyebrow: {
    en: "Why this page exists",
    es: "Por qué existe esta página",
    fr: "Pourquoi cette page existe",
    pt: "Por que esta página existe",
  } satisfies L,
  why_title: {
    en: "A dedicated sales page for the brand's strongest-performing line.",
    es: "Una página de ventas dedicada a la línea de mayor rendimiento de la marca.",
    fr: "Une page de vente dédiée à la gamme la plus performante de la marque.",
    pt: "Uma página de vendas dedicada à linha de melhor desempenho da marca.",
  } satisfies L,
  why_body: {
    en: "The Treasure Collection has been given its own focused presentation so customers can understand the line quickly, trust the brand more easily, and move directly into conversation and purchase. This page is designed to help new visitors, returning customers, and ad-driven traffic understand the collection at a glance without changing the structure of the main home page.",
    es: "La Colección Treasure recibe su propia presentación enfocada para que los clientes la entiendan rápido, confíen en la marca y pasen directamente a la conversación y compra. Pensada para ayudar a nuevos visitantes, clientes recurrentes y tráfico de anuncios a comprender la colección de un vistazo, sin modificar la estructura de la página de inicio.",
    fr: "La Collection Treasure dispose de sa propre présentation pour que les clients la comprennent vite, fassent confiance à la marque et passent directement à la conversation et à l'achat. Pensée pour les nouveaux visiteurs, les clients fidèles et le trafic publicitaire, sans modifier la structure de la page d'accueil principale.",
    pt: "A Coleção Treasure ganhou apresentação própria para que os clientes a entendam rapidamente, confiem na marca e sigam direto para a conversa e a compra. Pensada para ajudar novos visitantes, clientes recorrentes e tráfego de anúncios a entender a coleção em um instante, sem alterar a estrutura da página inicial.",
  } satisfies L,
  why_cta: {
    en: "Speak to sales on WhatsApp",
    es: "Hablar con ventas por WhatsApp",
    fr: "Parler à un commercial sur WhatsApp",
    pt: "Falar com vendas pelo WhatsApp",
  } satisfies L,
  why_whatsapp_msg: {
    en: "Hello, I would like help choosing between Treasure Man, Treasure Woman, and Treasure Herbs.",
    es: "Hola, me gustaría ayuda para elegir entre Treasure Man, Treasure Woman y Treasure Herbs.",
    fr: "Bonjour, j'aimerais être aidé(e) à choisir entre Treasure Man, Treasure Woman et Treasure Herbs.",
    pt: "Olá, gostaria de ajuda para escolher entre Treasure Man, Treasure Woman e Treasure Herbs.",
  } satisfies L,
  faq_title: {
    en: "Frequently asked questions",
    es: "Preguntas frecuentes",
    fr: "Questions fréquentes",
    pt: "Perguntas frequentes",
  } satisfies L,
  faq_sub: {
    en: "Clear answers for customers exploring the Treasure line for the first time.",
    es: "Respuestas claras para clientes que descubren la línea Treasure por primera vez.",
    fr: "Des réponses claires pour les clients qui découvrent la gamme Treasure pour la première fois.",
    pt: "Respostas claras para clientes que estão conhecendo a linha Treasure pela primeira vez.",
  } satisfies L,
};

export const Route = createFileRoute("/treasure")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "noyis africa treasure collection, treasure man, treasure woman, treasure herbs, organic wellness, non-gmo wellness, herbal products antigua, premium herbal brand, treasure line",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANONICAL },
      { property: "og:image", content: lineup.url },
      { property: "og:site_name", content: "Noyis Africa" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: lineup.url },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              "@id": `${CANONICAL}#collection`,
              url: CANONICAL,
              name: TITLE,
              description: DESCRIPTION,
              isPartOf: { "@type": "WebSite", name: "Noyis Africa", url: "https://noyisafrica.com" },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://noyisafrica.com/" },
                { "@type": "ListItem", position: 2, name: "Treasure Collection", item: CANONICAL },
              ],
            },
            ...PRODUCTS.map((product) => ({
              "@type": "Product",
              name: product.name,
              image: product.image,
              description: product.description.en,
              brand: { "@type": "Brand", name: "Noyis Africa" },
              category: "Organic Wellness",
              url: `https://noyisafrica.com/products/${product.slug}`,
            })),
            {
              "@type": "FAQPage",
              mainEntity: FAQS.map((f) => ({
                "@type": "Question",
                name: f.q.en,
                acceptedAnswer: { "@type": "Answer", text: f.a.en },
              })),
            },
          ],
        }),
      },
    ],
  }),
  component: TreasurePage,
});

function TreasurePage() {
  const { lang } = useLang();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main>
        <section className="bg-gradient-botanical py-16 text-white sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
                <Sparkles className="h-3.5 w-3.5" /> {tx(UI.hero_badge, lang)}
              </span>
              <h1 className="mt-5 font-display text-4xl font-semibold sm:text-5xl lg:text-6xl">
                {tx(UI.hero_title, lang)}
              </h1>
              <p className="mt-5 max-w-2xl text-base text-white/85 sm:text-lg">
                {tx(UI.hero_sub, lang)}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
                  <a
                    href={`https://wa.me/12687210101?text=${encodeURIComponent(tx(UI.hero_whatsapp_msg, lang))}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle className="h-4 w-4" /> {tx(UI.cta_order_whatsapp, lang)}
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/40 bg-white/10 text-white hover:bg-white/20">
                  <Link to="/products" search={{ cat: "natural-wellness" }}>
                    {tx(UI.cta_browse_wellness, lang)} <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-elevated">
              <img
                src={lineup.url}
                alt="Treasure Man, Treasure Woman and Treasure Herbs by Noyis Africa"
                className="w-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-sand py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">{tx(UI.brand_eyebrow, lang)}</p>
                <h2 className="mt-3 font-display text-3xl text-botanical sm:text-4xl">
                  {tx(UI.brand_title, lang)}
                </h2>
                <p className="mt-4 max-w-3xl text-base text-muted-foreground sm:text-lg">
                  {tx(UI.brand_body, lang)}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {[
                  { icon: Leaf, title: UI.pillar_organic_title, body: UI.pillar_organic_body },
                  { icon: ShieldCheck, title: UI.pillar_nongmo_title, body: UI.pillar_nongmo_body },
                  { icon: BadgeCheck, title: UI.pillar_handled_title, body: UI.pillar_handled_body },
                ].map((item) => (
                  <div key={item.title.en} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-display text-xl text-botanical">{tx(item.title, lang)}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{tx(item.body, lang)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 py-16 sm:px-6 sm:py-20">
          {PRODUCTS.map((product, index) => (
            <article
              key={product.slug}
              className="grid gap-8 lg:grid-cols-2 lg:items-center"
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
                  <img
                    src={product.image}
                    alt={`${product.name} product presentation by Noyis Africa`}
                    className="w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">{tx(product.eyebrow, lang)}</p>
                <h2 className="mt-3 font-display text-3xl text-botanical sm:text-4xl">{product.name}</h2>
                <p className="mt-3 text-lg font-medium text-foreground">{tx(product.headline, lang)}</p>
                <p className="mt-4 text-base text-muted-foreground">{tx(product.description, lang)}</p>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                    <h3 className="font-display text-xl text-botanical">{tx(UI.benefits, lang)}</h3>
                    <ul className="mt-4 grid gap-2">
                      {txArr(product.benefits, lang).map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2 text-sm text-foreground/85">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                    <h3 className="font-display text-xl text-botanical">{tx(UI.formula_profile, lang)}</h3>
                    <ul className="mt-4 grid gap-2">
                      {txArr(product.formula, lang).map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-foreground/85">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild className="bg-primary text-primary-foreground hover:bg-botanical">
                    <Link to="/products/$slug" params={{ slug: product.slug }}>
                      {tx(UI.view_product, lang)} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <a
                      href={`https://wa.me/12687210101?text=${encodeURIComponent(tx(product.whatsapp, lang))}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <MessageCircle className="h-4 w-4" /> {tx(UI.ask_whatsapp, lang)}
                    </a>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="bg-sand py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="rounded-3xl border border-border bg-card p-8 shadow-soft sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">{tx(UI.why_eyebrow, lang)}</p>
              <h2 className="mt-3 font-display text-3xl text-botanical sm:text-4xl">
                {tx(UI.why_title, lang)}
              </h2>
              <p className="mt-4 text-base text-muted-foreground sm:text-lg">
                {tx(UI.why_body, lang)}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
                  <a
                    href={`https://wa.me/12687210101?text=${encodeURIComponent(tx(UI.why_whatsapp_msg, lang))}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle className="h-4 w-4" /> {tx(UI.why_cta, lang)}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl text-botanical sm:text-4xl">{tx(UI.faq_title, lang)}</h2>
          <p className="mt-2 text-muted-foreground">
            {tx(UI.faq_sub, lang)}
          </p>
          <div className="mt-8 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {FAQS.map((faq) => (
              <details key={faq.q.en} className="group p-6">
                <summary className="cursor-pointer list-none font-display text-lg text-botanical">{tx(faq.q, lang)}</summary>
                <p className="mt-3 text-sm text-foreground/85">{tx(faq.a, lang)}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
