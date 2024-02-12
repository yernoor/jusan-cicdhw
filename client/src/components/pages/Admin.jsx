import { useCallback, useEffect, useRef, useState } from "react";
import doWeHaveToken from "../functions/checkIfAutorized";
import Footer from "../pageElements/footer";
import Header from "../pageElements/header";
import Service from "../service/service";
import ReactLoading from "react-loading";
import Candidate from "./candidate";
import TablePagination from "@mui/material/TablePagination";
import Search from "../pageElements/Search";
import { Button, Input } from "@chakra-ui/react";

export default function Admin() {
  const emailInput = useRef(null);
  const [ApplicationList, setApplicationList] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const getApplications = useCallback(async () => {
    const requestToApplicationList = await Service("applicationList");
    const reversedApplist = requestToApplicationList.reverse();

    setApplicationList(reversedApplist);
  }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    getApplications();
  }, [getApplications]);
  if (doWeHaveToken()) {
    // console.log(ApplicationList);
    return (
      <>
        <Header />
        <div className="adminPage">
          <div className="adminPanel">
            <div className="adminPanelHeader">
              <h2>Список заявок</h2>
              <Search obj={ApplicationList} />
            </div>
            <div className="createAccount">
              <div className="createAccountField">
                <div className="createAccountTitle">Отправить приглашение</div>
                <Input
                  ref={emailInput}
                  placeholder="Введите email кандидата"
                  className="invite"
                />
              </div>
              <button
                className="inviteBtn"
                onClick={(e) => {
                  const email = emailInput.current.value;
                  const emailRegx =
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                  if (emailRegx.test(email)) {
                    Service("sendInvaite", { email: email });
                  } else {
                    alert("email введен не правильно!");
                  }
                }}
              >
                Отправить приглашение
              </button>
            </div>
            <div className="adminPanelBody">
              <TablePagination
                component="div"
                count={ApplicationList ? ApplicationList.length : 0}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
              {ApplicationList ? (
                <>
                  {ApplicationList.map((elem, index) => {
                    if (
                      index >= page * rowsPerPage &&
                      index <= rowsPerPage * (page + 1)
                    ) {
                      return (
                        <Candidate candidate={elem} key={(elem = index)} />
                      );
                    }
                  })}
                </>
              ) : (
                <ReactLoading color="orange" className="loader" />
              )}
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  return <div className="NotAuth">You not authorized</div>;
}
