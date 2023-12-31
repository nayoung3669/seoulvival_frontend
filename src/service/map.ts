/** 자동완성 검색어들 가져오기 */

import { categoryKO } from '@/utils/utilFunc';

export const getPlacesAutoComplete = async (text: string) => {
  const SEOUL_LAT = 37.5665;
  const SEOUL_LNG = 126.978;
  const RADIUS = 16000;

  return fetch(
    `${process.env.NEXT_PUBLIC_GOOGLE_PLACES_AUTOCOMPLELTE_URL}input=${text}&radius=${RADIUS}&location=${SEOUL_LAT},${SEOUL_LNG}&language=ko&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`,
  ).then((res) => res.json());
};

/** placeId로 장소 세부 정보 가져오기 */
export const getPlaceByPlaceId = async (placeId: string) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_GOOGLE_PLACES_DETAILS_URL}&language=ko&place_id=${placeId}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`,
  ).then<PlaceByPlaceIdResponse>((res) => res.json());
};

export const getPostByPostId = async (postId: string) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/posts/get/${postId}`,
  ).then<ResponseDetailData>((res) => res.json());
};

/** 구/카테고리별 보드 리스트 가져오기 */
export const getBoardListByGu = async (category: string, gu: string | null) => {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_SERVER
    }/tags/posts/location?size=50&page=1&category=${
      category === 'All' ? '' : categoryKO(category)
    }&gu=${gu}`,
    { next: { revalidate: 0 } },
  ).then((res) => res.json());
  return response;
};
