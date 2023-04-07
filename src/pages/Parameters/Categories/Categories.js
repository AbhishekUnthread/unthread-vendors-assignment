import React from 'react';
import '../../Products/AllProducts/AllProducts.scss';
// ! COMPONENT IMPORTS
import CategoriesTable from './CategoriesTable';
import TableSearch from '../../../components/TableSearch/TableSearch';
import ViewTutorial from '../../../components/ViewTutorial/ViewTutorial';
import ViewLogsDrawer from '../../../components/ViewLogsDrawer/ViewLogsDrawer';
import ExportDialog from '../../../components/ExportDialog/ExportDialog';
import ImportSecondDialog from '../../../components/ImportSecondDialog/ImportSecondDialog';
import TabPanel from '../../../components/TabPanel/TabPanel';
// ! IMAGES IMPORTS
import cancel from '../../../assets/icons/cancel.svg';
import parameters from '../../../assets/icons/sidenav/parameters.svg';
// ! MATERIAL IMPORTS
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  OutlinedInput,
  Paper,
  Popover,
  Slide,
  Tab,
  Tabs,
  Chip,
  Select,
  MenuItem,
} from '@mui/material';

import Messages from '../../../components/snackbar/snackbar.js';
import { callGetApi, createCategory, createSubCategory } from '../services/parameter.service';

// ? DIALOG TRANSITION STARTS HERE
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ? DIALOG TRANSITION ENDS HERE

