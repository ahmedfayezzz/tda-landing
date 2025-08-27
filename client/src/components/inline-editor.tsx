import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Edit3, Save, X, Settings } from 'lucide-react';

interface InlineEditorProps {
  elementKey: string;
  value: string;
  elementType?: 'text' | 'textarea';
  className?: string;
  isAdmin?: boolean;
  onSave?: (newValue: string) => void;
}

export function InlineEditor({
  elementKey,
  value,
  elementType = 'text',
  className = '',
  isAdmin = false,
  onSave
}: InlineEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [showEditIcon, setShowEditIcon] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Update mutation for saving changes
  const updateMutation = useMutation({
    mutationFn: async (data: { value: string }) => {
      return await apiRequest(`/api/admin/website-elements/key/${elementKey}`, 'PUT', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/website-elements'] });
      setIsEditing(false);
      toast({
        title: 'تم الحفظ',
        description: 'تم حفظ التغييرات بنجاح',
      });
      onSave?.(editValue);
    },
    onError: () => {
      toast({
        title: 'خطأ',
        description: 'فشل في حفظ التغييرات',
        variant: 'destructive',
      });
    }
  });

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (elementType === 'text') {
        inputRef.current.select();
      }
    }
  }, [isEditing, elementType]);

  const handleSave = () => {
    if (editValue.trim() !== value.trim()) {
      updateMutation.mutate({ value: editValue.trim() });
    } else {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && elementType === 'text') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  // If not admin, just return the value
  if (!isAdmin) {
    return <span className={className}>{value}</span>;
  }

  return (
    <div 
      className={`inline-editor-wrapper relative ${className}`}
      onMouseEnter={() => setShowEditIcon(true)}
      onMouseLeave={() => setShowEditIcon(false)}
    >
      {isEditing ? (
        <Card className="inline-edit-card p-2 shadow-lg border-2 border-blue-500 bg-white">
          <CardContent className="p-0">
            <div className="space-y-2">
              {elementType === 'textarea' ? (
                <Textarea
                  ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="resize-none min-h-[80px]"
                  data-testid={`inline-edit-${elementKey}`}
                />
              ) : (
                <Input
                  ref={inputRef as React.RefObject<HTMLInputElement>}
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  data-testid={`inline-edit-${elementKey}`}
                />
              )}
              <div className="flex items-center gap-1">
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={updateMutation.isPending}
                  className="h-7 px-2"
                >
                  <Save className="w-3 h-3 mr-1" />
                  {updateMutation.isPending ? 'جاري الحفظ...' : 'حفظ'}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCancel}
                  className="h-7 px-2"
                >
                  <X className="w-3 h-3 mr-1" />
                  إلغاء
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <span 
          className={`editable-content ${className}`}
          onClick={() => setIsEditing(true)}
          style={{ cursor: 'pointer' }}
          data-testid={`editable-${elementKey}`}
        >
          {value}
          {(showEditIcon || isEditing) && (
            <Button
              size="sm"
              variant="ghost"
              className="inline-edit-icon ml-2 h-6 w-6 p-0 opacity-70 hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
            >
              <Edit3 className="w-3 h-3" />
            </Button>
          )}
        </span>
      )}
    </div>
  );
}

// Hook to detect if user is admin
export function useAdminMode() {
  const [isAdminMode, setIsAdminMode] = useState(false);

  useEffect(() => {
    // Check if user has admin mode enabled (can be stored in localStorage)
    const adminMode = localStorage.getItem('admin-edit-mode') === 'true';
    setIsAdminMode(adminMode);
  }, []);

  const toggleAdminMode = () => {
    const newMode = !isAdminMode;
    setIsAdminMode(newMode);
    localStorage.setItem('admin-edit-mode', newMode.toString());
  };

  return { isAdminMode, toggleAdminMode };
}

// Admin mode toggle button
export function AdminModeToggle() {
  const { isAdminMode, toggleAdminMode } = useAdminMode();

  return (
    <Button
      variant={isAdminMode ? "default" : "outline"}
      size="sm"
      onClick={toggleAdminMode}
      className="fixed top-4 right-4 z-50 shadow-lg"
      data-testid="admin-mode-toggle"
    >
      <Settings className="w-4 h-4 mr-2" />
      {isAdminMode ? 'تعطيل التحرير' : 'تمكين التحرير'}
    </Button>
  );
}