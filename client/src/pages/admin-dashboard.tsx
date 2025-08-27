import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { 
  Users, 
  FileText, 
  Mail, 
  Settings, 
  LogOut, 
  Eye, 
  Calendar,
  MessageSquare,
  BarChart3
} from 'lucide-react';
import PagesManager from '@/components/pages-manager';
import SettingsManager from '@/components/settings-manager';
import { ContentManager } from '@/components/content-manager';

interface DashboardStats {
  totalContacts: number;
  totalFormSubmissions: number;
  totalPages: number;
  totalUsers: number;
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Check authentication
  const { data: currentUser, isLoading: authLoading } = useQuery({
    queryKey: ['/api/auth/user'],
    retry: false,
  });

  // Fetch contacts
  const { data: contacts = [], isLoading: contactsLoading } = useQuery({
    queryKey: ['/api/admin/contacts'],
    enabled: !!currentUser,
  });

  // Fetch form submissions
  const { data: formSubmissions = [], isLoading: submissionsLoading } = useQuery({
    queryKey: ['/api/admin/form-submissions'],
    enabled: !!currentUser,
  });

  // Fetch pages for stats
  const { data: pages = [] } = useQuery({
    queryKey: ['/api/admin/pages'],
    enabled: !!currentUser,
  });

  // Fetch users for stats
  const { data: users = [] } = useQuery({
    queryKey: ['/api/admin/users'],
    enabled: !!currentUser,
  });

  const logoutMutation = useMutation({
    mutationFn: () => apiRequest('POST', '/api/auth/logout'),
    onSuccess: () => {
      queryClient.clear();
      toast({
        title: 'تم تسجيل الخروج بنجاح',
      });
      setLocation('/admin/login');
    },
  });

  useEffect(() => {
    if (!authLoading && !currentUser) {
      setLocation('/admin/login');
    }
  }, [currentUser, authLoading, setLocation]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  const stats: DashboardStats = {
    totalContacts: Array.isArray(contacts) ? contacts.length : 0,
    totalFormSubmissions: Array.isArray(formSubmissions) ? formSubmissions.length : 0,
    totalPages: Array.isArray(pages) ? pages.length : 0,
    totalUsers: Array.isArray(users) ? users.length : 1,
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4 space-x-reverse">
              <h1 className="text-xl font-semibold text-gray-900">
                لوحة التحكم - TDA
              </h1>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <span className="text-sm text-gray-600">
                مرحباً، {(currentUser as any)?.user?.firstName || (currentUser as any)?.user?.email || 'مدير النظام'}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
                data-testid="button-logout"
              >
                <LogOut className="w-4 h-4 mr-2" />
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">طلبات التواصل</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalContacts}</div>
              <p className="text-xs text-muted-foreground">
                إجمالي الطلبات المستلمة
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إرسالات النماذج</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalFormSubmissions}</div>
              <p className="text-xs text-muted-foreground">
                جميع النماذج المرسلة
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الصفحات</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPages}</div>
              <p className="text-xs text-muted-foreground">
                صفحات الموقع
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المستخدمين</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                مدراء النظام
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
            <TabsTrigger value="content">إدارة المحتوى</TabsTrigger>
            <TabsTrigger value="contacts">طلبات التواصل</TabsTrigger>
            <TabsTrigger value="pages">الصفحات</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>أحدث طلبات التواصل</CardTitle>
                </CardHeader>
                <CardContent>
                  {contactsLoading ? (
                    <div className="text-center py-8">جاري تحميل الطلبات...</div>
                  ) : contacts.length > 0 ? (
                    <div className="space-y-4">
                      {contacts.slice(0, 3).map((contact: any) => (
                        <div key={contact.id} className="flex justify-between items-center p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{contact.fullName}</p>
                            <p className="text-sm text-gray-600">{contact.email}</p>
                          </div>
                          <Badge variant="outline">جديد</Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-8 text-gray-500">لا توجد طلبات حتى الآن</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Content Management Tab */}
          <TabsContent value="content">
            <ContentManager />
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts">
            <Card>
              <CardHeader>
                <CardTitle>طلبات التواصل</CardTitle>
                <CardDescription>
                  جميع طلبات التواصل المستلمة من الموقع
                </CardDescription>
              </CardHeader>
              <CardContent>
                {contactsLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600 mx-auto"></div>
                    <p className="mt-2 text-sm text-gray-600">جاري التحميل...</p>
                  </div>
                ) : !Array.isArray(contacts) || contacts.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">لا توجد طلبات</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      لم يتم استلام أي طلبات تواصل بعد.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {contacts.map((contact: any) => (
                      <div
                        key={contact.id}
                        className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow"
                        data-testid={`contact-${contact.id}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-gray-900">{contact.fullName}</h3>
                          <Badge variant="outline">
                            {new Date(contact.createdAt).toLocaleDateString('ar-SA')}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p><strong>البريد الإلكتروني:</strong> {contact.email}</p>
                          {contact.phone && (
                            <p><strong>الهاتف:</strong> {contact.phone}</p>
                          )}
                          {contact.projectType && (
                            <p><strong>نوع المشروع:</strong> {contact.projectType}</p>
                          )}
                          <p><strong>التفاصيل:</strong> {contact.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Forms Tab */}
          <TabsContent value="forms">
            <Card>
              <CardHeader>
                <CardTitle>إرسالات النماذج</CardTitle>
                <CardDescription>
                  جميع النماذج المرسلة من الموقع
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submissionsLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600 mx-auto"></div>
                    <p className="mt-2 text-sm text-gray-600">جاري التحميل...</p>
                  </div>
                ) : !Array.isArray(formSubmissions) || formSubmissions.length === 0 ? (
                  <div className="text-center py-8">
                    <Mail className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">لا توجد إرسالات</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      لم يتم إرسال أي نماذج بعد.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {formSubmissions.map((submission: any) => (
                      <div
                        key={submission.id}
                        className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow"
                        data-testid={`submission-${submission.id}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-gray-900">
                            نموذج {submission.formType}
                          </h3>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            {!submission.isRead && (
                              <Badge className="bg-red-100 text-red-800">جديد</Badge>
                            )}
                            <Badge variant="outline">
                              {new Date(submission.createdAt).toLocaleDateString('ar-SA')}
                            </Badge>
                          </div>
                        </div>
                        <pre className="text-sm text-gray-600 bg-gray-50 p-2 rounded whitespace-pre-wrap">
                          {JSON.stringify(submission.data, null, 2)}
                        </pre>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pages Tab */}
          <TabsContent value="pages">
            <PagesManager />
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <SettingsManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}