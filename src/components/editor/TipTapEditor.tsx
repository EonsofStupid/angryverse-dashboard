import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface TipTapEditorProps {
  initialContent?: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export const TipTapEditor = ({ initialContent, onChange, placeholder }: TipTapEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none min-h-[200px] max-w-none',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
      <EditorContent editor={editor} />
      {!editor?.isEmpty && placeholder && (
        <div className="text-muted-foreground p-3">{placeholder}</div>
      )}
    </div>
  );
};