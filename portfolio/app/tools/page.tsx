import type { Metadata } from 'next';
import ToolsGrid from './ToolsGrid';

export const metadata: Metadata = {
  title: 'Herramientas — Juan Cruz Larraya',
  description: 'Herramientas interactivas de electrónica y programación industrial: conversores, simuladores y generadores.',
};

export default function ToolsPage() {
  return <ToolsGrid />;
}
