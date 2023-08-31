'use client';
import useDebounce from '@/hooks/useDebounce';
import { useCallback, useState } from 'react';
import useSWR from 'swr';
import Input from '../../common/Input';
import { FormEvent } from 'react';
import { useSetRecoilState } from 'recoil';
import { placeIdState } from '@/recoil/mapStates';
import { SearchIcon } from '@/components/profile/editpage/EditImageIcon';

const PlacesAutoComplete = () => {
  const [openUl, setOpenUl] = useState<boolean>(false);
  const [inputLocation, setInputLocation] = useState<string>('');
  const debounceKeyword = useDebounce(inputLocation);
  const { data } = useSWR<PlacesResponse>(
    debounceKeyword ? `api/map/search/${debounceKeyword}` : null,
  );
  const setPlaceIdState = useSetRecoilState(placeIdState);
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLocation(e.target.value);
  };

  const onFocusHandler = () => {
    setOpenUl(true);
  };

  const onClickHandler = useCallback(
    (placeId: string) => {
      setPlaceIdState(placeId);
      setOpenUl(false);
      setInputLocation('');
    },
    [setPlaceIdState],
  );

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (data) {
        setPlaceIdState(data.predictions[0].place_id);
      }
      setOpenUl(false);
    },
    [data, setPlaceIdState],
  );

  return (
    <div className="flex flex-col justify-center items-center w-full text-xs">
      <Input
        placeholder="장소 이름을 입력해주세요"
        value={inputLocation}
        onChange={onChangeHandler}
        onSubmit={onSubmit}
        onFocus={onFocusHandler}
        formColor="bg-gray-300"
        inputColor="bg-gray-300"
        rightElement={<SearchIcon />}
      />
      {openUl && (
        <ul className="flex flex-col justify-center bg-white w-full h-full pt-2">
          {data?.predictions.map((location, _) => {
            const { place_id, structured_formatting } = location;
            const parts = structured_formatting.main_text.split(
              new RegExp(`(${debounceKeyword})`, 'gi'),
            );

            return (
              <li
                className="px-5 py-3.5 flex justify-start items-center gap-5 "
                key={place_id}
                onClick={() => onClickHandler(place_id)}
              >
                <SearchIcon />
                {structured_formatting.main_text}
              </li>
            );
          })}
          {data?.predictions.length === 0 && <li>검색 결과가 없습니다.</li>}
        </ul>
      )}
    </div>
  );
};

export default PlacesAutoComplete;
