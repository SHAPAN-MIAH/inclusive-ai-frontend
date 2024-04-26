import { useEffect, useRef, useState } from "react"
import generatePDF from "react-to-pdf"
import "./AdminPage.css"
import axios from "axios"
import { baseUrl } from "../../assets/BaseUrl"
import { useSelector } from "react-redux"
import { RootState } from "../../store"

const AdminPanel = () => {
  const targetRef = useRef(null)

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
  console.log(voteTotalData.length ? voteTotalData[0] : "")
  return (
    <div className="mt-4">
      <button
        onClick={() => generatePDF(targetRef, { filename: "Votes table.pdf" })}
        className="download_pdf_btn"
      >
        Download PDF
      </button>

      <table className="center" ref={targetRef}>
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
