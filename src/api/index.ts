import { storage } from "../helpers/localStorage";
import { API_URL } from "./constants";
import { $request } from "./request";

export type GenerationRequest = {
  prompt: string;
  negative_prompt: string;
  height: number;
  width: number;
  scale: number;
  steps: number;
  seed: number;
  sampler: string;
  model: string;
};

export const makeGenerationRequest = async (
  parameters: GenerationRequest
): Promise<string> => {
  const res: any = await $request.post("/generate", parameters);

  return res.data.download_id;
};

export const getImageUrl = async (id: string): Promise<string> => {
  const response = await fetch(`${API_URL}/generate/download/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${storage.get("token")}`,
    },
  });


  console.log('response', response);

  
  const blob = await response.blob();
  console.log('blob', blob);
  console.log('window.URL.createObjectURL(blob)', window.URL.createObjectURL(blob));
  return window.URL.createObjectURL(blob);  
};

export const checkStatus = async (id: string): Promise<boolean> => {
  const response = await $request.get(`/generate/tasks/${id}`);

  const task_status = response.data.task_status;

  if (!["PENDING", "SUCCESS"].includes(task_status)) {
    throw new Error("Generation failed");
  }

  return task_status === "SUCCESS";
};

export const fetchSchedulers = async (): Promise<string[]> => {
  const res: any = await $request.get("/generate/schedulers");

  return res.data.schedulers;
};

export const fetchModels = async (): Promise<string[]> => {
  const res: any = await $request.get("/generate/models");

  return res.data.models_list;
};
