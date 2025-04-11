
import { useState } from "react";
import { motion } from "framer-motion";
import { Certificate } from "@/services/storageService";
import SectionHeading from "@/components/SectionHeading";
import CertificateCard from "./CertificateCard";
import CertificateForm from "./CertificateForm";
import { Button } from "@/components/ui/button";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface CertificatesSectionProps {
  certificates: Certificate[];
  isAdmin?: boolean;
  onAddCertificate?: (certificate: Omit<Certificate, "id">) => void;
  onUpdateCertificate?: (certificate: Certificate) => void;
  onDeleteCertificate?: (id: string) => void;
}

const CertificatesSection: React.FC<CertificatesSectionProps> = ({
  certificates,
  isAdmin = false,
  onAddCertificate,
  onUpdateCertificate,
  onDeleteCertificate,
}) => {
  const [certificateToEdit, setCertificateToEdit] = useState<Certificate | null>(null);
  const [certificateToDelete, setCertificateToDelete] = useState<Certificate | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  // Handle edit certificate
  const handleEditCertificate = (certificate: Certificate) => {
    setCertificateToEdit(certificate);
    setIsFormOpen(true);
  };

  // Handle delete certificate
  const handleDeleteCertificate = (certificate: Certificate) => {
    setCertificateToDelete(certificate);
    setIsDeleteDialogOpen(true);
  };

  // Handle confirm delete
  const handleConfirmDelete = () => {
    if (certificateToDelete && onDeleteCertificate) {
      onDeleteCertificate(certificateToDelete.id);
      toast({
        title: "Certificate deleted",
        description: `"${certificateToDelete.title}" has been deleted successfully.`,
      });
    }
    setIsDeleteDialogOpen(false);
    setCertificateToDelete(null);
  };

  // Handle save certificate
  const handleSaveCertificate = (certificate: Omit<Certificate, "id"> | Certificate) => {
    if ("id" in certificate && onUpdateCertificate) {
      onUpdateCertificate(certificate);
      toast({
        title: "Certificate updated",
        description: `"${certificate.title}" has been updated successfully.`,
      });
    } else if (onAddCertificate) {
      onAddCertificate(certificate);
      toast({
        title: "Certificate added",
        description: `"${certificate.title}" has been added successfully.`,
      });
    }
    setIsFormOpen(false);
    setCertificateToEdit(null);
  };

  // Handle add new certificate
  const handleAddCertificate = () => {
    setCertificateToEdit(null);
    setIsFormOpen(true);
  };

  // Sort certificates by date (newest first)
  const sortedCertificates = [...certificates].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <section id="certificates" className="py-16">
      <div className="container mx-auto">
        <SectionHeading 
          title="Certificates" 
          subtitle="My professional certifications and achievements."
        />
        
        {isAdmin && onAddCertificate && (
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button onClick={handleAddCertificate}>
              <Plus className="mr-2 h-4 w-4" />
              Add Certificate
            </Button>
          </motion.div>
        )}
        
        {/* Certificates Grid - Updated to maintain 2 columns on all devices */}
        <div className="grid grid-cols-2 gap-3 md:gap-6 mt-8">
          {sortedCertificates.map((certificate, index) => (
            <motion.div
              key={certificate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <CertificateCard
                certificate={certificate}
                isAdmin={isAdmin}
                onEdit={isAdmin ? () => handleEditCertificate(certificate) : undefined}
                onDelete={isAdmin ? () => handleDeleteCertificate(certificate) : undefined}
              />
            </motion.div>
          ))}
        </div>
        
        {/* Certificate form dialog (admin view) */}
        <CertificateForm
          certificate={certificateToEdit}
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSaveCertificate}
        />
        
        {/* Delete confirmation dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the certificate 
                <strong className="font-semibold">
                  {certificateToDelete ? ` "${certificateToDelete.title}"` : ""}
                </strong>. 
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

export default CertificatesSection;
