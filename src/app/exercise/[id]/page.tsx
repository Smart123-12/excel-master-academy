import React from 'react';
import { exercises } from '@/data';
import ExerciseClientPage from '@/components/exercise/ExerciseClientPage';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return exercises.map((ex) => ({
    id: ex.id,
  }));
}

export default async function ExercisePageWrapper({ params }: PageProps) {
  const { id } = await params;
  return <ExerciseClientPage exerciseId={id} />;
}
