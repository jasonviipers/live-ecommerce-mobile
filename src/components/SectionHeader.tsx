import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacingX, spacingY } from '@/constants/theme';
import { fontSize } from '@/constants/styling';

interface SectionHeaderProps {
  title: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  style?: ViewStyle;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  icon,
  children,
  style
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.titleContainer}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <Text style={styles.title}>{title}</Text>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacingY._15,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: spacingX._10,
  },
  title: {
    fontSize: fontSize(18),
    fontWeight: '600',
    color: colors.text,
  },
});