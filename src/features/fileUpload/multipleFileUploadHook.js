import { useCallback, useReducer, useEffect } from "react";

import { useUploadUrlMutation } from "./fileUploadApiSlice";

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
};

const uploadReducer = (state, action) => {
  if (action.type === "GET_URL") {
    return {
      ...initialUploadState,
      isLoading: true,
      fileNames: action.fileNames,
      files: action.files,
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
  if (action.type === "UPLOAD_SUCCESS_ALL") {
    return {
      ...initialUploadState,
      data: { urls: [...state.data.urls] },
      isSuccess: true,
    };
  }
  return initialUploadState;
};

const UseMultipleFileUpload = () => {
  const [uploadState, dispatchUpload] = useReducer(
    uploadReducer,
    initialUploadState
  );

  const [uploadUrl] = useUploadUrlMutation();

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
      const uploadPromises = uploadState.fileNames.map((fileName) => {
        return uploadUrl({ fileName }).unwrap();
      });
      Promise.allSettled(uploadPromises)
        .then((data) => {
          Promise.allSettled(
            data.map((item, index) => {
              const { fields, url } = item.value;
              const fileDetails = new FormData();
              for (const key in fields) {
                if (Object.hasOwnProperty.call(fields, key)) {
                  fileDetails.append(key, fields[key]);
                }
              }
              fileDetails.append("file", uploadState.files[index]);
              return new Promise((resolve, reject) => {
                fetch(url, {
                  method: "POST",
                  body: fileDetails,
                  mode: "no-cors",
                })
                  .then(() => {
                    dispatchUpload({
                      type: "UPLOAD_SUCCESS",
                      url: `${url}/${fields.key}`,
                    });
                    resolve();
                  })
                  .catch(() => reject());
              });
            })
          )
            .then(() => {
              dispatchUpload({
                type: "UPLOAD_SUCCESS_ALL",
              });
            })
            .catch(() => {
              dispatchUpload({
                type: "UPLOAD_ERROR",
                error: "Something went wrong!, please try again",
                isError: true,
              });
            });
        })
        .catch(() => {
          dispatchUpload({
            type: "GET_URL_ERROR",
            error: "Something went wrong!, please try again",
            isError: true,
          });
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
  }, [uploadState.files, uploadState.fileNames, uploadUrl]);

  return [uploadFiles, uploadState];
};

export default UseMultipleFileUpload;
