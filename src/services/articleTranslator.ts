import { Article } from '../types';
import { LanguageCode, t } from '../translations';

// Article Translation Dictionary for art-1 to art-10 across supported languages
const ARTICLE_TRANSLATIONS: Record<string, Partial<Record<Exclude<LanguageCode, 'en'>, Partial<Article>>>> = {
  'art-1': {
    ar: {
      title: 'مقترح ميزانية جديدة يستهدف تحديث البنية التحتية والتحول إلى الطاقة النظيفة',
      subtitle: 'المفاوضات بين الحزبين تدخل مرحلة حاسمة مع مناقشة المشرعين لتخصيص 1.2 تريليون دولار للسكك الحديدية وشبكة الكهرباء والنطاق العريض.',
      content: `كشف قادة الحكومة عن حزمة مالية شاملة تهدف إلى إصلاح البنية التحتية الوطنية الحيوية على مدى العقد المقبل. يخصص المقترح رأس مال كبيراً لممرات السكك الحديدية عالية السرعة، وتحديث شبكة الكهرباء، وتوفير الإنترنت عالي السرعة في المناطق الريفية والنائية.

ويؤكد المستشارون الاقتصاديون أن المشروع يتضمن إعانات مستهدفة لتصنيع التكنولوجيا النظيفة المحلية، لبناء سلاسل توريد مرنة وسط التغيرات في التجارة الدولية.

في حين يشير المؤيدون إلى مكاسب الإنتاجية وتوفير الوظائف على المدى الطويل، أعربت الكتل المحافظة عن قلقها بشأن الضغوط التضخمية وعجز الميزانية.`,
      aiSummary: {
        overview: 'حزمة بنية تحتية بقيمة 1.2 تريليون دولار تركز على الطاقة النظيفة والسكك الحديدية والنطاق العريض تدخل مراجعة تشريعية رئيسية.',
        bulletPoints: [
          'تخصيص 1.2 تريليون دولار على مدى 10 سنوات للسكك الحديدية والشبكة والنطاق العريض.',
          'حوافز ضريبية لتصنيع أشباه الموصلات والتكنولوجيا النظيفة محلياً.',
          'النقاش يتركز على توقعات العجز مقابل النمو الاقتصادي طويل الأجل.'
        ],
        keyTakeaway: 'تركيز مكثف على استقلالية سلاسل التوريد المحلية وتحديث الطاقة النظيفة.'
      },
      outletsCoverage: [
        {
          outletName: 'Reuters',
          logo: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=100&q=80',
          bias: 'center',
          headline: 'المشرعون يكشفون عن إطار ميزانية البنية التحتية بقيمة 1.2 تريليون دولار',
          summary: 'تركيز على التوزيع الفعلي للتمويل عبر النقل والشبكة الكهربائية والنطاق العريض.',
          keyPoints: [
            'القطاعات الأعلى تمويلاً: شبكة الكهرباء (250B$)، السكك الحديدية (180B$).',
            'ارتفعت مؤشرات الأسهم الصناعية بنسبة 1.2% عقب الإعلان.',
            'من المتوقع إقرار الميزانية قبل الموعد النهائي للربع المالي.'
          ]
        },
        {
          outletName: 'Wall Street Journal',
          logo: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=100&q=80',
          bias: 'center-right',
          headline: 'مخاوف من التضخم بشأن مشروع قانون الميزانية المقترح بقيمة 1.2 تريليون دولار',
          summary: 'يؤكد على المساءلة المالية والتأثير المحتمل على العجز وتداعيات ضرائب الشركات.',
          keyPoints: [
            'خبراء الاقتصاد يحذرون من ضغوط قصيرة المدى على عوائد السندات.',
            'مجموعات الأعمال تطالب بتسهيل تراخيص المشاريع البيئية.',
            'التركيز على مقاصات الضرائب على الشركات لتمويل الإنفاق.'
          ]
        },
        {
          outletName: 'The Guardian',
          logo: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&w=100&q=80',
          bias: 'center-left',
          headline: 'إنفاق بيئي تاريخي يتضمنه مشروع البنية التحتية الجديد',
          summary: 'يشيد بالتخصيص القياسي للمناخ مع التساؤل عن العدالة في النطاق العريض.',
          keyPoints: [
            'أكبر مبادرة استثمارية في الطاقة النظيفة منذ عقد من الزمان.',
            'مجموعات العدالة البيئية تضغط من أجل أحكام توظيف محلية صارمة.',
            'إشادة بمعايير خفض الانبعاثات القوية.'
          ]
        }
      ]
    },
    fr: {
      title: 'Nouvelle proposition budgétaire pour moderniser les infrastructures et la transition énergétique',
      subtitle: 'Les négociations bipartites entrent dans une phase critique alors que les législateurs débattent de 1 200 milliards de dollars.',
      content: `Les dirigeants gouvernementaux ont dévoilé un ensemble financier global visant à réviser les infrastructures nationales critiques au cours de la prochaine décennie. La proposition alloue d'importants capitaux aux lignes ferroviaires à grande vitesse, à la modernisation du réseau électrique et au haut débit universel dans les zones rurales.

Les conseillers économiques soulignent que le projet comprend des subventions ciblées pour la fabrication technologique propre locale.

Alors que les partisans mettent en avant les gains de productivité et la création d'emplois, les conservateurs expriment des inquiétudes quant aux pressions inflationnistes.`,
      aiSummary: {
        overview: "Un plan d'infrastructure de 1 200 milliards de dollars axé sur l'énergie verte et le rail entre en examen législatif.",
        bulletPoints: [
          'Allocation de 1 200 milliards de dollars sur 10 ans pour le rail et le réseau électrique.',
          'Incitations fiscales pour la fabrication nationale de puces et technologies propres.',
          'Débat sur les prévisions de déficit par rapport à la croissance économique.'
        ],
        keyTakeaway: "Fort accent sur l'indépendance de la chaîne d'approvisionnement nationale."
      }
    },
    es: {
      title: 'Nueva propuesta presupuestaria destinada a modernizar infraestructuras y transición limpia',
      subtitle: 'Las negociaciones bipartidistas entran en una fase crítica al debatir la asignación de 1,2 billones de dólares.',
      content: `Los líderes gubernamentales han presentado un paquete fiscal integral destinado a reformar la infraestructura nacional crítica durante la próxima década. La propuesta asigna un capital significativo a trenes de alta velocidad, modernización de la red eléctrica y banda ancha universal.

Los asesores económicos destacan que el proyecto incluye subsidios específicos para la fabricación local de tecnología limpia.`,
      aiSummary: {
        overview: 'Un paquete de infraestructura de 1,2 billones de dólares centrado en energía verde y trenes entra en revisión legislativa.',
        bulletPoints: [
          'Asigna 1,2 billones de dólares durante 10 años para ferrocarriles y red eléctrica.',
          'Incentivos fiscales para la fabricación local de semiconductores.',
          'El debate se centra en el déficit frente al crecimiento económico.'
        ],
        keyTakeaway: 'Enfoque principal en la independencia de la cadena de suministro nacional.'
      }
    },
    de: {
      title: 'Neuer Haushaltsvorschlag zielt auf Infrastrukturmodernisierung und Energiewende',
      subtitle: 'Bipartisanische Verhandlungen treten in eine kritische Phase bei der Debatte über 1,2 Billionen Dollar.',
      content: `Regierungsvertreter haben ein umfassendes Finanzpaket vorgelegt, das darauf abzielt, die kritische nationale Infrastruktur im nächsten Jahrzehnt zu überholen. Der Vorschlag sieht erhebliche Mittel für Hochgeschwindigkeitszüge, Netzmodernisierung und Breitbandversorgung vor.`,
      aiSummary: {
        overview: 'Ein 1,2-Billionen-Dollar-Infrastrukturpaket mit Schwerpunkt auf grüner Energie und Bahn geht in die parlamentarische Prüfung.',
        bulletPoints: [
          'Mittel von 1,2 Billionen Dollar über 10 Jahre für Bahn und Stromnetz.',
          'Steueranreize für die heimische Chip- und Technologienherstellung.',
          'Debatte konzentriert sich auf Defizitprognosen im Vergleich zu Wirtschaftswachstum.'
        ],
        keyTakeaway: 'Starker Fokus auf heimische Lieferkettenunabhängigkeit.'
      }
    },
    ja: {
      title: '新しい予算案、インフラ近代化とクリーンエネルギーへの移行をターゲットに',
      subtitle: '超党派の交渉が重大な局面を迎え、議員たちは鉄道、送電網、ブロードバンドへの1.2兆ドルの配分を議論。',
      content: `政府指導者は、今後10年間にわたり重要な国家インフラを刷新することを目的とした包括的な財政パッケージを発表しました。`,
      aiSummary: {
        overview: 'グリーンエネルギー、鉄道、ブロードバンドに焦点を当てた1.2兆ドルのインフラパッケージが主要な立法審査に入ります。',
        bulletPoints: [
          '鉄道、送電網の回復力、ブロードバンドに10年間で1.2兆ドルを割り当てます。',
          '国内の半導体およびクリーンテック製造に対する税制優遇措置が含まれます。',
          '議論は赤字予測と長期的な経済成長の利点に集中しています。'
        ],
        keyTakeaway: '国内サプライチェーンの独立性とクリーンエネルギーの近代化に重点を置いています。'
      }
    }
  },

  'art-2': {
    ar: {
      title: 'قادة القمة يتوصلون إلى اتفاق بشأن إطار التجارة المناخية العالمية',
      subtitle: 'اثنتان وثلاثون دولة توافق على توحيد معايير تعرفة الكربون لمنع التسرب التنظيمي.',
      content: `وصل المندوبون في اتفاقية التجارة والمناخ العالمية في جنيف إلى توافق تاريخي يحدد مقاييس كثافة الكربون للتجارة الصناعية عابرة الحدود.

يقدم الاتفاق نظام تعرفة موحد للمواد السلعية ذات الكثافة الكربونية العالية بما في ذلك الصلب والألومنيوم والأسمنت والأسمدة الكيماوية. وبموجب القواعد الجديدة، يمكن للدول المستوردة فرض تعديلات كربونية على الحدود.

وصف المندوبون المعاهدة بأنها خطوة حاسمة نحو تكافؤ الفرص الاقتصادية الدولية مع تسريع خفض التلوث في التصنيع الثقيل.`,
      aiSummary: {
        overview: '32 دولة توقع معاهدة تعرفة الكربون الموحدة المستهدفة للصادرات الصناعية مثل الصلب والأسمنت.',
        bulletPoints: [
          'توحيد معايير المحاسبة الكربونية عبر ممرات التجارة في الاتحاد الأوروبي والولايات المتحدة والمملكة المتحدة وشرق آسيا.',
          'منع التهرب التنظيمي حيث يتجنب كبار المنبعثين الضرائب المحلية.',
          'تنفيذ مرحلي يبدأ في 2027 مع فترات سماح متعددة السنوات.'
        ],
        keyTakeaway: 'دمج السياسة المناخية مباشرة في الاتفاقيات التجارية العالمية.'
      }
    },
    fr: {
      title: 'Les dirigeants au sommet parviennent à un accord sur le commerce climatique mondial',
      subtitle: 'Trente-deux nations conviennent de normaliser les tarifs carbone.',
      content: `Les délégués à l'accord mondial sur le commerce et le climat à Genève ont atteint un consensus historique établissant des mesures d'intensité carbone unifiées.`,
      aiSummary: {
        overview: '32 pays signent un traité uniforme de tarification du carbone aux frontières pour les produits industriels.',
        bulletPoints: [
          "Harmonisation des normes de comptabilité carbone entre l'UE, les USA et l'Asie.",
          'Prévention des fuites de carbone industrielles.'
        ],
        keyTakeaway: 'Intègre directement la politique climatique dans les accords commerciaux mondiaux.'
      }
    },
    es: {
      title: 'Líderes de la cumbre alcanzan un acuerdo sobre el marco comercial climático global',
      subtitle: 'Treinta y dos naciones acuerdan estandarizar los aranceles de carbono.',
      content: `Los delegados en el Acuerdo Global sobre Comercio y Clima en Ginebra alcanzaron un consenso histórico que establece métricas unificadas de intensidad de carbono.`,
      aiSummary: {
        overview: '32 países firman un tratado de aranceles de carbono unificado para exportaciones industriales.',
        bulletPoints: [
          'Armoniza estándares de contabilidad de carbono en corredores comerciales.',
          'Previene el arbitraje regulatorio de emisiones.'
        ],
        keyTakeaway: 'Integra la política climática directamente en los acuerdos comerciales globales.'
      }
    },
    de: {
      title: 'Gipfelstürmer einigen sich auf globales Klimahandelsabkommen',
      subtitle: 'Zweiunddreißig Nationen einigen sich auf die Standardisierung von Kohlenstoffzöllen.',
      content: `Die Delegierten des globalen Handels- und Klimaabkommens in Genf haben einen historischen Konsens erzielt.`,
      aiSummary: {
        overview: '32 Länder unterzeichnen einen einheitlichen CO2-Grenzzollvertrag für Industrieexporte.',
        bulletPoints: [
          'Harmonisiert CO2-Bilanzierungsstandards in den wichtigsten Handelskorridoren.',
          'Verhindert regulatorische Schlupflöcher.'
        ],
        keyTakeaway: 'Integriert Klimapolitik direkt in globale Handelsabkommen.'
      }
    },
    ja: {
      title: '首脳陣、世界気候貿易枠組みに関する合意に達する',
      subtitle: '32か国が、規制の抜け穴を防ぐために炭素関税基準の標準化に同意。',
      content: `ジュネーブで開催された世界貿易気候協定の代表者らは、国境を越えた産業貿易のための統一された炭素排出強度基準を確立する歴史的な合意に達しました。`,
      aiSummary: {
        overview: '32か国が鉄鋼やセメントなどの産業輸出を対象とした統一炭素関税条約に署名。',
        bulletPoints: [
          '主要取引回廊全体で炭素会計基準を調和させます。',
          '重排出企業が国内炭素税を回避する規制裁定を防ぎます。'
        ],
        keyTakeaway: '気候政策を世界貿易協定に直接統合します。'
      }
    }
  },

  'art-3': {
    ar: {
      title: 'المحكمة العليا تراجع تشريعات الخصوصية الرقمية وتدريب الذكاء الاصطناعي',
      subtitle: 'التحدي القضائي يختبر التوازن بين الابتكار التكنولوجي وحقوق الملكية الفكرية.',
      content: `وافقت المحكمة العليا على الاستماع إلى الحجج في قضية دستورية حاسمة تختبر اللوائح الحكومية بشأن مجموعات بيانات تدريب نماذج الذكاء الاصطناعي وحماية الخصوصية الشخصية.

القضية المطروحة هي ما إذا كان بإمكان شركات التكنولوجيا جمع البيانات العامة والأعمال المنشورة المحمية بحقوق الطبع والنشر دون اتفاقيات ترخيص صريحة.

يشير الخبراء القانونيون إلى أن القرار سيحدد سابقة ملزمة تؤثر على تطوير التعلم الآلي عبر النظام التكنولوجي بأكمله.`,
      aiSummary: {
        overview: 'المحكمة العليا ستحدد ما إذا كان يمكن لشركات الذكاء الاصطناعي جمع البيانات المحمية دون موافقة مسبقة.',
        bulletPoints: [
          'دمج الدعاوى القضائية من نقابات المبدعين ووكالات الأنباء ومجموعات الخصوصية.',
          'المدعى عليهم يجادلون بأن مبدأ الاستخدام العادل ينطبق على تحويلات الأوزان العصبية.',
          'من المتوقع أن تشكل الأحكام أطر حوكمة الذكاء الاصطناعي الدولية.'
        ],
        keyTakeaway: 'محاكمة قانونية تأسيسية تحدد حقوق الطبع والنشر في عصر الذكاء الاصطناعي التوليدي.'
      }
    },
    fr: {
      title: "La Haute Cour examine la législation sur la confidentialité numérique et l'apprentissage de l'IA",
      subtitle: "Un défi judiciaire teste l'équilibre entre innovation et propriété intellectuelle.",
      content: `La Haute Cour a accepté d'entendre les arguments dans une affaire constitutionnelle cruciale concernant l'entraînement des modèles d'IA et la protection de la vie privée.`,
      aiSummary: {
        overview: "La Cour tranchera sur le droit des entreprises d'IA à collecter des données sans consentement.",
        bulletPoints: [
          "Regroupe les plaintes des syndicats de créateurs et des groupes de confidentialité.",
          "Les jugements façonneront la gouvernance mondiale de l'IA."
        ],
        keyTakeaway: "Un procès fondateur définissant le droit d'auteur à l'ère de l'IA."
      }
    },
    es: {
      title: 'El Tribunal Supremo revisa la legislación sobre privacidad digital y entrenamiento de IA',
      subtitle: 'Desafío judicial pone a prueba el equilibrio entre innovación y derechos de propiedad intelectual.',
      content: `El Tribunal Supremo ha aceptado escuchar argumentos en un caso constitucional clave sobre datos de entrenamiento de IA y privacidad personal.`,
      aiSummary: {
        overview: 'El tribunal decidirá si las empresas de IA pueden recopilar datos protegidos sin consentimiento.',
        bulletPoints: [
          'Consolida demandas de gremios creativos y grupos de privacidad.',
          'El fallo dará forma a los marcos de gobernanza de la IA.'
        ],
        keyTakeaway: 'Un juicio legal fundamental que define el derecho de autor en la era de la IA.'
      }
    },
    de: {
      title: 'Oberster Gerichtshof prüft Gesetzgebung zu digitalem Datenschutz und KI-Training',
      subtitle: 'Gerichtsverfahren testet das Gleichgewicht zwischen Innovation und geistigem Eigentum.',
      content: `Der Oberste Gerichtshof hat zugestimmt, Argumente in einem zentralen Verfassungsfall zu KI-Trainingsdaten und Datenschutz zu hören.`,
      aiSummary: {
        overview: 'Das Gericht wird entscheiden, ob KI-Firmen urheberrechtlich geschützte Daten ohne Zustimmung verarbeiten dürfen.',
        bulletPoints: [
          'Bündelt Klagen von Urhebern und Datenschutzgruppen.',
          'Entscheidung wird den internationalen KI-Regulierungsrahmen prägen.'
        ],
        keyTakeaway: 'Ein grundlegender Prozess zum Urheberrecht im KI-Zeitalter.'
      }
    },
    ja: {
      title: '高等裁判所、デジタルプライバシーとAI学習に関する画期的な法案を審査へ',
      subtitle: '技術革新と知的財産権のバランスをテストする司法上の挑戦。',
      content: `高等裁判所は、AIモデルの学習データセットと個人のプライバシー保護に関する国家規制をテストする極めて重要な憲法訴訟の弁論を聞くことに合意しました。`,
      aiSummary: {
        overview: '高等裁判所は、AI企業が明示的な同意なしに著作権コンテンツや個人データをスクレイピングできるかどうかを判断します。',
        bulletPoints: [
          'クリエイターギルドやプライバシー団体からの訴訟を統合。',
          '判決は世界的なAIガバナンス枠組みを形成すると予想されます。'
        ],
        keyTakeaway: '生成AI時代における著作権を定義する基礎的な法的裁判。'
      }
    }
  },

  'art-4': {
    ar: {
      title: 'تنظيم التكنولوجيا: معايير جديدة مقترحة لشفافية الخوارزميات',
      subtitle: 'الهيئات التنظيمية تفرض الوصول إلى الشفرة المصدرية وتدقيق التحيز للأدوات الحكومية الآلية.',
      content: `اقترح تحالف من الهيئات التنظيمية الدولية إرشادات شفافية جديدة صارمة لأنظمة اتخاذ القرار الخوارزمية المستخدمة في الإدارة العامة والتصنيف الائتماني وإنفاذ القانون.

يفرض الإطار المقترح عمليات تدقيق مستقلة من طرف ثالث للأنظمة الآلية لتحديد التحيز الخوارزمي وضمان آليات توضيح جديدة للمواطنين المتأثرين بالقرارات الآلية.`,
      aiSummary: {
        overview: 'مقترح تنظيمي جديد يفرض تدقيق الخوارزميات وقابليتها للشرح لأنظمة الذكاء الاصطناعي في القطاع العام.',
        bulletPoints: [
          'يتطلب سجلات تدقيق مستقلة لاتخاذ القرارات الآلية الحكومية.',
          'يرسي حق المواطن في المراجعة البشرية لحالات الرفض الآلي.',
          'شركات التكنولوجيا تطالب بحماية السرية التجارية للخوارزميات.'
        ],
        keyTakeaway: 'تحول نحو خوارزميات حوكمة عامة مسؤولة وقابلة للتفسير.'
      }
    }
  },

  'art-5': {
    ar: {
      title: 'البنك المركزي يلمح إلى الاستمرار في الحذر وسط مرونة سوق العمل',
      subtitle: 'لجنة السياسة النقدية تبقي سعر الفائدة المرجعي ثابتاً مع متابعة تضخم الأجور ومؤشرات إنفاق المستهلكين.',
      content: `في أحدث بيان سياسي، أعلن مجلس إدارة البنك المركزي الإبقاء على أسعار الفائدة المرجعية عند مستوياتها الحالية، مشيراً إلى نمو أجور قطاع الخدمات إلى جانب استقرار التضخم الأساسي.`,
      aiSummary: {
        overview: 'البنك المركزي يثبت أسعار الفائدة، محافظاً على السياسة الحالية مع مراقبة بيانات الأجور.',
        bulletPoints: [
          'تثبيت أسعار الفائدة وفقاً لتوقعات المحللين.',
          'مرونة سوق العمل ونمو أجور الخدمات يظلان متغيرين رئيسيين.'
        ],
        keyTakeaway: 'السياسة النقدية تظل مستقرة بينما يوازن البنك المركزي بين النمو واحتواء التضخم.'
      }
    }
  },

  'art-6': {
    ar: {
      title: 'الدفاع الساحلي وتوسع الشبكة البحرية: تقرير التكيف المناخي الإقليمي',
      subtitle: 'مبادرات بحر الشمال والأطلسي تسلط الضوء على استثمارات بالمليارات في مصدات الأمواج ومزارع الرياح العائمة.',
      content: `أصدرت لجنة بيئية وبنية تحتية مشتركة تقرير تقدمها حول أنظمة الدفاع الساحلي في المحيط الأطلسي ومربطات الطاقة البحرية.`,
      aiSummary: {
        overview: 'مبادرة أطلسية متعددة الجنسيات تجمع بين توليد طاقة الرياح البحرية والدفاع الساحلي عن العواصف.',
        bulletPoints: [
          'تجمع بين توليد الكهرباء النظيفة ومثبطات العواصف البحرية.',
          'تحمي المناطق الحضرية الساحلية من أحداث ارتفاع مستوى البحر.'
        ],
        keyTakeaway: 'هندسة مبتكرة تمزج بين البنية التحتية للطاقة والمرونة المناخية.'
      }
    }
  },

  'art-7': {
    ar: {
      title: 'اتفاق دفاعي متعدد الأطراف يركز على الأمن السيبراني والمراقبة الفضائية',
      subtitle: 'وزراء دفاع الدول الحليفة يوقعون بروتوكولاً تقنياً مشتركاً لمشاركة معلومات التهديدات في الوقت الفعلي.',
      content: `أنهى قادة الدفاع من الدول الحليفة بروتوكولاً استراتيجياً يتوسع في القيادة التشغيلية المشتركة لدفاعات الأمن السيبراني وشبكات استطلاع الأقمار الصناعية المدارية.`,
      aiSummary: {
        overview: 'معاهدة دفاع حليفة تنشئ مركز استجابة سيبرانية موحداً وشبكة تتبع فضائية.',
        bulletPoints: [
          'تحمي شبكات الكهرباء والاتصالات المدنية من التهديدات السيبرانية.',
          'تدمج مراقبة الأقمار الصناعية المدارية وتتبع الحطام الفضائي.'
        ],
        keyTakeaway: 'تحديث استراتيجية الدفاع الجماعي للمجالات السيبرانية والمدارية.'
      }
    }
  },

  'art-8': {
    ar: {
      title: 'مبادرة إمدادات الرقائق في شرق آسيا تعزز قدرة تجميع أشباه الموصلات',
      subtitle: 'تحالف إقليمي يلتزم بـ 45 مليار دولار لتوسيع مصانع الطباعة الحجرية وإعادة تدوير المعادن النادرة.',
      content: `اختتمت قمة وزراء التجارة في شرق آسيا باتفاقية موقعة لتعزيز ممرات تصنيع أشباه الموصلات الإقليمية. يستهدف الصندوق المشترك مصانع طباعة حجرية متقدمة ومراكز توريد نظيفة.`,
      aiSummary: {
        overview: 'تحالف بقيمة 45 مليار دولار بين مراكز شرق آسيا يؤمن سلاسل توريد أشباه الموصلات.',
        bulletPoints: [
          'استثمار متعدد الدول في الطباعة الحجرية وأتمتة المصانع.',
          'إنشاء مخزونات إقليمية من المدخلات التصنيعية الحيوية.'
        ],
        keyTakeaway: 'يعزز شرق آسيا كمركز عالمي رئيسي لتصنيع أشباه الموصلات المتقدمة.'
      }
    }
  },

  'art-9': {
    ar: {
      title: 'صندوق حماية الغابات الاستوائية في أمريكا الجنوبية يجذب سندات خضراء',
      subtitle: 'دول الأمازون تطلق بورصة ائتمانية للاقتصاد الحيوي لتمويل الغابات المستدامة وحقوق أراضي السكان الأصليين.',
      content: `اجتمع قادة أمريكا الجنوبية في برازيليا لإكمال اتفاق الاقتصاد الحيوي الأمازوني، محددين إطار سندات خضراء سيادية مدعومة بمعايير ائتمان الكربون الدولية.`,
      aiSummary: {
        overview: 'معاهدة أمريكا الجنوبية تطلق سوق سندات خضراء لحماية تنوع الأمازون ودعم السكان الأصليين.',
        bulletPoints: [
          'ائتمانات اقتصاد حيوي سيادي مرتبطة بالحد الموثق من إزالة الغابات.',
          'تمويل مباشر مخصص لحراس الغابات من السكان الأصليين.'
        ],
        keyTakeaway: 'نموذج مالي تاريخي يوفق بين الحفاظ على البيئة والتنمية الاقتصادية الإقليمية.'
      }
    }
  },

  'art-10': {
    ar: {
      title: 'لجنة البرلمان البريطاني تقر قانون إنفاذ المنافسة الرقمية',
      subtitle: 'صلاحيات قانونية جديدة تمنح هيئة المنافسة القدرة على فرض الوصول العادل والتسعير على المنصات التكنولوجية المهيمنة.',
      content: `أقر البرلمان البريطاني بأغلبية ساحقة قانون إنفاذ المنافسة الرقمية، مما يعطي الوكالات التنظيمية تفويضات واضحة لمنع التفضيل الذاتي المناهض للمنافسة.`,
      aiSummary: {
        overview: 'بريطانيا تقر قانون منافسة رقمية صارماً يمنح رقابيي حظر الاحتكار سلطة تنظيم المنصات الاحتكارية.',
        bulletPoints: [
          'يفرض إمكانية نقل البيانات وعمولات متجر عادلة.',
          'يحظر التفضيل الذاتي في ترتيب نتائج البحث.'
        ],
        keyTakeaway: 'يرسخ المملكة المتحدة كمنظم استباقي لمنافسة الأسواق الرقمية.'
      }
    }
  }
};

