import { Box, Modal } from '@mui/material';
import tableLoader from "../../assets/gif/loader.gif";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  p: 4,
};

function PageLoader() {

  return (
      <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <div className="d-flex justify-content-center">
                <img src={tableLoader} width={90} className="mt-5"/>
            </div>
            <h4 className="page-heading w-auto ps-0 text-center">Loading</h4>
            <h6 className="mt-3 mb-1 text-center" style={{color: "#414C65"}}>
                Give me few seconds to load
            </h6>
            <h6 className="mb-5 text-center" style={{color: "#414C65"}}>
                your space station.
            </h6>
        </Box>
      </Modal>
  );
}

export default PageLoader;