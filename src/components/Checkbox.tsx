import React from 'react'
import { TouchableOpacity, Text, View, StyleSheet, ViewStyle } from 'react-native'
import { colors, spacingX, radius } from '@/constants/theme'
import { fontSize, scale } from '@/constants/styling'

interface CheckboxProps {
    label: string
    checked: boolean
    onPress: () => void
    disabled?: boolean
    size?: 'small' | 'medium' | 'large'
    style?: ViewStyle
}
type CheckboxStyle = ViewStyle & {
    width: number;
    height: number;
};

export function Checkbox({
    label,
    checked,
    onPress,
    disabled = false,
    size = 'medium',
    style
}: CheckboxProps) {
    const getCheckboxStyle = () => {
        const baseStyle: CheckboxStyle[] = [
            {
                ...styles.checkbox,
                ...styles[`${size}Checkbox`]
            }
        ];

        if (checked) {
            baseStyle.push({
                ...styles.checkedCheckbox,
                width: styles[`${size}Checkbox`].width,
                height: styles[`${size}Checkbox`].height
            });
        }

        if (disabled) {
            baseStyle.push({
                ...styles.disabledCheckbox,
                width: styles[`${size}Checkbox`].width,
                height: styles[`${size}Checkbox`].height
            });
        }

        return baseStyle;
    };

    const getContainerStyle = () => {
        const baseStyle: ViewStyle[] = [styles.container];

        if (disabled) {
            baseStyle.push(styles.disabledContainer as ViewStyle);
        }

        if (style) {
            baseStyle.push(style);
        }

        return baseStyle;
    }

    return (
        <TouchableOpacity
            style={getContainerStyle()}
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.7}
        >
            <View style={getCheckboxStyle()}>
                {checked && (
                    <Text style={[styles.checkmark, styles[`${size}Checkmark`]]}>
                        ✓
                    </Text>
                )}
            </View>
            <Text style={[styles.label, styles[`${size}Label`], disabled && styles.disabledLabel]}>
                {label}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    disabledContainer: {
        opacity: 0.5,
    },

    // Checkbox styles
    checkbox: {
        borderRadius: radius._3,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacingX._10,
    },
    checkedCheckbox: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    disabledCheckbox: {
        backgroundColor: colors.surface,
        borderColor: colors.border,
    },

    // Checkbox sizes
    smallCheckbox: {
        width: scale(14),
        height: scale(14),
    },
    mediumCheckbox: {
        width: scale(18),
        height: scale(18),
    },
    largeCheckbox: {
        width: scale(22),
        height: scale(22),
    },

    // Checkmark styles
    checkmark: {
        color: colors.black,
        fontWeight: 'bold',
    },
    smallCheckmark: {
        fontSize: fontSize(10),
    },
    mediumCheckmark: {
        fontSize: fontSize(12),
    },
    largeCheckmark: {
        fontSize: fontSize(14),
    },

    // Label styles
    label: {
        color: colors.textSecondary,
        flex: 1,
    },
    disabledLabel: {
        color: colors.textMuted,
    },
    smallLabel: {
        fontSize: fontSize(12),
    },
    mediumLabel: {
        fontSize: fontSize(14),
    },
    largeLabel: {
        fontSize: fontSize(16),
    },
})