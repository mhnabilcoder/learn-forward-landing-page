
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Plus, Trash2, Upload, Copy } from 'lucide-react';

const ClientOrganizationsEditor = () => {
  const [organizations, setOrganizations] = useState([]);
  const [sectionSettings, setSectionSettings] = useState({
    section_title: 'Our Clients',
    section_tagline: 'Trusted By'
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const { data, error } = await supabase
        .from('client_organizations')
        .select('*')
        .order('order_index');
      
      if (error) throw error;
      setOrganizations(data || []);
      
      if (data && data[0]) {
        setSectionSettings({
          section_title: data[0].section_title || 'Our Clients',
          section_tagline: data[0].section_tagline || 'Trusted By'
        });
      }
    } catch (error) {
      console.error('Error fetching client organizations:', error);
      toast.error('Failed to load client organizations');
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Update each organization
      for (const org of organizations) {
        const { error } = await supabase
          .from('client_organizations')
          .upsert({
            ...org,
            section_title: sectionSettings.section_title,
            section_tagline: sectionSettings.section_tagline
          });
        
        if (error) throw error;
      }
      
      toast.success('Client organizations updated successfully!');
    } catch (error) {
      console.error('Error updating client organizations:', error);
      toast.error('Failed to update client organizations');
    }
    setIsLoading(false);
  };

  const addOrganization = () => {
    const newOrg = {
      id: crypto.randomUUID(),
      name: '',
      logo_text: '',
      testimonial: '',
      website: '',
      rating: 5,
      order_index: organizations.length,
      has_logo: false,
      logo_url: null
    };
    setOrganizations([...organizations, newOrg]);
  };

  const removeOrganization = async (id) => {
    try {
      const { error } = await supabase
        .from('client_organizations')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      setOrganizations(organizations.filter(org => org.id !== id));
      toast.success('Organization removed');
    } catch (error) {
      console.error('Error removing organization:', error);
      toast.error('Failed to remove organization');
    }
  };

  const updateOrganization = (id, field, value) => {
    setOrganizations(organizations.map(org => 
      org.id === id ? { ...org, [field]: value } : org
    ));
  };

  const handleImageUpload = async (orgId, file) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${orgId}-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(`organizations/${fileName}`, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('images')
        .getPublicUrl(`organizations/${fileName}`);

      updateOrganization(orgId, 'logo_url', data.publicUrl);
      updateOrganization(orgId, 'has_logo', true);
      
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    }
  };

  const copyImageUrl = (url) => {
    navigator.clipboard.writeText(url);
    toast.success('Image URL copied to clipboard!');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Organizations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Section Title</label>
            <Input
              value={sectionSettings.section_title}
              onChange={(e) => setSectionSettings({...sectionSettings, section_title: e.target.value})}
              placeholder="Our Clients"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Section Tagline</label>
            <Input
              value={sectionSettings.section_tagline}
              onChange={(e) => setSectionSettings({...sectionSettings, section_tagline: e.target.value})}
              placeholder="Trusted By"
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Organizations</h3>
          <Button onClick={addOrganization} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Organization
          </Button>
        </div>

        <ScrollArea className="h-[600px] w-full">
          <div className="space-y-4 pr-4">
            {organizations.map((org, index) => (
              <Card key={org.id} className="p-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">Organization {index + 1}</h4>
                    <Button onClick={() => removeOrganization(org.id)} variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Name</label>
                      <Input
                        value={org.name}
                        onChange={(e) => updateOrganization(org.id, 'name', e.target.value)}
                        placeholder="Organization Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Logo Text (if no image)</label>
                      <Input
                        value={org.logo_text}
                        onChange={(e) => updateOrganization(org.id, 'logo_text', e.target.value)}
                        placeholder="AB"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Website</label>
                    <Input
                      value={org.website}
                      onChange={(e) => updateOrganization(org.id, 'website', e.target.value)}
                      placeholder="https://organization.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Testimonial</label>
                    <Textarea
                      value={org.testimonial}
                      onChange={(e) => updateOrganization(org.id, 'testimonial', e.target.value)}
                      placeholder="Great platform for learning..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Rating (1-5)</label>
                    <Input
                      type="number"
                      min="1"
                      max="5"
                      value={org.rating}
                      onChange={(e) => updateOrganization(org.id, 'rating', parseInt(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Logo Image</label>
                    <div className="flex gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files[0] && handleImageUpload(org.id, e.target.files[0])}
                        className="hidden"
                        id={`file-${org.id}`}
                      />
                      <Button onClick={() => document.getElementById(`file-${org.id}`).click()} variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Image
                      </Button>
                      {org.logo_url && (
                        <Button onClick={() => copyImageUrl(org.logo_url)} variant="outline" size="sm">
                          <Copy className="h-4 w-4 mr-2" />
                          Copy URL
                        </Button>
                      )}
                    </div>
                    {org.logo_url && (
                      <div className="mt-2">
                        <img src={org.logo_url} alt="Logo preview" className="w-16 h-16 object-contain border rounded" />
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>

        <Button onClick={handleSave} disabled={isLoading} className="w-full">
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ClientOrganizationsEditor;
