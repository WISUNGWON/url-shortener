import { redirect } from 'next/navigation';

interface RedirectPageProps {
  params: Promise<{
    shortKey: string;
  }>;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function RedirectPage({ params }: RedirectPageProps) {
  const { shortKey } = await params;

  if (!shortKey || typeof shortKey !== 'string') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">URL 리다이렉트</h1>
          <p className="text-red-600 text-lg">잘못된 단축 URL 형식입니다.</p>
        </div>
      </div>
    );
  }

  let originalUrl: string | null = null;

  try {
    const response = await fetch(`${BACKEND_URL}/api/url/${shortKey}`, {
      cache: 'no-store'
    });

    if (response.ok) {
      const data = await response.json();
      originalUrl = data.originalUrl;
    } else if (response.status === 404) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">URL 리다이렉트</h1>
            <p className="text-red-600 text-lg">단축 URL을 찾을 수 없습니다.</p>
          </div>
        </div>
      );
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error || '백엔드에서 URL 조회에 실패했습니다.');
    }
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">URL 리다이렉트</h1>
          <p className="text-red-600 text-lg">URL을 조회하는 데 문제가 발생했습니다.</p>
        </div>
      </div>
    );
  }

  if (originalUrl) {
    redirect(originalUrl);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">URL 리다이렉트</h1>
        <p className="text-red-600 text-lg">단축 URL을 찾을 수 없습니다.</p>
      </div>
    </div>
  );
}