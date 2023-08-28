import SearchComponent from '@/components/search/SearchComponent';

interface PageProps {
  searchParams: { [key: string]: string | undefined };
}
const SearchPage = ({ searchParams }: PageProps) => {
  return <SearchComponent search={searchParams.search || ''} />;
};
export default SearchPage;
