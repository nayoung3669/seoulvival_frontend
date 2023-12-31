import PostItem from '@/components/community/PostItem';
import { cookies } from 'next/headers';

const MyscrapList = async ({ category }: { category: string }) => {
  const token = cookies().get('accessToken')?.value;

  const myPageData = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/posts/myscrap?page=1&size=3`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
      },
      cache: 'no-store',
    },
  ).then<ResponseMyPostData>((res) => res.json());
  return (
    <div>
      {myPageData &&
        myPageData.result.map((data) => (
          <PostItem
            key={data.post.postId}
            location={data.location}
            post={data.post}
            user={data.user}
            hasLiked
          />
        ))}
    </div>
  );
};

export default MyscrapList;
