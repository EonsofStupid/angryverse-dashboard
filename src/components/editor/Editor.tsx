import { useEffect, useRef } from 'react';

interface EditorProps {
  initialContent?: string | null;
  onChange: (content: string) => void;
  placeholder?: string;
}

export const Editor = ({ initialContent, onChange, placeholder }: EditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = initialContent || '';
    }
  }, [initialContent]);

  return (
    <div
      ref={editorRef}
      contentEditable
      className="min-h-[200px] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      onInput={(e) => onChange(e.currentTarget.innerHTML)}
      placeholder={placeholder}
      dangerouslySetInnerHTML={{ __html: initialContent || '' }}
    />
  );
};