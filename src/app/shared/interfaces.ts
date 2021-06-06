
export interface PagedResponse<T> {
  items: T;
  totalCount: number;
  page: number;
  limit: number;
}

export interface IListItem {
  id: number;
  name: string;
  description: string;
  icon: string;
}

export interface BottomNavAction {
  id: number;
  icon: string;
}
