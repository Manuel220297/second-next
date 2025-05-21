import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useAddStudents(subjectId: string) {
  const { data, error, isLoading, mutate } = useSWR(`/api/materials?subjectId=${subjectId}`, fetcher);

  return {
    students: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}
