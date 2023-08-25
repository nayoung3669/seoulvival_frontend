import PostItem from '@/components/community/PostItem';
import Link from 'next/link';
import useSWR from 'swr';

interface BoardListProps {
  markerIdValue: number | null;
  boardList: ResponseRegister | null;
}

const BoardList = ({ markerIdValue, boardList }: BoardListProps) => {
  const { data } = useSWR(`api/map/detail/${markerIdValue}`);
  console.log(data);
  return (
    <article className="flex flex-col border-b-4 ">
      <div className="w-full justify-between flex"></div>
      {markerIdValue ? (
        <div>
          {/* {<PostItem category={Category} tags={tags} isPop={isPop} {...post} onMap={true}/>} */}
        </div>
      ) : (
        <div className="h-full overflow-y-auto ">
          {boardList?.result.map((post) => (
            <div key={post.post.postId} className="w-full mb-0.5">
              <Link href={`/detail/${post.post.postId}`}>
                <PostItem {...post} key={post.post.postId} onMap />
              </Link>
            </div>
          ))}
        </div>
      )}
    </article>
  );
};

export default BoardList;
