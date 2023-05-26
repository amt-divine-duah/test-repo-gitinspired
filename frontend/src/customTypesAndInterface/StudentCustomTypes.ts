export type TableDataFormatType = {
  title: string | null;
  status?: string | null;
  description?: string | null;
  deadline?: string;
  uniqueCode?: string | null;
};

export type StudentTableType = {
  tableTitles?: string[] | null;
  tableData?: TableDataFormatType[] | null;
};

export type StudentTableTypeII = {
  tableTitles?: string[] | null;
  tableData?: Assignment[] | null;
};

export interface Assignment {
  assignment: TableDataFormatType;
  deadline: string;
}
