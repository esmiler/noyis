
UPDATE public.products SET
  short_description_localized = jsonb_build_object(
    'en','Herbal wellness formula crafted to support everyday vitality for active men.',
    'es','Fórmula herbal de bienestar para apoyar la vitalidad diaria del hombre activo.',
    'fr','Formule à base de plantes pour soutenir la vitalité quotidienne des hommes actifs.',
    'pt','Fórmula herbal de bem-estar para apoiar a vitalidade diária do homem ativo.'
  ),
  long_description_localized = jsonb_build_object(
    'en','Treasure Man is a traditional herbal wellness formula crafted with African botanicals to support everyday vitality, energy and overall wellbeing as part of an active lifestyle.',
    'es','Treasure Man es una fórmula herbal tradicional con botánicos africanos, creada para apoyar la vitalidad, la energía y el bienestar diario de un estilo de vida activo.',
    'fr','Treasure Man est une formule traditionnelle à base de plantes africaines, conçue pour soutenir la vitalité, l''énergie et le bien-être quotidien d''un mode de vie actif.',
    'pt','Treasure Man é uma fórmula herbal tradicional com botânicos africanos, criada para apoiar a vitalidade, a energia e o bem-estar diário de um estilo de vida ativo.'
  ),
  benefits = to_jsonb(ARRAY['Traditional herbal wellness formula','Crafted with African botanicals','Supports everyday vitality','Designed for an active lifestyle','Made for men''s general wellbeing']),
  warnings_localized = jsonb_build_object(
    'en','For adults 18+. Not intended to diagnose, treat, cure or prevent any disease. Consult a healthcare professional if you have a medical condition or take prescription medication. Individual results may vary.',
    'es','Para adultos 18+. No está destinado a diagnosticar, tratar, curar ni prevenir ninguna enfermedad. Consulte a un profesional de la salud si tiene alguna condición o toma medicamentos. Los resultados individuales pueden variar.',
    'fr','Pour adultes 18+. Non destiné à diagnostiquer, traiter, guérir ou prévenir une maladie. Consultez un professionnel de santé en cas de condition médicale ou de traitement. Les résultats individuels peuvent varier.',
    'pt','Para adultos 18+. Não se destina a diagnosticar, tratar, curar ou prevenir qualquer doença. Consulte um profissional de saúde se tiver alguma condição ou tomar medicamentos. Os resultados individuais podem variar.'
  ),
  tags = ARRAY['wellness','herbal','men','vitality']
WHERE slug='treasure-man';

UPDATE public.products SET
  short_description_localized = jsonb_build_object(
    'en','Herbal wellness formula crafted to support everyday vitality and balance for women.',
    'es','Fórmula herbal de bienestar para apoyar la vitalidad y el equilibrio diario de la mujer.',
    'fr','Formule à base de plantes pour soutenir la vitalité et l''équilibre quotidiens des femmes.',
    'pt','Fórmula herbal de bem-estar para apoiar a vitalidade e o equilíbrio diário da mulher.'
  ),
  long_description_localized = jsonb_build_object(
    'en','Treasure Woman is a traditional herbal wellness formula crafted with Goron Tula, Dawadawa and other African botanicals to support women''s everyday vitality, balance and overall wellbeing.',
    'es','Treasure Woman es una fórmula herbal tradicional con Goron Tula, Dawadawa y otros botánicos africanos, creada para apoyar la vitalidad, el equilibrio y el bienestar general de la mujer.',
    'fr','Treasure Woman est une formule traditionnelle à base de Goron Tula, Dawadawa et autres plantes africaines, pour soutenir la vitalité, l''équilibre et le bien-être quotidien des femmes.',
    'pt','Treasure Woman é uma fórmula herbal tradicional com Goron Tula, Dawadawa e outros botânicos africanos, para apoiar a vitalidade, o equilíbrio e o bem-estar diário da mulher.'
  ),
  benefits = to_jsonb(ARRAY['Traditional herbal wellness formula','Crafted with Goron Tula & Dawadawa','Supports everyday vitality','Designed for women''s general wellbeing','100% natural botanicals']),
  warnings_localized = jsonb_build_object(
    'en','For adults 18+. Not for use during pregnancy. Not intended to diagnose, treat, cure or prevent any disease. Consult a healthcare professional if you have a medical condition. Individual results may vary.',
    'es','Para adultos 18+. No usar durante el embarazo. No está destinado a diagnosticar, tratar, curar ni prevenir enfermedades. Consulte a un profesional de la salud si tiene alguna condición. Los resultados pueden variar.',
    'fr','Pour adultes 18+. Ne pas utiliser pendant la grossesse. Non destiné à diagnostiquer, traiter, guérir ou prévenir une maladie. Consultez un professionnel de santé. Les résultats peuvent varier.',
    'pt','Para adultos 18+. Não usar durante a gravidez. Não se destina a diagnosticar, tratar, curar ou prevenir doenças. Consulte um profissional de saúde. Os resultados podem variar.'
  ),
  tags = ARRAY['wellness','herbal','women','vitality','balance']
