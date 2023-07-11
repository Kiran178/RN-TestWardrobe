import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {windowWidth} from '../utils/Dimensions';

const PostLoader = () => {
  return (
    <SkeletonPlaceholder borderRadius={4} height={300}>
      <SkeletonPlaceholder.Item
        width={windowWidth - 40}
        height={180}
        marginBottom={10}
      />
      <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
        <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
        <SkeletonPlaceholder.Item marginLeft={20}>
          <SkeletonPlaceholder.Item width={120} height={20} />
          <SkeletonPlaceholder.Item marginTop={6} width={80} height={20} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default PostLoader;
