export const BOOKLET_STATUS_MAP = {
  '-2': {
    value: '已删除',
    color: 'red'
  },
  '-1' : {
    value: '审核不通过',
    color: 'orange'
  },
  0: {
    value: '未审核',
    color: 'arcoblue'
  },
  1: {
    value: '审核通过',
    color: '#165dff'
  }
};

export type BOOKLET_STATUS_MAP_KEY = keyof typeof BOOKLET_STATUS_MAP;