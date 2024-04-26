import { useEffect, useRef, useState } from "react"
// import generatePDF from "react-to-pdf"
import "./AdminPage.css"
import axios from "axios"
import { baseUrl } from "../../assets/BaseUrl"
import { useSelector } from "react-redux"
import { RootState } from "../../store"

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const AdminPanel = () => {
  const tableRef = useRef<HTMLTableElement>(null);

  const downloadPDF = () => {
    if (!tableRef.current) return;

    html2canvas(tableRef.current).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('Vote-table.pdf');
    });
  };




  const [voteTotalData, setVotTotalData] = useState<any>([])
  const currentUser = useSelector(
    (state: RootState) => state?.userData?.currentUser
  )
  const token: any = currentUser?.token

  useEffect(() => {
    axios
      .get(baseUrl + `/vote-submission/get-all-submission`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setVotTotalData(res?.data?.data)
      })
  }, [])
  // console.log(voteTotalData.length ? voteTotalData[0] : "")


  return (
    <div className="mt-4">
      <button
        onClick={downloadPDF}
        className="download_pdf_btn"
      >
        Download PDF
      </button>

      <table className="center" ref={tableRef}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Pod-Categorical</th>
            <th>Voting Design</th>
            <th>Total Tokens</th>
            <th>Choice_1</th>
            <th>Choice_2</th>
            <th>Choice_3</th>
            <th>Choice_4</th>
          </tr>
        </thead>
        {voteTotalData.map((item: any) => (
          <tr>
            <td>{item?.user?.email}</td>
            <td>{item?.votingDesign?.podCategorical}</td>
            <td>{item?.votingDesign?.votingDesignId}</td>
            <td>{item?.user?.originalTokensAssigned}</td>
            <td>{item?.choice_1}</td>
            <td>{item?.choice_2}</td>
            <td>{item?.choice_3}</td>
            <td>{item?.choice_4}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default AdminPanel
