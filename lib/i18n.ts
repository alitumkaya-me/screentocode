// Simple i18n system for TR/EN
export type Language = 'tr' | 'en'

export interface Translations {
  // Header
  headerTitle: string
  headerBack: string
  headerFreeTrial: string
  headerRemaining: string
  headerUpgrade: string
  
  // App Page
  appTitle: string
  appSubtitle: string
  appRemainingTrials: string
  appSelectDemo: string
  appGenerateCode: string
  appUpgradeRequired: string
  appGenerating: string
  appNewDemo: string
  appCopy: string
  appCopied: string
  appDownload: string
  appProductionReady: string
  appSuccess: string
  appTrialsLeft: string
  
  // Demo Categories
  categoryLanding: string
  categoryDashboard: string
  categoryEcommerce: string
  
  // Demo Descriptions
  demoLandingName: string
  demoLandingDesc: string
  demoDashboardName: string
  demoDashboardDesc: string
  demoEcommerceName: string
  demoEcommerceDesc: string
  
  // Features
  featureFast: string
  featureFastDesc: string
  featureClean: string
  featureCleanDesc: string
  featureAI: string
  featureAIDesc: string
  featureResponsive: string
  featureResponsiveDesc: string
  
  // Upgrade Modal
  upgradeTitle: string
  upgradeSubtitle: string
  upgradeWithTitle: string
  upgradeFeature1: string
  upgradeFeature2: string
  upgradeFeature3: string
  upgradeFeature4: string
  upgradeButton: string
  
  // Info Box
  infoTitle: string
  infoDesc: string
  infoButton: string
  
  // Footer
  footerRights: string
  footerBy: string
  footerPrivacy: string
  footerTerms: string
  footerSupport: string
  footerProduct: string
  footerSystemsUp: string
  footerPoweredBy: string
  footerProductTitle: string
  footerTryNow: string
  footerResourcesTitle: string
  footerDocumentation: string
  footerAPI: string
  footerBlog: string
  
  // Landing Page
  landingHero1: string
  landingHero2: string
  landingHero3: string
  landingSubtitle: string
  landingCTA1: string
  landingCTA2: string
  
  // Hero Section
  heroTag: string
  heroLive: string
  heroTitle1: string
  heroTitle2: string
  heroTitle3: string
  heroSubtitle1: string
  heroSubtitle2: string
  heroSubtitle3: string
  heroSubtitle4: string
  heroSubtitle5: string
  heroCTA1: string
  heroCTA2: string
  heroStats1Label: string
  heroStats2Label: string
  heroStats3Label: string
  
  // Navigation
  navFeatures: string
  navPricing: string
  navHowItWorks: string
  navFAQ: string
  
  // Features Section
  featuresTag: string
  featuresTitle1: string
  featuresTitle2: string
  featuresSubtitle: string
  
  // Feature Cards
  feature1Title: string
  feature1Desc: string
  feature2Title: string
  feature2Desc: string
  feature3Title: string
  feature3Desc: string
  feature4Title: string
  feature4Desc: string
  feature5Title: string
  feature5Desc: string
  feature6Title: string
  feature6Desc: string
  
  // How It Works Section
  howItWorksTag: string
  howItWorksTitle1: string
  howItWorksTitle2: string
  howItWorksSubtitle: string
  step1Title: string
  step1Desc: string
  step2Title: string
  step2Desc: string
  step3Title: string
  step3Desc: string
  
  // Pricing Section
  pricingSectionTag: string
  pricingSectionTitle1: string
  pricingSectionTitle2: string
  pricingSectionSubtitle: string
  
  // Demo CTA
  demoCTA: string
  demoCTASubtitle: string
  
  // FAQ Section
  faqTag: string
  faqTitle1: string
  faqTitle2: string
  faq1Q: string
  faq1A: string
  faq2Q: string
  faq2A: string
  faq3Q: string
  faq3A: string
  faq4Q: string
  faq4A: string
  faq5Q: string
  faq5A: string
  faq6Q: string
  faq6A: string
  faq7Q: string
  faq7A: string
  faq8Q: string
  faq8A: string
  faqContactTitle: string
  faqContactDesc: string
  faqContactButton: string
  
