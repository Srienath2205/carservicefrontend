import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
} from "@mui/icons-material";
import { Visibility, Download, PictureAsPdf } from '@mui/icons-material';
import AdminSidebar from './AdminSidebar';

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

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: open ? drawerWidth : 0,
  flexGrow: 1,
  padding: '20px',
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  }),
}));

const drawerWidth = 240;

const ViewServiceCenterStatus = () => {
  const [serviceCenters, setServiceCenters] = useState([]);
  const [error, setError] = useState(null);
  const [openViewFiles, setOpenViewFiles] = useState(false);
  const [open, setOpen] = useState(true);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [fileUrls, setFileUrls] = useState({});
  const [viewFile, setViewFile] = useState(null);

  // Retrieve adminID from session storage
  const adminID = sessionStorage.getItem('adminID');
  const theme = useTheme();

  useEffect(() => {
    const fetchServiceCenters = async () => {
      try {
        const result = await axios.get("http://localhost:8686/servicecenters/all");
        // Filter based on adminID from session storage
        const filteredCenters = result.data.filter(center => center.admin.adminID == adminID);
        setServiceCenters(filteredCenters);
      } catch (error) {
        console.error('Error fetching service centers:', error);
        setError('Failed to load service centers.');
      }
    };

    fetchServiceCenters();
  }, [adminID]);

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
        color: "#03045e",
        padding: "10px 20px",
        marginBottom: "20px",
        textAlign: "center",
        fontSize: "24px",
        fontWeight: "bold",
      }}
    >
      <AdminSidebar open={open} />
      <Main open={open}>
        <div
          style={{
            color: '#03045e',
            padding: '10px 20px',
            marginBottom: '20px',
            textAlign: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
          }}
        >
          <Dashboard style={{ verticalAlign: "middle", marginRight: "8px" }} />
          Service Center
        </div>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {serviceCenters.length === 0 ? (
            <Typography color="#03045e" variant="h6">
              Center has not been Registered yet.
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
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* Main Dialog for file actions */}
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
                            <Typography>Service Center Image</Typography>
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
                            <Typography>Business Registration Certificate</Typography>
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
                            <Typography>Insurance Document</Typography>
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
                            <Typography>Owner Identity Proof</Typography>
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

export default ViewServiceCenterStatus;


