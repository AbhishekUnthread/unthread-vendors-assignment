import { useCallback, useReducer, useEffect } from "react";

import { useGetS3UploadUrlQuery } from "./fileUploadApiSlice";

const initialUploadState = {
  data: {
    urls: [],
  },
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null,
  fileNames: null,
  files: null,
  skip: true,
};

const uploadReducer = (state, action) => {
  if (action.type === "GET_URL") {
    return {
      ...initialUploadState,
      isLoading: true,
      fileNames: action.fileNames,
      files: action.files,
      skip: false,
    };
  }
  if (action.type === "ERROR") {
    return {
      ...initialUploadState,
      isError: action.isError,
      error: action.error,
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
      ...state,
      data: { urls: [...state.data.urls, action.url] },
    };
  }
  if (action.type === "UPLOAD_SUCCESS") {
    return {};
  }
  return initialUploadState;
};

const UseMultipleFileUpload = () => {
  const [uploadState, dispatchUpload] = useReducer(
    uploadReducer,
    initialUploadState
  );
  const {
    data: uploadUrlData,
    isSuccess: uploadUrlIsSuccess,
    error: uploadUrlError,
    refetch: uploadRefetch,
  } = useGetS3UploadUrlQuery({}, { skip: true });

  const uploadFiles = useCallback(({ files, format }) => {
    const fileNames = files.map((file) => file.name);
    dispatchUpload({ type: "GET_URL", fileNames, files });
  }, []);

  useEffect(() => {
    if (
      uploadState.files?.length &&
      uploadState.fileNames?.length &&
      uploadState.files.length === uploadState.fileNames.length
    ) {
      console.log(uploadState.fileNames);
      uploadState.fileNames.forEach(async (fileName) => {
        await uploadRefetch({ fileName }, { skip: false });
      });
    } else if (
      uploadState.files?.length &&
      uploadState.fileNames?.length &&
      uploadState.files.length !== uploadState.fileNames.length
    ) {
      dispatchUpload({
        type: "ERROR",
        error: "Something went wrong!, please try again",
        isError: true,
      });
    }
  }, [uploadState.files, uploadState.fileNames, uploadRefetch]);

  // useEffect(() => {
  //   if (uploadUrlError) {
  //     dispatchUpload({
  //       type: "GET_URL_ERROR",
  //       error: "Something went wrong!, please try again",
  //       isError: true,
  //     });
  //   }
  //   if (uploadUrlData && uploadUrlIsSuccess) {
  //     const { fields, url } = uploadUrlData.data;
  //     const fileDetails = new FormData();
  //     for (const key in fields) {
  //       if (Object.hasOwnProperty.call(fields, key)) {
  //         fileDetails.append(key, fields[key]);
  //       }
  //     }
  //     fileDetails.append("file", uploadState.file);
  //     fetch(url, { method: "POST", body: fileDetails, mode: "no-cors" })
  //       .then(() => {
  //         dispatchUpload({
  //           type: "UPLOAD_SUCCESS",
  //           url: `${url}/${fields.key}`,
  //         });
  //       })
  //       .catch(() => {
  //         dispatchUpload({
  //           type: "UPLOAD_ERROR",
  //           error: "Something went wrong!, please try again",
  //           isError: true,
  //         });
  //       });
  //   }
  // }, [uploadUrlData, uploadUrlIsSuccess, uploadUrlError, uploadState]);

  return [uploadFiles, uploadState];
};

export default UseMultipleFileUpload;
