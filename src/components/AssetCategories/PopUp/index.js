import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
// import { useHistory } from 'react-router-dom';
import { Grid, IconButton, Typography } from '@material-ui/core';
// import { makeStyles } from '@material-ui/styles';
import { DeleteOutline, Edit } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import Swal from 'sweetalert2';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import loadable from 'utils/loadable';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import makeSelectAdmin0501 from './selectors';
import TableComponent from '../TableComponent/Loadable';
import {
  createCategoryAction,
  deleteCategoryAction,
  patchCategoryAction,
  resetAction,
} from './actions';

const Modal = loadable(() => import('./Modal'));

export function Admin0501(props) {
  const {
    admin0501,
    onResetAction,
    onCreateBaseTopic,
    onPatchBaseTopic,
    onDeleteBaseTopic,
  } = props;
  useInjectReducer({ key: 'admin0501', reducer });
  useInjectSaga({ key: 'admin0501', saga });
  // const classes = useStyles();
  // const [listOrganization, setListOrganization] = useState([]);
  // const history = useHistory();
  const [openModal, setOpenModal] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);
  const [checkEdit, setCheckEdit] = useState(false);
  const [resetTable, setResetTable] = useState(false);
  const { intl } = props;
  const { enqueueSnackbar } = useSnackbar();

  const formatMessage = msg =>
    intl.formatMessage(
      messages[msg] || {
        id: msg,
        defaultMessage: msg,
      },
    );

  const CustomAction = tableProps => (
    <>
      <IconButton
        size="small"
        color="primary"
        title={intl.formatMessage(
          messages.sua || {
            id: 'sua',
            defaultMessage: 'sua',
          },
        )}
        onClick={() => handleEditClick(tableProps.item)}
      >
        <Edit />
      </IconButton>
      <IconButton
        size="small"
        color="primary"
        title={intl.formatMessage(
          messages.xoa || {
            id: 'xoa',
            defaultMessage: 'xoa',
          },
        )}
        onClick={() => handleDeleteClick(tableProps.item.id)}
      >
        <DeleteOutline />
      </IconButton>
    </>
  );

  // Handle delete file
  const handleDeleteClick = item => {
    Swal.fire({
      title: intl.formatMessage(messages.CanhBao),
      text: intl.formatMessage(messages.BanCoChacChan),
      showCancelButton: true,
      confirmButtonColor: '#2A3C95',
      cancelButtonColor: '#8181F7',
      reverseButtons: true,
      confirmButtonText: intl.formatMessage(messages.Co),
      cancelButtonText: intl.formatMessage(messages.khong),
    }).then(result => {
      if (result.value) {
        onDeleteBaseTopic(item);
      }
    });
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleEditClick = item => {
    setOpenModal(true);
    setCheckEdit(true);
    setDataEdit(item);
  };

  const handleAddClick = () => {
    setOpenModal(true);
    setCheckEdit(false);
  };

  const onResetTable = () => {
    setResetTable(true);
  };

  useEffect(() => {
    if (admin0501.success) {
      switch (admin0501.success) {
        case 'CREATE_CATEGORY_SUCCESS':
          onResetTable();
          enqueueSnackbar(intl.formatMessage(messages.taoMoiDanhMucThanhCong), {
            variant: 'success',
          });
          break;
        case 'PATCH_CATEGORY_SUCCESS':
          onResetTable();
          enqueueSnackbar(intl.formatMessage(messages.chinhSuaDanhMucThanhCong), {
            variant: 'success',
          });
          break;
        case 'DELETE_CATEGORY_SUCCESS':
          onResetTable();
          enqueueSnackbar(intl.formatMessage(messages.xoaDanhMucThanhCong), {
            variant: 'success',
          });
          break;
        default:
          break;
      }
      onResetAction();
    }
  }, [admin0501.success]);

  useEffect(() => {
    if (admin0501.error) {
      switch (admin0501.error) {
        case 'CREATE_CATEGORY_FAILED':
          enqueueSnackbar(intl.formatMessage(messages.taoMoiDanhMucThatBai), {
            variant: 'error',
          });
          break;
        case 'PATCH_CATEGORY_FAILED':
          enqueueSnackbar(intl.formatMessage(messages.chinhSuaDanhMucThatBai), {
            variant: 'error',
          });
          break;
        case 'DELETE_CATEGORY_FAILED':
          enqueueSnackbar(intl.formatMessage(messages.xoaDanhMucThatBai), {
            variant: 'error',
          });
          break;
        default:
          enqueueSnackbar(intl.formatMessage(messages.thaoTacThatBai), {
            variant: 'error',
          });
          break;
      }
      onResetAction();
    }
  }, [admin0501.error]);
  return (
    <div>
      <Grid style={{ marginBottom: '10px' }}>
        <Typography
          component="p"
          style={{ fontSize: '13px', lineHeight: '13px', color: '#546E7A' }}
        >
          {intl.formatMessage(
            messages.quanLy || {
              id: 'quanLy',
              defaultMessage: 'quanLy',
            },
          )}
        </Typography>
      </Grid>
      <TableComponent
        urlGet={`${CATEGORY_URL}`}
        reset={resetTable}
        setReset={setResetTable}
        handleAddClick={handleAddClick}
        disableAction
        disableCheckBox
        disableFilter
        disableDisplayCount
        actionEditBar={[]}
        tableTitle={{
          text: intl.formatMessage(messages.danhSachDanhMucTaiSan),
        }}
        searchField="DanhMuc"
        sortObject={{
          order: [['createdAt', 'DESC']],
        }}
        column={[
          {
            title: intl.formatMessage(
              messages.tenDanhMuc || {
                id: 'tenDanhMuc',
                defaultMessage: 'tenDanhMuc',
              },
            ),
            name: 'danhMuc',
            type: 'string',
          },
          {
            title: intl.formatMessage(
              messages.hanhDong || {
                id: 'hanhDong',
                defaultMessage: 'hành động',
              },
            ),
            align: 'center',
            name: 'id',
            type: 'custom',
            CustomComponent: CustomAction,
          },
        ]}
      />
      <Modal
        openDialog={openModal}
        formatMessage={formatMessage}
        dataEdit={dataEdit}
        checkEdit={checkEdit}
        close={handleClose}
        onCreateBaseTopic={onCreateBaseTopic}
        onPatchBaseTopic={onPatchBaseTopic}
      />
    </div>
  );
}

Admin0501.propTypes = {
  intl: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  admin0501: makeSelectAdmin0501(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onResetAction: () => {
      dispatch(resetAction());
    },
    onCreateBaseTopic: body => {
      dispatch(createCategoryAction(body));
    },
    onPatchBaseTopic: body => {
      dispatch(patchCategoryAction(body));
    },
    onDeleteBaseTopic: id => {
      dispatch(deleteCategoryAction(id));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  injectIntl,
  withConnect,
)(Admin0501);
