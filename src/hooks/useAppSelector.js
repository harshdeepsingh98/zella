import { useSelector } from 'react-redux';

// Custom hook for typed selectors
const useAppSelector = (selector) => useSelector(selector);

export default useAppSelector;