import AssistDetailClient from "@/components/assist/AssistDetailClient";

interface AssistDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function AssistDetailPage({ params }: AssistDetailPageProps) {
  const { id } = await params;
  return <AssistDetailClient id={id} />;
}
