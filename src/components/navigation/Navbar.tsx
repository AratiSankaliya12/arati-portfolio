import React, { useState, useEffect } from 'react';
import { portfolioData } from '../../data/portfolio';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [overLight, setOverLight] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Detect when the navbar overlaps a light-background section (e.g. if any light footer is added)
    useEffect(() => {
        const footer = document.querySelector('footer');
        if (!footer) {
            setOverLight(false);
            return;
        }
        const observer = new IntersectionObserver(
            ([entry]) => setOverLight(entry.isIntersecting),
            { rootMargin: '-80px 0px 0px 0px', threshold: 0 }
        );
        observer.observe(footer);
        return () => observer.disconnect();
    }, []);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsMenuOpen(false);
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleEsc);
        };
    }, [isMenuOpen]);

    const navLinks = [
        { name: 'Home', href: '#', isAnchor: true },
        { name: 'About', href: '#about', isAnchor: true },
        { name: 'Projects', href: '#experience-selector', isAnchor: true },
        { name: 'Experience', href: '#experience-selector', isAnchor: true },
        { name: 'Gallary', href: '#gallery', isAnchor: true },
        { name: 'Contact', href: `mailto:${portfolioData.contact.email}`, isAnchor: false },
    ];

    const handleLinkClick = (link: typeof navLinks[0]) => {
        setIsMenuOpen(false);
        if (link.name === 'Home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (link.isAnchor) {
            const element = document.querySelector(link.href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <>
            {/* Main Navbar */}
            <nav
                className={`fixed top-0 left-0 right-0 z-[100] px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 transition-all duration-500 ${
                    overLight
                        ? 'bg-white/90 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 border-b border-black/5'
                        : scrolled
                            ? 'bg-[#080808]/95 backdrop-blur-xl supports-[backdrop-filter]:bg-[#080808]/85 border-b border-white/5'
                            : 'bg-transparent'
                }`}
            >
                <div className="max-w-7xl mx-auto grid grid-cols-3 items-center">
                    {/* Left Column */}
                    <div className="flex justify-start">
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className={`interactive group flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full border transition-all duration-300 ${
                                overLight
                                    ? 'border-black/20 hover:border-[#7C3AED] bg-black/5 hover:bg-[#7C3AED]/10'
                                    : 'border-white/30 hover:border-[#7C3AED]/50 bg-white/10 hover:bg-[#7C3AED]/5'
                            }`}
                            data-cursor="Open"
                        >
                            <div className="flex flex-col gap-1">
                                <span className={`block w-4 h-[2px] transition-all group-hover:w-5 group-hover:bg-[#7C3AED] ${overLight ? 'bg-black' : 'bg-white'}`}></span>
                                <span className={`block w-3 h-[2px] transition-all group-hover:w-5 group-hover:bg-[#7C3AED] ${overLight ? 'bg-black' : 'bg-white'}`}></span>
                            </div>
                            <span className={`text-[10px] sm:text-xs font-black tracking-widest uppercase ${overLight ? 'text-black' : 'text-white'}`}>Menu</span>
                        </button>
                    </div>

                    {/* Center Column */}
                    <div className="flex justify-center">
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="flex items-center gap-1 sm:gap-2 interactive"
                            data-cursor="Home"
                        >
                            <span className={`text-xs sm:text-sm md:text-base font-black tracking-[0.15em] uppercase ${overLight ? 'text-black/70' : 'text-white/70'}`}>Arati</span>
                            <span
                                className="text-lg sm:text-xl md:text-2xl text-[#7C3AED] italic"
                                style={{ fontFamily: "'Caveat', cursive", fontWeight: 700 }}
                            >
                                Sankaliya
                            </span>
                        </a>
                    </div>

                    {/* Right Column */}
                    <div className="flex justify-end">
                        <a
                            href={`mailto:${portfolioData.contact.email}`}
                            className="interactive group relative px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#7C3AED] text-[#080808] font-black text-[10px] sm:text-xs tracking-widest uppercase overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(124,58,237,0.3)] whitespace-nowrap"
                            data-cursor="Email"
                        >
                            <span className="relative z-10 text-[#080808] font-bold">Let's Connect</span>
                        </a>
                    </div>
                </div>
            </nav>

            {/* Full Screen Menu Overlay */}
            <div
                className={`fixed inset-0 z-[200] transition-all duration-500 ${isMenuOpen
                    ? 'opacity-100 pointer-events-auto'
                    : 'opacity-0 pointer-events-none'
                    }`}
            >
                {/* Background - Pure Black with Blur */}
                <div
                    className="absolute inset-0 bg-[#080808]/80 backdrop-blur-md supports-[backdrop-filter]:bg-[#080808]/60"
                    onClick={() => setIsMenuOpen(false)}
                />

                {/* Content - Scrollable */}
                <div className="relative h-full flex flex-col px-4 sm:px-8 md:px-16 py-6 sm:py-8 md:py-10 overflow-y-auto">
                    {/* Close Button */}
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="self-start interactive flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/10 hover:border-[#7C3AED]/50 bg-white/[0.02] hover:bg-[#7C3AED]/5 transition-all duration-300 mb-4 sm:mb-6"
                        data-cursor="Close"
                    >
                        <div className="relative w-4 h-4">
                            <span className="absolute top-1/2 left-0 w-full h-[2px] bg-white rotate-45"></span>
                            <span className="absolute top-1/2 left-0 w-full h-[2px] bg-white -rotate-45"></span>
                        </div>
                        <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase text-white">Close</span>
                    </button>

                    {/* Navigation Links - Scrollable Container */}
                    <div className="flex-1 flex flex-col justify-start gap-2 sm:gap-3 md:gap-4 py-2">
                        {navLinks.map((link, idx) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => {
                                    if (link.isAnchor) {
                                        e.preventDefault();
                                    }
                                    handleLinkClick(link);
                                }}
                                className="interactive group block"
                                data-cursor="Go"
                                style={{
                                    transform: isMenuOpen ? 'translateY(0)' : 'translateY(40px)',
                                    opacity: isMenuOpen ? 1 : 0,
                                    transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.08}s`
                                }}
                            >
                                <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
                                    <span className="text-[10px] sm:text-xs text-[#7C3AED]/60 font-mono">0{idx + 1}</span>
                                    <span className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white group-hover:text-[#7C3AED] transition-colors">
                                        {link.name}
                                    </span>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Footer Info */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-white/10 mt-auto">
                        <div>
                            <p className="text-[10px] sm:text-xs text-white/40 uppercase tracking-widest mb-1">Email</p>
                            <a href={`mailto:${portfolioData.contact.email}`} className="text-sm sm:text-base text-white hover:text-[#7C3AED] transition-colors interactive" data-cursor="Copy">
                                {portfolioData.contact.email}
                            </a>
                        </div>
                        <div className="flex gap-5 items-center">
                            <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#7C3AED] transition-colors duration-300 interactive" data-cursor="GitHub">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#7C3AED] transition-colors duration-300 interactive" data-cursor="LinkedIn">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
