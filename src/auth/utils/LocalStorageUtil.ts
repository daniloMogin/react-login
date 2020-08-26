export const createUtilFunctions = (initData = {}) => {
    const data: any = initData;

    const getItem = (key: string): any => {
        return data[key];
    };

    const setItem = (key: string, value: any) => {
        data[key] = value;
        localStorage.setItem(key, value);
    };

    const removeItem = (key: string) => {
        delete data[key];
        localStorage.removeItem(key);
    };

    return { getItem, setItem, removeItem };
};
