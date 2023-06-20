import { useCallback, useReducer, useEffect } from "react";

import { useGetS3UploadUrlQuery } from "./fileUploadApiSlice";

const initialUploadState = {
  data: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null,
  fileName: null,
  file: null,
  skip: true,
};

const uploadReducer = (state, action) => {
  if (action.type === "GET_URL") {
    return {
      ...initialUploadState,
      isLoading: true,
      fileName: action.fileName,
      file: action.file,
      skip: false,
    };
  }
  if (action.type === "GET_URL_ERROR") {
    return {
      ...initialUploadState,
      isError: action.isError,
      error: action.error,
    };
  }
  if (action.type === "UPLOAD_ERROR") {
    return {
      ...initialUploadState,
      isError: action.isError,
      error: action.error,
    };
  }
  if (action.type === "UPLOAD_SUCCESS") {
    return {
      ...initialUploadState,
      data: { url: action.url },
      isSuccess: true,
    };
  }
  return initialUploadState;
};

const UseFileUpload = () => {
  const [uploadState, dispatchUpload] = useReducer(
    uploadReducer,
    initialUploadState
  );
  const {
    data: uploadUrlData,
    isSuccess: uploadUrlIsSuccess,
    error: uploadUrlError,
  } = useGetS3UploadUrlQuery(
    { fileName: uploadState.fileName },
    { skip: uploadState.skip }
  );

  const uploadFile = useCallback(({ file, format }) => {
    dispatchUpload({ type: "GET_URL", fileName: file.name, file });
  }, []);

  useEffect(() => {
    if (uploadUrlError) {
      dispatchUpload({
        type: "GET_URL_ERROR",
        error: "Something went wrong!, please try again",
        isError: true,
      });
    }
    if (uploadUrlData && uploadUrlIsSuccess) {
      const { fields, url } = uploadUrlData.data;
      const fileDetails = new FormData();
      for (const key in fields) {
        if (Object.hasOwnProperty.call(fields, key)) {
          fileDetails.append(key, fields[key]);
        }
      }
      fileDetails.append("file", uploadState.file);
      fetch(url, { method: "POST", body: fileDetails, mode: "no-cors" })
        .then(() => {
          dispatchUpload({
            type: "UPLOAD_SUCCESS",
            url: `${url}/${fields.key}`,
          });
        })
        .catch(() => {
          dispatchUpload({
            type: "UPLOAD_ERROR",
            error: "Something went wrong!, please try again",
            isError: true,
          });
        });
    }
  }, [uploadUrlData, uploadUrlIsSuccess, uploadUrlError, uploadState]);

  return [uploadFile, uploadState];
};

export default UseFileUpload;