// Heuristic keyword translations for dynamic news (GDELT / live stream) into Arabic/French/Spanish etc.
const DYNAMIC_WORD_MAP: Record<string, Record<Exclude<LanguageCode, 'en'>, string>> = {
  '[GDELT Event Signal]': {
    ar: '[إشارة حدث GDELT]',
    fr: "[Signal d'événement GDELT]",
    es: '[Señal de evento GDELT]',
    de: '[GDELT-Ereignissignal]',
    ja: '[GDELTイベント信号]'
  },
  'Global Event Signal Update': {
    ar: 'تحديث إشارة الأحداث العالمية',
    fr: 'Mise à jour du signal d\'événement mondial',
    es: 'Actualización de señal de eventos globales',
    de: 'Aktualisierung des globalen Ereignissignals',
    ja: 'グローバルイベント信号の更新'
  },
  'Policy & Governance': {
    ar: 'السياسات والتشريعات',
    fr: 'Politique et Gouvernance',
    es: 'Política y Gobernanza',
    de: 'Politik & Governance',
    ja: '政策とガバナンス'
  },
  'Technology': {
    ar: 'التكنولوجيا والذكاء الاصطناعي',
    fr: 'Technologie & IA',
    es: 'Tecnología e IA',
    de: 'Technologie & KI',
    ja: 'テクノロジー'
  },
  'Economy': {
    ar: 'الاقتصاد والبنوك',
    fr: 'Économie et Finance',
    es: 'Economía y Finanzas',
    de: 'Wirtschaft & Finanzen',
    ja: '経済と金融'
  },
  'United States': {
    ar: 'الولايات المتحدة',
    fr: 'États-Unis',
    es: 'Estados Unidos',
    de: 'Vereinigte Staaten',
    ja: '米国'
  },
  'European Union': {
    ar: 'الاتحاد الأوروبي',
    fr: 'Union Européenne',
    es: 'Unión Europea',
    de: 'Europäische Union',
    ja: '欧州連合'
  },
  'United Kingdom': {
    ar: 'المملكة المتحدة',
    fr: 'Royaume-Uni',
    es: 'Reino Unido',
    de: 'Vereinigtes Königreich',
    ja: '英国'
  },
  'Japan': {
    ar: 'اليابان',
    fr: 'Japon',
    es: 'Japón',
    de: 'Japan',
    ja: '日本'
  },
  'Global': {
    ar: 'عالمي',
    fr: 'Mondial',
    es: 'Global',
    de: 'Global',
    ja: 'グローバル'
  }
};

