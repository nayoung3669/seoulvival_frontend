import RecentlySearch from './RecentlySearch';
import ManySearchToday from './ManySearchToday';
import SearchInput from './SearchInput';
import CommunityNavbar from '../community/CommunityNavbar';
import dynamic from 'next/dynamic';
import { v4 as uuidv4 } from 'uuid';
import { categoryKO } from '@/utils/utilFunc';
import SearchSorted from './SearchSorted';
import SearchHashTagAlert from './SearchHashTagAlert';
import BeatLoader from '../common/Spinner';

const DynamicSearchBoardList = dynamic(() => import('./SearchBoardList'), {
  loading: () => <BeatLoader />,
});

const SearchComponent = async ({
  search,
  category,
}: {
  search: string | null;
  category: string;
}) => {
  const fetchsearch = search ?? '';
  const fetchcategory = category ?? '';
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_SERVER
    }/search?page=1&size=10&category=${encodeURIComponent(
      categoryKO(fetchcategory),
    )}&keyword=${encodeURIComponent(fetchsearch)}`,
  ).then<ResponseRegister>((res) => res.json());
  return (
    <section className="relative max-w-md top-0 -translate-x-1/2 left-1/2 flex flex-col justify-center items-center w-full h-screen z-50">
      <div className="relative bg-white w-full h-full max-w-md pt-14 ">
        <SearchInput />
        <div className="overflow-y-auto bg-white">
          {!search ? (
            <div className="px-[17px]">
              <RecentlySearch />
              <ManySearchToday />
            </div>
          ) : (
            <div className="relative">
              <CommunityNavbar search />
              <SearchSorted
                totalElements={response.pageable.totalElements}
                order={'newer'}
              />
              <div key={uuidv4()}>
                <DynamicSearchBoardList
                  firstList={response.result}
                  totalpage={response.pageable.totalPages}
                  Category={category}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
export default SearchComponent;
