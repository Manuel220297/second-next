type Props = {
  params: {
    id: string;
  };
  searchParams: {
    url?: string;
  };
};

async function PdfPage({ params, searchParams }: Props) {
  const { url } = await searchParams;

  const { id } = await params;

  const pdfUrl = searchParams.url;

  if (!pdfUrl) {
    return <div>No PDF URL provided</div>;
  }
  return (
    <div>
      <h1>Course Material {id} </h1>
      <embed src={decodeURIComponent(pdfUrl)} type='application/pdf' className='w-full h-[100vh]' />{' '}
    </div>
  );
}

export default PdfPage;
