import UserProfile from '../../item/UserProfile';
const DetailMainProfile = ({ data }: { data: ResponseDetailData }) => {
  return (
    <div className="flex flex-row justify-between ">
      <UserProfile
        createdAt={data.result.post.createdAt}
        nickname={data.result.user.nickname}
        postViewCount={data.result.post.postViewCount}
        userImg={data.result.user.userImg}
      />
    </div>
  );
};

export default DetailMainProfile;
