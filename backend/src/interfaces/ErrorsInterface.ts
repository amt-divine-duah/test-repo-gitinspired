export interface ValidationErrorItem {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}

export interface CsvErrorItem {
  statusCode: number;
  details: string;
  filename: string;
}