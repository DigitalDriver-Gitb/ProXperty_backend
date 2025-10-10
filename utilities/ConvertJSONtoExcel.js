import XLSX from "xlsx";
import path from "path";

const JSONtoExcel = (json, filepath) => {
  const workSheet = XLSX.utils.json_to_sheet(json);
  const workBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, "Sheet1");
  XLSX.writeFile(workBook, filepath);
}

export default JSONtoExcel;
