import { cookies } from 'next/headers';

/**글쓰기 post */
export const writeBoard = async (form: any) => {
  const token = cookies().get('accessToken');
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/posts`, {
      method: 'POST',
      headers: {
        enctype: 'multipart/form-data',
        authorization: 'Bearer ' + token?.value,
      },
      body: form,
    }).then((response) => response.json());
    return response;
  } catch (error: any) {}
};

/**postData 가져오기 */
export const getUserBoard = async (postId: string) => {
  const token = cookies().get('accessToken');
  if (token) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/posts/get/${postId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + token?.value,
          },
        },
      ).then<ResponseDetailData>((res) => res.json());
      return response;
    } catch (error: any) {
      console.log('getBoard error', error.message);
    }
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/posts/get/${postId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ).then<ResponseDetailData>((res) => res.json());
    return response;
  } catch (error: any) {
    console.log('getBoard error', error.message);
  }
};

/**post scrap하기 */
export const scrapPost = async (postId: string) => {
  const token = cookies().get('accessToken');
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/posts/${postId}/scrap`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + token?.value,
        },
      },
    ).then<ResponseDetailData>((res) => res.json());
    return response;
  } catch (error: any) {
    console.log('getBoard error', error.message);
  }
};

/**mypage psot 가져오기 */
export const getMypagePost = async (url: string) => {
  const token = cookies().get('accessToken');
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + token,
    },
    next: { revalidate: 0 },
  }).then<ResponseMyPostData>((res) => res.json());
  return response;
};

export const getHotBoard = async (category: string, hashtag: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/tags/posts?size=2&page=1&hashtagName=%23${hashtag}&category=${category}&type=popular`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 0 },
    },
  ).then<ResponsePopularCategoryHashtag>((res) => res.json());
  return response;
};

/**내가 쓴 글 조회 또는 내가 스크랩한 글 조회 */
export const getMypostScrapPost = async (
  category: string,
  page: string | null,
) => {
  const token = cookies().get('accessToken')?.value;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/posts/${category}?page=${page}&size=3`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
      },
    },
  ).then<ResponseMyPostData>((res) => res.json());
  return response;
};
