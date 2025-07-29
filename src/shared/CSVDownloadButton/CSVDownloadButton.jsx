import React from "react";
import StyledButton from "shared/Button";
import { CSV, CSVLink } from "react-csv";

export default function CSVDownloadButton({ data, headers, name = "" }) {
  // const headers = [
  //   { label: "First Name", key: "firstname" },
  //   { label: "Last Name", key: "lastname" },
  //   { label: "Email", key: "email" },
  // ];

  // const data = [
  //   { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
  //   { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
  //   { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" },
  // ];

  const handleClick = () => {
    const el = document.getElementById("download");
    el.click();
  };

  const formatFileName = (name) => {
    const date = new Date();
    const day = date.getUTCDate();
    const month = date.getUTCMonth();
    const year = date.getUTCFullYear();
    const timeStamp = date.getTime();

    return `${day}-${month}-${year}_${name}_${timeStamp}.csv`;
  };
  const fileName = formatFileName(name);
  return (
    <>
      <StyledButton text="Exportar CSV" onClick={handleClick}></StyledButton>
      {data && (
        <CSVLink
          id="download"
          filename={fileName}
          data={data}
          headers={headers}
        />
      )}
    </>
  );
}
