import React from 'react';
import { View, Image, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, radius, spacingX, spacingY } from '@/constants/theme';
import { fontSize } from '@/constants/styling';

interface AvatarProps {
  source?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  isLive?: boolean;
  style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  size = 'medium',
  isLive = false,
  style
}) => {
  const sizeStyle = styles[`${size}Avatar`];
  
  return (
    <View style={[sizeStyle, style]}>
      <Image 
        source={{ uri: source || 'https://via.placeholder.com/100' }}
        style={[sizeStyle, styles.avatarImage]}
      />
      {isLive && (
        <View style={styles.liveBadge}>
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  smallAvatar: {
    width: spacingX._40,
    height: spacingX._40,
  },
  mediumAvatar: {
    width: spacingX._60,
    height: spacingX._60,
  },
  largeAvatar: {
    width: spacingY._80,
    height: spacingY._80,
  },
  xlargeAvatar: {
    width: spacingY._80,
    height: spacingY._80,
  },
  avatarImage: {
    borderRadius: radius.full,
    borderWidth: 2,
    borderColor: colors.border,
  },
  liveBadge: {
    position: 'absolute',
    top: -spacingY._5,
    right: -spacingX._5,
    backgroundColor: colors.live,
    paddingHorizontal: spacingX._7,
    paddingVertical: spacingY._5,
    borderRadius: radius._10,
  },
  liveText: {
    color: colors.white,
    fontSize: fontSize(10),
    fontWeight: '700',
  },
});
