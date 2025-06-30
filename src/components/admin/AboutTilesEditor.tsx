
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Plus, Trash2 } from 'lucide-react';

const AboutTilesEditor = () => {
  const [tiles, setTiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const iconOptions = ['Users', 'Target', 'Award', 'Heart', 'BookOpen'];
  const colorOptions = ['blue', 'purple', 'green', 'red', 'indigo'];

  useEffect(() => {
    fetchTiles();
  }, []);

  const fetchTiles = async () => {
    try {
      const { data, error } = await supabase
        .from('about_tiles')
        .select('*')
        .order('order_index');
      
      if (error) throw error;
      setTiles(data || []);
    } catch (error) {
      console.error('Error fetching tiles:', error);
      toast.error('Failed to load about tiles');
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Update existing tiles
      for (const tile of tiles) {
        if (tile.id) {
          const { error } = await supabase
            .from('about_tiles')
            .update(tile)
            .eq('id', tile.id);
          
          if (error) throw error;
        } else {
          // Insert new tile
          const { error } = await supabase
            .from('about_tiles')
            .insert(tile);
          
          if (error) throw error;
        }
      }
      
      toast.success('About tiles updated successfully!');
      fetchTiles(); // Refresh data
    } catch (error) {
      console.error('Error updating tiles:', error);
      toast.error('Failed to update about tiles');
    }
    setIsLoading(false);
  };

  const addTile = () => {
    const newTile = {
      title: '',
      description: '',
      icon_name: 'Users',
      color_scheme: 'blue',
      order_index: tiles.length + 1
    };
    setTiles([...tiles, newTile]);
  };

  const removeTile = async (index) => {
    const tile = tiles[index];
    if (tile.id) {
      try {
        const { error } = await supabase
          .from('about_tiles')
          .delete()
          .eq('id', tile.id);
        
        if (error) throw error;
      } catch (error) {
        console.error('Error deleting tile:', error);
        toast.error('Failed to delete tile');
        return;
      }
    }
    
    const newTiles = tiles.filter((_, i) => i !== index);
    setTiles(newTiles);
  };

  const updateTile = (index, field, value) => {
    const newTiles = [...tiles];
    newTiles[index] = { ...newTiles[index], [field]: value };
    setTiles(newTiles);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          About Tiles Editor
          <Button onClick={addTile} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Tile
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {tiles.map((tile, index) => (
          <Card key={index} className="p-4">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium">Tile {index + 1}</h4>
              <Button
                onClick={() => removeTile(index)}
                size="sm"
                variant="destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input
                  value={tile.title}
                  onChange={(e) => updateTile(index, 'title', e.target.value)}
                  placeholder="Community Driven"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Icon</label>
                <Select value={tile.icon_name} onValueChange={(value) => updateTile(index, 'icon_name', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map(icon => (
                      <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                value={tile.description}
                onChange={(e) => updateTile(index, 'description', e.target.value)}
                placeholder="Connect with learners and industry professionals"
              />
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Color Scheme</label>
              <Select value={tile.color_scheme} onValueChange={(value) => updateTile(index, 'color_scheme', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map(color => (
                    <SelectItem key={color} value={color}>{color}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Card>
        ))}

        <Button onClick={handleSave} disabled={isLoading} className="w-full">
          {isLoading ? 'Saving...' : 'Save All Changes'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AboutTilesEditor;
