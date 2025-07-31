import React from 'react'
import { TouchableOpacity, Text, View, StyleSheet, ViewStyle } from 'react-native'
import { colors, spacingX, spacingY, radius } from '@/constants/theme'
import { fontSize } from '@/constants/styling'
import { Icons } from './Icons'

type SocialProvider = 'google' | 'apple' | 'facebook' | 'twitter' | 'github'

interface SocialButtonProps {
    provider: SocialProvider
    onPress: () => void
    title?: string
    disabled?: boolean
    style?: ViewStyle
}

const providerConfig = {
    google: {
        icon: Icons.google,
        defaultTitle: 'Continue with Google',
        iconColor: '#4285F4',
    },
    apple: {
        icon: Icons.apple,
        defaultTitle: 'Continue with Apple',
        iconColor: colors.text,
    },
    facebook: {
        icon: 'f',
        defaultTitle: 'Continue with Facebook',
        iconColor: '#1877F2',
    },
    twitter: {
        icon: '🐦',
        defaultTitle: 'Continue with Twitter',
        iconColor: '#1DA1F2',
    },
    github: {
        icon: '⚫',
        defaultTitle: 'Continue with GitHub',
        iconColor: colors.text,
    },
}

export default function SocialButton({
    provider,
    onPress,
    title,
    disabled = false,
    style
}: SocialButtonProps) {
    const config = providerConfig[provider]
    const buttonTitle = title || config.defaultTitle

    return (
        <TouchableOpacity
            style={[
                styles.button,
                disabled && styles.disabledButton,
                style
            ]}
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.8}
        >
            <View style={styles.content}>
                <Text style={[
                    styles.icon,
                    { color: config.iconColor },
                    provider === 'google' && styles.googleIcon
                ]}>
                    {typeof config.icon === 'function' 
                        ? config.icon({ size: 14, color: config.iconColor })
                        : config.icon}
                </Text>
                <Text style={[
                    styles.title,
                    disabled && styles.disabledTitle
                ]}>
                    {buttonTitle}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.cardBackground,
        borderRadius: radius._12,
        paddingVertical: spacingY._15,
        paddingHorizontal: spacingX._20,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: spacingY._15,
    },
    disabledButton: {
        opacity: 0.5,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        fontSize: fontSize(18),
        marginRight: spacingX._10,
        fontWeight: 'bold',
        minWidth: spacingX._25,
        textAlign: 'center',
    },
    googleIcon: {
        width: spacingX._25,
        height: spacingX._25,
        lineHeight: spacingX._25,
        textAlign: 'center',
        fontSize: fontSize(14),
        fontWeight: 'bold',
    },
    title: {
        fontSize: fontSize(16),
        color: colors.text,
        fontWeight: '500',
        flex: 1,
        textAlign: 'center',
        marginRight: spacingX._25, // Balance the icon space
    },
    disabledTitle: {
        color: colors.textMuted,
    },
})