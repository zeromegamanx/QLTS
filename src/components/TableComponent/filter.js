/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { Button, Drawer, Grid, TextField, Typography, Autocomplete } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  drawer: {
    width: 420,
    maxWidth: '100%',
  },
  header: {
    padding: theme.spacing(2, 1),
    flexShrink: 0,
    display: 'flex',
    justifyContent: 'space-between',
  },
  content: {
    padding: theme.spacing(0, 3),
    flexGrow: 1,
  },
  actions: {
    padding: theme.spacing(3),
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function Filter(props) {
  const {
    open,
    onClose,
    className,
    setPage,
    setFormFilter,
    onGetList,
    formFilter,
    rowsPerPage,
    setDataSearch,
    customFilters,
    urlData,
    moreParam,
    setGetFilter,
    isGetMore,
  } = props;
  const classes = useStyles();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { t } = useTranslation();
  const handleClear = () => {
    setDataSearch('');
    setPage(0);
    if (customFilters && customFilters.length > 0) {
      const structFilter = {};
      customFilters.forEach((item) => {
        if (item.type === 'select') {
          structFilter[item.name] = null;
        } else {
          structFilter[item.name] = '';
        }
      });
      setFormFilter(structFilter);
      if (typeof setGetFilter === 'function') {
        setGetFilter(structFilter);
      }
    }
    // reset filter about default value
    const defaultValue = {};
    if (customFilters && customFilters.length > 0) {
      customFilters.forEach((item) => {
        if (item.type === 'select') {
          defaultValue[item.name] = item?.defaultValue ? item?.defaultValue : null;
        } else {
          defaultValue[item.name] = item?.defaultValue ? item?.defaultValue : '';
        }
      });
    }
    onGetList({
      urlData,
      skip: 0,
      take: rowsPerPage,
      ...moreParam,
    });
    reset({ ...defaultValue });
    // reset();
    onClose();
  };

  const onSubmit = (data) => {
    setPage(0);
    setDataSearch('');
    const objectFilter = {};
    if (customFilters && customFilters.length > 0) {
      customFilters.forEach((item) => {
        if (item.type === 'select' && data[item.name]) {
          objectFilter[item.name] = data[item.name].value;
        } else if (item.type === 'date' && data[item.name]) {
          objectFilter[item.name] = dayjs(data[item.name]).format('YYYY-MM-DD');
        } else {
          objectFilter[item.name] = data[item.name] || null;
        }
      });
    }
    if (typeof setGetFilter === 'function') {
      setGetFilter(objectFilter);
    }
    if (isGetMore) {
      onGetList({
        urlData,
        skip: 0,
        take: rowsPerPage,
        searchTerm: '',
        ...objectFilter,
      });
    } else {
      onGetList({
        urlData,
        skip: 0,
        take: rowsPerPage,
        searchTerm: '',
        ...objectFilter,
        ...moreParam,
      });
    }
    onClose();
  };
  return (
    <Drawer
      anchor="right"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant="temporary"
    >
      <form className={clsx(classes.root, className)} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.header}>
          <Button onClick={onClose} size="small">
            <CloseIcon className={classes.buttonIcon} />
            {t('dong')}
          </Button>
        </div>
        <div className={classes.content}>
          <Grid container spacing={3}>
            {customFilters &&
              customFilters.length > 0 &&
              customFilters.map((col, index) => {
                if (col.type === 'label') {
                  return (
                    <Grid item md={12} key={index}>
                      <Typography style={{ fontWeight: 'bold' }}>{col.label}</Typography>
                    </Grid>
                  );
                }
                if (col.type === 'select') {
                  return (
                    <Grid item md={col.numColTotal || 12} container spacing={1} key={index}>
                      <Grid alignSelf="center" item md={col.numColLabel}>
                        <Typography style={{ fontWeight: 'bold' }}>{col.label}</Typography>
                      </Grid>
                      <Grid item md={col.numColInput}>
                        <Controller
                          control={control}
                          name={col.name}
                          defaultValue={col.defaultValue}
                          render={({ field: { onChange, value } }) => (
                            <Autocomplete
                              options={col.options || []}
                              value={value || formFilter[col.name]}
                              getOptionLabel={(option) => option.label || null}
                              size="small"
                              onChange={(e, options) => {
                                onChange(options);
                                setFormFilter((prev) => ({
                                  ...prev,
                                  [col.name]: options,
                                }));
                              }}
                              isOptionEqualToValue={(option, value) =>
                                value && option.value === value.value
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  variant="outlined"
                                  placeholder={col.placeholder}
                                />
                              )}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  );
                }
                if (col.type === 'input') {
                  return (
                    <Grid item md={col.numColTotal || 12} container spacing={1} key={index}>
                      <Grid alignSelf="center" item md={col.numColLabel}>
                        <Typography style={{ fontWeight: 'bold' }}>{col.label}</Typography>
                      </Grid>
                      <Grid item md={col.numColInput}>
                        <Controller
                          control={control}
                          name={col.name}
                          defaultValue={col.defaultValue}
                          render={({ field: { onChange, value } }) => (
                            <TextField
                              placeholder={col.placeholder}
                              fullWidth
                              variant="outlined"
                              size="small"
                              type={col.dataType || 'text'}
                              onChange={(e) => {
                                onChange(e);
                                setFormFilter((prev) => ({
                                  ...prev,
                                  [col.name]: e.target.value,
                                }));
                              }}
                              value={value}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  );
                }
                if (col.type === 'year') {
                  return (
                    <Grid item md={col.numColTotal || 12} container spacing={1} key={index}>
                      <Grid alignSelf="center" item md={col.numColLabel}>
                        <Typography style={{ fontWeight: 'bold' }}>{col.label}</Typography>
                      </Grid>
                      <Grid item md={col.numColInput}>
                        <Controller
                          rules={{
                            pattern: {
                              value: /^(181[2-9]|18[2-9]\d|19\d\d|2\d{3}|30[0-3]\d|304[0-8])$/,
                              message: t('asset0201.taiSanKhongHopLe'),
                            },
                          }}
                          control={control}
                          name={col.name}
                          defaultValue={col.defaultValue}
                          render={({ field: { onChange, value } }) => (
                            <TextField
                              placeholder={col.placeholder}
                              fullWidth
                              variant="outlined"
                              size="small"
                              type={col.dataType || 'number'}
                              onChange={(e) => {
                                onChange(e);
                                setFormFilter((prev) => ({
                                  ...prev,
                                  [col.name]: e.target.value,
                                }));
                              }}
                              value={value}
                              error={errors && errors[col.name]}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  );
                }
                if (col.type === 'date') {
                  return (
                    <Grid item md={col.numColTotal || 12} container spacing={1} key={index}>
                      <Grid alignSelf="center" item md={col.numColLabel}>
                        <Typography style={{ fontWeight: 'bold' }}>{col.label}</Typography>
                      </Grid>
                      <Grid item md={col.numColInput}>
                        <Controller
                          control={control}
                          name={col.name}
                          defaultValue={col.defaultValue}
                          render={({ field: { onChange, value } }) => (
                            <DatePicker
                              views={['year', 'month', 'day']}
                              inputFormat="dd/MM/yyyy"
                              dayOfWeekFormatter={(day) => day}
                              value={value || null}
                              onChange={(e) => {
                                onChange(e);
                                setFormFilter((prev) => ({
                                  ...prev,
                                  [col.name]: dayjs(e).format('YYYY-MM-DD'),
                                }));
                              }}
                              renderInput={(params) => (
                                <TextField
                                  variant="outlined"
                                  error={false}
                                  placeholder="dd/mm/yyyy"
                                  fullWidth
                                  {...params}
                                  size="small"
                                />
                              )}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  );
                }
              })}
          </Grid>
        </div>
        <div className={classes.actions}>
          <Button fullWidth onClick={handleClear} variant="contained" color="inherit">
            {t('xoaCacLuaChonLoc')}
          </Button>
          <Button color="primary" fullWidth type="submit" variant="contained">
            {t('thucHienLoc')}
          </Button>
        </div>
      </form>
    </Drawer>
  );
}

export default Filter;
