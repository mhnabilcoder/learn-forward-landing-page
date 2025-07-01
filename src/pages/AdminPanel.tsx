
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut } from 'lucide-react';
import { toast } from 'sonner';
import HeroEditor from '../components/admin/HeroEditor';
import GeneralEditor from '../components/admin/GeneralEditor';
import AboutTilesEditor from '../components/admin/AboutTilesEditor';
import FeaturesEditor from '../components/admin/FeaturesEditor';
import OrganizationsEditor from '../components/admin/OrganizationsEditor';
import TestimonialsEditor from '../components/admin/TestimonialsEditor';
import FoundersEditor from '../components/admin/FoundersEditor';
import AdvisorsEditor from '../components/admin/AdvisorsEditor';
import VisionMissionEditor from '../components/admin/VisionMissionEditor';
import FooterEditor from '../components/admin/FooterEditor';
import ClientOrganizationsEditor from '../components/admin/ClientOrganizationsEditor';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!loggedIn) {
      navigate('/admin/login');
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">EdCluster Admin Panel</h1>
          <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="about">About Tiles</TabsTrigger>
            <TabsTrigger value="vision">Vision/Mission</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="organizations">Supporting Orgs</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="founders">Founders</TabsTrigger>
            <TabsTrigger value="advisors">Advisors</TabsTrigger>
            <TabsTrigger value="footer">Footer</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <GeneralEditor />
          </TabsContent>

          <TabsContent value="hero">
            <HeroEditor />
          </TabsContent>

          <TabsContent value="about">
            <AboutTilesEditor />
          </TabsContent>

          <TabsContent value="vision">
            <VisionMissionEditor />
          </TabsContent>

          <TabsContent value="features">
            <FeaturesEditor />
          </TabsContent>

          <TabsContent value="organizations">
            <OrganizationsEditor />
          </TabsContent>

          <TabsContent value="clients">
            <ClientOrganizationsEditor />
          </TabsContent>

          <TabsContent value="testimonials">
            <TestimonialsEditor />
          </TabsContent>

          <TabsContent value="founders">
            <FoundersEditor />
          </TabsContent>

          <TabsContent value="advisors">
            <AdvisorsEditor />
          </TabsContent>

          <TabsContent value="footer">
            <FooterEditor />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
