'use client';

/// <reference types="@webgpu/types" />

import { useEffect, useState, useRef } from 'react';

export interface WebGPUContext {
  device: GPUDevice | null;
  canvas: HTMLCanvasElement | null;
  context: GPUCanvasContext | null;
  isSupported: boolean;
  isInitialized: boolean;
}

export function useWebGPU() {
  const [gpuContext, setGpuContext] = useState<WebGPUContext>({
    device: null,
    canvas: null,
    context: null,
    isSupported: false,
    isInitialized: false,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const initWebGPU = async () => {
      if (!navigator.gpu) {
        console.warn('WebGPU not supported');
        return;
      }

      try {
        const adapter = await navigator.gpu.requestAdapter();
        if (!adapter) {
          console.error('No GPU adapter found');
          return;
        }

        const device = await adapter.requestDevice();
        const canvas = canvasRef.current;

        if (!canvas) {
          console.error('Canvas not found');
          return;
        }

        const context = canvas.getContext('webgpu');
        if (!context) {
          console.error('Failed to get WebGPU context');
          return;
        }

        const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
        context.configure({
          device,
          format: presentationFormat,
          alphaMode: 'premultiplied',
        });

        setGpuContext({
          device,
          canvas,
          context,
          isSupported: true,
          isInitialized: true,
        });
      } catch (error) {
        console.error('Failed to initialize WebGPU:', error);
      }
    };

    if (typeof window !== 'undefined') {
      initWebGPU();
    }
  }, []);

  return { ...gpuContext, canvasRef };
}

export async function loadImageTexture(
  device: GPUDevice,
  imageUrl: string
): Promise<GPUTexture> {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  const imageBitmap = await createImageBitmap(blob);

  const texture = device.createTexture({
    size: [imageBitmap.width, imageBitmap.height, 1],
    format: 'rgba8unorm',
    usage:
      GPUTextureUsage.TEXTURE_BINDING |
      GPUTextureUsage.COPY_DST |
      GPUTextureUsage.RENDER_ATTACHMENT,
  });

  device.queue.copyExternalImageToTexture(
    { source: imageBitmap },
    { texture },
    [imageBitmap.width, imageBitmap.height]
  );

  return texture;
}

export async function loadImageFromFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result as string);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
