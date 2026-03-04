'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWebGPU, loadImageFromFile } from './useWebGPU';

type EffectStyle = 'screen' | 'multiply' | 'overlay' | 'difference';

const EFFECT_DESCRIPTIONS: Record<EffectStyle, string> = {
  screen: 'Tonos brillantes superpuestos',
  multiply: 'Colores multiplicados y profundos',
  overlay: 'Mezcla equilibrada con contraste',
  difference: 'Diferencia de colores invertidos',
};

export default function ImageAnalyzer() {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [selectedEffect, setSelectedEffect] = useState<EffectStyle>('screen');
  const [showResult, setShowResult] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resultCanvasRef = useRef<HTMLCanvasElement>(null);

  const { device, isSupported, isInitialized } = useWebGPU();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imageDataUrl = await loadImageFromFile(file);
      setUserImage(imageDataUrl);
      setShowResult(false);
    } catch (error) {
      console.error('Failed to load image:', error);
      alert('Error al cargar la imagen. Intenta con otro archivo.');
    }
  };

  const createCollage = async () => {
    if (!userImage || !device || !canvasRef.current || !resultCanvasRef.current) {
      alert('WebGPU no está disponible o falta la imagen');
      return;
    }

    setIsProcessing(true);

    try {
      // Using Canvas API for collage (WebGPU alternative for browsers without support)
      const canvas = resultCanvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size
      canvas.width = 800;
      canvas.height = 600;

      // Load user image
      const userImg = new Image();
      userImg.src = userImage;
      await new Promise((resolve) => {
        userImg.onload = resolve;
      });

      // Load Juan's image
      const juanImg = new Image();
      juanImg.src = '/images/Carnet.jpg';
      await new Promise((resolve) => {
        juanImg.onload = resolve;
      });

      // Clear canvas
      ctx.fillStyle = '#1C1B18';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create artistic collage based on selected effect
      const drawCollage = () => {
        // Draw user image on left
        const userWidth = canvas.width * 0.45;
        const userHeight = (userWidth / userImg.width) * userImg.height;
        const userY = (canvas.height - userHeight) / 2;

        ctx.save();
        ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(userImg, 20, userY, userWidth, userHeight);

        // Add chromatic aberration effect
        ctx.globalCompositeOperation = 'screen';
        ctx.globalAlpha = 0.3;
        ctx.drawImage(userImg, 25, userY + 5, userWidth, userHeight);
        ctx.restore();

        // Draw Juan's image on right with blend mode
        const juanWidth = canvas.width * 0.45;
        const juanHeight = (juanWidth / juanImg.width) * juanImg.height;
        const juanX = canvas.width - juanWidth - 20;
        const juanY = (canvas.height - juanHeight) / 2;

        ctx.save();

        // Apply selected blend mode
        switch (selectedEffect) {
          case 'screen':
            ctx.globalCompositeOperation = 'screen';
            break;
          case 'multiply':
            ctx.globalCompositeOperation = 'multiply';
            break;
          case 'overlay':
            ctx.globalCompositeOperation = 'overlay';
            break;
          case 'difference':
            ctx.globalCompositeOperation = 'difference';
            break;
        }

        ctx.globalAlpha = 0.8;
        ctx.drawImage(juanImg, juanX, juanY, juanWidth, juanHeight);

        // Add glitch effect lines
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 0.6;
        ctx.strokeStyle = '#F2D478';
        ctx.lineWidth = 2;

        for (let i = 0; i < 5; i++) {
          const y = Math.random() * canvas.height;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }

        ctx.restore();

        // Add text overlay
        ctx.save();
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = '#D3B56C';
        ctx.font = 'bold 32px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('EXPERIMENTAL COLLAGE', canvas.width / 2, 50);

        ctx.font = '16px system-ui';
        ctx.fillStyle = '#E2E0D2';
        ctx.fillText(EFFECT_DESCRIPTIONS[selectedEffect], canvas.width / 2, canvas.height - 30);
        ctx.restore();
      };

      drawCollage();

      setShowResult(true);
    } catch (error) {
      console.error('Error creating collage:', error);
      alert('Error al crear el collage. Intenta de nuevo.');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadCollage = () => {
    if (!resultCanvasRef.current) return;

    const link = document.createElement('a');
    link.download = 'collage-experimental.png';
    link.href = resultCanvasRef.current.toDataURL();
    link.click();
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl font-bold text-accent-gold mb-4">
          Crea tu Collage Artístico
        </h2>
        <p className="text-accent-light text-lg">
          Sube tu foto y aparezcamos juntos en un collage experimental
        </p>
      </motion.div>

      {!isSupported && (
        <div className="bg-accent-yellow/10 border border-accent-yellow p-4 rounded-lg mb-6">
          <p className="text-accent-yellow">
            ⚠️ WebGPU no está disponible en tu navegador. Usando Canvas API como alternativa.
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Upload Section */}
        <motion.div
          className="bg-primary-medium p-6 rounded-lg border border-primary-border"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-2xl text-accent-gold mb-4">1. Sube tu foto</h3>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full bg-accent-gold text-primary-dark py-3 px-6 rounded-lg font-bold hover:bg-accent-yellow transition-colors mb-4"
          >
            {userImage ? 'Cambiar imagen' : 'Seleccionar imagen'}
          </button>

          {userImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4"
            >
              <img
                src={userImage}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg"
              />
            </motion.div>
          )}
        </motion.div>

        {/* Effect Selection */}
        <motion.div
          className="bg-primary-medium p-6 rounded-lg border border-primary-border"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-2xl text-accent-gold mb-4">2. Elige el estilo</h3>

          <div className="space-y-3">
            {(Object.keys(EFFECT_DESCRIPTIONS) as EffectStyle[]).map((effect) => (
              <motion.button
                key={effect}
                onClick={() => setSelectedEffect(effect)}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  selectedEffect === effect
                    ? 'border-accent-yellow bg-accent-yellow/10'
                    : 'border-primary-border hover:border-accent-gold'
                }`}
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="font-bold text-accent-light capitalize">{effect}</div>
                <div className="text-sm text-accent-light/70">
                  {EFFECT_DESCRIPTIONS[effect]}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Generate Button */}
      {userImage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center"
        >
          <button
            onClick={createCollage}
            disabled={isProcessing}
            className="bg-accent-gold text-primary-dark py-4 px-12 rounded-lg font-bold text-xl hover:bg-accent-yellow transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Creando collage...' : '✨ Generar Collage'}
          </button>
        </motion.div>
      )}

      {/* Result Canvas */}
      <canvas ref={canvasRef} className="hidden" />
      <canvas ref={resultCanvasRef} className="hidden" />

      {/* Result Display */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mt-12 bg-primary-medium p-8 rounded-lg border border-primary-border"
          >
            <h3 className="text-3xl text-accent-gold mb-6 text-center">
              ¡Tu Collage Artístico!
            </h3>

            <div className="relative">
              <img
                src={resultCanvasRef.current?.toDataURL()}
                alt="Collage Result"
                className="w-full rounded-lg shadow-2xl"
              />
            </div>

            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={downloadCollage}
                className="bg-accent-gold text-primary-dark py-3 px-8 rounded-lg font-bold hover:bg-accent-yellow transition-colors"
              >
                📥 Descargar
              </button>

              <button
                onClick={() => setShowResult(false)}
                className="bg-primary-border text-accent-light py-3 px-8 rounded-lg font-bold hover:bg-accent-gold hover:text-primary-dark transition-colors"
              >
                Crear otro
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
