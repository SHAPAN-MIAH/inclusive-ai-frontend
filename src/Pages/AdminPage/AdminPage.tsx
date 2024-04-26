import { useEffect, useRef, useState } from "react";
import generatePDF from "react-to-pdf";
import "./AdminPage.css";
import axios from "axios";
import { baseUrl } from "../../assets/BaseUrl";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const AdminPanel = () => {
  const targetRef = useRef(null);

  const [voteTotalData, setVotTotalData] = useState([]);
  const currentUser = useSelector(
    (state: RootState) => state?.userData?.currentUser
  );
  const token: any = currentUser?.token;

  useEffect(() => {
    axios
      .get(baseUrl + `/vote-submission/get-all-submission`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setVotTotalData(res?.data));
  }, []);

  return (
    <div className="mt-4">
      <button
        onClick={() => generatePDF(targetRef, { filename: "Votes table.pdf" })}
        className="download_pdf_btn"
      >
        Download PDF
      </button>

      <table className="center" ref={targetRef}>
        {voteTotalData.map((item) => (
          <>
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Age</th>
            </tr>
            <tr>
              <td>{item}</td>
              <td>Smith</td>
              <td>50</td>
            </tr>
            <tr>
              <td>Eve</td>
              <td>Jackson</td>
              <td>94</td>
            </tr>
            <tr>
              <td>John</td>
              <td>Doe</td>
              <td>80</td>
            </tr>
          </>
        ))}
      </table>
    </div>
  );
};

export default AdminPanel;
