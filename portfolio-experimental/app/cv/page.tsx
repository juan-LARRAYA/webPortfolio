import type { Metadata } from 'next';
import CvClient from './CvClient';

export const metadata: Metadata = {
  title: 'CV — Juan Cruz Larraya',
  description: 'Curriculum Vitae de Juan Cruz Larraya. Ingeniero Electrónico (FIUBA), automatización industrial y desarrollo de software.',
};

export default function CvPage() {
  return <CvClient />;
}
