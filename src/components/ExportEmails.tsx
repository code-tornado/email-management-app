import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { getEmails } from "@/helpers/api/auth";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const exportToExcel = (data: any[]) => {
  const headers = [
    "First Name",
    "Last Name",
    "Email",
    "Personal Linkedin Link",
    "Company",
    "Company Linkedin Link",
    "Website",
    "Title",
  ];

  // Map data to match custom headers
  const mappedData = data.map((item) => ({
    "First Name": item.first_name,
    "Last Name": item.last_name,
    Email: item.email,
    Company: item.company,
    "Company Linkedin Link": item.company_linkedin,
    "Personal Linkedin Link": item.linkedin,
    Website: item.website,
    Title: item.job_title,
  }));

  // Convert data to worksheet
  const worksheet = XLSX.utils.json_to_sheet(mappedData, { header: headers });

  XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: "A1" });

  // Create a new workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Generate and save the Excel file
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, "contacts-export.xlsx");
};

const ExportEmails = ({ getMailInfo }: { getMailInfo: () => void }) => {
  const [countPerFile, setCountPerFile] = useState(50);
  const [fileCount, setFileCount] = useState(10);

  const handleExport = async () => {
    getEmails(countPerFile * fileCount).then((res) => {
      getMailInfo();
      new Array(fileCount).fill(0).forEach((_, i) => {
        exportToExcel(
          res.data.emails.slice(
            i * countPerFile,
            i * countPerFile + countPerFile
          )
        );
      });
    });
  };
  return (
    <div className="shadow rounded p-4">
      <h1 className="text-2xl font-bold mb-4">Export Emails</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1">Count per file</label>
          <Input
            type="number"
            value={countPerFile}
            onChange={(e) => setCountPerFile(+e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label className="mb-1">File count</label>
          <Input
            type="number"
            value={fileCount}
            onChange={(e) => setFileCount(+e.target.value)}
            className="w-full"
          />
        </div>
      </div>
      <div className="flex justify-end mt-2">
        <Button onClick={handleExport}>Export</Button>
      </div>
    </div>
  );
};

export default ExportEmails;
