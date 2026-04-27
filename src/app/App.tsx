import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { Menu, X, Moon, Sun, Mail, Phone, MapPin, Download, ExternalLink, Github, Linkedin, Terminal, Code2, Cpu, Zap } from 'lucide-react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const skills = {
    design: ['Figma', 'Adobe XD', 'Prototyping', 'Wireframing', 'User Research', 'Design Systems'],
    programming: ['Python', 'JavaScript', 'HTML5 / CSS3', 'REST APIs', 'React', 'Django'],
    tools: ['VS Code', 'Git & GitHub', 'Jira', 'Notion', 'Slack', 'Postman']
  };

  const projects = [
    {
      title: 'HealthTrack App',
      description: 'Real-time health dashboards with personalized UI for patient monitoring',
      tech: 'Figma, React, Python',
      image: 'https://images.unsplash.com/photo-1767449441925-737379bc2c4d?w=800',
      color: '#6C63FF'
    },
    {
      title: 'EduPortal LMS',
      description: 'Interactive learning management system serving 2000+ active users',
      tech: 'JavaScript, Python, Django',
      image: 'https://images.unsplash.com/photo-1762330917056-e69b34329ddf?w=800',
      color: '#3B82F6'
    },
    {
      title: 'Design System Kit',
      description: '100+ reusable UI components with comprehensive documentation',
      tech: 'Figma, HTML/CSS, Storybook',
      image: 'https://images.unsplash.com/photo-1573868056472-22834cad367c?w=800',
      color: '#10B981'
    }
  ];

  const experience = [
    {
      title: 'Senior UI/UX Designer',
      company: 'TechNova Solutions',
      period: '2022 – Present',
      achievements: [
        'Designed 5+ SaaS products serving 50k+ users',
        'Built company-wide design system',
        'Collaborated with React development teams'
      ]
    },
    {
      title: 'UI/UX Designer & Frontend Developer',
      company: 'Pixel Craft Agency',
      period: '2020 – 2022',
      achievements: [
        'Delivered 20+ client projects',
        'Automated design workflows using Python',
        'Improved user retention by 35%'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(108, 99, 255, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(108, 99, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
        }} />
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Custom Cursor */}
      <motion.div
        className="fixed w-8 h-8 border-2 border-primary rounded-full pointer-events-none z-50 mix-blend-difference hidden lg:block"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
        }}
      />

      {/* Scanline Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-5">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-primary to-transparent h-32"
          animate={{
            y: [-100, window.innerHeight + 100]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-lg font-bold text-primary-foreground">IA</span>
              </div>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-sm hover:text-primary transition-colors"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:scale-105 transition-transform">
                Hire Me
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-4">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:hidden py-4 border-t border-border"
            >
              {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-4 py-3 hover:bg-muted rounded-lg transition-colors"
                >
                  {item}
                </button>
              ))}
              <button className="w-full mt-4 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg">
                Hire Me
              </button>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Hexagon Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                <polygon points="25,0 50,14.43 50,43.3 25,57.74 0,43.3 0,14.43" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagons)"/>
          </svg>
        </div>

        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ opacity: heroOpacity }}
            >
              {/* Terminal Header */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 mb-6 text-sm text-muted-foreground font-mono"
              >
                <Terminal className="w-4 h-4 text-primary" />
                <span className="text-primary">~/portfolio</span>
                <span>$</span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  _
                </motion.span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-5xl lg:text-7xl font-bold mb-6 relative"
              >
                <span className="relative inline-block">
                  Ishant Acharya
                  {/* Glitch Effect */}
                  <motion.span
                    className="absolute inset-0 text-primary opacity-70"
                    animate={{
                      x: [0, -2, 2, 0],
                      y: [0, 2, -2, 0],
                    }}
                    transition={{
                      duration: 0.3,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                    style={{ clipPath: 'inset(0 0 50% 0)' }}
                  >
                    Ishant Acharya
                  </motion.span>
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-2xl lg:text-3xl mb-6 font-mono"
              >
                <span className="text-muted-foreground">{'<'}</span>
                <span className="text-primary">UI/UX Designer</span>
                <span className="text-muted-foreground">{' & '}</span>
                <span className="text-purple-400">Full-Stack Developer</span>
                <span className="text-muted-foreground">{' />'}</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mb-8 max-w-xl"
              >
                <div className="font-mono text-sm text-muted-foreground mb-2">
                  <span className="text-purple-400">const</span> <span className="text-blue-400">mission</span> <span className="text-muted-foreground">=</span> <span className="text-green-400">"</span>
                </div>
                <p className="text-lg text-foreground pl-4 border-l-2 border-primary">
                  Crafting intuitive, user-centered digital experiences with data-driven design.
                </p>
                <div className="font-mono text-sm text-green-400">
                  <span>"</span><span className="text-muted-foreground">;</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                <motion.button
                  onClick={() => scrollToSection('projects')}
                  className="group relative px-8 py-3.5 bg-primary text-primary-foreground rounded-lg overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-primary"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative flex items-center gap-2 font-mono">
                    <Code2 className="w-4 h-4" />
                    View Work
                  </span>
                </motion.button>
                <motion.button
                  onClick={() => scrollToSection('contact')}
                  className="group px-8 py-3.5 border-2 border-primary rounded-lg relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-primary"
                    initial={{ y: '100%' }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative font-mono group-hover:text-primary-foreground transition-colors">
                    Contact Me
                  </span>
                </motion.button>
              </motion.div>

              {/* Tech Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-border"
              >
                {[
                  { label: 'Years XP', value: '3+', icon: Zap },
                  { label: 'Projects', value: '25+', icon: Code2 },
                  { label: 'Users', value: '50k+', icon: Cpu }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + i * 0.1 }}
                    className="text-center"
                  >
                    <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold font-mono text-primary">{stat.value}</div>
                    <div className="text-xs text-muted-foreground font-mono">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Creative Photo with Tech Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="relative"
            >
              <div className="relative w-full aspect-square">
                {/* Rotating Border */}
                <motion.div
                  className="absolute inset-0 rounded-[3rem] bg-gradient-to-r from-primary via-purple-500 to-primary opacity-50"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  style={{ padding: '2px' }}
                />

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary rounded-tl-[3rem]" />
                <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-primary rounded-tr-[3rem]" />
                <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-primary rounded-bl-[3rem]" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary rounded-br-[3rem]" />

                {/* Scan Lines */}
                <motion.div
                  className="absolute inset-0 rounded-[3rem] overflow-hidden"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, rgba(108, 99, 255, 0.1) 0px, transparent 2px, transparent 4px)',
                  }}
                />

                {/* Photo Container */}
                <div className="relative w-full h-full rounded-[3rem] overflow-hidden">
                  {/* Matrix Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/70 to-purple-600/70 mix-blend-color" />

                  {/* Hologram Lines */}
                  <motion.div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(108, 99, 255, 0.5) 2px, rgba(108, 99, 255, 0.5) 4px)',
                    }}
                    animate={{ x: [0, 20] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />

                  <img
                    src="/src/imports/image.png"
                    alt="Ishant Acharya"
                    className="w-full h-full object-cover opacity-70 blur-[2px] scale-105"
                  />

                  {/* Circuit Pattern Overlay */}
                  <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="circuit" width="100" height="100" patternUnits="userSpaceOnUse">
                          <path d="M10,10 L30,10 L30,30 L50,30" stroke="currentColor" strokeWidth="1" fill="none" className="text-primary"/>
                          <circle cx="10" cy="10" r="2" fill="currentColor" className="text-primary"/>
                          <circle cx="50" cy="30" r="2" fill="currentColor" className="text-primary"/>
                          <path d="M70,70 L70,50 L90,50" stroke="currentColor" strokeWidth="1" fill="none" className="text-primary"/>
                          <circle cx="70" cy="70" r="2" fill="currentColor" className="text-primary"/>
                          <circle cx="90" cy="50" r="2" fill="currentColor" className="text-primary"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#circuit)"/>
                    </svg>
                  </div>

                  {/* Glow Effect */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-primary to-purple-600 rounded-[3rem] opacity-50 blur-3xl -z-10" />
                </div>

                {/* Floating Tech Labels */}
                <motion.div
                  className="absolute -top-4 -right-4 px-4 py-2 bg-primary/90 backdrop-blur-sm rounded-lg border border-primary font-mono text-xs"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  SYSTEM_ACTIVE
                </motion.div>
                <motion.div
                  className="absolute -bottom-4 -left-4 px-4 py-2 bg-purple-500/90 backdrop-blur-sm rounded-lg border border-purple-400 font-mono text-xs"
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  STATUS: ONLINE
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-8">About Me</h2>
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              Creative and detail-oriented UI/UX Designer with 3+ years of experience crafting intuitive digital products.
              Skilled in bridging design and development using Python and JavaScript. Passionate about building meaningful
              user experiences backed by data insights.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '🎯', title: 'User-Centered Design', desc: 'Design driven by research', code: 'UX.research()' },
                { icon: '⚡', title: 'Frontend + UX Hybrid', desc: 'Code meets design', code: 'design && code' },
                { icon: '📊', title: 'Data-Driven Decisions', desc: 'Analytics-backed UX', code: 'analytics.insights()' },
                { icon: '🚀', title: 'SaaS Product Experience', desc: '50k+ active users', code: 'scale.users(50k)' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all overflow-hidden"
                >
                  {/* Tech Grid Background */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity">
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'linear-gradient(rgba(108, 99, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(108, 99, 255, 0.5) 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }} />
                  </div>

                  {/* Hover Glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  />

                  <div className="relative">
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{item.desc}</p>
                    <code className="text-xs font-mono text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.code}
                    </code>
                  </div>

                  {/* Corner Bracket */}
                  <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-primary/30 group-hover:border-primary transition-colors" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-primary/30 group-hover:border-primary transition-colors" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-card/50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            Skills & Expertise
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'UI/UX Design', icon: '🎨', skills: skills.design, color: '#6C63FF' },
              { title: 'Programming', icon: '💻', skills: skills.programming, color: '#8B5CF6' },
              { title: 'Tools', icon: '🧰', skills: skills.tools, color: '#A78BFA' }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all overflow-hidden"
              >
                {/* Animated Border */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `linear-gradient(135deg, ${category.color}22, transparent)`,
                  }}
                />

                {/* Tech Corner Brackets */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 opacity-30 group-hover:opacity-100 transition-opacity" style={{ borderColor: category.color }} />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 opacity-30 group-hover:opacity-100 transition-opacity" style={{ borderColor: category.color }} />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 opacity-30 group-hover:opacity-100 transition-opacity" style={{ borderColor: category.color }} />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 opacity-30 group-hover:opacity-100 transition-opacity" style={{ borderColor: category.color }} />

                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-4xl">{category.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold">{category.title}</h3>
                      <code className="text-xs font-mono text-muted-foreground">
                        ./skills/{category.title.toLowerCase().replace(/\s/g, '-')}
                      </code>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + i * 0.05 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm border border-primary/20 font-mono hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            Featured Projects
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 transition-all"
              >
                {/* Tech Frame */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative h-48 overflow-hidden">
                  {/* Scan Line Effect */}
                  <motion.div
                    className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100"
                    initial={{ y: '-100%' }}
                    whileHover={{ y: '100%' }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <div className="w-full h-32 bg-gradient-to-b from-transparent via-primary/30 to-transparent blur-sm" />
                  </motion.div>

                  {/* Grid Overlay */}
                  <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-20 transition-opacity">
                    <div className="w-full h-full" style={{
                      backgroundImage: 'linear-gradient(rgba(108, 99, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(108, 99, 255, 0.5) 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }} />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent z-10" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <div className="px-3 py-1 bg-primary/90 backdrop-blur-sm rounded-full border border-primary font-mono text-xs flex items-center gap-2">
                      <motion.div
                        className="w-2 h-2 bg-green-400 rounded-full"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      LIVE
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{project.title}</h3>
                    <Code2 className="w-5 h-5 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex items-center justify-between">
                    <code className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20">
                      {project.tech}
                    </code>
                    <motion.button
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-lg bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary/30 group-hover:border-primary transition-colors" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary/30 group-hover:border-primary transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 bg-card/50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            Experience
          </motion.h2>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-purple-500 to-primary/20" />

            {/* Animated Pulse */}
            <motion.div
              className="absolute left-[1.9375rem] top-0 w-1 h-1 bg-primary rounded-full blur-sm"
              animate={{
                y: [0, window.innerHeight * 0.5],
                opacity: [1, 0.5, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="relative pl-20 pb-12 last:pb-0 group"
              >
                {/* Timeline Dot */}
                <motion.div
                  className="absolute left-6 top-2 w-5 h-5 rounded-full bg-primary shadow-lg shadow-primary/50 border-4 border-background z-10"
                  whileHover={{ scale: 1.5 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>

                <motion.div
                  whileHover={{ x: 10 }}
                  className="p-6 rounded-2xl bg-card border border-border group-hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all overflow-hidden relative"
                >
                  {/* Tech Grid */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity">
                    <div className="w-full h-full" style={{
                      backgroundImage: 'linear-gradient(rgba(108, 99, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(108, 99, 255, 0.5) 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }} />
                  </div>

                  <div className="relative">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{exp.title}</h3>
                      <Terminal className="w-5 h-5 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <code className="text-sm font-mono text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                        {exp.company}
                      </code>
                      <span className="text-muted-foreground font-mono text-sm">{exp.period}</span>
                    </div>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2 + i * 0.1 }}
                          className="text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-primary mt-1.5 font-mono">→</span>
                          <span>{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Corner Brackets */}
                  <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-primary/30 group-hover:border-primary transition-colors" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-primary/30 group-hover:border-primary transition-colors" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center p-8 rounded-2xl bg-card border border-border"
          >
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-2xl font-semibold mb-2">BSc. Computer Science</h3>
            <p className="text-muted-foreground">Tribhuvan University, Nepal</p>
            <p className="text-muted-foreground">2016 – 2020</p>
          </motion.div>
        </div>
      </section>

      {/* Resume Section */}
      <section className="py-24 bg-card/50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-8">Resume</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 bg-primary text-primary-foreground rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download CV
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 border border-border rounded-lg hover:bg-muted transition-colors flex items-center gap-2"
              >
                <ExternalLink className="w-5 h-5" />
                View Online
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            Get In Touch
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-card transition-colors">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <a href="mailto:ishant.acharya@email.com" className="text-muted-foreground hover:text-primary transition-colors">
                    ishant.acharya@email.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-card transition-colors">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <a href="tel:+9779800000000" className="text-muted-foreground hover:text-primary transition-colors">
                    +977-9800000000
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-card transition-colors">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p className="text-muted-foreground">Pokhara, Nepal</p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="#"
                  className="p-3 bg-card border border-border rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="#"
                  className="p-3 bg-card border border-border rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Github className="w-6 h-6" />
                </motion.a>
              </div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.form
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
              <div>
                <textarea
                  rows={6}
                  placeholder="Your Message"
                  className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none transition-all"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full px-8 py-3.5 bg-primary text-primary-foreground rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all"
              >
                Send Message
              </motion.button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: 'linear-gradient(rgba(108, 99, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(108, 99, 255, 0.3) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }} />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 font-mono text-sm">
              <Terminal className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">~/portfolio</span>
              <span className="text-primary">$</span>
              <span className="text-muted-foreground">echo</span>
              <span className="text-green-400">"Thank you for visiting"</span>
            </div>
            <p className="text-muted-foreground font-mono text-sm">
              © 2026 Ishant Acharya. All rights reserved. <span className="text-primary">v1.0.0</span>
            </p>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}
