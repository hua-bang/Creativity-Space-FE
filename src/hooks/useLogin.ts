import useStore from '@/hooks/useStore';

const useLogin = () => {
  const { userStore } = useStore();
  return userStore.isLogin;
};

export default useLogin;