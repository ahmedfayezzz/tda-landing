import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { Plus, Edit, Eye, Calendar } from 'lucide-react';

const pageSchema = z.object({
  title: z.string().min(1, 'العنوان مطلوب'),
  slug: z.string().min(1, 'المسار مطلوب').regex(/^[a-z0-9-]+$/, 'المسار يجب أن يحتوي على أحرف إنجليزية صغيرة وأرقام وشرطات فقط'),
  content: z.string().min(1, 'المحتوى مطلوب'),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  isPublished: z.boolean().default(false),
});

type PageForm = z.infer<typeof pageSchema>;

export default function PagesManager() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<any>(null);
  const { toast } = useToast();

  // Initialize default pages mutation
  const initPagesMutation = useMutation({
    mutationFn: () => apiRequest('POST', '/api/admin/init-pages'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/pages'] });
      toast({
        title: 'تم إنشاء الصفحات الافتراضية بنجاح',
        description: 'يمكنك الآن تعديل الصفحة الرئيسية والصفحات الأخرى',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'خطأ في إنشاء الصفحات',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const form = useForm<PageForm>({
    resolver: zodResolver(pageSchema),
    defaultValues: {
      title: '',
      slug: '',
      content: '',
      metaTitle: '',
      metaDescription: '',
      isPublished: false,
    },
  });

  // Fetch pages
  const { data: pages = [], isLoading } = useQuery<any[]>({
    queryKey: ['/api/admin/pages'],
  });

  // Create page mutation
  const createPageMutation = useMutation({
    mutationFn: (data: PageForm) => apiRequest('POST', '/api/admin/pages', {
      ...data,
      content: JSON.stringify([{ type: 'paragraph', content: data.content }]), // Simple content structure
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/pages'] });
      setIsCreateDialogOpen(false);
      form.reset();
      toast({
        title: 'تم إنشاء الصفحة بنجاح',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'خطأ في إنشاء الصفحة',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Update page mutation
  const updatePageMutation = useMutation({
    mutationFn: ({ id, ...data }: PageForm & { id: string }) => 
      apiRequest('PUT', `/api/admin/pages/${id}`, {
        ...data,
        content: JSON.stringify([{ type: 'paragraph', content: data.content }]),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/pages'] });
      setEditingPage(null);
      form.reset();
      toast({
        title: 'تم تحديث الصفحة بنجاح',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'خطأ في تحديث الصفحة',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: PageForm) => {
    if (editingPage) {
      updatePageMutation.mutate({ ...data, id: editingPage.id });
    } else {
      createPageMutation.mutate(data);
    }
  };

  const handleEdit = (page: any) => {
    setEditingPage(page);
    
    // Extract content from JSON structure
    let content = '';
    try {
      const contentObj = JSON.parse(page.content);
      if (Array.isArray(contentObj) && contentObj[0]?.content) {
        content = contentObj[0].content;
      }
    } catch {
      content = page.content;
    }

    form.reset({
      title: page.title,
      slug: page.slug,
      content,
      metaTitle: page.metaTitle || '',
      metaDescription: page.metaDescription || '',
      isPublished: page.isPublished,
    });
  };

  const handleCreateNew = () => {
    setEditingPage(null);
    form.reset();
    setIsCreateDialogOpen(true);
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
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">إدارة الصفحات</h2>
        <Dialog open={isCreateDialogOpen || !!editingPage} onOpenChange={(open) => {
          setIsCreateDialogOpen(open && !editingPage);
          if (!open) setEditingPage(null);
        }}>
          <DialogTrigger asChild>
            <Button onClick={handleCreateNew} data-testid="button-create-page">
              <Plus className="w-4 h-4 mr-2" />
              إضافة صفحة جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingPage ? 'تعديل الصفحة' : 'إضافة صفحة جديدة'}
              </DialogTitle>
              <DialogDescription>
                {editingPage ? 'تعديل بيانات الصفحة' : 'إنشاء صفحة جديدة في الموقع'}
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>عنوان الصفحة</FormLabel>
                        <FormControl>
                          <Input placeholder="عنوان الصفحة" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>المسار (URL)</FormLabel>
                        <FormControl>
                          <Input placeholder="page-url" {...field} />
                        </FormControl>
                        <FormDescription>
                          مثال: about-us أو services
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>محتوى الصفحة</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="محتوى الصفحة..."
                          className="min-h-[200px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="metaTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>عنوان SEO (اختياري)</FormLabel>
                      <FormControl>
                        <Input placeholder="عنوان الصفحة في محركات البحث" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="metaDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>وصف SEO (اختياري)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="وصف الصفحة في محركات البحث"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={createPageMutation.isPending || updatePageMutation.isPending}
                    data-testid="button-save-page"
                  >
                    {editingPage ? 'تحديث الصفحة' : 'إنشاء الصفحة'}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {pages.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Eye className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium mb-2">لا توجد صفحات</h3>
            <p className="text-gray-600 mb-4">ابدأ بإنشاء صفحات الموقع الأساسية أو صفحة مخصصة</p>
            <div className="flex gap-3 justify-center">
              <Button 
                onClick={() => initPagesMutation.mutate()}
                disabled={initPagesMutation.isPending}
                data-testid="button-init-pages"
              >
                إنشاء الصفحات الأساسية
              </Button>
              <Button variant="outline" onClick={handleCreateNew}>إنشاء صفحة مخصصة</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {pages.map((page: any) => (
            <Card key={page.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{page.title}</CardTitle>
                    <CardDescription>/{page.slug}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Badge variant={page.isPublished ? 'default' : 'secondary'}>
                      {page.isPublished ? 'منشورة' : 'مسودة'}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(page)}
                      data-testid={`button-edit-${page.id}`}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  آخر تحديث: {new Date(page.updatedAt).toLocaleDateString('ar-SA')}
                </div>
                {page.metaDescription && (
                  <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                    {page.metaDescription}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}