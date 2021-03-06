import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [dataArray, setdataArray] = useState([]);
  const [pageNumber, setPageNumber] = useState("1");
  const [limit, setLimit] = useState(30);
  useEffect(() => {
    const apiCallFunction = async () => {
      const apiData = fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${100}&_page=${pageNumber}`
      );
      const apiDataJson = await (await apiData).json();
      console.log(apiDataJson);
      const dataArrayCopy = [...apiDataJson];
      setdataArray(dataArrayCopy);
    };
    apiCallFunction();
  }, [pageNumber]);

  // const MAX_PAGE_NUMBER=20
  // const pageNumberArray=
  const handlePre = () => {
    setPageNumber(pageNumber <= 1 ? pageNumber : pageNumber - 1);
  };
  const handleNext = () => {
    setPageNumber(pageNumber + 1);
    // setPageNumber(pageNumber >= 20 ? pageNumber : pageNumber + 1);
  };
  window.addEventListener("scroll", () => {
    const {
      documentElement: { clinetHeight, scrollTop, scrollHeight } = {}
    } = document;
    if (clinetHeight + scrollTop >= scrollHeight) {
      console.log({ clinetHeight, scrollTop, scrollHeight }, "hh");
      setLimit((i) => (i += 10));
    }
  });
  return (
    <div className="App">
      <ul>
        {dataArray.map((data, index) => (
          <li key={index}>{data.id}</li>
        ))}
      </ul>
      <button disabled={pageNumber === 1} onClick={handlePre}>
        Pre
      </button>
      <button disabled={pageNumber === 20} onClick={handleNext}>
        Next
      </button>
    </div>
  );
}
