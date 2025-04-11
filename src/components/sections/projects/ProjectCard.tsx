
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Project } from '@/services/storageService';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ExternalLink, 
  Github, 
  Star, 
  Maximize2,
  Calendar,
  Code
} from 'lucide-react';
import EditControls from '@/components/EditControls';

interface ProjectCardProps {
  project: Project;
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isAdmin = false,
  onEdit,
  onDelete,
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group glass-card rounded-xl overflow-hidden hover-glow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{
        y: -5,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          animate={{ 
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Pinned indicator */}
        {project.pinned && (
          <motion.div 
            className="absolute top-3 right-3 text-accent"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Star className="fill-accent drop-shadow-glow" size={22} />
          </motion.div>
        )}
        
        {/* View details overlay */}
        <motion.div 
          className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: isHovered ? 1 : 0.8, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            <Button variant="outline" size="sm" className="hover:bg-accent hover:text-white border-white/20 text-white">
              <Maximize2 className="mr-2 h-4 w-4" />
              View Details
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5 bg-gradient-to-b from-black/40 to-black/60">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gradient">{project.title}</h3>
          
          {isAdmin && onEdit && onDelete && (
            <EditControls onEdit={onEdit} onDelete={onDelete} />
          )}
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {project.description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.tags && project.tags.length > 0 ? (
            <>
              {project.tags.slice(0, 3).map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-xs bg-white/5 hover:bg-white/10 transition-colors"
                >
                  {tag}
                </Badge>
              ))}
              {project.tags.length > 3 && (
                <Badge 
                  variant="outline" 
                  className="text-xs bg-white/5 hover:bg-white/10 transition-colors"
                >
                  +{project.tags.length - 3}
                </Badge>
              )}
            </>
          ) : (
            <Badge variant="outline" className="text-xs">No tags</Badge>
          )}
        </div>
        
        {/* Links */}
        <div className="flex gap-2">
          {project.url && (
            <Button 
              size="sm" 
              variant="outline" 
              asChild
              className="text-xs bg-white/5 hover:bg-accent hover:text-white transition-all duration-300 border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <a 
                href={project.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <ExternalLink className="mr-1 h-3 w-3" />
                Live Demo
              </a>
            </Button>
          )}
          
          {project.github && (
            <Button 
              size="sm" 
              variant="outline" 
              asChild
              className="text-xs bg-white/5 hover:bg-accent hover:text-white transition-all duration-300 border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <Github className="mr-1 h-3 w-3" />
                Code
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
