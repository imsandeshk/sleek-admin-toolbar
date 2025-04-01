
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { SocialLink } from "@/services/storageService";

interface SocialLinksProps {
  links: SocialLink[];
  className?: string;
  iconSize?: number;
  showLabels?: boolean;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ 
  links, 
  className = "",
  iconSize = 24,
  showLabels = false 
}) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {links.map((link, index) => {
        // Make sure to use the correct icon from the icon set
        const Icon = (Icons as any)[link.icon] || Icons.Link;
        
        return (
          <motion.a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-accent transition-colors duration-300 flex items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.1 }}
            title={link.platform}
          >
            <Icon size={iconSize} />
            {showLabels && <span className="text-sm">{link.platform}</span>}
            {!showLabels && <span className="sr-only">{link.platform}</span>}
          </motion.a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
