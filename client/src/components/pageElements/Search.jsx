import { Input } from "@chakra-ui/react";
import { useState } from "react";
import Candidate from "../pages/candidate";

export default function Search(obj) {
  const ApplicationsList = obj.obj;
  const [findResult, setFindResult] = useState([]);

  const arr = [];
  const handleChange = (event) => {
    const value = event.target.value;
    if (value) {
      ApplicationsList.map((elem) => {
        const applicationListValues = Object.values(elem);

        if (
          applicationListValues[1].toLowerCase().includes(value.toLowerCase())
        ) {
          //   console.log(applicationListValues[1]);
          //   arr.push(applicationListValues[1]);
          arr.push(elem);
        } else {
          if (arr.length > 1) arr.pop();
        }
      });
    } else {
      setFindResult([]);
    }
    setFindResult(arr);
  };

  return (
    <div className="find">
      <Input
        onChange={handleChange}
        placeholder="Поиск по имени"
        className="seacrh"
      />
      <div className="findElements">
        {findResult &&
          findResult.map((elem, index) => {
            return (
              <div className="findElement">
                <Candidate candidate={elem} key={(elem = index)} />
              </div>
            );
            // return <div >{elem}</div>;
          })}
      </div>
    </div>
  );
}
