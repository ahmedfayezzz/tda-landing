import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { 
  Edit, 
  Save, 
  Plus, 
  Trash2, 
  Image, 
  Type, 
  Layout,
  Settings,
  Users,
  Briefcase,
  Eye,
  EyeOff
} from 'lucide-react';

interface WebsiteElement {
  id: string;
  elementKey: string;
  elementType: string;
  value: string;
  description: string;
  category: string;
  isActive: boolean;
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  imageUrl?: string;
  features: string[];
  price: string;
  orderIndex: number;
  isActive: boolean;
}

interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  imageUrl?: string;
  projectUrl?: string;
  technologies: string[];
  category: string;
  clientName?: string;
  orderIndex: number;
  isFeatured: boolean;
  isActive: boolean;
}

interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  imageUrl?: string;
  email?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  orderIndex: number;
  isActive: boolean;
}

export function ContentManager() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('elements');
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch website elements
  const { data: elements = [], isLoading: elementsLoading } = useQuery({
    queryKey: ['/api/admin/website-elements'],
  });

  // Fetch services
  const { data: services = [], isLoading: servicesLoading } = useQuery({
    queryKey: ['/api/admin/services'],
  });

  // Fetch projects
  const { data: projects = [], isLoading: projectsLoading } = useQuery({
    queryKey: ['/api/admin/projects'],
  });

  // Fetch team members
  const { data: teamMembers = [], isLoading: teamLoading } = useQuery({
    queryKey: ['/api/admin/team-members'],
  });

  // Update element mutation
  const updateElementMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      return await apiRequest(`/api/admin/website-elements/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/website-elements'] });
      toast({
        title: 'تم التحديث',
        description: 'تم حفظ التغييرات بنجاح',
      });
      setEditingItem(null);
    },
  });

  // Create service mutation
  const createServiceMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest('/api/admin/services', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/services'] });
      toast({
        title: 'تم الإنشاء',
        description: 'تم إضافة الخدمة بنجاح',
      });
    },
  });

  // Filter function
  const filterItems = (items: any[], searchTerm: string) => {
    if (!searchTerm) return items;
    return items.filter(item => 
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.elementKey?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const renderElementsTab = () => {
    const filteredElements = filterItems(elements, searchTerm);
    
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Input
            placeholder="البحث في العناصر..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
            data-testid="elements-search"
          />
          <Badge variant="outline" className="text-sm">
            {filteredElements.length} عنصر
          </Badge>
        </div>

        <div className="grid gap-4">
          {filteredElements.map((element: WebsiteElement) => (
            <Card key={element.id} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Type className="w-4 h-4 text-blue-600" />
                    <CardTitle className="text-lg">{element.elementKey}</CardTitle>
                    <Badge variant={element.isActive ? 'default' : 'secondary'}>
                      {element.isActive ? 'نشط' : 'معطل'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingItem(editingItem === element.id ? null : element.id)}
                      data-testid={`edit-element-${element.elementKey}`}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                {element.description && (
                  <p className="text-sm text-gray-600">{element.description}</p>
                )}
              </CardHeader>
              
              <CardContent>
                {editingItem === element.id ? (
                  <ElementEditForm 
                    element={element} 
                    onSave={(data) => updateElementMutation.mutate({ id: element.id, data })}
                    onCancel={() => setEditingItem(null)}
                    isLoading={updateElementMutation.isPending}
                  />
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {element.elementType}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {element.category}
                      </Badge>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      {element.elementType === 'image' ? (
                        element.value.startsWith('http') ? (
                          <img 
                            src={element.value} 
                            alt="" 
                            className="max-w-32 h-20 object-cover rounded"
                          />
                        ) : (
                          <p className="text-sm text-gray-600">📁 {element.value}</p>
                        )
                      ) : (
                        <p className="text-sm whitespace-pre-wrap">{element.value}</p>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderServicesTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">إدارة الخدمات</h3>
        <Button onClick={() => {}}>
          <Plus className="w-4 h-4 ml-2" />
          إضافة خدمة
        </Button>
      </div>
      
      <div className="grid gap-4">
        {services.map((service: Service) => (
          <Card key={service.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{service.title}</CardTitle>
                <div className="flex items-center gap-2">
                  <Switch checked={service.isActive} />
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">{service.description}</p>
              {service.features && service.features.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {service.features.map((feature, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">إدارة المحتوى</h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Layout className="w-4 h-4" />
          نظام إدارة المحتوى الشامل
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="elements" className="flex items-center gap-2">
            <Type className="w-4 h-4" />
            العناصر
          </TabsTrigger>
          <TabsTrigger value="services" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            الخدمات
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            المشاريع
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            الفريق
          </TabsTrigger>
        </TabsList>

        <TabsContent value="elements" className="mt-6">
          {elementsLoading ? (
            <div className="text-center py-8">جاري تحميل العناصر...</div>
          ) : (
            renderElementsTab()
          )}
        </TabsContent>

        <TabsContent value="services" className="mt-6">
          {servicesLoading ? (
            <div className="text-center py-8">جاري تحميل الخدمات...</div>
          ) : (
            renderServicesTab()
          )}
        </TabsContent>

        <TabsContent value="projects" className="mt-6">
          <div className="text-center py-8">جاري تطوير إدارة المشاريع...</div>
        </TabsContent>

        <TabsContent value="team" className="mt-6">
          <div className="text-center py-8">جاري تطوير إدارة الفريق...</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Form component for editing elements
function ElementEditForm({ 
  element, 
  onSave, 
  onCancel, 
  isLoading 
}: {
  element: WebsiteElement;
  onSave: (data: any) => void;
  onCancel: () => void;
  isLoading: boolean;
}) {
  const [formData, setFormData] = useState({
    value: element.value,
    description: element.description || '',
    isActive: element.isActive,
  });

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="space-y-4 border-t pt-4">
      <div className="space-y-2">
        <Label htmlFor="value">المحتوى</Label>
        {element.elementType === 'text' || element.elementType === 'textarea' ? (
          <Textarea
            id="value"
            value={formData.value}
            onChange={(e) => setFormData({...formData, value: e.target.value})}
            rows={element.elementType === 'textarea' ? 4 : 2}
            data-testid="element-value-input"
          />
        ) : (
          <Input
            id="value"
            value={formData.value}
            onChange={(e) => setFormData({...formData, value: e.target.value})}
            data-testid="element-value-input"
          />
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">الوصف</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          placeholder="وصف العنصر للمشرفين"
          data-testid="element-description-input"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="isActive"
          checked={formData.isActive}
          onCheckedChange={(checked) => setFormData({...formData, isActive: checked})}
          data-testid="element-active-switch"
        />
        <Label htmlFor="isActive">نشط</Label>
      </div>

      <div className="flex items-center gap-2 pt-4 border-t">
        <Button 
          onClick={handleSave} 
          disabled={isLoading}
          data-testid="save-element-button"
        >
          <Save className="w-4 h-4 ml-2" />
          {isLoading ? 'جاري الحفظ...' : 'حفظ'}
        </Button>
        <Button variant="outline" onClick={onCancel}>
          إلغاء
        </Button>
      </div>
    </div>
  );
}