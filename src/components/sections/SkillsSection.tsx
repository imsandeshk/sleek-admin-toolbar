import { useState } from "react";
import { motion } from "framer-motion";
import { Skill } from "@/services/storageService";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Edit, Plus, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// FontAwesome CDN icons
const getSkillIcon = (skillName: string) => {
  const name = skillName.toLowerCase();

  if (name.includes("html")) return <i className="fab fa-html5 text-orange-500 text-base sm:text-xl"></i>;
  if (name.includes("css")) return <i className="fab fa-css3-alt text-blue-500 text-base sm:text-xl"></i>;
  if (name.includes("javascript") || name.includes("js")) return <i className="fab fa-js text-yellow-400 text-base sm:text-xl"></i>;
  if (name.includes("react")) return <i className="fab fa-react text-cyan-400 text-base sm:text-xl"></i>;
  if (name.includes("node")) return <i className="fab fa-node text-green-500 text-base sm:text-xl"></i>;
  if (name.includes("java")) return <i className="fab fa-java text-red-600 text-base sm:text-xl"></i>;
  if (name.includes("python")) return <i className="fab fa-python text-yellow-500 text-base sm:text-xl"></i>;
  if (name.includes("php")) return <i className="fab fa-php text-indigo-500 text-base sm:text-xl"></i>;
  if (name.includes("aws")) return <i className="fab fa-aws text-orange-500 text-base sm:text-xl"></i>;
  if (name.includes("github")) return <i className="fab fa-github text-white text-base sm:text-xl"></i>;
  if (name.includes("figma")) return <i className="fab fa-figma text-pink-400 text-base sm:text-xl"></i>;

  return <i className="fas fa-code text-white text-base sm:text-xl"></i>;
};

interface SkillsSectionProps {
  skills: Skill[];
  isAdmin?: boolean;
  onAddSkill?: (skill: Omit<Skill, "id">) => void;
  onUpdateSkill?: (skill: Skill) => void;
  onDeleteSkill?: (id: string) => void;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  isAdmin = false,
  onAddSkill,
  onUpdateSkill,
  onDeleteSkill
}) => {
  const [skillToEdit, setSkillToEdit] = useState<Skill | null>(null);
  const [skillToDelete, setSkillToDelete] = useState<Skill | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState(3);
  const { toast } = useToast();

  const handleEditSkill = (skill: Skill) => {
    setSkillToEdit(skill);
    setName(skill.name);
    setCategory(skill.category);
    setLevel(skill.level);
    setIsFormOpen(true);
  };

  const handleDeleteSkill = (skill: Skill) => {
    setSkillToDelete(skill);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (skillToDelete && onDeleteSkill) {
      onDeleteSkill(skillToDelete.id);
      toast({
        title: "Skill deleted",
        description: `"${skillToDelete.name}" has been deleted successfully.`
      });
    }
    setIsDeleteDialogOpen(false);
    setSkillToDelete(null);
  };

  const handleSaveSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedSkill = {
      ...(skillToEdit && {
        id: skillToEdit.id
      }),
      name,
      category,
      level
    };
    if (skillToEdit && onUpdateSkill) {
      onUpdateSkill(updatedSkill as Skill);
      toast({
        title: "Skill updated",
        description: `"${name}" has been updated successfully.`
      });
    } else if (onAddSkill) {
      onAddSkill(updatedSkill);
      toast({
        title: "Skill added",
        description: `"${name}" has been added successfully.`
      });
    }
    setIsFormOpen(false);
    resetForm();
  };

  const handleAddSkill = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const resetForm = () => {
    setSkillToEdit(null);
    setName("");
    setCategory("");
    setLevel(3);
  };

  const getSkillLevelColor = (level: number): string => {
    if (level >= 4.5) return "bg-blue-500";
    if (level >= 3.5) return "bg-blue-400";
    if (level >= 2.5) return "bg-blue-300";
    return "bg-blue-200";
  };

  return (
    <section id="skills" className="py-16">
      <div className="container mx-auto">
        <SectionHeading title="Skills" subtitle="My technical expertise" />

        {isAdmin && onAddSkill && (
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button onClick={handleAddSkill}>
              <Plus className="mr-2 h-4 w-4" />
              Add Skill
            </Button>
          </motion.div>
        )}

        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative rounded-xl overflow-hidden bg-gray-900/50 backdrop-blur-sm p-3 sm:p-5 border border-white/10"
            >
              <div className="flex flex-col items-center">
                <div className="bg-gray-800/70 rounded-lg p-2 sm:p-3 mb-2">
                  {getSkillIcon(skill.name)}
                </div>

                <h3 className="text-sm sm:text-base font-medium text-center mb-2">
                  {skill.name}
                </h3>

                <div className="w-full h-1 bg-gray-800/50 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getSkillLevelColor(skill.level)}`}
                    style={{ width: `${(skill.level / 5) * 100}%` }}
                  />
                </div>

                {isAdmin && onUpdateSkill && onDeleteSkill && (
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7"
                      onClick={() => handleEditSkill(skill)}
                    >
                      <Edit size={14} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7"
                      onClick={() => handleDeleteSkill(skill)}
                    >
                      <Trash size={14} />
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <Dialog open={isFormOpen} onOpenChange={open => {
          setIsFormOpen(open);
          if (!open) resetForm();
        }}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{skillToEdit ? "Edit Skill" : "Add New Skill"}</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSaveSkill} className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Skill Name</Label>
                  <Input id="name" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" value={category} onChange={e => setCategory(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="level">Proficiency Level</Label>
                    <span className="text-sm text-muted-foreground">{getLevelText(level)}</span>
                  </div>
                  <Slider id="level" value={[level]} min={1} max={5} step={1} onValueChange={value => setLevel(value[0])} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Beginner</span>
                    <span>Intermediate</span>
                    <span>Expert</span>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => {
                  setIsFormOpen(false);
                  resetForm();
                }}>Cancel</Button>
                <Button type="submit">Save Skill</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the skill
                <strong className="font-semibold">{skillToDelete ? ` "${skillToDelete.name}"` : ""}</strong>.
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </section>
  );
};

const getLevelText = (level: number): string => {
  switch (level) {
    case 1: return "Beginner";
    case 2: return "Basic";
    case 3: return "Intermediate";
    case 4: return "Advanced";
    case 5: return "Expert";
    default: return "Intermediate";
  }
};

export default SkillsSection;
