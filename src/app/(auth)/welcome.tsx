import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar } from '@/components/Avatar'
import { colors, spacingY } from '@/constants/theme'
import { scale } from '@/constants/styling'
import { ProductCard } from '@/components/ProductCard'
import { SectionHeader } from '@/components/SectionHeader'

export default function welcome() {
  const handleLike = () => {
    console.log('Product liked!');
    // Add your like logic here
  };

  const handlePress = () => {
    console.log('Product pressed!');
    // Add your navigation or other press logic here
  };
  return (
    <View style={styles.container}>
      <Avatar source="https://avatar.iran.liara.run/public" isLive
       style={styles.avatar} />
       <ProductCard 
        source="https://th.bing.com/th/id/R.ffe833017df554b227cee1f65eeb9909?rik=eWDTZKaqtKFpWA&pid=ImgRaw&r=0"
        isLiked={false}
        onLike={handleLike}
        onPress={handlePress}
        style={{ width: 200, height: 250 }}
      />
      <SectionHeader title="Popular Products" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  avatar: {
  },
  
})