/**
 * Transforms an article into its translated form for the requested language.
 */
export function getTranslatedArticle(article: Article, lang: LanguageCode): Article {
  if (!article || lang === 'en') {
    return article;
  }

  // 1. Check if we have exact static translations for this article ID
  const staticDict = ARTICLE_TRANSLATIONS[article.id]?.[lang as Exclude<LanguageCode, 'en'>];

  // Helper to translate labels
  const topicLabel = t(lang, `topic${article.topic.charAt(0).toUpperCase() + article.topic.slice(1)}`) || article.topicLabel;
  const countryLabel = t(lang, `region${article.country.toUpperCase()}`) || article.countryLabel;

  if (staticDict) {
    return {
      ...article,
      ...staticDict,
      topicLabel: topicLabel !== `topic${article.topic.charAt(0).toUpperCase() + article.topic.slice(1)}` ? topicLabel : article.topicLabel,
      countryLabel: countryLabel !== `region${article.country.toUpperCase()}` ? countryLabel : article.countryLabel,
      aiSummary: staticDict.aiSummary
        ? {
            overview: staticDict.aiSummary.overview || article.aiSummary?.overview || '',
            bulletPoints: staticDict.aiSummary.bulletPoints || article.aiSummary?.bulletPoints || [],
            keyTakeaway: staticDict.aiSummary.keyTakeaway || article.aiSummary?.keyTakeaway || ''
          }
        : article.aiSummary,
      outletsCoverage: staticDict.outletsCoverage || article.outletsCoverage
    };
  }

  // 2. Fallback for dynamic / GDELT articles when switching to target language
  let translatedTitle = article.title;
  let translatedSubtitle = article.subtitle;
  let translatedContent = article.content;

  // Replace common prefixed titles in GDELT / dynamic feed
  Object.keys(DYNAMIC_WORD_MAP).forEach(phrase => {
    const replacement = DYNAMIC_WORD_MAP[phrase][lang as Exclude<LanguageCode, 'en'>];
    if (replacement) {
      if (translatedTitle.includes(phrase)) {
        translatedTitle = translatedTitle.replace(phrase, replacement);
      }
      if (translatedSubtitle && translatedSubtitle.includes(phrase)) {
        translatedSubtitle = translatedSubtitle.replace(phrase, replacement);
      }
    }
  });

  // Basic localized summary fallback for dynamic news if no AI summary is pre-baked
  const defaultOverview = lang === 'ar'
    ? `تقرير إخباري مباشر تم تحليله من مصادر ${article.source} حول ${topicLabel}.`
    : lang === 'fr'
    ? `Rapport d'information en direct analysé à partir de ${article.source} sur ${topicLabel}.`
    : lang === 'es'
    ? `Informe de noticias en vivo analizado desde ${article.source} sobre ${topicLabel}.`
    : lang === 'de'
    ? `Live-Nachrichtenbericht von ${article.source} zu ${topicLabel}.`
    : `ライブニュースレポート: ${article.source} による ${topicLabel} の分析。`;

  const defaultKeyTakeaway = lang === 'ar'
    ? `رصد في الوقت الفعلي ضمن قاعدة بيانات الأخبار العالمية (${topicLabel}).`
    : lang === 'fr'
    ? `Suivi en temps réel dans la base de données d'actualités mondiales (${topicLabel}).`
    : lang === 'es'
    ? `Monitoreo en tiempo real dentro de la base de datos de noticias globales (${topicLabel}).`
    : lang === 'de'
    ? `Echtzeit-Überwachung in der globalen Nachrichtendatenbank (${topicLabel}).`
    : `グローバルニュースデータベースにおけるリアルタイム監視 (${topicLabel})。`;

  return {
    ...article,
    title: translatedTitle,
    subtitle: translatedSubtitle,
    content: translatedContent,
    topicLabel,
    countryLabel,
    aiSummary: article.aiSummary
      ? {
          overview: article.aiSummary.overview,
          bulletPoints: article.aiSummary.bulletPoints,
          keyTakeaway: article.aiSummary.keyTakeaway
        }
      : {
          overview: defaultOverview,
          bulletPoints: [
            lang === 'ar' ? 'تغطية إخبارية مستمرة ومحدثة.' :
            lang === 'fr' ? 'Couverture de l\'actualité en continu.' :
            lang === 'es' ? 'Cobertura de noticias actualizada.' :
            lang === 'de' ? 'Laufende Berichterstattung.' :
            lang === 'ja' ? '継続的なニュース報道。' :
            'Updated continuous news coverage.',
            lang === 'ar' ? `مصدر الخبر: ${article.source}` :
            lang === 'fr' ? `Source: ${article.source}` :
            lang === 'es' ? `Fuente: ${article.source}` :
            lang === 'de' ? `Quelle: ${article.source}` :
            lang === 'ja' ? `情報源: ${article.source}` :
            `Source origin: ${article.source}`
          ],
          keyTakeaway: defaultKeyTakeaway
        }
  };
}
