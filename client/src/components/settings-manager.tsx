import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { Settings, Mail, Globe, Shield } from 'lucide-react';

interface SettingField {
  key: string;
  label: string;
  description?: string;
  type: 'string' | 'number' | 'boolean' | 'json';
  defaultValue: any;
  category: 'general' | 'email' | 'seo' | 'security';
}

const defaultSettings: SettingField[] = [
  // General Settings
  {
    key: 'site_name',
    label: 'اسم الموقع',
    description: 'اسم الشركة أو الموقع',
    type: 'string',
    defaultValue: 'شركة التطور والتسارع التقنية - TDA',
    category: 'general',
  },
  {
    key: 'site_tagline',
    label: 'شعار الموقع',
    description: 'الشعار أو الوصف المختصر',
    type: 'string',
    defaultValue: 'نحو مستقبل تقني متقدم',
    category: 'general',
  },
  {
    key: 'contact_email',
    label: 'بريد التواصل',
    description: 'البريد الإلكتروني الرئيسي للتواصل',
    type: 'string',
    defaultValue: 'info@tda.sa',
    category: 'general',
  },
  {
    key: 'contact_phone',
    label: 'رقم الهاتف',
    description: 'رقم الهاتف الرئيسي',
    type: 'string',
    defaultValue: '+966 50 123 4567',
    category: 'general',
  },

  // Email Settings
  {
    key: 'smtp_host',
    label: 'خادم SMTP',
    description: 'عنوان خادم البريد الإلكتروني',
    type: 'string',
    defaultValue: 'smtp.zoho.com',
    category: 'email',
  },
  {
    key: 'smtp_port',
    label: 'منفذ SMTP',
    description: 'رقم المنفذ (عادة 587 أو 465)',
    type: 'number',
    defaultValue: 587,
    category: 'email',
  },
  {
    key: 'smtp_username',
    label: 'اسم المستخدم',
    description: 'البريد الإلكتروني لإرسال الرسائل',
    type: 'string',
    defaultValue: 'support@tda.sa',
    category: 'email',
  },
  {
    key: 'smtp_secure',
    label: 'اتصال آمن',
    description: 'استخدام SSL/TLS',
    type: 'boolean',
    defaultValue: true,
    category: 'email',
  },

  // SEO Settings
  {
    key: 'meta_description',
    label: 'وصف الموقع',
    description: 'وصف الموقع في محركات البحث',
    type: 'string',
    defaultValue: 'شركة التطور والتسارع التقنية - حلول تقنية متقدمة ومبتكرة',
    category: 'seo',
  },
  {
    key: 'meta_keywords',
    label: 'الكلمات المفتاحية',
    description: 'الكلمات المفتاحية للموقع',
    type: 'string',
    defaultValue: 'تطوير, برمجة, تقنية, حلول, TDA',
    category: 'seo',
  },

  // Security Settings
  {
    key: 'maintenance_mode',
    label: 'وضع الصيانة',
    description: 'تفعيل وضع الصيانة للموقع',
    type: 'boolean',
    defaultValue: false,
    category: 'security',
  },
  {
    key: 'allow_registration',
    label: 'السماح بالتسجيل',
    description: 'السماح للمستخدمين الجدد بإنشاء حسابات',
    type: 'boolean',
    defaultValue: false,
    category: 'security',
  },
];

export default function SettingsManager() {
  const [activeCategory, setActiveCategory] = useState('general');
  const { toast } = useToast();

  const form = useForm();

  // Fetch settings
  const { data: settings = {}, isLoading } = useQuery({
    queryKey: ['/api/admin/settings'],
  });

  // Update setting mutation
  const updateSettingMutation = useMutation({
    mutationFn: ({ key, value, type }: { key: string; value: any; type: string }) =>
      apiRequest('PUT', `/api/admin/settings/${key}`, { value, type }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/settings'] });
      toast({
        title: 'تم تحديث الإعداد بنجاح',
        description: `تم حفظ ${variables.key}`,
      });
    },
    onError: (error: any) => {
      toast({
        title: 'خطأ في حفظ الإعداد',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleSettingChange = (setting: SettingField, value: any) => {
    updateSettingMutation.mutate({
      key: setting.key,
      value,
      type: setting.type,
    });
  };

  const getSettingValue = (setting: SettingField) => {
    return settings[setting.key]?.value ?? setting.defaultValue;
  };

  const renderSettingField = (setting: SettingField) => {
    const currentValue = getSettingValue(setting);

    switch (setting.type) {
      case 'boolean':
        return (
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">{setting.label}</label>
              {setting.description && (
                <p className="text-xs text-gray-600 mt-1">{setting.description}</p>
              )}
            </div>
            <Switch
              checked={currentValue}
              onCheckedChange={(checked) => handleSettingChange(setting, checked)}
              data-testid={`setting-${setting.key}`}
            />
          </div>
        );

      case 'number':
        return (
          <div>
            <label className="text-sm font-medium">{setting.label}</label>
            {setting.description && (
              <p className="text-xs text-gray-600 mb-2">{setting.description}</p>
            )}
            <Input
              type="number"
              value={currentValue}
              onChange={(e) => handleSettingChange(setting, parseInt(e.target.value) || 0)}
              data-testid={`setting-${setting.key}`}
            />
          </div>
        );

      default:
        return (
          <div>
            <label className="text-sm font-medium">{setting.label}</label>
            {setting.description && (
              <p className="text-xs text-gray-600 mb-2">{setting.description}</p>
            )}
            {setting.key.includes('description') || setting.key.includes('keywords') ? (
              <Textarea
                value={currentValue}
                onChange={(e) => handleSettingChange(setting, e.target.value)}
                data-testid={`setting-${setting.key}`}
              />
            ) : (
              <Input
                value={currentValue}
                onChange={(e) => handleSettingChange(setting, e.target.value)}
                data-testid={`setting-${setting.key}`}
              />
            )}
          </div>
        );
    }
  };

  const getCategorySettings = (category: string) => {
    return defaultSettings.filter(setting => setting.category === category);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'general': return <Globe className="w-4 h-4" />;
      case 'email': return <Mail className="w-4 h-4" />;
      case 'seo': return <Settings className="w-4 h-4" />;
      case 'security': return <Shield className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600 mx-auto"></div>
        <p className="mt-2 text-sm text-gray-600">جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">إعدادات النظام</h2>

      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general" className="flex items-center gap-2">
            {getCategoryIcon('general')}
            عام
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            {getCategoryIcon('email')}
            البريد
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center gap-2">
            {getCategoryIcon('seo')}
            SEO
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            {getCategoryIcon('security')}
            الأمان
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>الإعدادات العامة</CardTitle>
              <CardDescription>إعدادات الموقع الأساسية</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {getCategorySettings('general').map(setting => (
                <div key={setting.key}>
                  {renderSettingField(setting)}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات البريد الإلكتروني</CardTitle>
              <CardDescription>تكوين خادم SMTP لإرسال الرسائل</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {getCategorySettings('email').map(setting => (
                <div key={setting.key}>
                  {renderSettingField(setting)}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات محركات البحث</CardTitle>
              <CardDescription>تحسين الموقع لمحركات البحث</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {getCategorySettings('seo').map(setting => (
                <div key={setting.key}>
                  {renderSettingField(setting)}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الأمان</CardTitle>
              <CardDescription>التحكم في أمان الموقع والوصول</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {getCategorySettings('security').map(setting => (
                <div key={setting.key}>
                  {renderSettingField(setting)}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}