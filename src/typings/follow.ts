export enum UserFollowStatusEnum {
  FORBIDDEN = -1,
  NORMAL = 1,
}

export interface Follow{ 
  id: string;

  followed_user_id: string;

  user_id: string;

  status: UserFollowStatusEnum;

  create_time: string;
}