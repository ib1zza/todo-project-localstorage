export type Todo = {
  _id: string;
  title: string;
  description?: string;
  priority: number;
  status: boolean;
  createdAt: string;
  updatedAt?: string;
  __v?: number;
};

export type TodoCompleted = Todo & {
  dateOfCompletion?: string;
};

export enum SortType {
  CURRENT_SORT = "current",
  DATE = "date",
  DATE_REV = "daterev",
  PRIORITY = "priority",
  TITLE = "title",
  TITLE_REV = "titlerev",
}

export const SortOptions: Array<SortType> = [
  SortType.DATE,
  SortType.DATE_REV,
  SortType.TITLE,
  SortType.TITLE_REV,
  SortType.PRIORITY,
];
