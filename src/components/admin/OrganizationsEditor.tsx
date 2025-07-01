
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Plus, Trash2, Upload, Link } from 'lucide-react';

const OrganizationsEditor = () => {
  const [supportingOrgs, setSupportingOrgs] = useState([]);
  const [clientOrgs, setClientOrgs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const [supportingResult, clientResult] = await Promise.all([
        supabase.from('supporting_organizations').select('*').order('order_index'),
        supabase.from('client_organizations').select('*').order('order_index')
      ]);
      
      if (supportingResult.error) throw supportingResult.error;
      if (clientResult.error) throw clientResult.error;
      
      setSupportingOrgs(supportingResult.data || []);
      setClientOrgs(clientResult.data || []);
    } catch (error) {
      console.error('Error fetching organizations:', error);
      toast.error('Failed to load organizations');
    }
  };

  const handleImageUpload = async (file, type, index) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${type}-org-${Date.now()}.${fileExt}`;
      const filePath = `organizations/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      if (type === 'supporting') {
        updateSupportingOrg(index, 'logo_url', publicUrl);
        updateSupportingOrg(index, 'has_logo', true);
      } else {
        updateClientOrg(index, 'logo_url', publicUrl);
        updateClientOrg(index, 'has_logo', true);
      }
      
      toast.success('Logo uploaded successfully!');
    } catch (error) {
      console.error('Error uploading logo:', error);
      toast.error('Failed to upload logo');
    }
  };

  const saveSupportingOrgs = async () => {
    setIsLoading(true);
    try {
      for (const org of supportingOrgs) {
        if (org.id) {
          const { error } = await supabase
            .from('supporting_organizations')
            .update(org)
            .eq('id', org.id);
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from('supporting_organizations')
            .insert(org);
          if (error) throw error;
        }
      }
      toast.success('Supporting organizations updated successfully!');
      await fetchOrganizations();
    } catch (error) {
      console.error('Error updating supporting organizations:', error);
      toast.error('Failed to update supporting organizations');
    }
    setIsLoading(false);
  };

  const saveClientOrgs = async () => {
    setIsLoading(true);
    try {
      for (const org of clientOrgs) {
        if (org.id) {
          const { error } = await supabase
            .from('client_organizations')
            .update(org)
            .eq('id', org.id);
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from('client_organizations')
            .insert(org);
          if (error) throw error;
        }
      }
      toast.success('Client organizations updated successfully!');
      await fetchOrganizations();
    } catch (error) {
      console.error('Error updating client organizations:', error);
      toast.error('Failed to update client organizations');
    }
    setIsLoading(false);
  };

  // Supporting Organizations functions
  const addSupportingOrg = () => {
    const newOrg = {
      name: '',
      logo_text: '',
      logo_url: '',
      has_logo: false,
      order_index: supportingOrgs.length + 1
    };
    setSupportingOrgs([...supportingOrgs, newOrg]);
  };

  const removeSupportingOrg = async (index) => {
    const org = supportingOrgs[index];
    if (org.id) {
      try {
        const { error } = await supabase
          .from('supporting_organizations')
          .delete()
          .eq('id', org.id);
        if (error) throw error;
        toast.success('Organization removed');
      } catch (error) {
        console.error('Error deleting supporting organization:', error);
        toast.error('Failed to delete organization');
        return;
      }
    }
    setSupportingOrgs(supportingOrgs.filter((_, i) => i !== index));
  };

  const updateSupportingOrg = (index, field, value) => {
    const newOrgs = [...supportingOrgs];
    newOrgs[index] = { ...newOrgs[index], [field]: value };
    setSupportingOrgs(newOrgs);
  };

  // Client Organizations functions
  const addClientOrg = () => {
    const newOrg = {
      name: '',
      logo_text: '',
      logo_url: '',
      has_logo: false,
      testimonial: '',
      website: '',
      rating: 5,
      order_index: clientOrgs.length + 1
    };
    setClientOrgs([...clientOrgs, newOrg]);
  };

  const removeClientOrg = async (index) => {
    const org = clientOrgs[index];
    if (org.id) {
      try {
        const { error } = await supabase
          .from('client_organizations')
          .delete()
          .eq('id', org.id);
        if (error) throw error;
        toast.success('Organization removed');
      } catch (error) {
        console.error('Error deleting client organization:', error);
        toast.error('Failed to delete organization');
        return;
      }
    }
    setClientOrgs(clientOrgs.filter((_, i) => i !== index));
  };

  const updateClientOrg = (index, field, value) => {
    const newOrgs = [...clientOrgs];
    newOrgs[index] = { ...newOrgs[index], [field]: value };
    setClientOrgs(newOrgs);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Organizations Editor</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="supporting" className="space-y-4">
          <TabsList>
            <TabsTrigger value="supporting">Supporting Organizations</TabsTrigger>
            <TabsTrigger value="clients">Client Organizations</TabsTrigger>
          </TabsList>

          <TabsContent value="supporting" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Supporting Organizations</h3>
              <Button onClick={addSupportingOrg} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Organization
              </Button>
            </div>

            {supportingOrgs.map((org, index) => (
              <Card key={index} className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-medium">Organization {index + 1}</h4>
                  <Button
                    onClick={() => removeSupportingOrg(index)}
                    size="sm"
                    variant="destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <Input
                      value={org.name || ''}
                      onChange={(e) => updateSupportingOrg(index, 'name', e.target.value)}
                      placeholder="University Tech Club"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Logo Text (Fallback)</label>
                    <Input
                      value={org.logo_text || ''}
                      onChange={(e) => updateSupportingOrg(index, 'logo_text', e.target.value)}
                      placeholder="UTC"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">Organization Logo</label>
                  <Tabs defaultValue="link" className="w-full">
                    <TabsList>
                      <TabsTrigger value="link">
                        <Link className="h-4 w-4 mr-2" />
                        Logo Link
                      </TabsTrigger>
                      <TabsTrigger value="upload">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Logo
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="link" className="space-y-2">
                      <Input
                        value={org.logo_url || ''}
                        onChange={(e) => {
                          const url = e.target.value;
                          updateSupportingOrg(index, 'logo_url', url);
                          updateSupportingOrg(index, 'has_logo', !!url);
                        }}
                        placeholder="https://example.com/logo.png"
                      />
                      {org.logo_url && (
                        <div className="mt-2">
                          <img src={org.logo_url} alt="Logo Preview" className="w-16 h-16 object-contain rounded" />
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="upload" className="space-y-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file, 'supporting', index);
                        }}
                      />
                      {org.logo_url && (
                        <div className="mt-2">
                          <img src={org.logo_url} alt="Logo Preview" className="w-16 h-16 object-contain rounded" />
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
              </Card>
            ))}

            <Button onClick={saveSupportingOrgs} disabled={isLoading} className="w-full">
              {isLoading ? 'Saving...' : 'Save Supporting Organizations'}
            </Button>
          </TabsContent>

          <TabsContent value="clients" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Client Organizations</h3>
              <Button onClick={addClientOrg} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Client
              </Button>
            </div>

            {clientOrgs.map((org, index) => (
              <Card key={index} className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-medium">Client {index + 1}</h4>
                  <Button
                    onClick={() => removeClientOrg(index)}
                    size="sm"
                    variant="destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <Input
                      value={org.name || ''}
                      onChange={(e) => updateClientOrg(index, 'name', e.target.value)}
                      placeholder="TechCorp Solutions"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Logo Text (Fallback)</label>
                    <Input
                      value={org.logo_text || ''}
                      onChange={(e) => updateClientOrg(index, 'logo_text', e.target.value)}
                      placeholder="TC"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1">Website</label>
                  <Input
                    value={org.website || ''}
                    onChange={(e) => updateClientOrg(index, 'website', e.target.value)}
                    placeholder="https://organization.com"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">Organization Logo</label>
                  <Tabs defaultValue="link" className="w-full">
                    <TabsList>
                      <TabsTrigger value="link">
                        <Link className="h-4 w-4 mr-2" />
                        Logo Link
                      </TabsTrigger>
                      <TabsTrigger value="upload">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Logo
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="link" className="space-y-2">
                      <Input
                        value={org.logo_url || ''}
                        onChange={(e) => {
                          const url = e.target.value;
                          updateClientOrg(index, 'logo_url', url);
                          updateClientOrg(index, 'has_logo', !!url);
                        }}
                        placeholder="https://example.com/logo.png"
                      />
                      {org.logo_url && (
                        <div className="mt-2">
                          <img src={org.logo_url} alt="Logo Preview" className="w-16 h-16 object-contain rounded" />
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="upload" className="space-y-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file, 'client', index);
                        }}
                      />
                      {org.logo_url && (
                        <div className="mt-2">
                          <img src={org.logo_url} alt="Logo Preview" className="w-16 h-16 object-contain rounded" />
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1">Testimonial</label>
                  <Textarea
                    value={org.testimonial || ''}
                    onChange={(e) => updateClientOrg(index, 'testimonial', e.target.value)}
                    placeholder="Amazing platform that transformed our employee training programs."
                    rows={3}
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1">Rating</label>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    value={org.rating || 5}
                    onChange={(e) => updateClientOrg(index, 'rating', parseInt(e.target.value) || 5)}
                  />
                </div>
              </Card>
            ))}

            <Button onClick={saveClientOrgs} disabled={isLoading} className="w-full">
              {isLoading ? 'Saving...' : 'Save Client Organizations'}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default OrganizationsEditor;
