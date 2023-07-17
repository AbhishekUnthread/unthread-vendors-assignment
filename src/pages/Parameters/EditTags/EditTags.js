import React, { useEffect, useState } from "react";
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
import { Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, OutlinedInput, Slide, Tooltip, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useCreateTagMutation, useEditTagMutation, useGetAllTagsQuery } from "../../../features/parameters/tagsManager/tagsManagerApiSlice";
import { updateTagId } from "../../../features/parameters/tagsManager/tagsManagerSlice";
import { showError, showSuccess } from "../../../features/snackbar/snackbarAction";
import SaveFooter, { SaveFooterSecondary } from "../../../components/SaveFooter/SaveFooter";
import * as Yup from 'yup';
import DiscardModal, { DiscardModalSecondary } from "../../../components/Discard/DiscardModal";

    // ? DIALOG TRANSITION STARTS HERE
    const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });
    // ? DIALOG TRANSITION ENDS HERE

    const validationSchema = Yup.object().shape({
      tagName: Yup.string().max(50, 'Name cannot exceed 50 characters').required('Name is required'),
    });


const EditTags = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tagName,setTagName] = React.useState("");
  const tagId = useSelector((state)=>state.tags.tagId);
  const [tagStatus, setTagStatus] = React.useState("active")
  const [tagNotes,setTagNotes] = React.useState("")
  const [tagDuplicateName, setTagDuplicateName] = React.useState("");
  const [duplicateDescription, setDuplicateDescription] = React.useState(false);
  const [hideFooter, setHideFooter] = React.useState(false);
  const [tagNameError, setTagNameError] = React.useState('');
  const [showDiscardModal, setShowDiscardModal] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  const [initialName, setInitailName] = useState("");
  const [initialNotes, setInitailNotes] = useState("");
  const [initialFilter, setInitailFilter] = useState(false);


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
        dispatch(showSuccess({ message: "Tag updated successfully" }));
      }

      if(tagsIsSuccess && tagId !== "")
      {
        setTagName(tagsData.data.data[0].name)
        setInitailName(tagsData.data.data[0].name)
        setTagNotes(tagsData.data.data[0].notes)
        setInitailNotes(tagsData.data.data[0].notes)
        // setTagStatus(tagsData.data.data[0].status)
        setChecked(tagsData.data.data[0].showFilter)
        setInitailFilter(tagsData.data.data[0].showFilter)
      }
    }, [tagsIsSuccess,editTagIsSuccess])


    const handleNameChange = (event) => {
      const newName = event.target.value;
      // setHideFooter(true);
      validationSchema
      .validate({ tagName: newName })
      .then(() => {
        setTagName(newName);
        setTagNameError('');
      })
      .catch((error) => {
        setTagName(newName);
        setTagNameError(error.message);
      });
    };
    const tagStatusChange=(event,tagStatus)=>{
      setTagStatus(tagStatus);
    }   
    const tagNotesChange=(event)=>{
      setTagNotes(event.target.value);
      // setHideFooter(true);
    }
    const handleFilterChange=(event)=>{
      setChecked(event.target.checked);
      // setHideFooter(true);
    }

    const handleSubmit = () => {
      if(!tagNameError){
      if(tagId !== "")
      {
        editTag({
         id: tagId, 
         details: {
           showFilter: checked, 
           name: tagName.trim(), 
           notes: tagNotes?tagNotes.trim():tagNotes, 
          //  status: tagStatus?tagStatus:"active" 
         }
       }).unwrap().then(() => {
         navigate("/parameters/tagsManager"); 
       })
       .catch((editTagError)=>dispatch(showError( { message: editTagError?.data?.message } )));
      }
      else
      {
        createTag({
          showFilter: checked, 
          name: tagName.trim(), 
          notes: tagNotes?tagNotes.trim():tagNotes, 
          // status: tagStatus?tagStatus:"active" 
       }).unwrap().then(() => {
         navigate("/parameters/tagsManager"); 
       });
      }
     }};

     const backHandler = () => {
      navigate(-1);
      // setShowDiscardModal(true);
      // navigate("/parameters/tagsManager");
    };
    // const toggleDiscardModal = () => {
    //   setShowDiscardModal(false);;
    // };

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

       useEffect(() => {
        setHideFooter(
          tagName.trim() !== initialName ||
          (tagNotes !== initialNotes && tagNotes !== "") ||
          checked !== initialFilter
        );
        setShowDiscardModal(
          tagName.trim() !== initialName ||
          (tagNotes !== initialNotes && tagNotes !== "") ||
          checked !== initialFilter
        );
      }, [tagName, tagNotes, checked]);

  return (
    <div className="page container-fluid position-relative user-group">
      <div className="row justify-content-between">
        <div className="d-flex align-items-center w-auto ps-0">
            <img
              src={arrowLeft}
              alt="arrowLeft"
              width={9}
              className="c-pointer"
              onClick={backHandler}
            />
          <h5 className="page-heading ms-2 ps-1">{tagName}</h5>
        </div>

        <div className="d-flex align-items-center w-auto pe-0">
          {/* <button className="button-transparent me-1 py-2 px-3" onClick={handleDuplicate}>
            <p className="text-lightBlue">Duplicate</p>
          </button> */}
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
              {tagNameError &&
              <>
                <Typography variant="caption" color="error">
                  {tagNameError}
                </Typography>
              <br />
              </>
              }
              <div className="small">
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
                        className=" px-0 me-1"
                 />
                 <button className="reset link" sx={{color:"#658DED"}}>(manage)</button>
                </div>
            </div>
          </div>

          <div className="bg-black-9 border-grey-5 rounded-8 p-3 row features mt-4">
            <div className="d-flex justify-content-between mb-2 px-0">
              <h6 className="text-lightBlue me-auto text-lightBlue col-auto ps-0 fw-500">
                Add Products
              </h6>
            </div>
            <AddProducts />
          </div>
        </div>
        <div className="col-lg-3 pe-0 ps-0 ps-lg-3">
          {/* <StatusBox  value={tagStatus} 
           headingName={"Tag Status"}
           handleProductStatus={tagStatusChange}  
           toggleData={['active','archived']}
            /> */}
          <NotesBox name="note" value={tagNotes} onChange={tagNotesChange} />

        </div>
      </div>
      {/* { hideFooter && <div className="row create-buttons pt-5 justify-content-between" style={{ width: '104%' }} >
          <SaveFooter handleSubmit={handleSubmit} />          
      </div>
           } */}
          <SaveFooterSecondary
          show={hideFooter}
          onDiscard={backHandler}
          isLoading={editTagIsLoading}
          handleSubmit={handleSubmit}
        />
              {/* <DiscardModal 
              showDiscardModal={showDiscardModal}   
              toggleDiscardModal={toggleDiscardModal}
              /> */}
              <DiscardModalSecondary
        when={showDiscardModal}
        message="vendors tab"
      />

    </div>
  );
};

export default EditTags;
