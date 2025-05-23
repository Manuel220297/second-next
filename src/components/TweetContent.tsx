import { Suspense } from 'react';
import { getTweet } from 'react-tweet/api';
import { type TweetProps, TweetNotFound, TweetSkeleton } from 'react-tweet';
import { MyTweet } from './my-tweet';

const TweetContent = async ({ id, components, onError }: TweetProps) => {
  const tweet = id
    ? await getTweet(id).catch((err) => {
        if (onError) {
          onError(err);
        } else {
          console.error(err);
        }
      })
    : undefined;

  if (!tweet) {
    const NotFound = components?.TweetNotFound || TweetNotFound;
    return <NotFound />;
  }

  return <MyTweet tweet={tweet} components={components} />;
};

export const Tweet = ({ fallback = <TweetSkeleton />, ...props }: TweetProps) => (
  <Suspense fallback={fallback}>
    {/* @ts-ignore: Async components are valid in the app directory */}
    <TweetContent {...props} />
  </Suspense>
);
