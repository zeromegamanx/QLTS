import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  TableContainer,
  Tooltip,
  IconButton,
  LinearProgress,
} from '@mui/material';
import { makeStyles, withStyles } from '@mui/styles';
import get from 'lodash.get';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { v4 as uuidv4 } from 'uuid';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import DialogConfirm from '../../components/DialogConfirm';
import RoleManager from '../RoleManager';
import { formatDecimal } from '../../utils/common';

const useStyles = makeStyles(() => ({
  titlerow: {
    fontWeight: 'bold',
  },
  backgroundColorTableRow: {
    backgroundColor: '#a5f3fc',
  },
}));

const StyledTableRow = withStyles(() => ({
  root: {
    height: 40,
  },
}))(TableRow);

const StyledTableCell = withStyles(() => ({
  root: {
    padding: '10px 16px',
  },
}))(TableCell);

function Tables(props) {
  const {
    page,
    rowsPerPage,
    setRowsPerPage,
    setPage,
    tableStates,
    onGetList,
    onDelete,
    searchTerm,
    row,
    column,
    action,
    urlData,
    formFilter,
    objectData,
    disableAction,
    disablePagination,
    moreParam,
  } = props;
  const { t } = useTranslation();
  const classes = useStyles();
  const [idEdit, setIdEdit] = useState(null);
  const [cell, setCell] = useState(null);
  const handleChangePage = (event, page) => {
    if (urlData) {
      // const objectFilter = {};
      // if (formFilter && formFilter.length > 0) {
      //   formFilter.forEach((item) => {
      //     if (item.type === 'select' && formFilter[item.name]) {
      //       objectFilter[item.name] = formFilter[item.name].value;
      //     } else {
      //       objectFilter[item.name] = formFilter[item.name];
      //     }
      //   });
      // }
      const dataFilter = {};
      if (formFilter && Object.keys(formFilter).length > 0) {
        Object.keys(formFilter).forEach((key) => {
          if (
            typeof formFilter[key] === 'object' &&
            formFilter[key] &&
            (formFilter[key].value || formFilter[key].value === 0)
          ) {
            dataFilter[key] = formFilter[key].value === 0 ? '0' : formFilter[key].value || '';
          }
          if (typeof formFilter[key] === 'string') {
            dataFilter[key] = formFilter[key] || '';
          }
        });
      }

      // if ((typeof formFilter === 'object', formFilter?.status)) {
      //   // eslint-disable-next-line no-restricted-globals
      //   objectFilter.status = formFilter.status.value;
      // }

      onGetList({
        urlData,
        skip: page * rowsPerPage,
        take: rowsPerPage,
        searchTerm: searchTerm !== '' ? searchTerm : '',
        ...moreParam,
        ...dataFilter,
      });
    }
    setPage(page);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    // const objectFilter = {};
    // if (formFilter && formFilter.length > 0) {
    //   formFilter.forEach((item) => {
    //     if (item.type === 'select' && formFilter[item.name]) {
    //       objectFilter[item.name] = formFilter[item.name].value;
    //     } else {
    //       objectFilter[item.name] = formFilter[item.name];
    //     }
    //   });
    // }

    // if ((typeof formFilter === 'object', formFilter?.status)) {
    //   // eslint-disable-next-line no-restricted-globals
    //   objectFilter.status = formFilter.status.value;
    // }

    const dataFilter = {};
    if (formFilter && Object.keys(formFilter).length > 0) {
      Object.keys(formFilter).forEach((key) => {
        if (
          typeof formFilter[key] === 'object' &&
          formFilter[key] &&
          (formFilter[key].value || formFilter[key].value === 0)
        ) {
          dataFilter[key] = formFilter[key].value === 0 ? '0' : formFilter[key].value || '';
        }
        if (typeof formFilter[key] === 'string') {
          dataFilter[key] = formFilter[key] || '';
        }
      });
    }

    setPage(0);
    if (urlData) {
      onGetList({
        urlData,
        skip: 0,
        take: event.target.value,
        searchTerm: searchTerm !== '' ? searchTerm : '',
        ...moreParam,
        ...dataFilter,
      });
    }
  };
  return (
    <Grid container style={{ marginTop: '20px' }}>
      {tableStates.loading === 'GETLIST_LOADING' && (
        <LinearProgress color="primary" style={{ width: '100%' }} />
      )}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {column &&
                column.map((item) => (
                  <TableCell
                    key={uuidv4()}
                    align={item.align || 'left'}
                    width={item.width || 'auto'}
                  >
                    <Typography className={classes.titlerow}>{item.title}</Typography>
                  </TableCell>
                ))}

              {/* <TableCell>
                <Typography className={classes.titlerow}>{t('d04.tenNhom')}</Typography>
              </TableCell> */}
              {!disableAction && (
                <TableCell align="center">
                  <Typography className={classes.titlerow}>{t('hanhDong')}</Typography>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableStates &&
              tableStates.data &&
              tableStates.data[objectData.data] &&
              tableStates.data[objectData.data].length > 0 &&
              tableStates.data[objectData.data].map((dataCell, index) => {
                let checkActiveRow = false;
                if (row && dataCell[row.key] === row.value) {
                  checkActiveRow = true;
                }
                let checkHiddenAction = [];
                if (action?.disable) {
                  const valueReal = get(dataCell, action.disable.key);
                  if (action.disable.value.includes(valueReal)) {
                    checkHiddenAction = action.disable.type;
                  }
                }
                return (
                  <StyledTableRow
                    key={uuidv4()}
                    hover={!row}
                    style={{ backgroundColor: checkActiveRow ? row.color : '' }}
                    // className={backgroundColorTableRow && classes.backgroundColorTableRow}
                  >
                    {column &&
                      column.map((cell) => {
                        if (cell.type === 'order') {
                          return (
                            <StyledTableCell
                              align={cell.align || 'left'}
                              sx={{ background: `${cell.background}` }}
                              key={uuidv4()}
                              width={cell.width || 'auto'}
                            >
                              {index + 1 + page * rowsPerPage}
                            </StyledTableCell>
                          );
                        }
                        if (cell.type === 'multiple') {
                          let properties = [];
                          if (cell.name && Array.isArray(cell.name)) {
                            properties = cell.name;
                          } else if (cell.name && cell.name.includes('.')) {
                            properties = cell.name.split('.');
                          }
                          return (
                            <StyledTableCell
                              align={cell.align || 'left'}
                              sx={{ background: `${cell.background}` }}
                              key={uuidv4()}
                              width={cell.width || 'auto'}
                            >
                              {cell.customCell(dataCell, properties)}
                            </StyledTableCell>
                          );
                        }
                        if (cell.type === 'custom') {
                          if (!cell.name.includes('.')) {
                            return (
                              <StyledTableCell
                                align={cell.align || 'left'}
                                sx={{ background: `${cell.background}` }}
                                key={uuidv4()}
                                width={cell.width || 'auto'}
                              >
                                {cell.customCell(dataCell[cell.name])}
                              </StyledTableCell>
                            );
                          }
                          // const properties = cell.name.split('.');
                          // let dataCustom = '';
                          // if (properties.length === 2 && dataCell[properties[0]]) {
                          //   dataCustom = dataCell[properties[0]][properties[1]];
                          // } else if (properties.length === 3 && dataCell[properties[0]]) {
                          //   dataCustom = dataCell[properties[0]][properties[1]][properties[2]];
                          // } else if (properties.length === 4 && dataCell[properties[0]]) {
                          //   dataCustom =
                          //     dataCell[properties[0]][properties[1]][properties[2]][properties[3]];
                          // }
                          return (
                            <StyledTableCell
                              align={cell.align || 'left'}
                              key={uuidv4()}
                              sx={{ background: `${cell.background}` }}
                            >
                              {cell.customCell(dataCell)}
                            </StyledTableCell>
                          );
                        }
                        if (cell.type === 'json' && dataCell) {
                          // const properties = cell.name.split('.');
                          let dataCustom = '';
                          // if (properties.length === 2 && dataCell?.[properties[0]]) {
                          //   dataCustom = dataCell[properties[0]][properties[1]];
                          // } else if (properties.length === 3 && dataCell?.[properties[0]]) {
                          //   dataCustom = dataCell[properties[0]][properties[1]][properties[2]];
                          // } else if (properties.length === 4 && dataCell?.[properties[0]]) {
                          //   dataCustom =
                          //     dataCell[properties[0]][properties[1]][properties[2]][properties[3]];
                          // }
                          if (typeof cell.name === 'string') {
                            dataCustom = get(dataCell, cell.name);
                          } else if (Array.isArray(cell.name) && cell.name.length > 0) {
                            dataCustom = get(dataCell, cell.name.join('.'));
                          }
                          return (
                            <StyledTableCell
                              align={cell.align || 'left'}
                              key={uuidv4()}
                              sx={{ background: `${cell.background}` }}
                            >
                              {cell.decimal ? formatDecimal(dataCustom) : dataCustom}
                            </StyledTableCell>
                          );
                        }
                        return (
                          <StyledTableCell
                            align={cell.align || 'left'}
                            key={uuidv4()}
                            sx={{
                              background: `${cell.background}`,
                              color: `${cell?.color}`,
                            }}
                          >
                            {(cell.decimal && formatDecimal(dataCell[cell.name])) ||
                              dataCell[cell.name] ||
                              ''}
                          </StyledTableCell>
                        );
                      })}
                    {!disableAction && (
                      <StyledTableCell align="center">
                        {action && action.approve && action.approve.handleClick && (
                          <RoleManager roles={[action.approve.role || 'ACCESS-ALL']}>
                            <Tooltip title={t('pheDuyet')}>
                              <IconButton
                                color={
                                  !checkHiddenAction.includes('approve') ? 'primary' : 'disable'
                                }
                                component="span"
                                size="small"
                                onClick={() => action.approve.handleClick(dataCell)}
                              >
                                <CheckCircleOutlinedIcon fontSize="small" sx={{ color: 'green' }} />
                              </IconButton>
                            </Tooltip>
                          </RoleManager>
                        )}
                        {action && action.reject && action.reject.handleClick && (
                          <RoleManager roles={action.reject.role || 'ACCESS-ALL'}>
                            <Tooltip title={t('tuChoi')}>
                              <IconButton
                                color={
                                  !checkHiddenAction.includes('reject') ? 'primary' : 'disable'
                                }
                                component="span"
                                size="small"
                                onClick={() => action.reject.handleClick(dataCell)}
                              >
                                <CancelOutlinedIcon fontSize="small" sx={{ color: 'red' }} />
                              </IconButton>
                            </Tooltip>
                          </RoleManager>
                        )}
                        {action && action.view && action.view.handleClick && (
                          <RoleManager roles={action.view.role || 'ACCESS-ALL'}>
                            <Tooltip title={t('xem')}>
                              <IconButton
                                color={!checkHiddenAction.includes('view') ? 'primary' : 'disable'}
                                component="span"
                                size="small"
                                onClick={() =>
                                  !checkHiddenAction.includes('view') &&
                                  action.view.handleClick(dataCell)
                                }
                              >
                                <VisibilityIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </RoleManager>
                        )}
                        {action && action.export && action.export.handleClick && (
                          <RoleManager roles={action.export.role || 'ACCESS-ALL'}>
                            <Tooltip title={t('taiXuong')}>
                              <IconButton
                                color={
                                  !checkHiddenAction.includes('export') ? 'primary' : 'disable'
                                }
                                component="span"
                                size="small"
                                onClick={() =>
                                  !checkHiddenAction.includes('export') &&
                                  action.export.handleClick(dataCell)
                                }
                              >
                                <DownloadIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </RoleManager>
                        )}
                        {action && action.edit && action.edit.handleClick && (
                          <RoleManager roles={action.edit.role || 'ACCESS-ALL'}>
                            <Tooltip title={t('chinhSua')}>
                              <IconButton
                                color={!checkHiddenAction.includes('edit') ? 'primary' : 'disable'}
                                component="span"
                                size="small"
                                onClick={() =>
                                  !checkHiddenAction.includes('edit') &&
                                  action.edit.handleClick(dataCell)
                                }
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </RoleManager>
                        )}
                        {/* {action &&
                          action.delete &&
                          action.delete.handleClick &&
                          action.delete.role === 'custom' && (
                            <Tooltip title={t('xoa')}>
                              <IconButton
                                color="primary"
                                aria-label="Xóa"
                                component="span"
                                size="small"
                                onClick={() => {
                                  setCell(dataCell);
                                  setIdEdit(dataCell.id);
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          )} */}
                        {action && action.custom && action.custom.handleClick && (
                          <RoleManager roles={action.custom.role || 'ACCESS-ALL'}>
                            <Tooltip title={action.custom.title}>
                              <IconButton
                                color="primary"
                                component="span"
                                size="small"
                                onClick={() => action.custom.handleClick(dataCell)}
                              >
                                {action.custom.icon}
                              </IconButton>
                            </Tooltip>
                          </RoleManager>
                        )}
                        {action && action.delete && action.delete.handleClick && (
                          <RoleManager roles={action.delete.role || 'ACCESS-ALL'}>
                            <Tooltip title={t('xoa')}>
                              <IconButton
                                color={
                                  !checkHiddenAction.includes('delete') ? 'primary' : 'disable'
                                }
                                component="span"
                                size="small"
                                onClick={() => {
                                  if (!checkHiddenAction.includes('delete')) {
                                    if (action.delete.type === 'custom') {
                                      setCell(dataCell);
                                    }
                                    setIdEdit(dataCell.id);
                                  }
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </RoleManager>
                        )}
                      </StyledTableCell>
                    )}
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
        {!disablePagination && (
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={tableStates?.data?.[objectData.count] || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </TableContainer>

      <DialogConfirm
        topTitle={t('thongBao')}
        title={action && action.delete && action.delete.title}
        subTitle={action && action.delete && action?.delete?.subTitle}
        open={idEdit !== null}
        handleClose={() => setIdEdit(null)}
        handleApprove={() => {
          if (cell) {
            action.delete.handleClick(cell);
            setCell(null);
          } else {
            onDelete({ urlData, idEdit });
          }
          setIdEdit(null);
        }}
        titleApprove={t('confirm.dongY')}
        titleCancel={t('confirm.huy')}
      />
    </Grid>
  );
}

export default Tables;
