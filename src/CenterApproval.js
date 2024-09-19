import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tooltip,
  Grid,
  Divider,
  Box,
  useTheme,
  styled,
} from '@mui/material';
import {
  Dashboard,
  Visibility,
  Download,
  PictureAsPdf,
} from '@mui/icons-material';
import Swal from 'sweetalert2';
import homebackground from './homebackground.avif';
import SuperAdminSidebar from './SuperAdminSidebar';

// Styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.primary,
  borderBottom: `1px solid ${theme.palette.divider}`,
  textAlign: 'center',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f0f8ff',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  backgroundColor: '#009688',
  color: 'white',
  '&:hover': {
    backgroundColor: '#00796b',
  },
}));

const CenteredBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
}));

const DialogTitleStyled = styled(DialogTitle)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  fontWeight: 'bold',
  backgroundColor: '#03045e',
  color: 'white',
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const drawerWidth = 240;

// New Styled Components for Buttons
const ApprovedButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#4caf50',
  color: 'white',
  '&:hover': {
    backgroundColor: '#388e3c',
  },
  marginRight: theme.spacing(2),
}));

const RejectedButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#f44336',
  color: 'white',
  '&:hover': {
    backgroundColor: '#d32f2f',
  },
}));

const CenterApproval = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);
  const [serviceCenters, setServiceCenters] = useState([]);
  const [error, setError] = useState(null);
  const [openViewFiles, setOpenViewFiles] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [fileUrls, setFileUrls] = useState({});
  const [viewFile, setViewFile] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const adminID = queryParams.get('adminID');
  const theme = useTheme();

  useEffect(() => {
    axios
      .get('http://localhost:8686/servicecenters/getPendingRequestList')
      .then((response) => {
        setServiceCenters(response.data);
      })
      .catch((error) => {
        console.error('Error fetching service centers:', error);
        Swal.fire({
          title: 'Error',
          text: 'There was an error fetching the pending requests!',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
  }, []);

  const handleOpenViewFiles = (center) => {
    setSelectedCenter(center);
    setFileUrls({
      serviceCenterImage: center.serviceCenterImage
        ? `data:image/jpeg;base64,${center.serviceCenterImage}`
        : '',
      businessRegistrationCertificate: center.businessRegistrationCertificate
        ? `data:application/pdf;base64,${center.businessRegistrationCertificate}`
        : '',
      insuranceDocument: center.insuranceDocument
        ? `data:application/pdf;base64,${center.insuranceDocument}`
        : '',
      ownerIdentityProof: center.ownerIdentityProof
        ? `data:image/jpeg;base64,${center.ownerIdentityProof}`
        : '',
    });
    setOpenViewFiles(true);
  };

  const handleClose = () => {
    setOpenViewFiles(false);
    setSelectedCenter(null);
    setFileUrls({});
    setViewFile(null);
  };

  const handleApprove = async (serviceCenterID) => {
    try {
      const updatedCenter = serviceCenters.find(center => center.serviceCenterID === serviceCenterID);
      if (updatedCenter) {
        updatedCenter.approvalDate = new Date().toISOString();
        await axios.put(
          `http://localhost:8686/servicecenters/updaterequest/${serviceCenterID}`,
          updatedCenter
        );

        setServiceCenters(
          serviceCenters.map(center =>
            center.serviceCenterID === serviceCenterID ? updatedCenter : center
          )
        );

        Swal.fire({
          title: 'Request Approved',
          text: 'An approval email has been sent to the concerned person.',
          icon: 'success',
          confirmButtonText: 'OK',
        });

        navigate('/approvedrequest');
      }
    } catch (error) {
      console.error('Error approving the request!', error);
      Swal.fire({
        title: 'Error',
        text: 'There was an error approving the request!',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleReject = async (serviceCenterID) => {
    try {
      const response = await axios.put(
        `http://localhost:8686/servicecenters/rejectrequest/${serviceCenterID}`
      );
      if (response.data) {
        setServiceCenters(
          serviceCenters.filter((req) => req.serviceCenterID !== serviceCenterID)
        );
        Swal.fire({
          title: 'Request Rejected',
          text: 'A rejection email has been sent to the concerned person.',
          icon: 'warning',
          confirmButtonText: 'OK',
        });
        navigate('/rejectedrequest');
      }
    } catch (error) {
      console.error('Error rejecting the request!', error);
      Swal.fire({
        title: 'Error',
        text: 'There was an error rejecting the request!',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleDownload = (url, fileName) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
  };

  const handleView = (fileUrl, fileType) => {
    setViewFile({ url: fileUrl, type: fileType });
  };

  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
        height: '100vh',
      }}
    >
      <SuperAdminSidebar open={open} />
      <Main open={open} style={{ flexGrow: 1, padding: '20px' }}>
        {/* Title Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '10px 20px',
            color: '#03045e', // Updated color
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 4, // Margin bottom to space buttons from the title
            }}
          >
            <Dashboard sx={{ verticalAlign: 'middle', mr: 1, color: '#03045e' }} />
            <Typography variant="h4" fontWeight="bold">
              Center Approval
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%',
              mb: 2, // Margin bottom to space from other content if needed
            }}
          >
            <ApprovedButton onClick={() => navigate('/approvedrequest')}>
              Approved Centers
            </ApprovedButton>
            <RejectedButton onClick={() => navigate('/rejectedrequest')}>
              Rejected Centers
            </RejectedButton>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {serviceCenters.length === 0 ? (
            <Typography variant="h6" align="center" color="#03045e">
              No Pending Approvals Available
            </Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell style={{ backgroundColor: '#03045e', color: 'white' }}>Name</StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: '#03045e', color: 'white' }}>Address</StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: '#03045e', color: 'white' }}>Description</StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: '#03045e', color: 'white' }}>Location</StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: '#03045e', color: 'white' }}>Status</StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: '#03045e', color: 'white' }}>Approval Date</StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: '#03045e', color: 'white' }}>Email</StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: '#03045e', color: 'white' }}>Phone Number</StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: '#03045e', color: 'white' }}>View</StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: '#03045e', color: 'white' }}>Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {serviceCenters.map((center) => (
                    <StyledTableRow key={center.serviceCenterID}>
                      <StyledTableCell>{center.serviceCenterName}</StyledTableCell>
                      <StyledTableCell>{center.address}</StyledTableCell>
                      <StyledTableCell>{center.description}</StyledTableCell>
                      <StyledTableCell>{center.location}</StyledTableCell>
                      <StyledTableCell>{center.status}</StyledTableCell>
                      <StyledTableCell>{center.approvalDate ? new Date(center.approvalDate).toLocaleDateString() : 'N/A'}</StyledTableCell>
                      <StyledTableCell>{center.email}</StyledTableCell>
                      <StyledTableCell>{center.phoneNumber}</StyledTableCell>
                      <StyledTableCell>
                        <Tooltip title="View Files">
                          <IconButton onClick={() => handleOpenViewFiles(center)}>
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Button
                          className="btn btn-success"
                          onClick={() => handleApprove(center.serviceCenterID)}
                        >
                          Approve
                        </Button>
                        <Button
                          className="btn btn-danger ms-2"
                          onClick={() => handleReject(center.serviceCenterID)}
                        >
                          Reject
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* View File Dialog */}
          <Dialog open={openViewFiles} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitleStyled>View Files</DialogTitleStyled>
            <DialogContent>
              {selectedCenter && (
                <div>
                  <Divider sx={{ my: 2 }} />
                  <Grid container spacing={2}>
                    {selectedCenter.serviceCenterImage && (
                      <Grid item xs={12} md={6}>
                        <CenteredBox>
                          <Box>
                            <Typography color="#03045e">Service Center Image</Typography> {/* Updated color */}
                            <Box display="flex" alignItems="center">
                              <Button
                                onClick={() => handleView(fileUrls.serviceCenterImage, 'image')}
                                startIcon={<Visibility />}
                                variant="contained"
                              >
                                View
                              </Button>
                              <StyledButton
                                onClick={() => handleDownload(fileUrls.serviceCenterImage, 'serviceCenterImage.jpg')}
                                startIcon={<Download />}
                                variant="contained"
                              >
                                Download
                              </StyledButton>
                            </Box>
                          </Box>
                        </CenteredBox>
                      </Grid>
                    )}
                    {selectedCenter.businessRegistrationCertificate && (
                      <Grid item xs={12} md={6}>
                        <CenteredBox>
                          <Box>
                            <Typography color="#03045e">Business Registration Certificate</Typography> {/* Updated color */}
                            <Box display="flex" alignItems="center">
                              <Button
                                onClick={() => handleView(fileUrls.businessRegistrationCertificate, 'pdf')}
                                startIcon={<PictureAsPdf />}
                                variant="contained"
                              >
                                View
                              </Button>
                              <StyledButton
                                onClick={() => handleDownload(fileUrls.businessRegistrationCertificate, 'businessRegistrationCertificate.pdf')}
                                startIcon={<Download />}
                                variant="contained"
                              >
                                Download
                              </StyledButton>
                            </Box>
                          </Box>
                        </CenteredBox>
                      </Grid>
                    )}
                    {selectedCenter.insuranceDocument && (
                      <Grid item xs={12} md={6}>
                        <CenteredBox>
                          <Box>
                            <Typography color="#03045e">Insurance Document</Typography> {/* Updated color */}
                            <Box display="flex" alignItems="center">
                              <Button
                                onClick={() => handleView(fileUrls.insuranceDocument, 'pdf')}
                                startIcon={<PictureAsPdf />}
                                variant="contained"
                              >
                                View
                              </Button>
                              <StyledButton
                                onClick={() => handleDownload(fileUrls.insuranceDocument, 'insuranceDocument.pdf')}
                                startIcon={<Download />}
                                variant="contained"
                              >
                                Download
                              </StyledButton>
                            </Box>
                          </Box>
                        </CenteredBox>
                      </Grid>
                    )}
                    {selectedCenter.ownerIdentityProof && (
                      <Grid item xs={12} md={6}>
                        <CenteredBox>
                          <Box>
                            <Typography color="#03045e">Owner Identity Proof</Typography> {/* Updated color */}
                            <Box display="flex" alignItems="center">
                              <Button
                                onClick={() => handleView(fileUrls.ownerIdentityProof, 'image')}
                                startIcon={<Visibility />}
                                variant="contained"
                              >
                                View
                              </Button>
                              <StyledButton
                                onClick={() => handleDownload(fileUrls.ownerIdentityProof, 'ownerIdentityProof.jpg')}
                                startIcon={<Download />}
                                variant="contained"
                              >
                                Download
                              </StyledButton>
                            </Box>
                          </Box>
                        </CenteredBox>
                      </Grid>
                    )}
                  </Grid>
                </div>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>

          {/* View File Component */}
          {viewFile && (
            <Dialog open onClose={() => setViewFile(null)} fullWidth maxWidth="md">
              <DialogTitleStyled>File Viewer</DialogTitleStyled>
              <DialogContent>
                {viewFile.type === 'pdf' ? (
                  <iframe
                    src={viewFile.url}
                    style={{ width: '100%', height: '80vh' }}
                    frameBorder="0"
                  />
                ) : (
                  <img
                    src={viewFile.url}
                    alt="File Preview"
                    style={{ width: '100%', height: '80vh' }}
                  />
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setViewFile(null)}>Close</Button>
              </DialogActions>
            </Dialog>
          )}
        </Box>
      </Main>
    </div>
  );
};

export default CenterApproval;


