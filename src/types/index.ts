export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: 'user' | 'vendor' | 'admin';
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Vendor {
  id: string;
  name: string;
  description: string;
  logo?: string;
  banner?: string;
  isVerified: boolean;
  rating: number;
  totalSales: number;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  stock: number;
  vendorId: string;
  vendor: Vendor;
  rating: number;
  reviewCount: number;
  isActive: boolean;
  createdAt: string;
}

export interface Stream {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  streamKey: string;
  rtmpUrl: string;
  playbackUrl: string;
  status: 'scheduled' | 'live' | 'ended';
  viewerCount: number;
  likeCount: number;
  shareCount: number;
  vendorId: string;
  vendor: Vendor;
  products: Product[];
  scheduledAt?: string;
  startedAt?: string;
  endedAt?: string;
  createdAt: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: number;
  viewCount: number;
  likeCount: number;
  shareCount: number;
  vendorId: string;
  vendor: Vendor;
  products: Product[];
  createdAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
  addedAt: string;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  updatedAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  items: CartItem[];
  totalAmount: number;
  shippingAddress: Address;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface ChatMessage {
  id: string;
  streamKey: string;
  userId: string;
  user: User;
  message: string;
  type: 'text' | 'emoji' | 'system';
  timestamp: string;
}

export interface Donation {
  id: string;
  streamKey: string;
  userId: string;
  user: User;
  amount: number;
  message?: string;
  tier: DonationTier;
  timestamp: string;
}

export interface DonationTier {
  id: string;
  name: string;
  minAmount: number;
  color: string;
  animation?: string;
}

export interface DonationGoal {
  id: string;
  streamKey: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  isActive: boolean;
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'stream' | 'order' | 'payment' | 'system';
  isRead: boolean;
  data?: any;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
}

export interface StreamFilters {
  category?: string;
  status?: 'live' | 'upcoming';
  sortBy?: 'viewers' | 'recent' | 'popular';
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  vendorId?: string;
  sortBy?: 'price' | 'rating' | 'recent' | 'popular';
}

export interface VideoFilters {
  category?: string;
  vendorId?: string;
  sortBy?: 'views' | 'likes' | 'recent' | 'trending';
}