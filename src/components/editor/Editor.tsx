import { TipTapEditor } from './TipTapEditor';

interface EditorProps {
  initialContent?: string | null;
  onChange: (content: string) => void;
  placeholder?: string;
}

export const Editor = ({ initialContent, onChange, placeholder }: EditorProps) => {
  return (
    <TipTapEditor
      initialContent={initialContent || ''}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};