export const POINT_STATUS_MAP = {
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

export type POINT_STATUS_MAP_KEY = keyof typeof POINT_STATUS_MAP;