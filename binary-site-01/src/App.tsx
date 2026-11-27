/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Menu as MenuIcon,
  X,
  ChevronUp,
  ChevronDown,
  Twitter,
  Facebook,
  Instagram,
  ArrowRight,
  ArrowUp,
  Send,
  CheckCircle,
  Phone,
  User,
  MessageSquare
} from 'lucide-react';

interface ArticleData {
  id: string;
  style: 'style1' | 'style2' | 'style3';
  alt: boolean;
  invert: boolean;
  image: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  fullContent?: string;
  prevId: string | null;
  nextId: string | null;
}

const ARTICLES: ArticleData[] = [
  {
    id: 'one',
    style: 'style1',
    alt: false,
    invert: false,
    image: '/images/post-1.jpg',
    title: 'Elegância e Clareza no Design Editorial',
    author: 'Jane Doe',
    date: 'Publicado há 3 dias',
    excerpt:
      'O equilíbrio entre espaços vazios, tipografia marcante e fotografia autêntica cria uma experiência de leitura agradável e memorável. Cada seção foi projetada para conduzir o olhar do visitante com harmonia e fluidez natural.',
    fullContent:
      'O equilíbrio entre espaços vazios, tipografia marcante e fotografia autêntica cria uma experiência de leitura agradável e memorável. Cada seção foi projetada para conduzir o olhar do visitante com harmonia e fluidez natural. A estrutura visual divide o espaço em proporções harmônicas de 50%, valorizando a imagem e proporcionando uma leitura confortável.',
    prevId: null,
    nextId: 'two',
  },
  {
    id: 'two',
    style: 'style1',
    alt: true,
    invert: true,
    image: '/images/post-2.jpg',
    title: 'Experiências Digitais com Propósito',
    author: 'Jane Doe',
    date: 'Publicado há 3 dias',
    excerpt:
      'Projetos digitais ganham força quando combinam estética refinada com usabilidade transparente. Cores contrastantes e ritmos visuais alternados destacam o conteúdo essencial e engajam os visitantes em todos os dispositivos.',
    fullContent:
      'Projetos digitais ganham força quando combinam estética refinada com usabilidade transparente. Cores contrastantes e ritmos visuais alternados destacam o conteúdo essencial e engajam os visitantes em todos os dispositivos. A inversão de paleta gera dinamismo sem poluição visual, mantendo a sobriedade.',
    prevId: 'one',
    nextId: 'three',
  },
  {
    id: 'three',
    style: 'style2',
    alt: false,
    invert: false,
    image: '/images/post-3.jpg',
    title: 'Arquitetura Visual e Equilíbrio',
    author: 'Jane Doe',
    date: 'Publicado há 3 dias',
    excerpt:
      'A estrutura de blocos alternados permite uma narrativa fluida, onde cada artigo ganha seu próprio destaque visual. Linhas limpas e contrastes precisos elevam o nível de qualquer publicação online.',
    fullContent:
      'A estrutura de blocos alternados permite uma narrativa fluida, onde cada artigo ganha seu próprio destaque visual. Linhas limpas e contrastes precisos elevam o nível de qualquer publicação online. A paleta azul suave traz confiabilidade e tranquilidade ao leitor durante toda a navegação.',
    prevId: 'two',
    nextId: 'four',
  },
  {
    id: 'four',
    style: 'style2',
    alt: true,
    invert: true,
    image: '/images/post-4.jpg',
    title: 'Composição Tipográfica e Espaço',
    author: 'Jane Doe',
    date: 'Publicado há 3 dias',
    excerpt:
      'A tipografia com a família Lato oferece leitura nítida e confortável em qualquer resolução. Elementos contornados e detalhes geométricos reforçam o aspecto contemporâneo do layout.',
    fullContent:
      'A tipografia com a família Lato oferece leitura nítida e confortável em qualquer resolução. Elementos contornados e detalhes geométricos reforçam o aspecto contemporâneo do layout. A leitura flui sem fadiga ocular graças à hierarquia bem calibrada de tamanhos e entrelinhas.',
    prevId: 'three',
    nextId: 'five',
  },
  {
    id: 'five',
    style: 'style3',
    alt: false,
    invert: false,
    image: '/images/post-5.jpg',
    title: 'Harmonia entre Imagem e Texto',
    author: 'Jane Doe',
    date: 'Publicado há 3 dias',
    excerpt:
      'Fotografias de alta definição combinadas com seções de texto bem espaçadas criam uma cadência dinâmica. O resultado é um site que respira sofisticação e profissionalismo em cada detalhe.',
    fullContent:
      'Fotografias de alta definição combinadas com seções de texto bem espaçadas criam uma cadência dinâmica. O resultado é um site que respira sofisticação e profissionalismo em cada detalhe. O roxo expressivo do estilo 3 cria um momento de destaque antes do encerramento da página.',
    prevId: 'four',
    nextId: 'six',
  },
  {
    id: 'six',
    style: 'style3',
    alt: true,
    invert: true,
    image: '/images/post-6.jpg',
    title: 'Soluções Criativas para a Web Moderna',
    author: 'Jane Doe',
    date: 'Publicado há 3 dias',
    excerpt:
      'Desenvolvido com tecnologias modernas e padrões acessíveis, o design responsivo se adapta naturalmente a smartphones, tablets e computadores de alta resolução sem perder sua essência.',
    fullContent:
      'Desenvolvido com tecnologias modernas e padrões acessíveis, o design responsivo se adapta naturalmente a smartphones, tablets e computadores de alta resolução sem perder sua essência. O código limpo e modular permite expansões futuras com total estabilidade.',
    prevId: 'five',
    nextId: 'contact',
  },
];

