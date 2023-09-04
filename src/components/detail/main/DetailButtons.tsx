'use client';

import { Like, fillLike, scrapIcon } from '@/utils/Icon';
import Icons from '../../common/Icons';
import toast, { Toaster } from 'react-hot-toast';
import useSWR, { useSWRConfig } from 'swr';

const DetailButtons = ({ postId }: { postId: string }) => {
  const { data } = useSWR<RessponseLikeandScrap>(`/api/post/${postId}`);
  const { mutate } = useSWRConfig();
  const onClickLikeHandler = async () => {
    const tokenValidResponse = await fetch('/api/user', {
      method: 'GET',
    });

    if (tokenValidResponse.status === 200) {
      try {
        mutate(
          `/api/post/${postId}`,
          {
            ...data,
            hasLiked: !data?.hasLiked,
            likeSize: data?.hasLiked
              ? data.likeSize - 1
              : data && data.likeSize + 1,
          },
          false,
        );
        const response = await fetch(`/api/post/like`, {
          method: 'POST',
          body: JSON.stringify(postId),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((response) => {
          if (response.status === 200) {
            return response.json();
          } else if (response.status === 401) {
            document.body.style.overflow = 'hidden';
          } else {
            throw new Error(response.statusText);
          }
        });
        mutate(`/api/post/${postId}`);
        toast.success(response.message);
      } catch (error) {
        toast.error('로그인을 먼저 해주세요');
      }
    } else {
      alert('로그인 모달 나와주세요');
    }
  };
  const onClickScrapHandler = async () => {
    const tokenValidResponse = await fetch('/api/user', {
      method: 'GET',
    });

    if (tokenValidResponse.status === 200) {
      try {
        mutate(
          `/api/post/${postId}`,
          {
            ...data,
            hasScrapped: !data?.hasScrapped,
            scrapSize: data?.hasScrapped
              ? data.scrapSize - 1
              : data && data.scrapSize + 1,
          },
          false,
        );
        const response = await fetch(`/api/post/scrap`, {
          method: 'POST',
          body: JSON.stringify(postId),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((response) => {
          if (response.status === 200) {
            return response.json();
          } else if (response.status === 401) {
            document.body.style.overflow = 'hidden';
          } else {
            throw new Error(response.statusText);
          }
        });
        mutate(`/api/post/${postId}`);
        toast.success(response.message);
      } catch (error) {
        toast.error('로그인을 먼저 해주세요');
      }
    } else {
      alert('로그인 모달 나와주세요');
    }
  };
  const userActive =
    'active:bg-emerald-50 active:border-teal-400 active:text-teal-400';
  const liekdDiv = 'bg-emerald-50 border-teal-400 text-teal-400';
  const normalDiv = 'border-zinc-500';
  const basicDivStyle =
    'h-8 w-full border rounded-3xl py-1 flex justify-center items-center gap-3';
  return (
    <>
      <Toaster />
      {data && (
        <>
          <div className="flex flex-row gap-2 w-full">
            <div
              onClick={onClickLikeHandler}
              className={`${basicDivStyle} ${
                data.hasLiked ? liekdDiv : normalDiv
              } ${userActive}`}
            >
              <Icons path={data.hasLiked ? fillLike : Like} />
              <span>{data.likeSize}</span>
            </div>
            <div
              onClick={onClickScrapHandler}
              className={`${basicDivStyle} ${
                data.hasScrapped ? liekdDiv : normalDiv
              } ${userActive}`}
            >
              <Icons
                path={scrapIcon}
                fill={data.hasScrapped ? '#00C092' : '#404040'}
              />
              <span>{data.scrapSize}</span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DetailButtons;