WHERE slug='treasure-woman';

UPDATE public.products SET
  short_description_localized = jsonb_build_object(
    'en','Family herbal wellness formula for everyday vitality and overall wellbeing.',
    'es','Fórmula herbal de bienestar para toda la familia: vitalidad y bienestar diario.',
    'fr','Formule de bien-être à base de plantes pour toute la famille, au quotidien.',
    'pt','Fórmula herbal de bem-estar para toda a família, no dia a dia.'
  ),
  long_description_localized = jsonb_build_object(
    'en','Treasure Herbs is a broad-spectrum herbal wellness formula crafted with traditional African botanicals to support everyday vitality, digestive comfort and overall wellbeing for the whole family.',
    'es','Treasure Herbs es una fórmula herbal de amplio espectro con botánicos africanos tradicionales para apoyar la vitalidad, el confort digestivo y el bienestar general de toda la familia.',
    'fr','Treasure Herbs est une formule à large spectre, à base de plantes africaines traditionnelles, pour soutenir la vitalité, le confort digestif et le bien-être quotidien de toute la famille.',
    'pt','Treasure Herbs é uma fórmula herbal de amplo espectro com botânicos africanos tradicionais, para apoiar a vitalidade, o conforto digestivo e o bem-estar diário de toda a família.'
  ),
  benefits = to_jsonb(ARRAY['Traditional herbal wellness formula','Supports everyday vitality','Promotes digestive comfort','Crafted with African botanicals','Designed for the whole family']),
  warnings_localized = jsonb_build_object(
    'en','Keep out of reach of children. Not intended to diagnose, treat, cure or prevent any disease. Consult a healthcare professional if you have a medical condition. Individual results may vary.',
    'es','Mantener fuera del alcance de los niños. No está destinado a diagnosticar, tratar, curar ni prevenir enfermedades. Consulte a un profesional de la salud si tiene alguna condición. Los resultados pueden variar.',
    'fr','Tenir hors de portée des enfants. Non destiné à diagnostiquer, traiter, guérir ou prévenir une maladie. Consultez un professionnel de santé. Les résultats peuvent varier.',
    'pt','Manter fora do alcance das crianças. Não se destina a diagnosticar, tratar, curar ou prevenir doenças. Consulte um profissional de saúde. Os resultados podem variar.'
  ),
  tags = ARRAY['wellness','herbal','family','vitality']
WHERE slug='treasure-herbs';