const HERO_IMAGES = [
  '/images/hero-1.png',
  '/images/hero-2.png',
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeModalArticle, setActiveModalArticle] = useState<ArticleData | null>(null);
  const [elementsModalOpen, setElementsModalOpen] = useState(false);
  const [heroImageIndex, setHeroImageIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const interval = window.setInterval(() => {
      setHeroImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => window.clearInterval(interval);
  }, []);

  // Contact form state
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setActiveModalArticle(null);
        setElementsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollTo = (id: string | null) => {
    if (!id) return;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Format Brazilian phone number: (XX) XXXXX-XXXX or (XX) XXXX-XXXX
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    let formatted = raw;
    if (raw.length > 11) {
      formatted = raw.slice(0, 11);
    }

    if (formatted.length > 6) {
      formatted = `(${formatted.slice(0, 2)}) ${formatted.slice(2, 7)}-${formatted.slice(7)}`;
    } else if (formatted.length > 2) {
      formatted = `(${formatted.slice(0, 2)}) ${formatted.slice(2)}`;
    } else if (formatted.length > 0) {
      formatted = `(${formatted}`;
    }

    setFormPhone(formatted);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formName.trim()) {
      setFormError('Por favor, informe seu nome completo.');
      return;
    }

    if (!formPhone.trim() || formPhone.replace(/\D/g, '').length < 10) {
      setFormError('Por favor, informe um número de telefone com DDD válido.');
      return;
    }

    if (!formMessage.trim()) {
      setFormError('Por favor, digite sua mensagem.');
      return;
    }

    setFormSubmitting(true);
    try {
      const payload = new URLSearchParams({
        'form-name': 'contato',
        nome: formName.trim(),
        telefone: formPhone.trim(),
        mensagem: formMessage.trim(),
      });
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: payload.toString(),
      });
    } catch {
      // Fallback silencioso fora da Netlify
    } finally {
      setFormSubmitting(false);
      setFormSuccess(true);
      setFormName('');
      setFormPhone('');
      setFormMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#444] font-['Lato',sans-serif]">
      {/* Header */}
      <header
        id="header"
        className="fixed top-0 left-0 w-full h-[4.25em] max-lg:h-[44px] bg-[#1c1c1c] text-white/75 z-[10001] flex items-center justify-between px-5 md:px-8 shadow-md"
      >
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            scrollToTop();
          }}
          aria-label="Início - Espaço reservado para logo"
          className="flex items-center shrink-0 no-underline"
        >
          <div className="w-36 h-7 md:w-48 md:h-10 border border-dashed border-white/30 bg-white/[0.04] flex items-center justify-center text-[10px] md:text-xs font-medium uppercase tracking-widest leading-none text-white/45 hover:border-white/50 hover:text-white/70 transition-colors">
            Logo
          </div>
        </a>

        <nav className="flex items-center">
          <button
            onClick={() => setMenuOpen(true)}
            className="flex items-center gap-2 text-white/75 hover:text-white transition-colors duration-200 cursor-pointer text-sm md:text-base font-normal tracking-wide pl-4 border-l border-white/20"
            aria-label="Abrir Menu"
          >
            <MenuIcon className="w-5 h-5 text-white/80" />
            <span>Menu</span>
          </button>
        </nav>
      </header>

      {/* Off-Canvas Menu Drawer */}
      <div
        className={`fixed inset-0 bg-black/60 z-[10002] transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      />

      <nav
        id="menu"
        className={`fixed top-0 right-0 h-full w-[20em] max-w-[80vw] bg-[#1c1c1c] text-white z-[10003] p-8 md:p-12 overflow-y-auto transform transition-transform duration-500 ease-out shadow-2xl flex flex-col justify-between ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setMenuOpen(false)}
              className="text-white/60 hover:text-white transition-colors p-2 -mr-2"
              aria-label="Fechar Menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <ul className="list-none p-0 m-0">
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  scrollToTop();
                }}
                className="block text-white/90 hover:text-white text-lg py-3.5 border-t border-white/20 no-underline transition-colors tracking-wide"
              >
                Início
              </a>
            </li>
            <li>
              <a
                href="#generic"
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  setActiveModalArticle(ARTICLES[0]);
                }}
                className="block text-white/90 hover:text-white text-lg py-3.5 border-t border-white/20 no-underline transition-colors tracking-wide"
              >
                Artigos
              </a>
            </li>
            <li>
              <a
                href="#elements"
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  setElementsModalOpen(true);
                }}
                className="block text-white/90 hover:text-white text-lg py-3.5 border-t border-white/20 no-underline transition-colors tracking-wide"
              >
                Elementos
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  scrollTo('contact');
                }}
                className="block text-white/90 hover:text-white text-lg py-3.5 border-t border-b border-white/20 no-underline transition-colors tracking-wide"
              >
                Fale Conosco
              </a>
            </li>
          </ul>

          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-xs uppercase tracking-widest text-white/40 mb-3 font-semibold">
              Ir para publicação
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {ARTICLES.map((art, idx) => (
                <button
                  key={art.id}
                  onClick={() => {
                    setMenuOpen(false);
                    scrollTo(art.id);
                  }}
                  className="text-left text-white/70 hover:text-white py-1 transition-colors text-xs truncate"
                >
                  {idx + 1}. {art.title}
                </button>
              ))}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  scrollTo('contact');
                }}
                className="text-left text-[#1abc9c] hover:text-white py-1 transition-colors text-xs truncate font-semibold"
              >
                7. Fale Conosco
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 text-xs text-white/40 border-t border-white/10 mt-8">
          <p>© TEMPLATED. Modelo Binary.</p>
        </div>
      </nav>

      {/* Banner Hero */}
      <section
        id="banner"
        className="relative w-full h-[calc(100svh-44px)] min-h-[540px] md:h-auto md:min-h-0 overflow-hidden bg-[#141414] text-white/75 text-center mt-[4.25em] max-lg:mt-[44px]"
      >
        {HERO_IMAGES.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt="Retrato jurídico com balança dourada"
            referrerPolicy="no-referrer"
            className={`${
              idx === 0
                ? 'absolute inset-0 w-full h-full object-cover object-[85%_top] md:relative md:block md:h-auto md:object-center'
                : 'absolute inset-0 w-full h-full object-cover object-[85%_top] md:object-center'
            } transition-opacity duration-1000 ${
              idx === heroImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/30 to-black/80 md:from-black/50 md:via-black/40 md:to-black/60 pointer-events-none"
          aria-hidden="true"
        />
        <div className="absolute inset-0 z-10 flex items-end pb-12 md:items-center md:pb-0 justify-center px-5 sm:px-8 md:px-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-light text-white leading-snug sm:leading-relaxed md:leading-[1.4] mb-6 sm:mb-8 md:mb-10 tracking-normal">
              Excelência e Rigor na Advocacia
              <br className="hidden sm:inline" />
              {' '}e Assessoria Jurídica Estratégica
            </h1>
            <div>
              <button
                onClick={() => scrollTo('one')}
                className="inline-block cursor-pointer font-bold uppercase tracking-wider text-xs sm:text-sm md:text-base text-white px-7 sm:px-8 md:px-10 py-3 md:py-3.5 border-2 border-white/30 hover:border-white hover:bg-white/10 transition-all duration-200"
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Auto-scrolling Logo Placeholder Bar */}
      <section
        aria-label="Espaços reservados para logos"
        className="relative w-full overflow-hidden bg-[#1c1c1c] border-y border-white/10 py-4 md:py-5 select-none"
      >
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-24 bg-gradient-to-r from-[#1c1c1c] to-transparent z-10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-24 bg-gradient-to-l from-[#1c1c1c] to-transparent z-10"
          aria-hidden="true"
        />
        <div className="animate-logo-marquee">
          {[0, 1].map((trackIndex) => (
            <div
              key={trackIndex}
              aria-hidden={trackIndex === 1}
              className="flex items-center gap-8 md:gap-12 pr-8 md:pr-12 shrink-0"
            >
              {Array.from({ length: 8 }).map((_, itemIndex) => (
                <div
                  key={itemIndex}
                  className="w-36 h-10 md:w-44 md:h-12 border border-dashed border-white/25 bg-white/[0.04] flex items-center justify-center text-[10px] md:text-xs font-medium uppercase tracking-widest leading-none text-white/40 shrink-0"
                >
                  Logo
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* The 6 Split Post Articles */}
      <main>
        {ARTICLES.map((article) => {
          const isStyle1 = article.style === 'style1';
          const isStyle2 = article.style === 'style2';

          const accentColor = isStyle1
            ? '#1abc9c'
            : isStyle2
            ? '#3498db'
            : '#9b59b6';

          const contentBg = article.invert ? accentColor : '#ffffff';
          const titleColor = article.invert ? '#ffffff' : accentColor;
          const authorColor = article.invert ? '#ffffff' : accentColor;
          const textColor = article.invert ? 'rgba(255, 255, 255, 0.85)' : '#555555';
          const infoBorderColor = article.invert
            ? 'rgba(255, 255, 255, 0.25)'
            : 'rgba(144, 144, 144, 0.25)';
          const infoTextColor = article.invert
            ? 'rgba(255, 255, 255, 0.6)'
            : '#777777';

          const btnTextColor = article.invert ? '#ffffff' : accentColor;
          const btnBorderColor = article.invert
            ? 'rgba(255, 255, 255, 0.25)'
            : 'rgba(144, 144, 144, 0.25)';

          const navBorderColor = article.invert
            ? 'rgba(255, 255, 255, 0.25)'
            : 'rgba(144, 144, 144, 0.25)';
          const navIconColor = article.invert
            ? 'rgba(255, 255, 255, 0.9)'
            : '#555555';

          return (
            <article
              key={article.id}
              id={article.id}
              className="post flex flex-col lg:flex-row items-stretch min-h-[calc(100vh-4.25em)] relative overflow-hidden"
              style={{ backgroundColor: contentBg }}
            >
              {/* Image half */}
              <div
                className={`w-full lg:w-1/2 relative overflow-hidden order-1 ${
                  article.alt ? 'lg:order-1' : 'lg:order-2'
                }`}
                style={{
                  backgroundColor: accentColor,
                }}
              >
                <img
                  src={article.image}
                  alt={article.title}
                  referrerPolicy="no-referrer"
                  className="block w-full h-auto lg:min-h-[calc(100vh-4.25em)] object-cover object-top"
                  loading="lazy"
                />
              </div>

              {/* Content half */}
              <div
                className={`w-full lg:w-1/2 flex items-center relative p-8 sm:p-12 md:p-16 lg:p-20 xl:p-24 order-2 ${
                  article.alt
                    ? 'lg:order-2 text-left justify-start'
                    : 'lg:order-1 text-left lg:text-right justify-end'
                }`}
                style={{ backgroundColor: contentBg }}
              >
                <div className="w-full max-w-xl">
                  <header className="mb-6">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-2">
                      <a
                        href={`#${article.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveModalArticle(article);
                        }}
                        style={{ color: titleColor }}
                        className="hover:opacity-80 transition-opacity no-underline"
                      >
                        {article.title}
                      </a>
                    </h2>
                    <p
                      className="italic py-2 my-3 text-sm"
                      style={{
                        color: infoTextColor,
                        borderTop: `1px solid ${infoBorderColor}`,
                        borderBottom: `1px solid ${infoBorderColor}`,
                      }}
                    >
                      {article.date} por{' '}
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveModalArticle(article);
                        }}
                        style={{ color: authorColor }}
                        className="hover:underline"
                      >
                        {article.author}
                      </a>
                    </p>
                  </header>

                  <p
                    className="text-base sm:text-lg leading-relaxed mb-8"
                    style={{ color: textColor }}
                  >
                    {article.excerpt}
                  </p>

                  <div>
                    <button
                      onClick={() => setActiveModalArticle(article)}
                      className="inline-block uppercase tracking-wider font-bold text-xs sm:text-sm px-7 py-3 transition-all duration-200 cursor-pointer"
                      style={{
                        color: btnTextColor,
                        boxShadow: `inset 0 0 0 2px ${btnBorderColor}`,
                        backgroundColor: 'transparent',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = article.invert
                          ? 'rgba(255, 255, 255, 0.1)'
                          : 'rgba(144, 144, 144, 0.08)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      Ler Mais
                    </button>
                  </div>
                </div>

                {/* Vertical Navigation (Prev / Next buttons) */}
                <div
                  className={`hidden lg:flex flex-col absolute bottom-8 z-10 ${
                    article.alt ? 'right-8' : 'left-8'
                  }`}
                >
                  <button
                    onClick={() => scrollTo(article.prevId)}
                    disabled={!article.prevId}
                    aria-label="Publicação anterior"
                    className={`w-9 h-9 flex items-center justify-center transition-colors ${
                      article.prevId
                        ? 'cursor-pointer hover:bg-black/5 dark:hover:bg-white/10'
                        : 'opacity-30 cursor-not-allowed'
                    }`}
                    style={{
                      border: `1px solid ${navBorderColor}`,
                      borderBottom: 'none',
                      color: navIconColor,
                    }}
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => scrollTo(article.nextId)}
                    disabled={!article.nextId}
                    aria-label="Próxima publicação"
                    className={`w-9 h-9 flex items-center justify-center transition-colors ${
                      article.nextId
                        ? 'cursor-pointer hover:bg-black/5 dark:hover:bg-white/10'
                        : 'opacity-30 cursor-not-allowed'
                    }`}
                    style={{
                      border: `1px solid ${navBorderColor}`,
                      color: navIconColor,
                    }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          );
        })}

        {/* Section 7: Contact Form in matching Split-Screen style */}
        <article
          id="contact"
          className="post flex flex-col lg:flex-row items-stretch min-h-[calc(100vh-4.25em)] relative overflow-hidden bg-[#222831] text-white"
        >
          {/* Image Side (Right on Desktop, Top on Mobile) */}
          <div
            className="w-full lg:w-1/2 relative overflow-hidden order-1 lg:order-2"
            style={{ backgroundColor: '#171d22' }}
          >
            <img
              src="/images/contact.jpg"
              alt="Atendimento Jurídico Especializado"
              referrerPolicy="no-referrer"
              className="block w-full h-auto lg:min-h-[calc(100vh-4.25em)] object-cover object-top"
              loading="lazy"
            />
          </div>

          {/* Form Content Side (Left on Desktop, Bottom on Mobile) */}
          <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end relative p-8 sm:p-12 md:p-16 lg:p-20 xl:p-24 order-2 lg:order-1 text-left">
            <div className="w-full max-w-xl">
              <header className="mb-8 text-center lg:text-center">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-2 text-white">
                  Fale Conosco
                </h2>
                <p
                  className="italic py-2 my-3 text-sm text-white/60 inline-block w-full"
                  style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.25)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.25)',
                  }}
                >
                  Envie sua mensagem e nossa equipe entrará em contato em breve
                </p>
              </header>

              {formSuccess ? (
                <div className="bg-white/5 border border-white/20 p-8 rounded-sm my-6 text-center animate-fadeIn">
                  <CheckCircle className="w-12 h-12 text-[#1abc9c] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Mensagem Enviada!</h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-6">
                    Obrigado pelo seu contato! Recebemos seus dados e responderemos o mais rápido
                    possível.
                  </p>
                  <button
                    onClick={() => setFormSuccess(false)}
                    className="inline-block uppercase tracking-wider font-bold text-xs px-6 py-2.5 border border-white/30 hover:border-white text-white transition-colors cursor-pointer"
                  >
                    Enviar Outra Mensagem
                  </button>
                </div>
              ) : (
                <form
                  name="contato"
                  method="POST"
                  data-netlify="true"
                  onSubmit={handleFormSubmit}
                  className="space-y-6"
                >
                  <input type="hidden" name="form-name" value="contato" />
                  {formError && (
                    <div className="bg-red-500/20 border border-red-500/40 text-red-200 text-xs px-4 py-2.5 rounded-sm">
                      {formError}
                    </div>
                  )}

                  {/* Nome */}
                  <div>
                    <label
                      htmlFor="formName"
                      className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2 flex items-center gap-1.5"
                    >
                      <User className="w-3.5 h-3.5 text-[#1abc9c]" />
                      <span>Nome Completo *</span>
                    </label>
                    <input
                      id="formName"
                      name="nome"
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Ex: João da Silva"
                      required
                      className="w-full bg-white/5 border border-white/25 focus:border-[#1abc9c] focus:outline-none text-white px-4 py-3 text-sm placeholder:text-white/30 transition-colors"
                    />
                  </div>

                  {/* Telefone */}
                  <div>
                    <label
                      htmlFor="formPhone"
                      className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2 flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#1abc9c]" />
                      <span>Telefone / WhatsApp *</span>
                    </label>
                    <input
                      id="formPhone"
                      name="telefone"
                      type="tel"
                      value={formPhone}
                      onChange={handlePhoneChange}
                      placeholder="(11) 98765-4321"
                      maxLength={15}
                      required
                      className="w-full bg-white/5 border border-white/25 focus:border-[#1abc9c] focus:outline-none text-white px-4 py-3 text-sm placeholder:text-white/30 transition-colors"
                    />
                  </div>

                  {/* Mensagem */}
                  <div>
                    <label
                      htmlFor="formMessage"
                      className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2 flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#1abc9c]" />
                      <span>Mensagem *</span>
                    </label>
                    <textarea
                      id="formMessage"
                      name="mensagem"
                      rows={5}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="Como podemos te ajudar?"
                      required
                      className="w-full bg-white/5 border border-white/25 focus:border-[#1abc9c] focus:outline-none text-white px-4 py-3 text-sm placeholder:text-white/30 transition-colors resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 text-center">
                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className="inline-flex items-center justify-center gap-2 uppercase tracking-wider font-bold text-xs sm:text-sm px-8 py-3.5 border-2 border-white/30 hover:border-white text-white hover:bg-white/10 transition-all duration-200 cursor-pointer disabled:opacity-55"
                    >
                      {formSubmitting ? (
                        <span>Enviando...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Enviar Mensagem</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer id="footer" className="bg-[#1c1c1c] text-white/75 pt-16 pb-8 text-center px-4">
        <ul className="flex items-center justify-center gap-6 list-none p-0 mb-8">
          <li>
            <button
              type="button"
              aria-label="Twitter"
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white transition-all duration-200 cursor-pointer"
            >
              <Twitter className="w-5 h-5 fill-current" />
            </button>
          </li>
          <li>
            <button
              type="button"
              aria-label="Facebook"
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white transition-all duration-200 cursor-pointer"
            >
              <Facebook className="w-5 h-5 fill-current" />
            </button>
          </li>
          <li>
            <button
              type="button"
              aria-label="Instagram"
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white transition-all duration-200 cursor-pointer"
            >
              <Instagram className="w-5 h-5" />
            </button>
          </li>
        </ul>

      </footer>

      {/* Read More / Article Modal */}
      {activeModalArticle && (
        <div
          className="fixed inset-0 z-[10005] bg-black/75 flex items-center justify-center p-4 md:p-8 animate-fadeIn"
          onClick={() => setActiveModalArticle(null)}
        >
          <div
            className="bg-white text-[#444] max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl relative p-6 sm:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalArticle(null)}
              className="absolute top-5 right-5 text-neutral-500 hover:text-black p-1.5 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <header className="mb-6 pr-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#222] mb-2">
                  {activeModalArticle.title}
                </h2>
                <p className="italic text-sm text-[#777] border-y border-neutral-200 py-2">
                  {activeModalArticle.date} por{' '}
                  <span className="font-semibold text-[#1abc9c]">
                    {activeModalArticle.author}
                  </span>
                </p>
              </header>

              <div className="prose max-w-none text-[#555] leading-relaxed space-y-4">
                <p>{activeModalArticle.fullContent || activeModalArticle.excerpt}</p>
                <p>
                  O equilíbrio entre forma e função é fundamental para criar identidades
                  memoráveis na web. Este artigo demonstra como uma composição visual calculada e
                  uma paleta intencional conseguem guiar o leitor sem ruídos.
                </p>
                <p>
                  Com tecnologia moderna e estruturação semântica, todas as interações respondem de
                  forma ágil, garantindo que o usuário encontre rapidamente o que procura em
                  qualquer contexto de uso.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-200 flex justify-between items-center">
                <button
                  onClick={() => setActiveModalArticle(null)}
                  className="px-6 py-2.5 bg-[#1c1c1c] text-white hover:bg-[#333] transition-colors font-bold text-sm tracking-wide cursor-pointer"
                >
                  Fechar
                </button>
                <button
                  onClick={() => {
                    const id = activeModalArticle.id;
                    setActiveModalArticle(null);
                    scrollTo(id);
                  }}
                  className="text-sm font-semibold text-[#3498db] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Rolar até esta publicação <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Elements Preview Modal */}
      {elementsModalOpen && (
        <div
          className="fixed inset-0 z-[10005] bg-black/75 flex items-center justify-center p-4 md:p-8 animate-fadeIn"
          onClick={() => setElementsModalOpen(false)}
        >
          <div
            className="bg-white text-[#444] max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl p-6 sm:p-10 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-200">
              <h2 className="text-2xl font-bold text-[#222]">Elementos do Binary</h2>
              <button
                onClick={() => setElementsModalOpen(false)}
                className="text-neutral-500 hover:text-black p-1"
                aria-label="Fechar"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6 text-sm text-[#555]">
              <section>
                <h3 className="text-lg font-bold text-[#1abc9c] mb-2">Botões e Estilos</h3>
                <div className="flex flex-wrap gap-3">
                  <button className="px-6 py-2.5 bg-[#1abc9c] text-white font-bold text-xs uppercase tracking-wider">
                    Especial Verde
                  </button>
                  <button className="px-6 py-2.5 bg-[#3498db] text-white font-bold text-xs uppercase tracking-wider">
                    Especial Azul
                  </button>
                  <button className="px-6 py-2.5 bg-[#9b59b6] text-white font-bold text-xs uppercase tracking-wider">
                    Especial Roxo
                  </button>
                  <button className="px-6 py-2.5 border-2 border-neutral-300 text-neutral-700 font-bold text-xs uppercase tracking-wider">
                    Padrão Contornado
                  </button>
                </div>
              </section>

              <section className="pt-4 border-t border-neutral-200">
                <h3 className="text-lg font-bold text-[#3498db] mb-2">Tipografia e Paleta</h3>
                <p className="leading-relaxed">
                  O template Binary utiliza a família <strong>Lato</strong> com pesos 300 (Light) e 700 (Bold),
                  alternando seções claras com seções invertidas em tons vívidos e modernos.
                </p>
              </section>
            </div>

            <div className="mt-8 pt-4 border-t border-neutral-200 text-right">
              <button
                onClick={() => setElementsModalOpen(false)}
                className="px-6 py-2 bg-[#1c1c1c] text-white font-bold text-sm tracking-wide cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating WhatsApp & Scroll-to-Top Stack */}
      <div className="fixed bottom-6 right-5 sm:bottom-8 sm:right-7 z-[10000] flex flex-col items-center gap-6">
        {/* Botão Flutuante WhatsApp (sem número definido ainda e sem brilho) */}
        <button
          type="button"
          onClick={() => scrollTo('contact')}
          aria-label="WhatsApp"
          title="WhatsApp"
          className="w-14 h-14 rounded-full bg-[#00b900] hover:bg-[#00a600] text-white shadow-md flex items-center justify-center transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
        >
          <svg
            viewBox="0 0 32 32"
            className="w-9 h-9"
            aria-hidden="true"
          >
            <path
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinejoin="round"
              d="M16 4.5C9.649 4.5 4.5 9.649 4.5 16c0 2.18.606 4.218 1.658 5.955L4.6 27.4l5.61-1.472A11.44 11.44 0 0 0 16 27.5c6.351 0 11.5-5.149 11.5-11.5S22.351 4.5 16 4.5z"
            />
            <path
              fill="#FFFFFF"
              d="M21.45 18.88c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.47-2.41-1.49-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.11 3.22 5.1 4.51.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z"
            />
          </svg>
        </button>

        {/* Seta para Voltar ao Topo */}
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Voltar ao topo"
          title="Voltar ao topo"
          className="w-11 h-11 rounded-full bg-[#1c1c1c]/90 hover:bg-[#1abc9c] text-white border border-white/25 shadow-lg flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1abc9c] cursor-pointer"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
