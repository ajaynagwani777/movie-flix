import React, {JSX, useCallback, useEffect} from 'react';
import {
  Alert,
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {logout} from '../../../redux/authSlice';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMovies} from '../../../redux/moviesSlice';
import {AppDispatch, RootState} from '../../../redux/store';
import Loading from '../../components/Loading';
import {Movie, MovieResults} from '../../../models/movie.model';
import useLanguage from '../../hooks/useLanguage';
import {Picker} from '@react-native-picker/picker';
import { setLanguage } from '../../../redux/settingsSlice';
import { arStrings, enStrings } from '../../../utils/strings';

function HomeScreen(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const language = useLanguage();
  const {data, loading, error} = useSelector(
    (state: RootState) => state.movies,
  );

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const setPickerValue = useCallback((itemValue: string) => {
    dispatch(setLanguage(itemValue));
  }, [dispatch]);
  const SelectedString = language === 'en' ? enStrings : arStrings;

  const handleLogout = () => {
    Alert.alert(`${SelectedString.logout}`, `${SelectedString.areYouSure}`, [
      {
        text: `${SelectedString.no}`,
        style: 'cancel',
      },
      {
        text: `${SelectedString.yes}`,
        onPress: async () => {
          dispatch(logout());
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Loading />
      </View>
    );
  }

  const renderMovieItem: ListRenderItem<Movie> = ({item}) => {
    const imageSource = `https://image.tmdb.org/t/p/w440_and_h660_face${item.poster_path}`;
    return (
      <View style={styles.movieCard}>
        <Image
          style={styles.posterImage}
          resizeMode="cover"
          src={imageSource}
        />
        <Text numberOfLines={2} style={styles.title}>{item.title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>MovieFlix</Text>
        <View style={styles.headerOptions}>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              dropdownIconColor={'white'}
              selectedValue={language}
              onValueChange={setPickerValue}>
              <Picker.Item label="En" value="en" />
              <Picker.Item label="Arab" value="ar" />
            </Picker>
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
            <Text style={styles.logout}>{SelectedString.logout}</Text>
          </TouchableOpacity>
        </View>
      </View>
      {(data as MovieResults)?.results?.length > 0 && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={(data as MovieResults)?.results}
          keyExtractor={item => item.id.toString()}
          renderItem={renderMovieItem}
          numColumns={2}
          style={styles.listStyle}
          contentContainerStyle={styles.listContentStyle}
          columnWrapperStyle={styles.listColumnStyle}
        />
      )}
      {error && <Text>{error as string}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#e71f63',
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  heading: {
    color: '#ffffff',
    fontWeight: 500,
    fontSize: 22,
  },
  headerOptions: {
    justifyContent: 'flex-end',
    flexGrow: 1,
    flexDirection: 'row',
    gap: 20,
  },
  logoutBtn: {
    paddingVertical: 15,
    alignSelf: 'flex-end',
  },
  logout: {
    color: '#ffffff',
    fontWeight: 700,
  },
  movieCard: {
    elevation: 2,
    backgroundColor: 'white',
    borderRadius: 10,
    width: 180,
    height: 250,
    marginTop: 15,
  },
  listStyle: {
    flex: 1,
  },
  listContentStyle: {
    flexGrow: 1,
    paddingBottom: 15,
  },
  listColumnStyle: {
    justifyContent: 'space-around',
  },
  posterImage: {
    width: '100%',
    height: '75%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    marginTop: 10,
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    fontWeight: 500,
    fontSize: 16,
  },
  pickerContainer: {
    width: 100,
  },
  picker: {
    color: 'white',
  },
});

export default React.memo(HomeScreen);
