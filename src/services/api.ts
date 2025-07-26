import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthTokens } from '@/types';

class ApiService {
  private api: AxiosInstance;
  private baseURL = 'http://localhost:3000/api'; // Change this to your API URL

  constructor() {
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem('accessToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle token refresh
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = await AsyncStorage.getItem('refreshToken');
            if (refreshToken) {
              const response = await axios.post(`${this.baseURL}/auth/refresh`, {
                refreshToken,
              });

              const { accessToken, refreshToken: newRefreshToken } = response.data.data;

              await AsyncStorage.setItem('accessToken', accessToken);
              await AsyncStorage.setItem('refreshToken', newRefreshToken);

              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
              return this.api(originalRequest);
            }
          } catch (refreshError) {
            // Refresh failed, redirect to login
            await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'user']);
            // You can emit an event here to redirect to login screen
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // Generic request method
  private async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    url: string,
    data?: any,
    config?: any
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.request({
        method,
        url,
        data,
        ...config,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any) {
    if (error.response) {
      // Server responded with error status
      return new Error(error.response.data.message || 'An error occurred');
    } else if (error.request) {
      // Request was made but no response received
      return new Error('Network error. Please check your connection.');
    } else {
      // Something else happened
      return new Error('An unexpected error occurred');
    }
  }

  // Auth methods
  async login(email: string, password: string) {
    return this.request<{ data: { user: any; tokens: AuthTokens } }>('POST', '/auth/login', {
      email,
      password,
    });
  }

  async register(userData: any) {
    return this.request<{ data: { user: any; tokens: AuthTokens } }>('POST', '/auth/register', userData);
  }

  async logout() {
    return this.request<any>('POST', '/auth/logout');
  }

  async getProfile() {
    return this.request<{ data: any }>('GET', '/auth/me');
  }

  // Stream methods
  async getStreams(filters?: any) {
    const params = new URLSearchParams(filters).toString();
    return this.request<any>('GET', `/streams?${params}`);
  }

  async getLiveStreams() {
    return this.request<any>('GET', '/streams/live');
  }

  async getStreamById(id: string) {
    return this.request<any>('GET', `/streams/${id}`);
  }

  async likeStream(id: string) {
    return this.request<any>('POST', `/streams/${id}/like`);
  }

  async shareStream(id: string) {
    return this.request<any>('POST', `/streams/${id}/share`);
  }

  // Video methods
  async getVideos(filters?: any) {
    const params = new URLSearchParams(filters).toString();
    return this.request<any>('GET', `/videos?${params}`);
  }

  async getTrendingVideos() {
    return this.request<any>('GET', '/videos/trending');
  }

  async getVideoById(id: string) {
    return this.request<any>('GET', `/videos/${id}`);
  }

  async likeVideo(id: string) {
    return this.request<any>('POST', `/videos/${id}/like`);
  }

  // Product methods
  async getProducts(filters?: any) {
    const params = new URLSearchParams(filters).toString();
    return this.request<any>('GET', `/products?${params}`);
  }

  async getFeaturedProducts() {
    return this.request<any>('GET', '/products/featured');
  }

  async getProductById(id: string) {
    return this.request<any>('GET', `/products/${id}`);
  }

  async searchProducts(query: string) {
    return this.request<any>('GET', `/products/search?q=${encodeURIComponent(query)}`);
  }

  // Cart methods
  async getCart() {
    return this.request<any>('GET', '/cart');
  }

  async addToCart(productId: string, quantity: number) {
    return this.request<any>('POST', '/cart/items', { productId, quantity });
  }

  async updateCartItem(itemId: string, quantity: number) {
    return this.request<any>('PUT', `/cart/items/${itemId}`, { quantity });
  }

  async removeFromCart(itemId: string) {
    return this.request<any>('DELETE', `/cart/items/${itemId}`);
  }

  async clearCart() {
    return this.request<any>('DELETE', '/cart');
  }

  // Order methods
  async getOrders() {
    return this.request<any>('GET', '/orders');
  }

  async createOrder(orderData: any) {
    return this.request<any>('POST', '/orders', orderData);
  }

  async getOrderById(id: string) {
    return this.request<any>('GET', `/orders/${id}`);
  }

  // Chat methods
  async getChatMessages(streamKey: string, page = 1, limit = 50) {
    return this.request<any>('GET', `/chat/${streamKey}/messages?page=${page}&limit=${limit}`);
  }

  async sendChatMessage(streamKey: string, message: string) {
    return this.request<any>('POST', `/chat/${streamKey}/messages`, { message });
  }

  // Donation methods
  async createDonation(streamKey: string, amount: number, message?: string) {
    return this.request<any>('POST', `/donations/${streamKey}`, { amount, message });
  }

  async getDonationStats(streamKey: string) {
    return this.request<any>('GET', `/donations/${streamKey}/stats`);
  }

  async getDonationGoals(streamKey: string) {
    return this.request<any>('GET', `/donations/${streamKey}/goals`);
  }

  async getDonationTiers() {
    return this.request<any>('GET', '/donations/tiers');
  }

  // Notification methods
  async getNotifications() {
    return this.request<any>('GET', '/notifications');
  }

  async markNotificationAsRead(id: string) {
    return this.request<any>('PATCH', '/notifications/read', { notificationIds: [id] });
  }

  async getUnreadCount() {
    return this.request<any>('GET', '/notifications/unread-count');
  }

  // Vendor methods
  async getVendors() {
    return this.request<any>('GET', '/vendors');
  }

  async getVendorById(id: string) {
    return this.request<any>('GET', `/vendors/${id}`);
  }

  // Analytics methods
  async trackEvent(event: string, data?: any) {
    return this.request<any>('POST', '/analytics/track', { event, data });
  }
}

export default new ApiService();