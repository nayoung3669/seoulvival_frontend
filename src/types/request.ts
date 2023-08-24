/**  로그인 요청 데이터*/
interface RequestLogin {
  email: string;
  password: string;
}

/** 소셜 로그인 요청 데이터*/
interface RequestOauthLogin {
  code: string;
}

/** 회원가입 요청 데이터 */
interface RequestEssentialRegister {
  email: string;
  nickname: string;
  password: string;
}
interface RequestNonessentialRegister {
  email?: string;
  gender: string;
  birthDate: string;
  hometown: string;
  movedDate: string;
}

/** 게시물 작성 요청 데이터 */
interface RequestBoardWrite {
  category: string;
  hashTag: string[];
  content: string;
  lat: number;
  lng: number;
}

/** 게시물 작성 (임시!!!!!!! 절대 쓰지 말것!!!) */
interface RequestBoardWriteTemp {
  title: string;
  locationTag: string[];
  purposeTag: string[];
  content: string;
  postImg: File;
}

/** 게시물 수정 요청 데이터 */
interface RequestBoardUpdate {
  title: string;
  locationTag: string;
  purposeTag: string;
  content: string;
}

/** 전체 게시물 조회 요청 데이터  */
interface RequestAllBoard {
  keyword: string;
  page: number;
  size: number;
}

/** 게시물 검색 요청 데이터 */
interface RequestBoardSearch {
  search: string;
}

/** 댓글 달기 요청 데이터 */
interface RequestCommentPost {
  comment: string;
}
