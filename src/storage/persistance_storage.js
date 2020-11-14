import AsyncStorage from '@react-native-async-storage/async-storage';

type storage_blob = {
  value: any,
  timeout: ?number
}

const removeData = async (key: string): Promise<number> => {
  try {
    await AsyncStorage.removeItem(key);
    return 0;
  } catch (e) {
    console.warn(e);
    return 1;
  }
};

const storeData = async (key: string, value: string, timeout?: number): Promise<number> => {
  //timeout as minutes
  try {
    await AsyncStorage.setItem(key,
        JSON.stringify({
          value: value,
          timeout: (!!timeout) ? (Date.now() + timeout * 60000) : null,
        }),
    );
    return 0;
  } catch (e) {
    console.warn(e);
    return 1;
  }
};

const readData = async (key: string): Promise<any> => {
  try {
    const data: storage_blob = await JSON.parse(AsyncStorage.getItem(key));
    if (data === null || (data.timeout && data.timeout < Date.now())) {
      if (data !== null) {
        await removeData(key);
      }
      return null;
    }
    else {
      return data.value;
    }
  } catch (e) {
    console.warn(e);
    return null;
  }
};

const clearData = async (): Promise<number> => {
  try {
    await AsyncStorage.clear();
    return 0;
  } catch (e) {
    console.warn(e);
    return 1;
  }
};

export {removeData, clearData, readData, storeData};
