import { useEffect, useState } from "react";
import { useAlertStore } from "../../stores/alert";

import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const ApplicationAlert = () => {
  const { alert } = useAlertStore();

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (alert.message) {
      setOpen(true);
    }
  }, [alert]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      autoHideDuration={7000}
      open={open}
      onClose={handleClose}
    >
      <Alert severity={alert.type} onClose={handleClose}>
        {alert.message}
      </Alert>
    </Snackbar>
  );
};

export default ApplicationAlert;
