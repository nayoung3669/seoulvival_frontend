import DetailComment from '@/components/detail/comment/DetailComment';
import DetailHeader from '@/components/detail/DetailHeader';
import DetailHotHashtag from '@/components/detail/DetailHotHashtag';
import DetailMain from '@/components/detail/main/DetailMain';
import DetailNavbar from '@/components/detail/DetailNavbar';
import BeatLoader from '@/components/common/Spinner';
import { cookies } from 'next/headers';
import { getBoard, getUserBoard } from '@/service/board';
interface DetailPageProps {
  params: {
    slug: string;
  };
}

const DetailPage = async ({ params }: DetailPageProps) => {
  const { slug: postId } = params;
  const token = cookies().get('accessToken');
  const data = token ? await getUserBoard(postId) : await getBoard(postId);

  return (
    <section className="w-full max-w-2md h-screen relative">
      {data ? (
        <>
          <DetailHeader data={data} />
          <DetailMain data={data} postId={postId} />
          <DetailComment postId={postId} />
          <DetailHotHashtag data={data} />
        </>
      ) : (
        <div className="flex h-screen justify-center items-center">
          <BeatLoader />
        </div>
      )}
      <DetailNavbar postId={postId} />
      <div className="flex w-full h-16"></div>
      <div id="detailPortal" />
    </section>
  );
};

export default DetailPage;

//
