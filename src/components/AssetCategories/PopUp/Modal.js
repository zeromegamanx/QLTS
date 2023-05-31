import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  Button,
  Grid,
  Typography,
  DialogTitle,
  Divider,
  DialogActions,
  TextField,
  FormHelperText,
} from '@material-ui/core';
// import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { makeStyles } from '@material-ui/styles';
import { Controller, useForm } from 'react-hook-form';

const useStyle = makeStyles(() => ({
  titleDialog: {
    fontWeight: 500,
    fontSize: '18px',
  },
  label: {
    fontWeight: 'bold',
    fontSize: '14px',
  },
}));

function Modal(props) {
  const {
    openDialog,
    formatMessage,
    dataEdit,
    checkEdit,
    close,
    onPatchCategory,
    onCreateCategory,
  } = props;
  const classes = useStyle();
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (!openDialog) {
      close();
      reset();
    }
  }, [openDialog]);
  useEffect(() => {
    reset();
    if (dataEdit && checkEdit) {
      setValue('DanhMuc', dataEdit.danhMuc);
    }
  }, [dataEdit, checkEdit]);
  const handleSubmitDialog = data => {
    const dataSubmit = {
      danhMuc: data.danhMuc.trim(),
    };
    const body = {};
    body.data = dataSubmit;
    if (dataEdit && checkEdit) {
      body.id = dataEdit.id;
      onPatchCategory(body);
    } else {
      onCreateCategory(body);
    }
    handleClose();
  };
  const handleClose = () => {
    close();
  };
  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="md"
        open={openDialog}
        onClose={close}
        aria-labelledby="max-width-dialog-title"
      >
        <form onSubmit={handleSubmit(handleSubmitDialog)}>
          <DialogTitle>
            <Typography className={classes.titleDialog}>
              {checkEdit
                ? formatMessage('Chỉnh sửa danh mục')
                : formatMessage('Thêm mới danh mục')}
            </Typography>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Grid container spacing={2}>
              <Grid container item sm={12} md={12} alignItems="center">
                <Grid item sm={4} md={4}>
                  <Typography className={classes.label}>
                    {formatMessage('Tên danh mục')}*:
                  </Typography>
                </Grid>
                <Grid item sm={8} md={8}>
                  { 
                  }
                  <Controller
                    rules={{
                      required: {
                        value: true,
                        message: formatMessage('empty'),
                      },
                      validate: value =>
                        typeof value === 'string' &&
                        value.length > 0 &&
                        value.trim() === ''
                          ? formatMessage('khongDuocNhapKhoangTrang')
                          : true,
                    }}
                    name="danhMuc"
                    control={control}
                    defaultValue=""
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        placeholder={formatMessage('Nhập tên danh mục')}
                        fullWidth
                        style={{ marginBottom: '-15px' }}
                        variant="outlined"
                        size="small"
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                  <FormHelperText error>
                    {errors && errors.danhMuc ? errors.danhMuc.message : null}
                  </FormHelperText>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Grid item md={12} container justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                // style={{ width: '86px' }}
              >
                {formatMessage('Lưu lại')}
              </Button>
              &nbsp;&nbsp;
              <Button
                onClick={handleClose}
                style={{
                  backgroundColor: '#979797',
                  color: '#FFFFFF',
                  // width: '86px',
                }}
              >
                {formatMessage('Huỷ bỏ')}
              </Button>
            </Grid>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default Modal;
