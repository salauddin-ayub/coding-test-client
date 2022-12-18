import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { InputField } from "../components/inputField";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getSectors } from "../components/insertService";
import { Axios } from "../api/api";
import { Dropdown } from "primereact/dropdown";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

const Create_Info = () => {
  const navigate = useNavigate();
  const [sectorList, setSectorList] = useState([]);
  const [isSave, setIsSave] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const formik = useFormik({
    initialValues: {
      userName: "",
      tnc: false,
      sector: "",
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
          const res = await Axios.post(`userInformation`, values);
          if (res?.status === 200) {
            setLoading(false);
            toast.success("Successfully Save");
            setIsSave(true);
            formik.resetForm();
            navigate("/view-information");
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
      {/* {loading && <Loader />} */}
      <div class="flex items-center justify-center h-screen">
        <div class="min-w-fit flex-col border bg-white px-6 py-14 shadow-md rounded-[4px] ">
          <h2 className="text-lg xl:text-l font-serif font-bold text-center py-2 text-teal-600">
            Sector Creation
          </h2>
          <form className="" onSubmit={formik.handleSubmit}>
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
                checked={formik.values.tnc}
                required={true}
                width="full"
                onChange={formik.handleChange}
                value={formik.values.tnc}
              />
              <div class="px-3 text-gray-500 text-xs mt-1">
                Accept terms & conditions
              </div>
            </div>
            {/* <button
              class="mt-5 w-full border p-2  from-green-800 bg-teal-700 text-white rounded-[4px] hover:bg-cyan-700 scale-105 duration-300"
              type="submit"
            >
              Save
            </button> */}

            <div className={`flex justify-between items-center`}>
              <p className="px-3 text-gray-500"></p>
              <div className="flex gap-2">
                <Button
                  type="submit"
                  className={`p-mr-2 p-button-raised p-button-success`}
                  label={"Save"}
                  icon={"pi pi-save"}
                  width={"full"}
                  loading={loading}
                />
              </div>
            </div>
          </form>

          <div class="mt-5 flex text-center text-sm text-gray-400">
            <p className="text-rose-500 text-sm">
              Please enter your name and pick the Sectors you are currently
              involved in.
            </p>
          </div>
          <Link to="/view-information">
            <button class="mt-5 w-full border p-2  from-blue-800 bg-blue-700 text-white rounded-[4px] hover:bg-indigo-700 scale-105 duration-300">
              Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Create_Info;
