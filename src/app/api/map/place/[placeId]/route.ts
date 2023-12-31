import { getPlaceByPlaceId } from '@/service/map';
import { NextRequest, NextResponse } from 'next/server';

interface Context {
  params: { placeId: string };
}

/** PlaceId로 place detail 가져오기*/
export const GET = async (
  _: NextRequest,
  context: Context,
): Promise<Response | NextResponse> => {
  const { placeId } = context.params;
  return getPlaceByPlaceId(placeId).then((data) => NextResponse.json(data));
};