const Categories = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  // ? POPOVERS STARTS HERE

  // * CREATE CATEGORY POPOVERS STARTS
  const [anchorCreateCategoryEl, setAnchorCreateCategoryEl] =
    React.useState(null);

  const handleCreateCategoryClick = (event) => {
    setAnchorCreateCategoryEl(event.currentTarget);
    setCategoryName('')
    setsubCategoryName('')

  };

  const handleCreateCategoryClose = () => {
    setAnchorCreateCategoryEl(null);
  };

  const openCreateCategory = Boolean(anchorCreateCategoryEl);
  const idCreateCategory = openCreateCategory ? 'simple-popover' : undefined;
  // * CREATE CATEGORY POPOVERS ENDS

  // ? POPOVERS ENDS HERE

  // ? CATEGORIES DIALOG STARTS HERE
  const [openCreateCategories, setOpenCreateCategories] = React.useState(false);

  const handleCreateCategories = () => {
    setAnchorCreateCategoryEl(null);
    setOpenCreateCategories(true);
  };

  const handleCreateCategoriesClose = () => {
    setOpenCreateCategories(false);
  };
  // ? CATEGORIES DIALOG ENDS HERE

  // ? SUB CATEGORIES DIALOG STARTS HERE
  const [openCreateSubCategories, setOpenCreateSubCategories] =
    React.useState(false);

  const handleCreateSubCategories = () => {
    setAnchorCreateCategoryEl(null);
    setOpenCreateSubCategories(true);
  };

  const handleCreateSubCategoriesClose = () => {
    setOpenCreateSubCategories(false);
  };
  // ? SUB CATEGORIES DIALOG ENDS HERE

  // ? CATEGORY SELECT STARTS HERE
  const [category, setCategory] = React.useState('');

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  // ? CATEGORY SELECT ENDS HERE

  //Aman

  let [message, setMessage] = React.useState('');
  const [allCategory, setAllCategory] = React.useState([]);
  const [allSubCategory, setAllSubCategory] = React.useState([]);

  const [categoryName, setCategoryName] = React.useState('');
  const [subcategoryName, setsubCategoryName] = React.useState('');


  React.useEffect(()=>{
    getcategories();
    getsubcategories()
  },[])

  let getcategories=()=>{
   callGetApi('/api/product-categories').then((res) => {
     setAllCategory(res.data)
  })
  .catch((err) => {
    setMessage(err);
  });
  }

  let getsubcategories=()=>{
    callGetApi('/api/product-sub-categories').then((res) => {
      setAllSubCategory(res.data)
    })
    .catch((err) => {
      setMessage(err);
    });
  }

  

  const createUpdateCategory = () => {
    if (!categoryName) {
      setMessage('Please enter categoryName field');
      return;
    }

    let request = {
      data: {
        name: categoryName,
        type: 'Category',
        status: 'Active',
      },
    };

    createCategory(request)
      .then((res) => {
        if (res?.error?.message) {
          setMessage(res?.error?.message);
          return;
        }
        getcategories();
        getsubcategories()
        handleCreateCategoriesClose();
      })
      .catch((err) => {
        setMessage(err);
      });
  };

  const addupdatesubcategory=()=>{
    if (!subcategoryName || !categoryName) {
      setMessage('Please enter all fields');
      return;
    }

    let request = {
      data: {
        name: subcategoryName,
        type: 'Sub Category',
        status: 'Active',
        "product_category":categoryName
      },
    };

    createSubCategory(request)
      .then((res) => {
        if (res?.error?.message) {
          setMessage(res?.error?.message);
          return;
        }
        getcategories();
        getsubcategories()
        handleCreateSubCategoriesClose();
      })
      .catch((err) => {
        setMessage(err);
      });
  }

  return (
    <div className="container-fluid page">
      <div className="row justify-content-between align-items-center">
        <h4 className="page-heading w-auto ps-0">Categories</h4>
        <div className="d-flex align-items-center w-auto pe-0">
          <ViewTutorial />
          <ViewLogsDrawer
            headingName={'Parameters / Categories'}
            icon={parameters}
          />
          <ExportDialog dialogName={'Categories'} />
          <ImportSecondDialog dialogName={'Categories'} />
          <button
            to="/parameters/createFieldSets"
            className="button-gradient py-2 px-4 c-pointer"
            onClick={handleCreateCategoryClick}
          >
            <p>+ Create</p>
          </button>

          <Popover
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            id={idCreateCategory}
            open={openCreateCategory}
            anchorEl={anchorCreateCategoryEl}
            onClose={handleCreateCategoryClose}
          >
            <div className="py-2 px-1">
              <small
                className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back"
                onClick={handleCreateCategories}
              >
                Create Category
              </small>
              <small
                className="p-2 rounded-3 text-lightBlue c-pointer font2 d-block hover-back"
                onClick={handleCreateSubCategories}
              >
                Create Sub-Category
              </small>
            </div>
          </Popover>

          <Dialog
            open={openCreateCategories}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCreateCategoriesClose}
            aria-describedby="alert-dialog-slide-description"
            maxWidth="sm"
            fullWidth={true}
          >
            <DialogTitle>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column ">
                  <h5 className="text-lightBlue fw-500">Create Categories</h5>

                  <small className="text-grey-6 mt-1 d-block">
                    ⓘ Some Dummy Content to explain
                  </small>
                </div>
                <img
                  src={cancel}
                  alt="cancel"
                  width={30}
                  onClick={handleCreateCategoriesClose}
                  className="c-pointer"
                />
              </div>
            </DialogTitle>
            <hr className="hr-grey-6 my-0" />
            <DialogContent className="py-3 px-4">
              <p className="text-lightBlue mb-2">Category Name</p>
              <FormControl className="col-7 px-0">
                <OutlinedInput
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Enter Category Name"
                  size="small"
                />
              </FormControl>
              {/* <div className="d-flex">
                <Chip
                  label="Silver Products"
                  onDelete={handleDelete}
                  size="small"
                  className="mt-3 me-2"
                />
                <Chip
                  label="Diamond Products"
                  onDelete={handleDelete}
                  className="me-2 mt-3"
                  size="small"
                />
              </div> */}
            </DialogContent>
            <hr className="hr-grey-6 my-0" />
            <DialogActions className="d-flex justify-content-between px-4 py-3">
              <button
                className="button-grey py-2 px-5"
                onClick={handleCreateCategoriesClose}
              >
                <p className="text-lightBlue">Cancel</p>
              </button>
              <button
                className="button-gradient py-2 px-5"
                onClick={createUpdateCategory}
              >
                <p>Save</p>
              </button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openCreateSubCategories}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCreateSubCategoriesClose}
            aria-describedby="alert-dialog-slide-description"
            maxWidth="sm"
            fullWidth={true}
          >
            <DialogTitle>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column ">
                  <h5 className="text-lightBlue fw-500">
                    Create Sub Categories
                  </h5>

                  <small className="text-grey-6 mt-1 d-block">
                    ⓘ Some Dummy Content to explain
                  </small>
                </div>
                <img
                  src={cancel}
                  alt="cancel"
                  width={30}
                  onClick={handleCreateSubCategoriesClose}
                  className="c-pointer"
                />
              </div>
            </DialogTitle>
            <hr className="hr-grey-6 my-0" />

            <DialogContent className="py-3 px-4">
              <p className="text-lightBlue mb-2">Select Category</p>
              <FormControl
                //   sx={{ m: 0, minWidth: 120, width: "100%" }}
                size="small"
                className="col-md-7"
              >
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={category}
                  onChange={handleCategoryChange}
                  size="small"
                >
                  {allCategory.map((data,index)=>{
                    return <MenuItem key={index}
                    onClick={(e) => setCategoryName(+e.currentTarget.dataset.value)}
                    value={data.id} sx={{ fontSize: 13, color: '#5c6d8e' }}>
                     {data.attributes.name}
                   </MenuItem>
                  })}
                 
                 
                </Select>
              </FormControl>
              <p className="text-lightBlue mb-2 mt-3">Sub Category</p>
              <FormControl className="col-md-7 px-0">
                <OutlinedInput
                  placeholder="Enter Sub Category Name"
                  size="small"
                  value={subcategoryName}
                  onChange={(e) => setsubCategoryName(e.target.value)}
                />
              </FormControl>
              {/* <div className="d-flex">
                <Chip
                  label="Rings"
                  onDelete={handleDelete}
                  size="small"
                  className="mt-3 me-2"
                />
                <Chip
                  label="Bangles"
                  onDelete={handleDelete}
                  className="me-2 mt-3"
                  size="small"
                />
                <Chip
                  label="Necklace"
                  onDelete={handleDelete}
                  className="me-2 mt-3"
                  size="small"
                />
                <Chip
                  label="Necklace Sets"
                  onDelete={handleDelete}
                  className="me-2 mt-3"
                  size="small"
                />
              </div> */}
            </DialogContent>
            <hr className="hr-grey-6 my-0" />
            <DialogActions className="d-flex justify-content-between px-4 py-3">
              <button
                className="button-grey py-2 px-5"
                onClick={handleCreateSubCategoriesClose}
              >
                <p className="text-lightBlue">Cancel</p>
              </button>
              <button
                className="button-gradient py-2 px-5"
                onClick={addupdatesubcategory}
              >
                <p>Save</p>
              </button>
            </DialogActions>
          </Dialog>
        </div>
      </div>

      <div className="row mt-4">
        <Paper
          sx={{ width: '100%', mb: 2, mt: 0, p: 0 }}
          className="border-grey-5 bg-black-15"
        >
          <Box
            sx={{ width: '100%' }}
            className="d-flex justify-content-between tabs-header-box"
          >
            {/* variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile */}
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="scrollable force tabs example"
              className="tabs"
            >
              <Tab label="All" className="tabs-head" />
              <Tab label="Categories" className="tabs-head" />
              <Tab label="Sub Categories" className="tabs-head" />
            </Tabs>
          </Box>
          <div className="d-flex align-items-center mt-3 mb-3 px-2 justify-content-between">
            <TableSearch  />
          </div>
          <TabPanel value={value} index={0}>
            <CategoriesTable list={[...allCategory,...allSubCategory]}/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CategoriesTable list={allCategory}/>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <CategoriesTable list={allSubCategory} />
          </TabPanel>
        </Paper>
      </div>

      <Messages messageLine={message} setMessage={setMessage}></Messages>
    </div>
  );
};

export default Categories;
