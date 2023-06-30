import React, { useEffect } from "react";
import "./EditTags.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
// ! COMPONENT IMPORTS
import NotesBox from "../../../components/NotesBox/NotesBox";
import StatusBox from "../../../components/StatusBox/StatusBox";
import AddProducts from "../../../components/AddProducts/AddProducts";
// ! IMAGES IMPORTS
import arrowLeft from "../../../assets/icons/arrowLeft.svg";
import info from "../../../assets/icons/info.svg";
import paginationRight from "../../../assets/icons/paginationRight.svg";
import paginationLeft from "../../../assets/icons/paginationLeft.svg";
import cancel from "../../../assets/icons/cancel.svg";

// ! MATERIAL IMPORTS
import { Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, OutlinedInput, Slide, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useCreateTagMutation, useEditTagMutation, useGetAllTagsQuery } from "../../../features/parameters/tagsManager/tagsManagerApiSlice";
import { updateTagId } from "../../../features/parameters/tagsManager/tagsManagerSlice";
import { showSuccess } from "../../../features/snackbar/snackbarAction";

    // ? DIALOG TRANSITION STARTS HERE
    const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });
    // ? DIALOG TRANSITION ENDS HERE


const EditTags = () => {
  const [tagName,setTagName] = React.useState("");
  const tagId = useSelector((state)=>state.tags.tagId);
  const [tagStatus, setTagStatus] = React.useState("active")
  const [tagNotes,setTagNotes] = React.useState("")
  const [tagDuplicateName, setTagDuplicateName] = React.useState("");
  const [duplicateDescription, setDuplicateDescription] = React.useState(false);
  const navigate = useNavigate();
  const [checked, setChecked] = React.useState(false);
  const dispatch = useDispatch();
  // const [showFilter, setShowFilter] = React.useState(false);

  const{
    data: tagsData,
    isLoading: tagsIsLoading, 
    isSuccess: tagsIsSuccess, 
    error: tagsError, 
    }=useGetAllTagsQuery({createdAt:-1, id:tagId});

    const[editTag,{
      data: editData,
      isLoading: editTagIsLoading,
      isSuccess: editTagIsSuccess,
      error: editTagError, 
    }]=useEditTagMutation();

    const[createTag,
      {
        isLoading: createTagsIsLoading, 
        isSuccess: createTagsIsSuccess, 
        error:createTagsError, 
      }]= useCreateTagMutation();

    useEffect(() => {

      if(editTagIsSuccess)
      {
        dispatch(showSuccess({ message: "Tag updtaed successfully" }));
      }

      if(tagsIsSuccess && tagId !== "")
      {
        setTagName(tagsData.data.data[0].name)
        setTagNotes(tagsData.data.data[0].notes)
        // setTagStatus(tagsData.data.data[0].status)
        setChecked(tagsData.data.data[0].showFilter)
      }
    }, [tagsIsSuccess,editTagIsSuccess])


    const handleNameChange = (event) => {
      setTagName(event.target.value); // Updating the vendor name based on the input value
    };
    const tagStatusChange=(event,tagStatus)=>{
      setTagStatus(tagStatus);
    }   
    const tagNotesChange=(event)=>{
      setTagNotes(event.target.value);
    }
    const handleFilterChange=(event)=>{
      setChecked(event.target.checked);
    }

    const handleSubmit = () => {
      if(tagId !== "")
      {
        editTag({
         id: tagId, 
         details: {
           showFilter: checked, 
           name: tagName, 
           notes: tagNotes, 
          //  status: tagStatus?tagStatus:"active" 
         }
       }).unwrap().then(() => {
         navigate("/parameters/tagsManager"); 
       });
      }
      else
      {
        createTag({
          showFilter: checked, 
          name: tagName, 
          notes: tagNotes, 
          // status: tagStatus?tagStatus:"active" 
       }).unwrap().then(() => {
         navigate("/parameters/tagsManager"); 
       });
      }
     };

     const handleSubmitAndAddAnother = () => {
      if(tagId !== "")
      {
        editTag({
          id: tagId, 
          details: {
            showFilter: checked, 
            name: tagName, 
            notes: tagNotes, 
            status: tagStatus?tagStatus:"active" 
          }
        }).unwrap().then(() => {
          navigate("/parameters/tagsManager/edit");             
        });
      }
      else{
        createTag({
          showFilter: checked, 
          name: tagName, 
          notes: tagNotes, 
          // status: tagStatus?tagStatus:"active" 
        }).unwrap().then(() => {
          navigate("/parameters/tagsManager/edit"); 
        });
      }
     
      setTagName(''); 
      dispatch(updateTagId(""));
    };

       // ? DUPLICATE VENDOR DIALOG STARTS HERE

       const [openDuplicateTag, setOpenDuplicateTag] = React.useState(false);

       const handleDuplicate = () => {
         setOpenDuplicateTag(true);
       };
     
       const handleDuplicateTagClose = () => {
         setOpenDuplicateTag(false);
       };
     
       const handleDuplicateNameChange = (event) => {
         setTagDuplicateName(event.target.value);
       };
     
       const scheduleDuplicateTag = () => {
         const TagData = {
           name: tagDuplicateName,
           showFilter:checked ? checked : true ,
          //  status: tagStatus ? tagStatus : "active",
         };
     
         if (duplicateDescription === true) {
          TagData.notes = tagNotes;
         }
     
         createTag(TagData)
           .unwrap()
           .then(() => {
             setOpenDuplicateTag(false);
             navigate("/parameters/tagsManager")
           });
       };
       // ? DUPLICATE VENDOR DIALOG ENDS HERE

  return (
    <div className="page container-fluid position-relative user-group">
      <div className="row justify-content-between">
        <div className="d-flex align-items-center w-auto ps-0">
          <Link to="/parameters/tagsManager" className="d-flex">
            <img
              src={arrowLeft}
              alt="arrowLeft"
              width={9}
              className="c-pointer"
            />
          </Link>
          <h5 className="page-heading ms-2 ps-1">{tagName}</h5>
        </div>

        <div className="d-flex align-items-center w-auto pe-0">
          <button className="button-transparent me-1 py-2 px-3" onClick={handleDuplicate}>
            <p className="text-lightBlue">Duplicate</p>
          </button>
          {/* <button className="button-transparent me-1 py-2 px-3">
            <p className="text-lightBlue">Archive</p>
          </button> */}
          <img
            src={paginationLeft}
            alt="paginationLeft"
            className="c-pointer"
            width={30}
          />
          <img
            src={paginationRight}
            alt="paginationRight"
            className="c-pointer"
            width={30}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-9 mt-3">
          <div className="bg-black-15 border-grey-5 rounded-8 p-3 row attributes">
            <div className="col-md-12 px-0">
              <div className="d-flex mb-1">
                <p className="text-lightBlue me-2">Tag Name</p>
                <Tooltip title="Lorem ipsum" placement="top">
                  <img
                    src={info}
                    alt="info"
                    className=" c-pointer"
                    width={13.5}
                  />
                </Tooltip>
              </div>
              <FormControl className="w-100 px-0">
                <OutlinedInput placeholder="Enter Tag Name" size="small" value={tagName} onChange={handleNameChange}/>
              </FormControl>
              <FormControlLabel
                        control={
                          <Checkbox
                            name="showFilter"
                            checked={checked}
                            onChange={handleFilterChange}
                            inputProps={{ "aria-label": "controlled" }}
                            size="small"
                            style={{
                              color: "#5C6D8E",
                              marginRight: 0,
                              width: "auto",
                            }}
                          />
                        }
                        label="Include in Filters"
                        sx={{
                          "& .MuiTypography-root": {
                            fontSize: "0.875rem",
                            color: "#c8d8ff",
                          },
                        }}
                        className=" px-0"
                 />
            </div>
          </div>

          <div className="bg-black-9 border-grey-5 rounded-8 p-3 row features">
            <div className="d-flex justify-content-between mb-2 px-0">
              <h6 className="text-lightBlue me-auto text-lightBlue col-auto ps-0 fw-500">
                Add Products
              </h6>
            </div>
            <AddProducts />
          </div>
        </div>
        <div className="col-lg-3 mt-3 pe-0 ps-0 ps-lg-3">
          {/* <StatusBox  value={tagStatus} 
           headingName={"Tag Status"}
           handleProductStatus={tagStatusChange}
           toggleData={['active','archived']}
            /> */}
          <NotesBox name="note" value={tagNotes} onChange={tagNotesChange} />

        </div>
      </div>
      <div className="row create-buttons pt-5 pb-3 justify-content-between">
        <div className="d-flex w-auto px-0">
          <Link to="/parameters/tagsManager" className="button-red-outline py-2 px-4">
            <p>Discard</p>
          </Link>

          {/* <Link
            to="/parameters/tagsManager"
            className="button-lightBlue-outline py-2 px-4 ms-3"
          >
            <p>Save as Draft</p>
          </Link> */}
        </div>
        <div className="d-flex w-auto px-0">
          <Link
            to="#"
            className="button-lightBlue-outline py-2 px-4"
            onClick={handleSubmitAndAddAnother}
          >
            <p>Save & Add Another</p>
          </Link>
          <Link
            to="#"
            className="button-gradient ms-3 py-2 px-4 w-auto"
            onClick={handleSubmit}
          >
            <p>Save</p>
          </Link>
        </div>
      </div>
      <Dialog
        open={openDuplicateTag}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDuplicateTagClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="text-lightBlue fw-500">Duplicate Tag</h5>
            <img
              src={cancel}
              alt="cancel"
              width={30}
              onClick={handleDuplicateTagClose}
              className="c-pointer"
            />
          </div>
          <Tooltip title="Lorem ipsum" placement="top">
            <img
                src={info}
                alt="info"
                className=" c-pointer"
                width={13.5}
            />
          </Tooltip>
          <small className="mt-1 text-grey-6 font1">
            These banner will be see no PLP page as promotional banner
          </small>
        </DialogTitle>
        <hr className="hr-grey-6 my-0" />
        <DialogContent className="py-3 px-4 schedule-product">
          <div className="d-flex mb-1">
            <p className="text-lightBlue me-2">Tag Name</p>
          </div>
          <FormControl className="w-100 px-0">
            <OutlinedInput
              placeholder="Mirosa Collection_copy"
              size="small"
              name="title"
              value={tagDuplicateName}
              onChange={handleDuplicateNameChange}
            />
          </FormControl>
          <hr className="hr-grey-6 my-0" />
          <div className="d-flex mb-1 mt-3">
            <p className="text-lightBlue me-2">What to Include in this Duplicate</p>
          </div>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  name="filter"
                  checked={duplicateDescription}
                  onChange={(e)=>setDuplicateDescription(e.target.checked)}
                  inputProps={{ "aria-label": "controlled" }}
                  size="small"
                  style={{
                    color: "#5C6D8E",
                    marginRight: 0,
                  }}
                />
              }
              label="Notes"
              sx={{
                "& .MuiTypography-root": {
                  fontSize: 13,
                  color: "#99a6c0",
                },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="filter"
                  inputProps={{ "aria-label": "controlled" }}
                  size="small"
                  style={{
                    color: "#5C6D8E",
                    marginRight: 0,
                  }}
                />
              }
              label="Products"
              sx={{
                "& .MuiTypography-root": {
                  fontSize: 13,
                  color: "#99a6c0",
                },
              }}
            />
          </FormGroup>
        </DialogContent>
        <hr className="hr-grey-6 my-0" />
        <DialogActions className="d-flex flex-column justify-content-start px-4 py-3">
          <div className="d-flex justify-content-between w-100">
            <button
              className="button-grey py-2 px-5"
              onClick={handleDuplicateTagClose}
            >
              <p className="text-lightBlue">Cancel</p>
            </button>
            <button
              className="button-gradient py-2 px-5"
              onClick={scheduleDuplicateTag}
            >
              <p>Save</p>
            </button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditTags;
