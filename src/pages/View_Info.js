import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "primereact/button";
import { getUserInfo } from "../components/insertService";
import { toast } from "react-toastify";
import { BackButton } from "../components/buttons";
import { Dialog } from "primereact/dialog";
import Update_Info from "./Update_Info";
import { AppContext } from "../App";

export default function View_Info() {
  const { setUpdatedData } = useContext(AppContext);
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayBasic, setDisplayBasic] = useState(false);

  const dialogFuncMap = {
    displayBasic: setDisplayBasic,
  };

  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);
  };

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
    fetchAndGetSectorList();
  };

  useEffect(() => {
    fetchAndGetSectorList();
  }, []);
  const fetchAndGetSectorList = async () => {
    try {
      setLoading(true);
      setUserInfo(await getUserInfo());
      setLoading(false);
    } catch (err) {
      toast.error(err);
    }
  };

  const actionButton = (rowData) => {
    return (
      <div className="flex justify-center items-center">
        <div style={{ width: "40px", height: "40px", borderRadius: "100%" }}>
          <Button
            icon={"pi pi-pencil"}
            label={"Edit"}
            className="p-button-success"
            onClick={() => {
              onClick("displayBasic");
              setUpdatedData(rowData);
              console.log("RowData", rowData);
            }}
          ></Button>
        </div>
      </div>
    );
  };

  const paginatorLeft = (
    <Button type="button" icon="pi pi-refresh" className="p-button-text" />
  );
  const paginatorRight = (
    <Button type="button" icon="pi pi-cloud" className="p-button-text" />
  );
  return (
    <div className="p-2 xl:px-16">
      <div className="flex justify-between mt-5">
        <h1 className="text-3xl text-[#565656] font-bold">
          All Stored Information
        </h1>
        <BackButton />
      </div>

      <div className="card shadow mt-5">
        <DataTable
          paginator={false}
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          rows={10}
          rowsPerPageOptions={[10, 20, 50]}
          paginatorLeft={paginatorLeft}
          paginatorRight={paginatorRight}
          value={userInfo}
          // header="Stored Information"
          responsiveLayout="scroll"
          loading={loading}
        >
          <Column className="text-emerald-500" field="_id" header="User ID" />
          <Column
            className="text-sky-600"
            field="userName"
            header="User Name"
          />
          <Column className="text-pink-600" field="sector" header="Sector" />
          <Column className="text-cyan-600" field="tnc" header="Is Checked" />
          <Column field="action" header="Update" body={actionButton} />
        </DataTable>
      </div>
      <div>
        <Dialog
          className="text-l"
          blockScroll
          header="Update Sectors"
          visible={displayBasic}
          style={{ width: "60vw" }}
          onHide={() => onHide("displayBasic")}
          id="fname"
          maximizable
        >
          <Update_Info onHide={onHide} />
        </Dialog>
      </div>
    </div>
  );
}
