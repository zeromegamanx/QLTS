import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Grid } from '@mui/material';
import { useSnackbar } from 'notistack';
import TableComponent from '../../../TableComponent';
import AddModal from './AddModal';
import { CATEGORY_ASSET_URL } from '../../../../urlConfig';
import { useNavigate } from 'react-router';
import makeSelectOrg0503 from '../../selectors';
import { createCategoryAction, resetAction } from '../../actions';
// import axios from '../../../../utils/axios';
import { showLoadingAction } from '../../../App/actions';

export function Unit(props) {
  const { onCreateCategory, onReset, org0503States, showLoading } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [getFilter, setGetFilter] = useState(null);
  const [resetTable, setResetTable] = useState(false);
  const [isOpenRequire, setIsOpenRequire] = useState(false);

  const handleAdd = () => {
    setIsOpenRequire(true);
  };

  const closeRequireModal = () => {
    setIsOpenRequire(false);
  };

  const handleView = (item) => {
    navigate(
      `/org/quanTriHeThong/quanLyDanhMuc/chiTietDanhMuc/${
        item.id
      }?year=${getFilter?.year || ''}`,
    );
  };

  // const getListYears = async () => {
  //   await axios({
  //     url: `${REWARD_UNIT_URL}/listYear`,
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }).then(({ data }) => {
  //     setListYears(
  //       data &&
  //         data.map((item) => ({
  //           value: item.year,
  //           label: `${item.year}`,
  //         })),
  //     );
  //   });
  //   return null;
  // };

  // useEffect(() => {
  //   getListYears();
  // }, []);

  
  useEffect(() => {
    if (org0503States.success) {
      onReset();
      switch (org0503States.success) {
        case 'CREATE_CATEGORY_SUCCESS':
          enqueueSnackbar(t('org0503.themMoiDanhMucThanhCong'), {
            variant: 'success',
          });
          break;
        default:
          break;
      }
      setResetTable(true);
    }
  }, [org0503States.success]);

  useEffect(() => {
    if (org0503States.error) {
      onReset();
      switch (org0503States.error) {
        case 'CREATE_REWARD_UNIT_ERROR':
          if (
            org0503States.dataError &&
            org0503States.dataError.message &&
            org0503States.dataError.message.includes('Category is ready existed')
          ) {
            enqueueSnackbar(t('org0503.danhMucDaTonTai'), {
              variant: 'error',
            });
          } else {
            enqueueSnackbar(t('org0503.themMoiDanhMucThatBai'), {
              variant: 'error',
            });
          }
          break;
        default:
          break;
      }
    }
  }, [org0503States.error]);

  return (
    <Grid container>
      <TableComponent
        customBar={{
          left: 5,
          right: 7,
        }}
        urlData={`${CATEGORY_ASSET_URL}`}  // điền API 
        resetTable={resetTable}  // KHI THÊM MỚI, SỬA, XOÁ THÔNG TIN THÌ RESET LẠI TABLE (if true)
        setResetTable={setResetTable}
        handleAddClick={handleAdd}  // hành động nút +ADD 
        roleViewTable={READ_QUAN_LY_DANH_MUC_TAI_SAN}
        objectData={{  
          data: [0],
          count: [1],
        }}  // thể hiện số object (1-3 trong 3)
        setGetFilter={setGetFilter} // bộ lọc 
        column={[
          {
            title: t('org0503.soThuTu'),
            name: 'no.',
            type: 'order',
            align: 'center',
          },
          {
            title: t('org0503.tenDanhMuc'),
            name: 'categories',
            type: 'normal',
            align: 'center',
            customCell: (categories) => (categories ? categories.length : 0),
          },
          {
            title: t('org0503.soLuong'),
            name: 'quantity',
            type: 'custom',
            align: 'center',
            customCell: (quantity) => quantity || 0,
          },
        ]}
        // customFilters={[
        //   {
        //     numColLabel: 4, // tỉ lệ khoảng cách trong bộ lọc , Năm
        //     numColInput: 8, // ô điền (Name)
        //     label: t('year'),
        //     placeholder: t('tatCa'),
        //     defaultValue: null,
        //     name: 'year',
        //     type: 'input',
        //     dataType: 'number',
        //   },
        // ]}
        action={{ // hành động (view, edit, delete)
          view: {
            handleClick: handleView,
          },
        }}
      />
      <AddModal
        open={isOpenRequire}
        onClose={closeRequireModal}
        onCreateCategory={onCreateCategory}
        org0503States={org0503States}
      />
    </Grid>
  );
}

const mapStateToProps = createStructuredSelector({
  org0503States: makeSelectOrg0503(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    showLoading: (body) => {
      dispatch(showLoadingAction(body));
    },
    onReset: () => {
      dispatch(resetAction());
    },
    onCreateRewardUnit: (body) => {
      dispatch(createCategoryAction(body));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Unit);
