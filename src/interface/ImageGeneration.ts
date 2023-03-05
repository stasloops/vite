export interface IParam {
  seed: number;
  scale: number;
  steps: number;
  sampler: string;
  pipeline_name: string;
  width: number;
  height: number;
  prompt: string;
  negative_prompt: string;
}

export interface IImageGeneratedItem {
  imageUrl?: string;
  params: IParam;
  id: string;
  file_id?: string;
  generatedAt?: number;
  failedAt?: number;
}
