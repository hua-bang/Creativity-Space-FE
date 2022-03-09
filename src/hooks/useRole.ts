import useStore from '@/hooks/useStore';

const useRole = () => {
  const { userStore } = useStore();
  return userStore.roles;
};

export default useRole;