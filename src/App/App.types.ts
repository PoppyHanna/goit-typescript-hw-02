
export interface ImageData {
  id: number;
  webformatURL: string;
  tags: string;
  alt_description: string;
  urls: {
    small: string;
    full: string;
    regular: string;
  };
  total_pages?: number;
    results?: any[];
  user: { name: string };
  likes: number;
  description: string | null;
}
