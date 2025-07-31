import React, { useState } from 'react'
import { 
    KeyboardAvoidingView, 
    Platform, 
    ScrollView, 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity 
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { fontSize } from '@/constants/styling'
import { Input } from '@/components/Input'
import { Checkbox } from '@/components/Checkbox'
import { Button } from '@/components/Button'
import Divider from '@/components/Divider'
import SocialButton from '@/components/SocialButton'


export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const handleSignIn = () => {
        // Reset errors
        setEmailError('')
        setPasswordError('')

        // Validation
        let hasError = false

        if (!email) {
            setEmailError('Email is required')
            hasError = true
        } else if (!validateEmail(email)) {
            setEmailError('Please enter a valid email')
            hasError = true
        }

        if (!password) {
            setPasswordError('Password is required')
            hasError = true
        } else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters')
            hasError = true
        }

        if (!hasError) {
            // Handle sign in
            console.log('Sign in with:', { email, password, rememberMe })
        }
    }

    const handleGoogleSignIn = () => {
        console.log('Sign in with Google')
    }

    const handleAppleSignIn = () => {
        console.log('Sign in with Apple')
    }

    const handleForgotPassword = () => {
        console.log('Navigate to forgot password')
    }

    const handleSignUp = () => {
        console.log('Navigate to sign up')
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoid}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Sign In</Text>
                        <Text style={styles.subtitle}>Enter your email address</Text>
                    </View>
                    
                    {/* Form */}
                    <View style={styles.form}>
                        <Input
                            label="Enter E-Mail"
                            placeholder="Enter your email address"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            error={emailError}
                            required
                        />

                        <Input
                            label="Password"
                            placeholder="Enter your password"
                            variant="password"
                            value={password}
                            onChangeText={setPassword}
                            error={passwordError}
                            required
                        />

                        {/* Remember Me & Forgot Password */}
                        <View style={styles.rememberContainer}>
                            <Checkbox
                                label="Remember Me"
                                checked={rememberMe}
                                onPress={() => setRememberMe(!rememberMe)}
                            />

                            <TouchableOpacity onPress={handleForgotPassword}>
                                <Text style={styles.forgotText}>Forgot Password ?</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Sign In Button */}
                        <Button
                            title="Sign In"
                            onPress={handleSignIn}
                            variant="primary"
                            size="large"
                            style={styles.signInButton}
                        />

                        {/* Divider */}
                        {/* <Divider text="Or continue with" /> */}

                        {/* Social Login Buttons */}
                        {/* <SocialButton
                            provider="google"
                            onPress={handleGoogleSignIn}
                        />

                        <SocialButton
                            provider="apple"
                            onPress={handleAppleSignIn}
                        /> */}

                        {/* Sign Up Link */}
                        <View style={styles.signUpContainer}>
                            <Text style={styles.signUpText}>Don't have an account? </Text>
                            <TouchableOpacity onPress={handleSignUp}>
                                <Text style={styles.signUpLink}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    keyboardAvoid: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: spacingX._25,
        paddingVertical: spacingY._20,
    },
    header: {
        alignItems: 'center',
        marginBottom: spacingY._40,
    },
    title: {
        fontSize: fontSize(28),
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: spacingY._10,
    },
    subtitle: {
        fontSize: fontSize(16),
        color: colors.textMuted,
        textAlign: 'center',
    },
    form: {
        width: '100%',
    },
    rememberContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacingY._30,
    },
    forgotText: {
        fontSize: fontSize(14),
        color: colors.textSecondary,
    },
    signInButton: {
        marginBottom: spacingY._10,
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: spacingY._20,
    },
    signUpText: {
        fontSize: fontSize(14),
        color: colors.textMuted,
    },
    signUpLink: {
        fontSize: fontSize(14),
        color: colors.primary,
        fontWeight: 'bold',
    },
})