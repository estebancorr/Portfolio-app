import { Navigation } from './components/Navigation';
import { PortfolioCard } from './components/PortfolioCard';
import { Mail, Instagram, Linkedin, Play, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { photographerProfile, photographyWork, videoWork } from './data/portfolioData';

export default function App() {
  const [activeVideo, setActiveVideo] = useState<{ title: string; href: string } | null>(null);

  useEffect(() => {
    if (!activeVideo) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveVideo(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeVideo]);

  const toEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    }
    if (url.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      return videoId ? `https://player.vimeo.com/video/${videoId}` : url;
    }
    return url;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl mb-6">{photographerProfile.name}</h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {photographerProfile.tagline}
            </p>
            <button
              onClick={() => {
                const element = document.getElementById('work');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
            >
              View My Work
              <Play className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl mb-4">Photography</h2>
            <p className="text-muted-foreground">A selection of recent photography projects</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {photographyWork.map((item, index) => (
              <PortfolioCard
                key={`${item.title}-${index}`}
                image={item.image}
                title={item.title}
                category={item.category}
                href={item.href}
                index={index}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl mb-4">Video Production</h2>
            <p className="text-muted-foreground">Cinematic storytelling and video projects</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoWork.map((item, index) => (
              <PortfolioCard
                key={`${item.title}-${index}`}
                image={item.image}
                title={item.title}
                category={item.category}
                onClick={() => setActiveVideo({ title: item.title, href: item.href })}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl mb-8">About Me</h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>{photographerProfile.role}</p>
              <p>{photographerProfile.location}</p>
              <p>{photographerProfile.yearsOfExperience}</p>
              {photographerProfile.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl mb-6">Let's Work Together</h2>
            <p className="text-lg text-muted-foreground mb-12">Have a project in mind? I'd love to hear from you.</p>

            <div className="flex justify-center gap-6 mb-12">
              <a
                href={`mailto:${photographerProfile.email}`}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
              >
                <Mail className="w-5 h-5" />
                Get in Touch
              </a>
            </div>

            <div className="flex justify-center gap-8">
              <a
                href={photographerProfile.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href={photographerProfile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>Copyright 2026 Professional Portfolio. All rights reserved.</p>
        </div>
      </footer>

      {activeVideo && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 px-4 py-8 flex items-center justify-center"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="w-full max-w-5xl bg-background rounded-xl overflow-hidden shadow-2xl border border-border"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <h3 className="text-base sm:text-lg font-medium">{activeVideo.title}</h3>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="p-2 rounded-md hover:bg-muted transition-colors"
                aria-label="Close video modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video bg-black">
              <iframe
                src={toEmbedUrl(activeVideo.href)}
                title={activeVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
