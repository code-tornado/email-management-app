import { CommutingProvider } from "./context/CommutingContext";
import { ToastProvider } from "@/components/ui/toast";
import * as XLSX from "xlsx";
import { toast } from "./hooks/use-toast";
import { addEmails } from "./helpers/api/auth";
import ExportEmails from "./components/ExportEmails";

function App() {
  async function handleExcelImport(event: any) {
    let contacts: any = [];

    for (const file of event.target.files) {
      if (!file) return;

      await new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
  
            // Get the first sheet
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
  
            // Convert to JSON
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
  
            // Process the data to extract name and email
            contacts = [
              ...contacts,
              ...jsonData
                .map((row: any) => {
                  return {
                    email: row["Email"],
                    first_name: row["First Name"],
                    last_name: row["Last Name"],
                    job_title: row["Title"],
                    company_linkedin: row["Company Linkedin Url"],
                    linkedin: row["Person Linkedin Url"],
                    company: row["Company"],
                    website: row["Website"],
                    country: row["Country"],
                  };
                })
                .filter((contact) => contact.email),
            ];
            resolve(true)
          } catch (error) {
            console.error("Error parsing Excel file:", error);
            toast({
              title: "error",
              description: "Error parsing Excel file:",
            });
            reject(error)
          }
        };
  
        reader.onerror = () => {
          toast({
            title: "error",
            description: "Error reading file",
          });
        };
  
        reader.readAsArrayBuffer(file);
      })
    }

    addEmails(contacts).then(() => {
      toast({
        title: "Success",
        description: "Successfully added"
      })
    })
  }

  return (
    <CommutingProvider>
      <ToastProvider>
        <div className="container max-w-3xl mx-auto py-6">
          <div className="mb-10">
            <input
              type="file"
              onChange={handleExcelImport}
              multiple
              accept=".xlsx, .xls, .csv"
            />
          </div>

          <ExportEmails />
        </div>
      </ToastProvider>
    </CommutingProvider>
  );
}

export default App;
