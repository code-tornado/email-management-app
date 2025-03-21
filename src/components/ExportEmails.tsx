import { useEffect, useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { getEmails } from "@/helpers/api/auth"
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const exportToExcel = (data: any[]) => {
  const headers = ["First Name", "Last Name", "Email", "Personal Linkedin Link", "Company", "Company Linkedin Link", "Website", "Title"];

  // Map data to match custom headers
  const mappedData = data.map((item) => ({
    "First Name": item.first_name,
    "Last Name": item.last_name,
    "Email": item.email,
    "Company": item.company,
    "Company Linkedin Link": item.company_linkedin,
    "Personal Linkedin Link": item.linkedin,
    "Website": item.website,
    "Title": item.job_title,
  }));

  // Convert data to worksheet
  const worksheet = XLSX.utils.json_to_sheet(mappedData, { header: headers });

  XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: "A1" });

  // Create a new workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Generate and save the Excel file
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  saveAs(blob, 'contacts-export.xlsx');
};


const emails = [
  {
      "id": 5727,
      "email": "don@opt-med-imaging.com",
      "first_name": "Don",
      "last_name": "Tiedemann",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/optimum-medical",
      "linkedin": "http://www.linkedin.com/in/don-tiedemann-a8953495",
      "website": "http://www.optimummedical.co.uk",
      "country": "United States",
      "used": 1
  },
  {
      "id": 5728,
      "email": "piyush.jain@maesa.com",
      "first_name": "Piyush",
      "last_name": "Jain",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/maesa",
      "linkedin": "http://www.linkedin.com/in/piyush-jain-53234b5",
      "website": "http://www.maesa.com",
      "country": "United States",
      "used": 1
  },
  {
      "id": 5729,
      "email": "cole@roycon-tech.com",
      "first_name": "Cole",
      "last_name": "Conroy",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/roycon-technologies",
      "linkedin": "http://www.linkedin.com/in/cole-conroy",
      "website": "http://www.roycon.com",
      "country": "United States",
      "used": 1
  },
  {
      "id": 5730,
      "email": "wrmoss@hbcuconnect.com",
      "first_name": "Will",
      "last_name": "Moss",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/hbcu",
      "linkedin": "http://www.linkedin.com/in/wrmoss",
      "website": "http://www.hbcuconnect.com",
      "country": "United States",
      "used": 1
  },
  {
      "id": 5731,
      "email": "oleksandr@simple.app",
      "first_name": "Alexander",
      "last_name": "Yemelianov",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/smplapp",
      "linkedin": "http://www.linkedin.com/in/ymlnv",
      "website": "http://www.simple.app",
      "country": "United Kingdom",
      "used": 1
  },
  {
      "id": 5732,
      "email": "andre@admiral.media",
      "first_name": "Andre",
      "last_name": "Kempe",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/admiral-media-bcn",
      "linkedin": "http://www.linkedin.com/in/admiral-andre-apps-growth-marketing",
      "website": "http://www.admiral.media",
      "country": "Germany",
      "used": 1
  },
  {
      "id": 5733,
      "email": "etienne@theschoolab.com",
      "first_name": "Etienne",
      "last_name": "Gatti",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/inro-social",
      "linkedin": "http://www.linkedin.com/in/etiennegatti",
      "website": "http://www.inro.social",
      "country": "France",
      "used": 1
  },
  {
      "id": 5734,
      "email": "frank.antezana@itechag.com",
      "first_name": "Frank",
      "last_name": "Antezana",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/itechag",
      "linkedin": "http://www.linkedin.com/in/frank-antezana-36bab4107",
      "website": "http://www.itechag.com",
      "country": "United States",
      "used": 1
  },
  {
      "id": 5735,
      "email": "william.eldin@xxii.fr",
      "first_name": "William",
      "last_name": "Eldin",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/xxii",
      "linkedin": "http://www.linkedin.com/in/william-eldin",
      "website": "http://www.xxiiai.com",
      "country": "France",
      "used": 1
  },
  {
      "id": 5736,
      "email": "solon@taxpay.ai",
      "first_name": "Solon",
      "last_name": "Angel",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/taxpayinc",
      "linkedin": "http://www.linkedin.com/in/innovationforall",
      "website": "http://www.taxpay.ai",
      "country": "United States",
      "used": 1
  },
  {
      "id": 5737,
      "email": "andrea.fantini@hackmind.it",
      "first_name": "Andrea",
      "last_name": "Fantini",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/hackmindit",
      "linkedin": "http://www.linkedin.com/in/fantini84",
      "website": "http://www.hackmind.it",
      "country": "Italy",
      "used": 1
  },
  {
      "id": 5738,
      "email": "darya@hectocorngroup.com",
      "first_name": "Darya",
      "last_name": "Shaterloo",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/hectocorn",
      "linkedin": "http://www.linkedin.com/in/darya-shaterloo-7047543a",
      "website": "http://www.hectocorngroup.com",
      "country": "United Kingdom",
      "used": 1
  },
  {
      "id": 5739,
      "email": "james@super.group",
      "first_name": "James",
      "last_name": "Matthewman",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/supergroup23",
      "linkedin": "http://www.linkedin.com/in/james-matthewman-68262b153",
      "website": "http://www.super.group",
      "country": "United Kingdom",
      "used": 1
  },
  {
      "id": 5752,
      "email": "angelocampano@floracolossus.com",
      "first_name": "Angelo",
      "last_name": "Campano",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/flora-management-the-healthit-consultants",
      "linkedin": "http://www.linkedin.com/in/angelo-joseph-campano-294b5521",
      "website": "http://www.florahealthit.com",
      "country": "United States",
      "used": 1
  },
  {
      "id": 5753,
      "email": "tdouglas@jmark.com",
      "first_name": "Thomas",
      "last_name": "Douglas",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/jmark",
      "linkedin": "http://www.linkedin.com/in/thomashdouglas",
      "website": "http://www.jmark.com",
      "country": "United States",
      "used": 1
  },
  {
      "id": 5754,
      "email": "anna@mentica.ai",
      "first_name": "Anna",
      "last_name": "Znamenskaya",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/mentica-ai",
      "linkedin": "http://www.linkedin.com/in/annaznamenskaya",
      "website": "http://www.mentica.ai",
      "country": "United Kingdom",
      "used": 1
  },
  {
      "id": 5755,
      "email": "brian.lesser@groupm.com",
      "first_name": "Brian",
      "last_name": "Lesser",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/groupmworldwide",
      "linkedin": "http://www.linkedin.com/in/brianlesser",
      "website": "http://www.groupm.com",
      "country": "United States",
      "used": 1
  },
  {
      "id": 5756,
      "email": "doron@controlplane.com",
      "first_name": "Doron",
      "last_name": "Grinstein",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/control-plane-corporation",
      "linkedin": "http://www.linkedin.com/in/dorongrinstein",
      "website": "http://www.controlplane.com",
      "country": "United States",
      "used": 1
  },
  {
      "id": 5757,
      "email": "james.riley@lightsparkinc.com",
      "first_name": "James",
      "last_name": "Riley",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/lightspark-software-inc",
      "linkedin": "http://www.linkedin.com/in/jamesriley",
      "website": "http://www.lightspark.energy",
      "country": "United States",
      "used": 1
  },
  {
      "id": 5758,
      "email": "dheeraj@dataflix.com",
      "first_name": "Dheeraj",
      "last_name": "Nallagatla",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/dataflix",
      "linkedin": "http://www.linkedin.com/in/nallagatla",
      "website": "http://www.dataflix.com",
      "country": "United States",
      "used": 1
  },
  {
      "id": 5759,
      "email": "steve.hare@sage.com",
      "first_name": "Steve",
      "last_name": "Hare",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/sage-software",
      "linkedin": "http://www.linkedin.com/in/steve-hare",
      "website": "http://www.sage.com",
      "country": "United Kingdom",
      "used": 1
  },
  {
      "id": 5760,
      "email": "andrew.avanessian@haiilo.com",
      "first_name": "Andrew",
      "last_name": "Avanessian",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/haiilo",
      "linkedin": "http://www.linkedin.com/in/andrewavanessian",
      "website": "http://www.haiilo.com",
      "country": "United Kingdom",
      "used": 1
  },
  {
      "id": 5761,
      "email": "cedric.girard@siium.fr",
      "first_name": "Cedric",
      "last_name": "Girard",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/siium",
      "linkedin": "http://www.linkedin.com/in/c%c3%a9dric-girard-4894a342",
      "website": "http://www.siium.fr",
      "country": "France",
      "used": 1
  },
  {
      "id": 5762,
      "email": "matt@powderkeg.com",
      "first_name": "Matt",
      "last_name": "Hunckler",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/powderkeghq",
      "linkedin": "http://www.linkedin.com/in/hunckler",
      "website": "http://www.powderkeg.com",
      "country": "United States",
      "used": 1
  },
  {
      "id": 5763,
      "email": "brooke.maclean@marketwake.com",
      "first_name": "Brooke",
      "last_name": "Maclean",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/marketwake",
      "linkedin": "http://www.linkedin.com/in/brookebmaclean",
      "website": "http://www.marketwake.com",
      "country": "United States",
      "used": 1
  },
  {
      "id": 5764,
      "email": "andy@pearl.com",
      "first_name": "Andy",
      "last_name": "Kurtzig",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/pearl-com-ai",
      "linkedin": "http://www.linkedin.com/in/andykurtzig",
      "website": "http://www.pearl.com",
      "country": "United States",
      "used": 1
  },
  {
      "id": 5765,
      "email": "dgamble@supplychainbutler.com",
      "first_name": "David",
      "last_name": "Gamble",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/supply-chain-butler",
      "linkedin": "http://www.linkedin.com/in/gamble2",
      "website": "http://www.supplychainbutler.com",
      "country": "United States",
      "used": 1
  },
  {
      "id": 5766,
      "email": "eduardo@kolet.com",
      "first_name": "Eduardo",
      "last_name": "Ronzano",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/kolet-esim-app",
      "linkedin": "http://www.linkedin.com/in/eduardoronzano",
      "website": "http://www.kolet.com",
      "country": "France",
      "used": 1
  },
  {
      "id": 5767,
      "email": "anna@climatecollective.org",
      "first_name": "Anna",
      "last_name": "Lerner Nesbitt",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/climate-collective-org",
      "linkedin": "http://www.linkedin.com/in/anna-lerner-nesbitt",
      "website": "http://www.climatecollective.org",
      "country": "Spain",
      "used": 1
  },
  {
      "id": 5768,
      "email": "zucca@ippogrifogroup.com",
      "first_name": "Andrea",
      "last_name": "Zucca",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/ippogrifogroup",
      "linkedin": "http://www.linkedin.com/in/andreazucca",
      "website": "http://www.ippogrifogroup.com",
      "country": "Italy",
      "used": 1
  },
  {
      "id": 5769,
      "email": "michael@ezzey.com",
      "first_name": "Michael",
      "last_name": "Hamburger",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/ezzey",
      "linkedin": "http://www.linkedin.com/in/michaelhamburger",
      "website": "http://www.ezzey.com",
      "country": "United States",
      "used": 1
  },
  {
      "id": 5770,
      "email": "igore@coherentsolutions.com",
      "first_name": "Igor",
      "last_name": "Epshteyn",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/coherent-solutions",
      "linkedin": "http://www.linkedin.com/in/igorepshteyn",
      "website": "http://www.coherentsolutions.com",
      "country": "United States",
      "used": 1
  },
  {
      "id": 5771,
      "email": "bready@pinterest.com",
      "first_name": "Bill",
      "last_name": "Ready",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/pinterest",
      "linkedin": "http://www.linkedin.com/in/bill-ready-1b1203b",
      "website": "http://www.pinterest.com",
      "country": "United States",
      "used": 1
  },
  {
      "id": 5772,
      "email": "f.moriani@vargroup.it",
      "first_name": "Francesca",
      "last_name": "Moriani",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/vargroup-spa",
      "linkedin": "http://www.linkedin.com/in/francesca-moriani-9422321",
      "website": "http://www.vargroup.com",
      "country": "Italy",
      "used": 1
  },
  {
      "id": 5773,
      "email": "jbrowning@advocacyinvesting.com",
      "first_name": "John",
      "last_name": "Browning",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/guardianrock",
      "linkedin": "http://www.linkedin.com/in/johnbrowningfinancialsolutions",
      "website": "http://www.guardianrockwealth.com",
      "country": "United States",
      "used": 1
  },
  {
      "id": 5774,
      "email": "valerie@sweepbright.com",
      "first_name": "Valerie",
      "last_name": "Touraine",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/sweepbright",
      "linkedin": "http://www.linkedin.com/in/valerietouraine",
      "website": "http://www.sweepbright.com",
      "country": "France",
      "used": 1
  },
  {
      "id": 5775,
      "email": "kami@zoeticamedia.com",
      "first_name": "Kami",
      "last_name": "Huyse",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/zoetica",
      "linkedin": "http://www.linkedin.com/in/kamihuyse",
      "website": "http://www.zoeticamedia.com",
      "country": "United States",
      "used": 1
  },
  {
      "id": 5776,
      "email": "mighani@skillbyte.de",
      "first_name": "Masiar",
      "last_name": "Ighani",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/skillbyte-ki",
      "linkedin": "http://www.linkedin.com/in/masiarighani",
      "website": "http://www.skillbyte.de",
      "country": "Germany",
      "used": 1
  },
  {
      "id": 5777,
      "email": "arapp@empower.spa",
      "first_name": "Alyssa",
      "last_name": "Rapp",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/empoweraesthetics",
      "linkedin": "http://www.linkedin.com/in/alyssa-rapp-3b2aa7",
      "website": "http://www.empower.spa",
      "country": "United States",
      "used": 1
  },
  {
      "id": 5778,
      "email": "chris.ciauri@unily.com",
      "first_name": "Chris",
      "last_name": "Ciauri",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/unily",
      "linkedin": "http://www.linkedin.com/in/cciauri",
      "website": "http://www.unily.com",
      "country": "United Kingdom",
      "used": 1
  },
  {
      "id": 5779,
      "email": "stephen@predictiveroi.com",
      "first_name": "Stephen",
      "last_name": "Woessner",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/predictive-roi",
      "linkedin": "http://www.linkedin.com/in/stephenwoessner",
      "website": "http://www.predictiveroi.com",
      "country": "United States",
      "used": 1
  },
  {
      "id": 5780,
      "email": "r.cleland-bogle@temptingventures.com",
      "first_name": "Ryan",
      "last_name": "Cleland-Bogle",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/tempting-ventures",
      "linkedin": "http://www.linkedin.com/in/ryanclelandbogle",
      "website": "http://www.temptingventures.com",
      "country": "United Kingdom",
      "used": 1
  },
  {
      "id": 5781,
      "email": "cristian.fracassi@isinnova.it",
      "first_name": "Cristian",
      "last_name": "Fracassi",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/isinnova",
      "linkedin": "http://www.linkedin.com/in/cristian-fracassi-b155b05b",
      "website": "http://www.isinnova.it",
      "country": "Italy",
      "used": 1
  },
  {
      "id": 5782,
      "email": "levon@affpapa.com",
      "first_name": "Levon",
      "last_name": "Nikoghosyan",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/affpapa",
      "linkedin": "http://www.linkedin.com/in/levon-nikoghosyan",
      "website": "http://www.affpapa.com",
      "country": "Spain",
      "used": 1
  },
  {
      "id": 5783,
      "email": "chris@thisistommy.com",
      "first_name": "Chris",
      "last_name": "Edwards",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/thisistommy",
      "linkedin": "http://www.linkedin.com/in/thisischris",
      "website": "http://www.thisistommy.com",
      "country": "United Kingdom",
      "used": 1
  },
  {
      "id": 5784,
      "email": "amanda@otraway.com",
      "first_name": "Amanda",
      "last_name": "Mottola",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/otraswag",
      "linkedin": "http://www.linkedin.com/in/amanda-mottola-0543441b",
      "website": "http://www.otraswag.com",
      "country": "United States",
      "used": 1
  },
  {
      "id": 5785,
      "email": "brent@lightningstep.com",
      "first_name": "Brent",
      "last_name": "Michael",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/lightningstep",
      "linkedin": "http://www.linkedin.com/in/brentmichael1",
      "website": "http://www.lightningstep.com",
      "country": "United States",
      "used": 1
  },
  {
      "id": 5786,
      "email": "charmain@urban.co",
      "first_name": "Charmain",
      "last_name": "Manning",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/urbanappuk",
      "linkedin": "http://www.linkedin.com/in/charmain-manning-1a08063",
      "website": "http://www.urban.co",
      "country": "United Kingdom",
      "used": 1
  },
  {
      "id": 5787,
      "email": "m.komasinski@criteo.com",
      "first_name": "Michael",
      "last_name": "Komasinski",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/criteo",
      "linkedin": "http://www.linkedin.com/in/michael-komasinski-669150",
      "website": "http://www.criteo.com",
      "country": "United States",
      "used": 1
  },
  {
      "id": 5788,
      "email": "paubry@teclib.com",
      "first_name": "Pascal",
      "last_name": "Aubry",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/teclibgroup",
      "linkedin": "http://www.linkedin.com/in/teclibpascalaubry",
      "website": "http://www.teclib-edition.com",
      "country": "France",
      "used": 1
  },
  {
      "id": 5789,
      "email": "sean@hiremadison.com",
      "first_name": "Sean",
      "last_name": "Johnson",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/hiremadison",
      "linkedin": "http://www.linkedin.com/in/seanjohnson",
      "website": "http://www.hiremadison.com",
      "country": "United States",
      "used": 1
  },
  {
      "id": 5790,
      "email": "frederick@jegopods.com",
      "first_name": "Frederick",
      "last_name": "Akpoghene",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/jego-technologies-inc",
      "linkedin": "http://www.linkedin.com/in/frederick-a-kevbe",
      "website": "http://www.jegopods.com",
      "country": "United States",
      "used": 1
  },
  {
      "id": 5791,
      "email": "paul@wizardus.com",
      "first_name": "Paul",
      "last_name": "Farrell",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/wizard-productivity-systems",
      "linkedin": "http://www.linkedin.com/in/paul-farrell-b9a686b",
      "website": "http://www.wizardus.com",
      "country": "United States",
      "used": 1
  },
  {
      "id": 5792,
      "email": "jo@trusty.care",
      "first_name": "Joseph",
      "last_name": "Schneier",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/circleengage",
      "linkedin": "http://www.linkedin.com/in/joschneier",
      "website": "http://www.circleengage.ai",
      "country": "United States",
      "used": 1
  },
  {
      "id": 5793,
      "email": "alice.kras@coinavatar.com",
      "first_name": "Kyrylo",
      "last_name": "Iusov",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/coinavatar",
      "linkedin": "http://www.linkedin.com/in/kirill-yusov",
      "website": "http://www.coinavatar.com",
      "country": "Germany",
      "used": 1
  },
  {
      "id": 5794,
      "email": "marc.enggist@eg-software.com",
      "first_name": "Marc",
      "last_name": "Enggist",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/egssa",
      "linkedin": "http://www.linkedin.com/in/marcenggist",
      "website": "http://www.eg-software.com",
      "country": "Switzerland",
      "used": 1
  },
  {
      "id": 5795,
      "email": "ian@immigrationfinder.com",
      "first_name": "Ian",
      "last_name": "Almasi",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/immigration-finder",
      "linkedin": "http://www.linkedin.com/in/ian-almasi",
      "website": "http://www.immigrationfinder.com",
      "country": "United States",
      "used": 1
  },
  {
      "id": 5796,
      "email": "robin.hofmann@heardis.com",
      "first_name": "Robin",
      "last_name": "Hofmann",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/heardis",
      "linkedin": "http://www.linkedin.com/in/robin-hofmann-heardis",
      "website": "http://www.heardis.com",
      "country": "Germany",
      "used": 1
  },
  {
      "id": 5797,
      "email": "nineveh@suprahuman.com",
      "first_name": "Nineveh",
      "last_name": "Madsen",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/supra-human",
      "linkedin": "http://www.linkedin.com/in/ninevehmadsen",
      "website": "http://www.suprahuman.com",
      "country": "United States",
      "used": 1
  },
  {
      "id": 5798,
      "email": "mbc@vicapitallending.com",
      "first_name": "Matthew",
      "last_name": "Coleman",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/vicapitallending",
      "linkedin": "http://www.linkedin.com/in/matthewcoleamn",
      "website": "http://www.vicapitallending.com",
      "country": "United States",
      "used": 1
  },
  {
      "id": 5799,
      "email": "florian@mozzaik365.com",
      "first_name": "Florian",
      "last_name": "Bouron",
      "job_title": "",
      "company": "\"\"",
      "company_linkedin": "http://www.linkedin.com/company/mozzaik365",
      "linkedin": "http://www.linkedin.com/in/florian-bouron-7959727b",
      "website": "http://www.mozzaik365.com",
      "country": "France",
      "used": 1
  }
]

const ExportEmails = () => {
  const [countPerFile, setCountPerFile] = useState(50)
  const [fileCount, setFileCount] = useState(10)

  const handleExport = async () => {
    getEmails(countPerFile * fileCount).then((res) => {
      new Array(fileCount).fill(0).forEach((_, i) => {
        exportToExcel(res.data.emails.slice(i * countPerFile, i * countPerFile + countPerFile))
      })
    })

    // new Array(fileCount).fill(0).forEach((_, i) => {
    //   exportToExcel(emails.slice(i * countPerFile, i * countPerFile + countPerFile))
    // })
  }

  return (
    <div className="">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1">Count per file</label>
          <Input type="number" value={countPerFile} onChange={(e) => setCountPerFile(+e.target.value)} className="w-full" />
        </div>

        <div>
          <label className="mb-1">File count</label>
          <Input type="number" value={fileCount} onChange={(e) => setFileCount(+e.target.value)} className="w-full" />
        </div>
      </div>
      <div className="flex justify-end mt-2">
        <Button onClick={handleExport}>Export</Button>
      </div>
    </div>
  )
}

export default ExportEmails;
