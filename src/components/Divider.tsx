import React from 'react'
import { View, Text, StyleSheet, ViewStyle } from 'react-native'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { fontSize } from '@/constants/styling'

interface DividerProps {
    text?: string
    style?: ViewStyle
    color?: string
    thickness?: number
}

export default function Divider({
    text,
    style,
    color = colors.border,
    thickness = 1
}: DividerProps) {
    if (text) {
        return (
            <View style={[styles.textDividerContainer, style]}>
                <View style={[styles.line, { backgroundColor: color, height: thickness }]} />
                <Text style={styles.text}>{text}</Text>
                <View style={[styles.line, { backgroundColor: color, height: thickness }]} />
            </View>
        )
    }

    return (
        <View style={[
            styles.simpleDivider,
            { backgroundColor: color, height: thickness },
            style
        ]} />
    )
}

const styles = StyleSheet.create({
    textDividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: spacingY._25,
    },
    line: {
        flex: 1,
        height: 1,
    },
    text: {
        fontSize: fontSize(14),
        color: colors.textMuted,
        marginHorizontal: spacingX._15,
        paddingHorizontal: spacingX._5,
    },
    simpleDivider: {
        width: '100%',
        marginVertical: spacingY._15,
    },
})