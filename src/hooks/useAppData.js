import useAppSelector from './useAppSelector';
import { 
  selectAppName, 
  selectAppDescription, 
  selectAppLogo,
  selectCurrentLanguage,
  selectAppLoading,
  selectAppError
} from '@features/app/selectors';

// Custom hook for common app data
const useAppData = () => {
  const name = useAppSelector(selectAppName);
  const description = useAppSelector(selectAppDescription);
  const logo = useAppSelector(selectAppLogo);
  const language = useAppSelector(selectCurrentLanguage);
  const loading = useAppSelector(selectAppLoading);
  const error = useAppSelector(selectAppError);

  return {
    name,
    description,
    logo,
    language,
    loading,
    error,
    isLoading: loading,
    hasError: !!error,
  };
};

export default useAppData;