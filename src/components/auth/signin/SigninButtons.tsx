'use client';
import { socialUrls } from '@/utils/constants/auth';
import SocialAuth from './SocialAuth';
import { callbackUrlState } from '@/recoil/authStates';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

const SigninButtons = ({ callbackUrl }: { callbackUrl: string }) => {
  const setCallbackUrl = useSetRecoilState(callbackUrlState);
  const callbackUrls = useRecoilValue(callbackUrlState);
  useEffect(() => {
    setCallbackUrl(callbackUrl);
  }, [callbackUrl, setCallbackUrl]);
  console.log(callbackUrls);
  return (
    <div className="mt-5 flex flex-col gap-3 ">
      {socialUrls.map(({ text, url, bgColor, color }, index) => (
        <SocialAuth
          key={`${text}${index} `}
          text={text}
          url={url}
          bgColor={bgColor}
          color={color}
        />
      ))}
    </div>
  );
};

export default SigninButtons;
