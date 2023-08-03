import { useEffect, useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useNavigate,
  useParams,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import {
  FormControl,
  OutlinedInput,
  Tooltip,
  Grid,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import _ from "lodash";

import InfoHeader from "../../../components/Header/InfoHeader";
import { SaveFooterTertiary } from "../../../components/SaveFooter/SaveFooter";
import { AntSwitch } from "../../../components/AntSwitch/AntSwitch";
import OptionsAttributeTable from "./OptionsAttributeTable";
import { DiscardModalSecondary } from "../../../components/Discard/DiscardModal";
import { DeleteModalSecondary } from "../../../components/DeleteModal/DeleteModal";
import PageLoader from "../../../components/Loader/PageLoader";

import info from "../../../assets/icons/info.svg";

import {
  showSuccess,
  showError,
} from "../../../features/snackbar/snackbarAction";

const OptionSetsInfo = () => {
  return (
    <div className="page container-fluid position-relative user-group product-tab-page">
      <InfoHeader
        title="Create Option Sets"
        onBack={() => {}}
        onPrev={() => {}}
        onNext={() => {}}
        isEdit={false}
        hasPrev={0}
        hasNext={0}
      />

      <form className="product-form" noValidate>
        <div className="row mt-3">
          <div className="col-lg-9 mt-3">
            <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes">
              <div className="col-md-12 px-0 d-flex mb-4"></div>
            </div>
          </div>
        </div>

        <SaveFooterTertiary
          show={true}
          onDiscard={() => {}}
          isLoading={false}
        />
      </form>
    </div>
  );
};

export default OptionSetsInfo;
