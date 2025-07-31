import { View, Text, Animated, StyleSheet } from 'react-native';
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import { useEffect, useRef } from 'react';
import { fontSize, scale, verticalScale } from '@/constants/styling';

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const liveIndicatorAnim = useRef(new Animated.Value(0)).current;
  const taglineAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Main logo animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Live indicator animation (delayed)
    setTimeout(() => {
      Animated.timing(liveIndicatorAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }, 500);

    // Tagline animation (more delayed)
    setTimeout(() => {
      Animated.timing(taglineAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }, 800);

    // Progress bar animation
    setTimeout(() => {
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false, // width animation requires native driver false
      }).start();
    }, 500);

    // Continuous pulse animation for live indicator
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    setTimeout(() => {
      pulseAnimation.start();
    }, 1000);

    return () => {
      pulseAnimation.stop();
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* Background gradient effect */}
      <View style={styles.backgroundOverlay} />

      {/* Main content */}
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Logo area */}
        <View style={styles.logoContainer}>
          {/* Shopping bag icon with live indicator */}
          <View style={styles.logoWrapper}>
            <View style={styles.shoppingBag}>
              <View style={styles.bagHandle} />
              <View style={styles.bagBody}>
                <View style={styles.bagDetail} />
              </View>
            </View>

            {/* Live indicator */}
            <Animated.View
              style={[
                styles.liveIndicator,
                {
                  opacity: liveIndicatorAnim,
                  transform: [{ scale: pulseAnim }],
                },
              ]}
            >
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </Animated.View>
          </View>

          {/* App name */}
          <Text style={styles.appName}>StreamShop</Text>

          {/* Tagline */}
          <Animated.Text
            style={[
              styles.tagline,
              {
                opacity: taglineAnim,
                transform: [
                  {
                    translateY: taglineAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            Shop Live. Shop Smart.
          </Animated.Text>
        </View>

        {/* Feature highlights */}
        <Animated.View
          style={[
            styles.features,
            {
              opacity: taglineAnim,
            },
          ]}
        >
          <View style={styles.featureItem}>
            <View style={[styles.featureDot, { backgroundColor: colors.live }]} />
            <Text style={styles.featureText}>Live Shopping</Text>
          </View>
          <View style={styles.featureItem}>
            <View style={[styles.featureDot, { backgroundColor: colors.success }]} />
            <Text style={styles.featureText}>Real-time Deals</Text>
          </View>
          <View style={styles.featureItem}>
            <View style={[styles.featureDot, { backgroundColor: colors.primary }]} />
            <Text style={styles.featureText}>Interactive Experience</Text>
          </View>
        </Animated.View>
      </Animated.View>

      {/* Loading indicator */}
      <View style={styles.loadingContainer}>
        <View style={styles.loadingBar}>
          <Animated.View
            style={[
              styles.loadingProgress,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>
        <Animated.Text
          style={[
            styles.loadingText,
            {
              opacity: taglineAnim,
            },
          ]}
        >
          Loading amazing deals...
        </Animated.Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacingX._20,
    paddingVertical: Math.max(spacingY._20, verticalScale(20)),
  },
  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.cardBackground,
    opacity: 0.3,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacingY._60,
  },
  logoWrapper: {
    position: 'relative',
    marginBottom: spacingY._30,
  },
  shoppingBag: {
    width: Math.max(scale(80), scale(100)), 
    height: Math.max(scale(80), scale(100)),
    alignItems: 'center',
  },
  bagHandle: {
    width: scale(50),
    height: scale(10),
    backgroundColor: colors.primary,
    borderRadius: radius._10,
    marginBottom: spacingY._5,
  },
  bagBody: {
    width: scale(75),
    height: scale(60),
    backgroundColor: colors.cardBackground,
    borderRadius: radius._12,
    borderWidth: 3,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  bagDetail: {
    width: scale(40),
    height: scale(5),
    backgroundColor: colors.primary,
    borderRadius: radius._3,
  },
  liveIndicator: {
    position: 'absolute',
    top: -spacingY._5,
    right: -spacingX._10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.live,
    paddingHorizontal: spacingX._10,
    paddingVertical: spacingY._5,
    borderRadius: radius._15,
    shadowColor: colors.live,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  liveDot: {
    width: scale(8),
    height: scale(8),
    borderRadius: radius._10,
    backgroundColor: colors.white,
    marginRight: spacingX._5,
  },
  liveText: {
    color: colors.white,
    fontSize: scale(12),
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  appName: {
    fontSize: fontSize(42),
    fontWeight: '800',
    color: colors.primary,
    marginBottom: spacingY._10,
    textAlign: 'center',
    letterSpacing: -1,
    textShadowColor: colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  tagline: {
    fontSize: fontSize(18),
    color: colors.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  features: {
    alignItems: 'flex-start',
    marginBottom: spacingY._50,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacingY._7,
    paddingHorizontal: spacingX._5,
  },
  featureDot: {
    width: scale(12),
    height: scale(12),
    borderRadius: radius._10,
    marginRight: spacingX._15,
    shadowColor: 'currentColor',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 3,
  },
  featureText: {
    fontSize: scale(16),
    color: colors.textMuted,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  loadingContainer: {
    position: 'absolute',
    bottom: spacingY._60,
    left: spacingX._20,
    right: spacingX._20,
    alignItems: 'center',
  },
  loadingBar: {
    width: '100%',
    height: scale(4),
    backgroundColor: colors.surface,
    borderRadius: radius._3,
    marginBottom: spacingY._15,
    overflow: 'hidden',
  },
  loadingProgress: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: radius._3,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  loadingText: {
    fontSize: scale(14),
    color: colors.textMuted,
    textAlign: 'center',
    fontWeight: '500',
  },
})
