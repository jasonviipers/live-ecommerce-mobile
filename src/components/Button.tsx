import React from 'react'
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native'
import { colors, spacingY, radius } from '@/constants/theme'
import { fontSize } from '@/constants/styling'

interface ButtonProps {
    title: string
    onPress: () => void
    variant?: 'primary' | 'secondary' | 'outline'
    size?: 'small' | 'medium' | 'large'
    disabled?: boolean
    style?: ViewStyle
    textStyle?: TextStyle
}

export function Button({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    style,
    textStyle
}: ButtonProps) {
    const getButtonStyle = () => {
        const baseStyle: ViewStyle[] = [
            styles.button,
            styles[`${variant}Button`] as ViewStyle,
            styles[`${size}Button`] as ViewStyle
        ];

        if (disabled) baseStyle.push(styles.disabledButton as ViewStyle);
        if (style) baseStyle.push(style);

        return baseStyle;
    };

    const getTextStyle = () => {
        const baseStyle: TextStyle[] = [styles.text, styles[`${variant}Text`], styles[`${size}Text`]]
        if (disabled) baseStyle.push(styles.disabledText as TextStyle)
        if (textStyle) baseStyle.push(textStyle)
        return baseStyle
    }

    return (
        <TouchableOpacity
            style={getButtonStyle()}
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.8}
        >
            <Text style={getTextStyle()}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: radius._12,
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Variants
    primaryButton: {
        backgroundColor: colors.primary,
    },
    secondaryButton: {
        backgroundColor: colors.cardBackground,
        borderWidth: 1,
        borderColor: colors.border,
    },
    outlineButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.primary,
    },

    // Sizes
    smallButton: {
        paddingVertical: spacingY._10,
        paddingHorizontal: spacingY._15,
    },
    mediumButton: {
        paddingVertical: spacingY._15,
        paddingHorizontal: spacingY._20,
    },
    largeButton: {
        paddingVertical: spacingY._17,
        paddingHorizontal: spacingY._25,
    },

    // Disabled
    disabledButton: {
        opacity: 0.5,
    },

    // Text styles
    text: {
        fontWeight: '600',
        textAlign: 'center',
    },

    // Text variants
    primaryText: {
        color: colors.black,
    },
    secondaryText: {
        color: colors.text,
    },
    outlineText: {
        color: colors.primary,
    },

    // Text sizes
    smallText: {
        fontSize: fontSize(14),
    },
    mediumText: {
        fontSize: fontSize(16),
    },
    largeText: {
        fontSize: fontSize(18),
    },

    // Disabled text
    disabledText: {
        opacity: 0.7,
    },
})