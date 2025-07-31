import React, { useState } from 'react'
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    StyleSheet, 
    TextInputProps,
    ViewStyle 
} from 'react-native'
import { colors, spacingX, spacingY, radius } from '@/constants/theme'
import { fontSize } from '@/constants/styling'
import { Icons } from './Icons'

interface InputProps extends TextInputProps {
    label?: string
    error?: string
    variant?: 'default' | 'password'
    containerStyle?: ViewStyle
    required?: boolean
}

export  function Input({
    label,
    error,
    variant = 'default',
    containerStyle,
    required = false,
    ...props
}: InputProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    const isPassword = variant === 'password'
    const hasError = !!error

    const getInputContainerStyle = () => {
        const baseStyle: ViewStyle[] = [styles.inputContainer]
        if (isFocused && !hasError) baseStyle.push(styles.focusedContainer)
        if (hasError) baseStyle.push(styles.errorContainer)
        return baseStyle
    }

    return (
        <View style={[styles.container, containerStyle]}>
            {label && (
                <Text style={styles.label}>
                    {label}
                    {required && <Text style={styles.required}> *</Text>}
                </Text>
            )}
            
            <View style={getInputContainerStyle()}>
                <TextInput
                    style={[
                        styles.input,
                        isPassword && styles.passwordInput
                    ]}
                    placeholderTextColor={colors.textMuted}
                    secureTextEntry={isPassword && !isPasswordVisible}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...props}
                />
                
                {isPassword && (
                    <TouchableOpacity
                        style={styles.eyeButton}
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                        <Text style={styles.eyeIcon}>
                            {isPasswordVisible ? <Icons.eye /> : <Icons.eyeOff />}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
            
            {error && (
                <Text style={styles.errorText}>{error}</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: spacingY._20,
    },
    label: {
        fontSize: fontSize(14),
        color: colors.textSecondary,
        marginBottom: spacingY._7,
        fontWeight: '500',
    },
    required: {
        color: colors.error,
    },
    inputContainer: {
        backgroundColor: colors.cardBackground,
        borderRadius: radius._12,
        borderWidth: 1,
        borderColor: colors.border,
        flexDirection: 'row',
        alignItems: 'center',
    },
    focusedContainer: {
        borderColor: colors.primary,
        shadowColor: colors.primary,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    errorContainer: {
        borderColor: colors.error,
    },
    input: {
        flex: 1,
        paddingHorizontal: spacingX._15,
        paddingVertical: spacingY._15,
        fontSize: fontSize(16),
        color: colors.text,
    },
    passwordInput: {
        paddingRight: spacingX._10,
    },
    eyeButton: {
        paddingHorizontal: spacingX._15,
        paddingVertical: spacingY._15,
    },
    eyeIcon: {
        fontSize: fontSize(18),
        color: colors.textMuted,
    },
    errorText: {
        fontSize: fontSize(12),
        color: colors.error,
        marginTop: spacingY._5,
        marginLeft: spacingX._5,
    },
})