UPDATE public.products SET
  short_description_localized = jsonb_build_object(
    'en','Nutrient-dense camel cheese powder rich in vitamins and calcium, for everyday nutritional support. Adults only (18+).',
    'es','Polvo de queso de camello rico en vitaminas y calcio para apoyo nutricional diario. Solo adultos (18+).',
    'fr','Poudre de fromage de chamelle riche en vitamines et calcium, pour un soutien nutritionnel quotidien. Adultes uniquement (18+).',
    'pt','Pó de queijo de camelo rico em vitaminas e cálcio para suporte nutricional diário. Apenas adultos (18+).'
  ),
  benefits = to_jsonb(ARRAY['Rich in vitamins and calcium','Supports everyday nutrition','Designed for general wellbeing','No added sugar or preservatives'])
WHERE slug='camel-cheese-powder';

UPDATE public.products SET
  short_description_localized = jsonb_build_object(
    'en','Warming herbal massage oil (30ml) crafted from traditional botanicals for everyday comfort.',
    'es','Aceite herbal cálido para masaje (30ml) elaborado con botánicos tradicionales para confort diario.',
    'fr','Huile chauffante de massage (30ml) à base de plantes traditionnelles pour le confort quotidien.',
    'pt','Óleo morno de massagem (30ml) feito com botânicos tradicionais para conforto diário.'
  ),
  benefits = to_jsonb(ARRAY['100% natural botanicals','Warming herbal massage oil','For everyday comfort'])
WHERE slug='akabanga-gamu-oil';

UPDATE public.products SET
  short_description_localized = jsonb_build_object(
    'en','External-use warming herbal massage oil crafted with a traditional botanical blend.',
    'es','Aceite herbal cálido para uso externo elaborado con una mezcla botánica tradicional.',
    'fr','Huile chauffante de massage à usage externe, mélange botanique traditionnel.',
    'pt','Óleo herbal morno para uso externo feito com mistura botânica tradicional.'
  ),
  benefits = to_jsonb(ARRAY['External use only','Warming herbal blend','Traditional botanical formula'])
WHERE slug='tumerus-liniment-oil';

UPDATE public.products SET
  short_description_localized = jsonb_build_object(
    'en','Original African herbal powder for everyday wellness support. Adults only (18+).',
    'es','Polvo herbal africano original para apoyo diario de bienestar. Solo adultos (18+).',
    'fr','Poudre herbale africaine originale pour le bien-être quotidien. Adultes uniquement (18+).',
    'pt','Pó herbal africano original para apoio diário de bem-estar. Apenas adultos (18+).'
  ),
  benefits = to_jsonb(ARRAY['Traditional African herbal blend','Supports everyday wellness','Adults only (18+)'])
WHERE slug='bullet-original-herbal-powder';

UPDATE public.products SET
  short_description_localized = jsonb_build_object(
    'en','Herbal tea bags crafted from a traditional botanical blend for everyday wellness support.',
    'es','Bolsitas de té herbal con mezcla botánica tradicional para apoyo de bienestar diario.',
    'fr','Sachets de tisane à base de plantes traditionnelles pour le bien-être quotidien.',
    'pt','Saquinhos de chá herbal com mistura botânica tradicional para o bem-estar diário.'
  ),
  benefits = to_jsonb(ARRAY['Natural herbal formula','Traditional botanical blend','For everyday wellness'])
WHERE slug='tummy-body-fat-reducing-tea';

UPDATE public.products SET
  short_description_localized = jsonb_build_object(
    'en','Herbal liquid wellness formula for men, crafted as an adult-only botanical blend.',
    'es','Fórmula herbal líquida de bienestar para hombres, mezcla botánica solo para adultos.',
    'fr','Formule liquide à base de plantes pour hommes, mélange botanique réservé aux adultes.',
    'pt','Fórmula herbal líquida de bem-estar para homens, mistura botânica apenas para adultos.'
  ),
  benefits = to_jsonb(ARRAY['Men''s wellness support','Liquid herbal formula','Adult use 18+'])
WHERE slug='herbal-mannex-liquid';

UPDATE public.products SET
  benefits = to_jsonb(ARRAY['Supports everyday energy','Instant maca coffee blend','For active lifestyles'])
WHERE slug='maca-boost-coffee';
