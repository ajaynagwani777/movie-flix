import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const useLanguage = () => {
  const language = useSelector((state: RootState) => state.settings.language);
  return language;
};

export default useLanguage;
