import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from './api';

// Query keys
export const queryKeys = {
  app: {
    config: ['app', 'config'],
  },
  auth: {
    profile: ['auth', 'profile'],
  },
};

// App Configuration Query
export const useAppConfigQuery = () => {
  return useQuery({
    queryKey: queryKeys.app.config,
    queryFn: () => apiClient.app.getConfig(),
    staleTime: Infinity, // App config rarely changes during a session
  });
};

// Auth Mutations
export const useSendOtpMutation = () => {
  return useMutation({
    mutationFn: (mobileNumber) => apiClient.auth.sendOtp(mobileNumber),
  });
};

export const useVerifyOtpMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ mobileNumber, otp }) => apiClient.auth.verifyOtp(mobileNumber, otp),
    onSuccess: (data) => {
      // Store auth token in localStorage
      if (data?.data?.token) {
        localStorage.setItem('authToken', data.data.token);
      }
      
      // Invalidate profile query to fetch latest data
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.profile });
    },
  });
};

// Profile Queries & Mutations
export const useProfileQuery = () => {
  return useQuery({
    queryKey: queryKeys.auth.profile,
    queryFn: () => apiClient.profile.getProfile(),
    enabled: !!localStorage.getItem('authToken'), // Only fetch if user is authenticated
  });
};

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (profileData) => apiClient.profile.updateProfile(profileData),
    onSuccess: () => {
      // Invalidate profile query to fetch latest data
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.profile });
    },
  });
};