import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useLearningMaterials(subjectId: string) {
  const { data, error, isLoading, mutate } = useSWR(`/api/materials?subjectId=${subjectId}`, fetcher);

  return {
    materials: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}
