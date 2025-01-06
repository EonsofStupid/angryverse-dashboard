import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface SeoMetadataFormProps {
  metaTitle: string;
  metaDescription: string;
  onMetaTitleChange: (value: string) => void;
  onMetaDescriptionChange: (value: string) => void;
}

export const SeoMetadataForm = ({
  metaTitle,
  metaDescription,
  onMetaTitleChange,
  onMetaDescriptionChange,
}: SeoMetadataFormProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="meta-title">Meta Title</Label>
        <Input
          id="meta-title"
          value={metaTitle}
          onChange={(e) => onMetaTitleChange(e.target.value)}
          placeholder="Enter meta title"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="meta-description">Meta Description</Label>
        <Textarea
          id="meta-description"
          value={metaDescription}
          onChange={(e) => onMetaDescriptionChange(e.target.value)}
          placeholder="Enter meta description"
          className="mt-1"
        />
      </div>
    </div>
  );
};