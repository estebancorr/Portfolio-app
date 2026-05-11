import { motion } from 'motion/react';

interface PortfolioCardProps {
  image: string;
  title: string;
  category: string;
  href: string;
  index: number;
}

export function PortfolioCard({ image, title, category, href, index }: PortfolioCardProps) {
  return (
    <motion.a
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-lg aspect-[4/3] cursor-pointer"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <p className="text-sm opacity-80 mb-1">{category}</p>
          <h3 className="font-medium">{title}</h3>
        </div>
      </div>
    </motion.a>
  );
}
