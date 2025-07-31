import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, ViewStyle, Text } from 'react-native'; // Added Text import
import { colors, radius, spacingX, spacingY } from '@/constants/theme';
import { fontSize } from '@/constants/styling';

interface ProductCardProps {
  source?: string;
  isLiked?: boolean;
  onLike?: () => void;
  onPress?: () => void;
  style?: ViewStyle;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  source,
  isLiked = false,
  onLike,
  onPress,
  style
}) => {
  const HeartIcon = () => (
    <View style={[styles.heartIcon, isLiked && styles.heartIconLiked]}>
      <Text style={[styles.heartText, isLiked && styles.heartTextLiked]}>♡</Text>
    </View>
  );

  return (
    <TouchableOpacity 
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image 
        source={{ uri: source || 'https://via.placeholder.com/200x250' }}
        style={styles.image}
      />
      <TouchableOpacity 
        style={styles.heartButton}
        onPress={onLike}
        activeOpacity={0.8}
      >
        <HeartIcon />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: radius._20,
    overflow: 'hidden',
    backgroundColor: colors.cardBackground,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heartButton: {
    position: 'absolute',
    top: spacingY._12,
    right: spacingX._12,
  },
  heartIcon: {
    width: spacingX._30,
    height: spacingX._30,
    borderRadius: radius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartIconLiked: {
    backgroundColor: colors.heart,
  },
  heartText: {
    fontSize: fontSize(16),
    color: colors.textMuted,
  },
  heartTextLiked: {
    color: colors.white,
  },
});