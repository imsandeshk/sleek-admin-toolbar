
import { useState } from "react";
import { motion } from "framer-motion";
import ParticlesBackground from "@/components/ParticlesBackground";
import Hero from "@/components/sections/Hero";
import ProjectsSection from "@/components/sections/projects/ProjectsSection";
import CertificatesSection from "@/components/sections/certificates/CertificatesSection";
import TasksSection from "@/components/sections/tasks/TasksSection";
import SkillsSection from "@/components/sections/SkillsSection";
import EducationSection from "@/components/sections/EducationSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ContactSection from "@/components/sections/ContactSection";
import FeedbackSection from "@/components/sections/feedback/FeedbackSection";
import Footer from "@/components/Footer";
import TabSwitcher from "@/components/TabSwitcher";
import {
  getProfile,
  getSocialLinks,
  getProjects,
  getCertificates,
  getTasks,
  getSkills,
  getEducation,
  getExperience,
  getContact,
  getFeedback,
} from "@/services/storageService";

const Index = () => {
  // Get data from storage
  const profile = getProfile();
  const socialLinks = getSocialLinks();
  const projects = getProjects();
  const certificates = getCertificates();
  const tasks = getTasks();
  const skills = getSkills();
  const education = getEducation();
  const experience = getExperience();
  const contact = getContact();
  const feedback = getFeedback();

  // Tab state for the content switcher
  const [activeTab, setActiveTab] = useState("projects");
  const tabs = [
    { id: "projects", label: "Projects" },
    { id: "certificates", label: "Certificates" },
    { id: "tasks", label: "Tasks" },
  ];

  // Handle tab change
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="bg-background min-h-screen">
      <ParticlesBackground />
      
      {/* Hero Section */}
      <Hero profile={profile} socialLinks={socialLinks} />
      
      {/* Content Tabs Section */}
      <section id="content-tabs" className="py-16">
        <div className="container mx-auto">
          <TabSwitcher
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
          
          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "projects" && <ProjectsSection projects={projects} />}
            {activeTab === "certificates" && <CertificatesSection certificates={certificates} />}
            {activeTab === "tasks" && <TasksSection tasks={tasks} />}
          </motion.div>
        </div>
      </section>
      
      {/* Skills Section */}
      <SkillsSection skills={skills} />
      
      {/* Education Section */}
      <EducationSection education={education} />
      
      {/* Experience Section */}
    
      
      {/* Contact Section */}
      <ContactSection contact={contact} />
      
    
      
      {/* Footer */}
      <Footer socialLinks={socialLinks} />
    </div>
  );
};

export default Index;
