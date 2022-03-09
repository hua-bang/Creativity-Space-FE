import useStore from '@/hooks/useStore';

const useAuth = () => {
  const { userStore } = useStore();
  return userStore.isLogin;
};

export default useAuth;