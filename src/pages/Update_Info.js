import React, { useContext, useEffect, useState } from "react";
import { MultiSelect } from "primereact/multiselect";
import { useFormik } from "formik";
import { InputField } from "../components/inputField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getSectors, getUserInfo } from "../components/insertService";
import { Axios } from "../api/api";
import { Dropdown } from "primereact/dropdown";
import { AppContext } from "../App";
import { Button } from "primereact/button";
// import Loader from "./loader/Loader";

const Update_Info = ({ onHide }) => {
  const { updatedData } = useContext(AppContext);

  const [sectorList, setSectorList] = useState([]);
  const [isSave, setIsSave] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState([]);

  console.log("editedData", updatedData);

  useEffect(() => {
    fetchAndGetSectorList();
  }, []);
  const fetchAndGetSectorList = async () => {
    try {
      setSectorList(await getSectors());
    } catch (err) {
      toast.error(err);
    }
  };
  useEffect(() => {
    fetchAndGetSectorList();
    fetchAndGetSectorDashboard();
  }, []);
  const fetchAndGetSectorDashboard = async () => {
    try {
      setLoading(true);
      setUserInfo(await getUserInfo());
      setLoading(false);
    } catch (err) {
      toast.error(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      userName: updatedData?.userName || "",
      tnc: updatedData?.tnc || "",
      sector: updatedData?.sector || "",
    },
    onSubmit: async (values) => {
      console.log("values", values);

      if (!values?.sector) {
        toast.error("Please select  Sector!");
      } else if (values?.tnc === false) {
        toast.error("Please Checked Terms & Conditions!");
      } else {
        try {
          setLoading(true);
          const res = await Axios.put(`userInformation`, values);
          if (res?.status === 200) {
            setLoading(false);
            toast.success("Successfully Updated");
            setIsSave(true);
            formik.resetForm();
            onHide("displayBasic");
          }
          setLoading(false);
        } catch (err) {
          setLoading(false);
          toast.error(err);
        }
      }
    },
    enableReinitialize: true,
  });

  return (
    <div>
      <div className="border">
        <form className="p-2" onSubmit={formik.handleSubmit}>
          <div class="flex flex-col text-sm rounded-md">
            <input
              class="mb-5 rounded-[4px] border p-3 hover:outline-none focus:outline-none hover:border-yellow-500 "
              type="text"
              name="userName"
              placeholder="Name"
              onChange={formik.handleChange}
              value={formik.values.userName}
              required
            />

            <Dropdown
              name="sector"
              value={formik.values.sector}
              options={sectorList}
              onChange={formik.handleChange}
              optionLabel="label"
              optionGroupLabel="label"
              optionGroupChildren="items"
              placeholder="Select Sectors"
            />
          </div>
          <div class="flex pt-4">
            <InputField
              id="tnc"
              name="tnc"
              type="checkbox"
              errors=""
              checked={formik.values.tnc}
              required={true}
              width="full"
              onChange={formik.handleChange}
              value={formik.values.tnc}
            />
            <div class="px-3 text-gray-500">I accept terms & conditions</div>
          </div>
          <div className={`flex justify-between items-center`}>
            <p className="px-3 text-gray-500"></p>
            <div className="flex gap-2">
              <Button
                type="submit"
                className={`p-mr-2 p-button-raised p-button-warning`}
                label={"Update"}
                icon={"pi pi-save"}
                loading={loading}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update_Info;
