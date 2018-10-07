export const CATEGORYTYPE = {
  other: {label: '其他', value: 1},
  bottom: {label: '底部', value: 2},
  announce: {label: '公告', value: 3},
  help: {label: '帮助中心', value: 4},
  faq: {label: '新手入门', value: 5}
};

export const CATEGORYTYPEARRAY = Reflect.ownKeys(CATEGORYTYPE).map((key, index) => CATEGORYTYPE[key]);