  // Pricing
  pricingTitle: string
  pricingFree: string
  pricingPro: string
  pricingEnterprise: string
  pricingMonthly: string
  pricingPerMonth: string
  pricingPerYear: string
  pricingFeatures: string
  pricingGetStarted: string
  pricingContactUs: string
  pricingUpgradePro: string
  
  // Pricing Plans Details
  pricingFreeTitle: string
  pricingFreeDesc: string
  pricingFreeButton: string
  pricingProTitle: string
  pricingProDesc: string
  pricingProPopular: string
  pricingEnterpriseTitle: string
  pricingEnterpriseDesc: string
  pricingEnterpriseButton: string
  pricingGuarantee: string
  
  // Free Plan Features
  pricingFree1: string
  pricingFree2: string
  pricingFree3: string
  pricingFree4: string
  
  // Pro Plan Features
  pricingPro1: string
  pricingPro2: string
  pricingPro3: string
  pricingPro4: string
  pricingPro5: string
  pricingPro6: string
  
  // Enterprise Plan Features
  pricingEnterprise1: string
  pricingEnterprise2: string
  pricingEnterprise3: string
  pricingEnterprise4: string
  pricingEnterprise5: string
  pricingEnterprise6: string
}

export const translations: Record<Language, Translations> = {
  tr: {
    // Header
    headerTitle: 'ScreenToCode',
    headerBack: 'Geri',
    headerFreeTrial: 'Ücretsiz Deneme',
    headerRemaining: 'Kalan',
    headerUpgrade: "Premium'a Geç",
    
    // App Page
    appTitle: 'Demo Tasarımları Seç',
    appSubtitle: 'Hazır demo tasarımlarından birini seç ve anında production-ready kod al!',
    appRemainingTrials: 'ücretsiz deneme hakkın kaldı',
    appSelectDemo: 'Yeni Demo Seç',
    appGenerateCode: 'Kodu Üret',
    appUpgradeRequired: 'Upgrade Gerekli',
    appGenerating: 'Kod Üretiliyor...',
    appNewDemo: 'Yeni Demo Seç',
    appCopy: 'Kopyala',
    appCopied: 'Kopyalandı!',
    appDownload: 'İndir',
    appProductionReady: 'Production Ready',
    appSuccess: 'Kod başarıyla üretildi!',
    appTrialsLeft: 'ücretsiz deneme hakkın kaldı.',
    
    // Demo Categories
    categoryLanding: 'Landing Page',
    categoryDashboard: 'Dashboard',
    categoryEcommerce: 'E-commerce',
    
    // Demo Descriptions
    demoLandingName: 'Modern Landing Page',
    demoLandingDesc: 'Gradient arka plan, hero section, feature cards',
    demoDashboardName: 'SaaS Dashboard',
    demoDashboardDesc: 'Sidebar navigation, stats cards, charts placeholder',
    demoEcommerceName: 'E-commerce Product Page',
    demoEcommerceDesc: 'Product gallery, price, add to cart, reviews',
    
    // Features
    featureFast: '< 3 saniye',
    featureFastDesc: 'Anında üretim',
    featureClean: 'Temiz Kod',
    featureCleanDesc: 'Production ready',
    featureAI: 'AI Powered',
    featureAIDesc: 'GPT-5 + Claude 4.5',
    featureResponsive: 'Responsive',
    featureResponsiveDesc: 'Mobile-first',
    
    // Upgrade Modal
    upgradeTitle: 'Ücretsiz Denemen Bitti! 🎉',
    upgradeSubtitle: "Premium'a geç ve sınırsız kod üretimi, kendi screenshot'larını yükleme, Figma entegrasyonu ve daha fazlasına erişim kazan!",
    upgradeWithTitle: 'Premium ile:',
    upgradeFeature1: 'Sınırsız kod üretimi',
    upgradeFeature2: "Kendi screenshot'larını yükle",
    upgradeFeature3: 'Figma entegrasyonu',
    upgradeFeature4: 'Öncelikli destek',
    upgradeButton: "Premium'a Geç →",
    
    // Info Box
    infoTitle: 'Ücretsiz deneme hakkın bitti mi?',
    infoDesc: "Premium'a geç ve sınırsız kod üretimi, kendi screenshot'larını yükleme, Figma entegrasyonu ve daha fazlasına erişim kazan!",
    infoButton: "Premium'a Geç →",
    
    // Hero Section
    heroTag: 'Yapay Zeka Destekli Yeni Nesil Kod Üretici',
    heroLive: 'CANLI',
    heroTitle1: 'Tasarımı',
    heroTitle2: 'Saniyeler İçinde',
    heroTitle3: 'Kod Haline Getir',
    heroSubtitle1: 'Ekran görüntünüzü yükleyin,',
    heroSubtitle2: 'GPT-5',
    heroSubtitle3: 've',
    heroSubtitle4: 'Claude Sonnet 4.5',
    heroSubtitle5: 'ile anında HTML, React, Vue veya Svelte koduna dönüştürün.',
    heroCTA1: 'Hemen Başla - Ücretsiz',
    heroCTA2: 'Demo Videosu İzle',
    heroStats1Label: 'Üretilen Kod',
    heroStats2Label: 'Aktif Kullanıcı',
    heroStats3Label: 'Ortalama Süre',
    
    // Footer
    footerRights: '© 2025 ScreenToCode. Tüm hakları saklıdır.',
    footerBy: 'tarafından geliştirilmiştir',
    footerPrivacy: 'Gizlilik',
    footerTerms: 'Şartlar',
    footerSupport: 'Destek',
    footerProduct: 'ürünüdür',
    footerSystemsUp: 'Tüm sistemler çalışıyor',
    footerPoweredBy: 'Powered by OpenAI & Anthropic',
    footerProductTitle: 'Ürün',
    footerTryNow: 'Hemen Dene',
    footerResourcesTitle: 'Kaynaklar',
    footerDocumentation: 'Dökümantasyon',
    footerAPI: 'API',
    footerBlog: 'Blog',
    
    // Landing Page
    landingHero1: 'Tasarımı',
    landingHero2: 'Saniyeler İçinde',
    landingHero3: 'Kod Haline Getir',
    landingSubtitle: 'Ekran görüntünüzü yükleyin, GPT-5 ve Claude Sonnet 4.5 ile anında HTML, React, Vue veya Svelte koduna dönüştürün.',
    landingCTA1: 'Hemen Dene - %100 Ücretsiz',
    landingCTA2: 'Demo İzle',
    
    // Pricing
    pricingTitle: 'Fiyatlandırma',
    pricingFree: 'Ücretsiz',
    pricingPro: 'Pro',
    pricingEnterprise: 'Enterprise',
    pricingMonthly: 'Aylık',
    pricingPerMonth: '/ay',
    pricingPerYear: '/yıl',
    pricingFeatures: 'Özellikler',
    pricingGetStarted: 'Başla',
    pricingContactUs: 'Bize Ulaşın',
    pricingUpgradePro: "Pro'ya Geç",
    
    // Pricing Plans Details
    pricingFreeTitle: 'Ücretsiz',
    pricingFreeDesc: 'Denemek için mükemmel',
    pricingFreeButton: 'Ücretsiz Başla',
    pricingProTitle: 'Pro',
    pricingProDesc: 'Profesyoneller için',
    pricingProPopular: 'EN POPÜLER',
    pricingEnterpriseTitle: 'Enterprise',
    pricingEnterpriseDesc: 'Ekipler için',
    pricingEnterpriseButton: 'Satış Ekibiyle İletişime Geç',
    pricingGuarantee: '30 Gün Para İade Garantisi',
    
    // Free Plan Features
    pricingFree1: '3 üretim/ay',
    pricingFree2: 'Sadece HTML export',
    pricingFree3: 'Temel destek',
    pricingFree4: 'Watermark dahil',
    
    // Pro Plan Features
    pricingPro1: 'Sınırsız üretim',
    pricingPro2: 'Tüm frameworkler',
    pricingPro3: 'Öncelikli destek',
    pricingPro4: 'Watermark yok',
    pricingPro5: 'ZIP export',
    pricingPro6: 'Özel tasarım',
    
    // Enterprise Plan Features
    pricingEnterprise1: 'Pro\'daki her şey',
    pricingEnterprise2: 'Ekip işbirliği',
    pricingEnterprise3: 'API erişimi',
    pricingEnterprise4: 'Özel eğitim',
    pricingEnterprise5: 'Ayrılmış destek',
    pricingEnterprise6: 'SLA garantisi',
    
    // Navigation
    navFeatures: 'Özellikler',
    navPricing: 'Fiyatlandırma',
    navHowItWorks: 'Nasıl Çalışır',
    navFAQ: 'S.S.S',
    
    // Features Section
    featuresTag: 'ÖZELLİKLER',
    featuresTitle1: 'Güçlü Özellikler,',
    featuresTitle2: 'Sınırsız Olasılıklar',
    featuresSubtitle: 'En son AI teknolojisi ile desteklenen, profesyonel geliştiriciler için tasarlanmış özellikler',
    
    // Feature Cards
    feature1Title: 'Yıldırım Hızı',
    feature1Desc: 'GPT-5 Vision ve Claude Sonnet 4.5 ile 10 saniyeden kısa sürede kodunuzu alın',
    feature2Title: 'Çoklu Framework',
    feature2Desc: 'HTML, React, Vue, Svelte - istediğiniz teknolojiye dışa aktarın',
    feature3Title: 'AI Destekli',
    feature3Desc: 'OpenAI GPT-5 ve Anthropic Claude Sonnet 4.5 ile en ileri seviye kod kalitesi',
    feature4Title: 'Figma Entegrasyonu',
    feature4Desc: 'Figma tasarımlarınızı direkt import edin, anında koda çevirin',
    feature5Title: 'Tailwind CSS',
    feature5Desc: 'Modern utility-first CSS framework ile temiz ve özelleştirilebilir kod',
    feature6Title: 'Anında Dışa Aktar',
    feature6Desc: 'Kodunuzu ZIP olarak indirin, direkt projenizde kullanın',
    
    // How It Works Section
    howItWorksTag: 'NASIL ÇALIŞIR',
    howItWorksTitle1: '3 Basit Adımda',
    howItWorksTitle2: 'Tasarımdan Koda',
    howItWorksSubtitle: 'AI teknolojisi sayesinde tasarımınızı saniyeler içinde üretime hazır koda dönüştürün',
    step1Title: 'Tasarımı Yükle',
    step1Desc: 'Screenshot, Figma linki veya herhangi bir tasarım görseli yükleyin. PNG, JPG, SVG desteklenir.',
    step2Title: 'AI Analizi',
    step2Desc: 'GPT-4 Vision tasarımınızı analiz eder. Componentleri, stilleri ve yapıyı otomatik tanır.',
    step3Title: 'Kodu Al',
    step3Desc: 'Claude Sonnet 4.5 pixel-perfect, production-ready kod üretir. HTML, React, Vue veya Svelte seçin ve indir.',
    
    // Demo CTA
    demoCTA: 'Hemen Dene - %100 Ücretsiz',
    demoCTASubtitle: 'Kredi kartı gerektirmez • Anında başlayın',
    
    // Pricing Section
    pricingSectionTag: 'FİYATLANDIRMA',
    pricingSectionTitle1: 'Basit ve Şeffaf',
    pricingSectionTitle2: 'Fiyatlandırma',
    pricingSectionSubtitle: 'Ücretsiz başlayın, ihtiyacınız olduğunda yükseltin',
    
    // FAQ Section
    faqTag: 'S.S.S',
    faqTitle1: 'Sıkça Sorulan',
    faqTitle2: 'Sorular',
    faq1Q: 'ScreenToCode nasıl çalışır?',
    faq1A: 'Screenshot veya Figma tasarımınızı yükleyin. GPT-5 Vision ile derin tasarım analizi yapılır, Claude Sonnet 4.5 ile pixel-perfect production-ready kod üretilir. HTML, React, Vue veya Svelte olarak export edebilirsiniz.',
    faq2Q: 'Hangi framework\'leri destekliyorsunuz?',
    faq2A: 'HTML + Tailwind CSS, React + Tailwind, Vue + Tailwind ve Svelte + Tailwind kombinasyonlarını destekliyoruz. Tüm kodlar modern, temiz ve production-ready olarak üretilir.',
    faq3Q: 'Üretilen kodlar gerçekten kullanılabilir mi?',
    faq3A: 'Kesinlikle! Claude Sonnet 4.5 ile üretilen kodlar production-ready, optimize edilmiş ve direkt projenizde kullanıma hazırdır. Semantic HTML5, responsive design, accessibility ve modern best practices ile yazılır.',
    faq4Q: 'Figma entegrasyonu nasıl çalışır?',
    faq4A: 'Figma tasarım linkinizi yapıştırın, sistemimiz otomatik olarak tasarımı analiz edip koda çevirir. Figma API token\'ına ihtiyacınız yoktur.',
    faq5Q: 'Ücretsiz plan ile ne kadar kod üretebilirim?',
    faq5A: 'Ücretsiz plan ile ayda 3 kod üretimi yapabilirsiniz. Pro plan ile sınırsız üretim hakkına sahip olursunuz.',
    faq6Q: 'Kodları ticari projelerimde kullanabilir miyim?',
    faq6A: 'Kesinlikle! Üretilen tüm kodlar size aittir ve herhangi bir kısıtlama olmadan ticari projelerinizde kullanabilirsiniz.',
    faq7Q: 'Para iade garantiniz var mı?',
    faq7A: 'Evet! 30 gün içinde memnun kalmazsanız, hiçbir soru sormadan tam para iadesi yapıyoruz.',
    faq8Q: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?',
    faq8A: 'Kredi kartı, banka kartı ve tüm yaygın ödeme yöntemlerini İyzico üzerinden güvenle kabul ediyoruz. Ödeme bilgileriniz şifrelenir.',
    faqContactTitle: 'Başka sorunuz mu var?',
    faqContactDesc: 'Destek ekibimiz 7/24 yardıma hazır',
    faqContactButton: 'Bize Ulaşın',
  },
  
  en: {
    // Header
    headerTitle: 'ScreenToCode',
    headerBack: 'Back',
    headerFreeTrial: 'Free Trial',
    headerRemaining: 'Remaining',
    headerUpgrade: 'Upgrade to Premium',
    
    // App Page
    appTitle: 'Choose Demo Designs',
    appSubtitle: 'Select from ready-made demo designs and get production-ready code instantly!',
    appRemainingTrials: 'free trials remaining',
    appSelectDemo: 'Select New Demo',
    appGenerateCode: 'Generate Code',
    appUpgradeRequired: 'Upgrade Required',
    appGenerating: 'Generating Code...',
    appNewDemo: 'Select New Demo',
    appCopy: 'Copy',
    appCopied: 'Copied!',
    appDownload: 'Download',
    appProductionReady: 'Production Ready',
    appSuccess: 'Code generated successfully!',
    appTrialsLeft: 'free trials remaining.',
    
    // Demo Categories
    categoryLanding: 'Landing Page',
    categoryDashboard: 'Dashboard',
    categoryEcommerce: 'E-commerce',
    
    // Demo Descriptions
    demoLandingName: 'Modern Landing Page',
    demoLandingDesc: 'Gradient background, hero section, feature cards',
    demoDashboardName: 'SaaS Dashboard',
    demoDashboardDesc: 'Sidebar navigation, stats cards, charts placeholder',
    demoEcommerceName: 'E-commerce Product Page',
    demoEcommerceDesc: 'Product gallery, price, add to cart, reviews',
    
    // Features
    featureFast: '< 3 seconds',
    featureFastDesc: 'Instant generation',
    featureClean: 'Clean Code',
    featureCleanDesc: 'Production ready',
    featureAI: 'AI Powered',
    featureAIDesc: 'GPT-5 + Claude 4.5',
    featureResponsive: 'Responsive',
    featureResponsiveDesc: 'Mobile-first',
    
    // Upgrade Modal
    upgradeTitle: 'Free Trial Ended! 🎉',
    upgradeSubtitle: 'Upgrade to Premium and get unlimited code generation, upload your own screenshots, Figma integration and more!',
    upgradeWithTitle: 'With Premium:',
    upgradeFeature1: 'Unlimited code generation',
    upgradeFeature2: 'Upload your own screenshots',
    upgradeFeature3: 'Figma integration',
    upgradeFeature4: 'Priority support',
    upgradeButton: 'Upgrade to Premium →',
    
    // Info Box
    infoTitle: 'Out of free trials?',
    infoDesc: 'Upgrade to Premium and get unlimited code generation, upload your own screenshots, Figma integration and more!',
    infoButton: 'Upgrade to Premium →',
    
    // Hero Section
    heroTag: 'AI-Powered Next Generation Code Generator',
    heroLive: 'LIVE',
    heroTitle1: 'Turn Design',
    heroTitle2: 'In Seconds',
    heroTitle3: 'Into Code',
    heroSubtitle1: 'Upload your screenshot,',
    heroSubtitle2: 'GPT-5',
    heroSubtitle3: 'and',
    heroSubtitle4: 'Claude Sonnet 4.5',
    heroSubtitle5: 'instantly convert it to HTML, React, Vue or Svelte code.',
    heroCTA1: 'Get Started - Free',
    heroCTA2: 'Watch Demo Video',
    heroStats1Label: 'Code Generated',
    heroStats2Label: 'Active Users',
    heroStats3Label: 'Average Time',
    
    // Footer
    footerRights: '© 2025 ScreenToCode. All rights reserved.',
    footerBy: 'developed by',
    footerPrivacy: 'Privacy',
    footerTerms: 'Terms',
    footerSupport: 'Support',
    footerProduct: 'product',
    footerSystemsUp: 'All systems operational',
    footerPoweredBy: 'Powered by OpenAI & Anthropic',
    footerProductTitle: 'Product',
    footerTryNow: 'Try Now',
    footerResourcesTitle: 'Resources',
    footerDocumentation: 'Documentation',
    footerAPI: 'API',
    footerBlog: 'Blog',
    
    // Landing Page
    landingHero1: 'Turn Design',
    landingHero2: 'Into Code',
    landingHero3: 'In Seconds',
    landingSubtitle: 'Upload your screenshot and instantly convert it to HTML, React, Vue or Svelte code with GPT-5 and Claude Sonnet 4.5.',
    landingCTA1: 'Try Now - 100% Free',
    landingCTA2: 'Watch Demo',
    
    // Pricing
    pricingTitle: 'Pricing',
    pricingFree: 'Free',
    pricingPro: 'Pro',
    pricingEnterprise: 'Enterprise',
    pricingMonthly: 'Monthly',
    pricingPerMonth: '/month',
    pricingPerYear: '/year',
    pricingFeatures: 'Features',
    pricingGetStarted: 'Get Started',
    pricingContactUs: 'Contact Us',
    pricingUpgradePro: 'Upgrade to Pro',
    
    // Pricing Plans Details
    pricingFreeTitle: 'Free',
    pricingFreeDesc: 'Perfect for trying out',
    pricingFreeButton: 'Start Free',
    pricingProTitle: 'Pro',
    pricingProDesc: 'For professionals',
    pricingProPopular: 'MOST POPULAR',
    pricingEnterpriseTitle: 'Enterprise',
    pricingEnterpriseDesc: 'For teams',
    pricingEnterpriseButton: 'Contact Sales Team',
    pricingGuarantee: '30 Day Money Back Guarantee',
    
    // Free Plan Features
    pricingFree1: '3 generations/month',
    pricingFree2: 'HTML export only',
    pricingFree3: 'Basic support',
    pricingFree4: 'Watermark included',
    
    // Pro Plan Features
    pricingPro1: 'Unlimited generations',
    pricingPro2: 'All frameworks',
    pricingPro3: 'Priority support',
    pricingPro4: 'No watermark',
    pricingPro5: 'ZIP export',
    pricingPro6: 'Custom design',
    
    // Enterprise Plan Features
    pricingEnterprise1: 'Everything in Pro',
    pricingEnterprise2: 'Team collaboration',
    pricingEnterprise3: 'API access',
    pricingEnterprise4: 'Custom training',
    pricingEnterprise5: 'Dedicated support',
    pricingEnterprise6: 'SLA guarantee',
    
    // Navigation
    navFeatures: 'Features',
    navPricing: 'Pricing',
    navHowItWorks: 'How It Works',
    navFAQ: 'FAQ',
    
    // Features Section
    featuresTag: 'FEATURES',
    featuresTitle1: 'Powerful Features,',
    featuresTitle2: 'Unlimited Possibilities',
    featuresSubtitle: 'Features designed for professional developers, powered by the latest AI technology',
    
    // Feature Cards
    feature1Title: 'Lightning Fast',
    feature1Desc: 'Get your code in less than 10 seconds with GPT-5 Vision and Claude Sonnet 4.5',
    feature2Title: 'Multiple Frameworks',
    feature2Desc: 'HTML, React, Vue, Svelte - export to your preferred technology',
    feature3Title: 'AI Powered',
    feature3Desc: 'Highest quality code with OpenAI GPT-5 and Anthropic Claude Sonnet 4.5',
    feature4Title: 'Figma Integration',
    feature4Desc: 'Import your Figma designs directly, convert to code instantly',
    feature5Title: 'Tailwind CSS',
    feature5Desc: 'Clean and customizable code with modern utility-first CSS framework',
    feature6Title: 'Instant Export',
    feature6Desc: 'Download your code as ZIP, use directly in your project',
    
    // How It Works Section
    howItWorksTag: 'HOW IT WORKS',
    howItWorksTitle1: 'From Design to Code',
    howItWorksTitle2: 'In 3 Simple Steps',
    howItWorksSubtitle: 'Transform your design into production-ready code in seconds with AI technology',
    step1Title: 'Upload Design',
    step1Desc: 'Upload a screenshot, Figma link or any design image. PNG, JPG, SVG supported.',
    step2Title: 'AI Analysis',
    step2Desc: 'GPT-4 Vision analyzes your design. Automatically identifies components, styles and structure.',
    step3Title: 'Get Code',
    step3Desc: 'Claude Sonnet 4.5 generates pixel-perfect, production-ready code. Choose HTML, React, Vue or Svelte and download.',
    
    // Demo CTA
    demoCTA: 'Try Now - 100% Free',
    demoCTASubtitle: 'No credit card required • Start instantly',
    
    // Pricing Section
    pricingSectionTag: 'PRICING',
    pricingSectionTitle1: 'Simple and Transparent',
    pricingSectionTitle2: 'Pricing',
    pricingSectionSubtitle: 'Start for free, upgrade when you need it',
    
    // FAQ Section
    faqTag: 'FAQ',
    faqTitle1: 'Frequently Asked',
    faqTitle2: 'Questions',
    faq1Q: 'How does ScreenToCode work?',
    faq1A: 'Upload your screenshot or Figma design. Deep design analysis is performed with GPT-5 Vision, pixel-perfect production-ready code is generated with Claude Sonnet 4.5. You can export as HTML, React, Vue or Svelte.',
    faq2Q: 'Which frameworks do you support?',
    faq2A: 'We support HTML + Tailwind CSS, React + Tailwind, Vue + Tailwind and Svelte + Tailwind combinations. All codes are generated as modern, clean and production-ready.',
    faq3Q: 'Is the generated code really usable?',
    faq3A: 'Absolutely! Code generated with Claude Sonnet 4.5 is production-ready, optimized and ready to use directly in your project. Written with semantic HTML5, responsive design, accessibility and modern best practices.',
    faq4Q: 'How does Figma integration work?',
    faq4A: 'Paste your Figma design link and our system automatically analyzes the design and converts it to code. No Figma API token required.',
    faq5Q: 'How much code can I generate with the free plan?',
    faq5A: 'With the free plan, you can generate 3 codes per month. With the Pro plan, you get unlimited generation rights.',
    faq6Q: 'Can I use the code in my commercial projects?',
    faq6A: 'Absolutely! All generated code belongs to you and you can use it in your commercial projects without any restrictions.',
    faq7Q: 'Do you have a money-back guarantee?',
    faq7A: 'Yes! If you are not satisfied within 30 days, we offer a full refund with no questions asked.',
    faq8Q: 'What payment methods do you accept?',
    faq8A: 'We securely accept credit card, debit card and all common payment methods through Stripe. Your payment information is encrypted.',
    faqContactTitle: 'Have another question?',
    faqContactDesc: 'Our support team is ready to help 24/7',
    faqContactButton: 'Contact Us',
  }
}

// Language context hook
export function useTranslation(lang: Language): Translations {
  return translations[lang]
}

// Currency helper
export function getCurrency(lang: Language): { symbol: string; code: string } {
  return lang === 'tr' 
    ? { symbol: '₺', code: 'TRY' }
    : { symbol: '$', code: 'USD' }
}

// Price conversion (approximate, should use real-time rates in production)
export function convertPrice(usdPrice: number, lang: Language): number {
  if (lang === 'tr') {
    return Math.round(usdPrice * 34) // 1 USD ≈ 34 TRY
  }
  return usdPrice
}

// Format price with currency
export function formatPrice(usdPrice: number, lang: Language): string {
  const currency = getCurrency(lang)
  const price = convertPrice(usdPrice, lang)
  return `${currency.symbol}${price}`
}
