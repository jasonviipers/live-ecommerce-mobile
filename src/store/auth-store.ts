import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AuthTokens, User } from '@/types';
import ApiService from '@/services/api';

interface AuthState {
    user: User | null;
    tokens: AuthTokens | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

interface AuthActions {
    login: (email: string, password: string) => Promise<void>;
    register: (userData: any) => Promise<void>;
    logout: () => Promise<void>;
    loadUser: () => Promise<void>;
    clearError: () => void;
    setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
    persist(
        (set, get) => ({
            user: null,
            tokens: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            login: async (email: string, password: string) => {
                try {
                    set({ isLoading: true, error: null });

                    const response = await ApiService.login(email, password);
                    const { user, tokens } = response.data;

                    // Store tokens in AsyncStorage
                    await AsyncStorage.setItem('accessToken', tokens.accessToken);
                    await AsyncStorage.setItem('refreshToken', tokens.refreshToken);
                    await AsyncStorage.setItem('user', JSON.stringify(user));

                    set({
                        user,
                        tokens,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null,
                    });
                } catch (error: any) {
                    set({
                        isLoading: false,
                        error: error.message || 'Login failed',
                    });
                    throw error;
                }
            },

            register: async (userData: any) => {
                try {
                    set({ isLoading: true, error: null });

                    const response = await ApiService.register(userData);
                    const { user, tokens } = response.data;

                    // Store tokens in AsyncStorage
                    await AsyncStorage.setItem('accessToken', tokens.accessToken);
                    await AsyncStorage.setItem('refreshToken', tokens.refreshToken);
                    await AsyncStorage.setItem('user', JSON.stringify(user));

                    set({
                        user,
                        tokens,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null,
                    });
                } catch (error: any) {
                    set({
                        isLoading: false,
                        error: error.message || 'Registration failed',
                    });
                    throw error;
                }
            },

            logout: async () => {
                try {
                    await ApiService.logout();
                } catch (error) {
                    // Continue with logout even if API call fails
                    console.error('Logout API error:', error);
                } finally {
                    // Clear local storage
                    await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'user']);

                    set({
                        user: null,
                        tokens: null,
                        isAuthenticated: false,
                        error: null,
                    });
                }
            },

            loadUser: async () => {
                try {
                    set({ isLoading: true });

                    const [accessToken, refreshToken, userString] = await AsyncStorage.multiGet([
                        'accessToken',
                        'refreshToken',
                        'user',
                    ]);

                    if (accessToken[1] && refreshToken[1] && userString[1]) {
                        const user = JSON.parse(userString[1]);
                        const tokens = {
                            accessToken: accessToken[1],
                            refreshToken: refreshToken[1],
                        };

                        // Verify token is still valid by fetching user profile
                        try {
                            const response = await ApiService.getProfile();
                            const updatedUser = response.data;

                            set({
                                user: updatedUser,
                                tokens,
                                isAuthenticated: true,
                                isLoading: false,
                            });
                        } catch (error) {
                            // Token is invalid, clear storage
                            await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'user']);
                            set({
                                user: null,
                                tokens: null,
                                isAuthenticated: false,
                                isLoading: false,
                            });
                        }
                    } else {
                        set({ isLoading: false });
                    }
                } catch (error) {
                    console.error('Load user error:', error);
                    set({ isLoading: false });
                }
            },

            clearError: () => set({ error: null }),
            setLoading: (loading: boolean) => set({ isLoading: loading }),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                user: state.user,
                tokens: state.tokens,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);