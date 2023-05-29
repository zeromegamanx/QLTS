import React, { useState, useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
// import { useSnackbar } from 'notistack';
import makeSelectTableComponent from './selectors';
import { deleteAct, getListAct, resetAction } from './actions';
import SearchBar from '../../components/SearchBar';
import { useSnackbar } from 'notistack';
import Table from './tables';
import { useTranslation } from 'react-i18next';
import Filter from './filter';
import RoleManager from '../RoleManager';

/* 
resetTable: thực hiện load lại data table khi thêm mới chỉnh sửa
setResetTable: Set lại trạng thái sau khi load
row: {
  color: màu row,
  active: key giá trị,
  value: giá trị kiểm tra active row
}
column={[
  {
    title: 'ID', tên cột
    name: 'code', mã cột
    type: 'normal', loại cột [normal, json, date, custom]
    // align: 'center', căn chỉnh [center, right] default: left
    decimal: true => trường là số thập phân
  }
]}
urlData: api lấy data
action: thông tin xem sửa xóa
action={{
  disable: {
    key: key lấy giá trị
    type: loại cần ẩn []
    value: giá trị không hiện hành động
  }
  view: {
    handleClick: '', hàm xem
    role: '', quyền
  },
  export: {
    handleClick: '', hàm tải
    role: '', quyền
  },
  edit: {
    handleClick: '', hàm sửa
    role: '', quyền
  },
  delete: {
    handleClick: '', hàm xóa
    role: '', quyền
    type: '', loại ['custom', '']
  },
}}
disableAdd: Ẩn thêm mới
disableAction: Đóng cột hành động
disableFilter: Ẩn filter
disableSearch: Ẩn search
disablePagination: Ẩn pagination
disableSearchBar: ẩn thanh công cụ
customFilters: Thông tin filter,
moreParamGet: Thông tin các param nếu cần thêm vào
optionButtonCustom: Button left 
titleTable: title header table
objectData: Cấu trúc data trả về
objectData={{
  data: [0] | string, // Link đến mảng data
  count: [1] | string, // Link đến giá trị số lượng
}}
roleAdd quyền thêm mới
roleViewTable quyền xem
customBar: thay đổi tỉ lệ khu vực ô tìm kiếm
isGetMore: table cần lấy param từ url để get dữ liệu
*/

function TableComponent(props) {
  const {
    resetTable,
    setResetTable,
    onGetList,
    onDelete,
    tableStates,
    urlData,
    handleAddClick,
    row,
    column,
    action,
    rightButtonCustom,
    optionButtonCustom,
    titleTable,
    objectData,
    onReset,
    disableAdd,
    disableAction,
    disableSearch,
    disableFilter,
    disablePagination,
    customFilters,
    moreParamGet,
    disableSearchBar,
    setGetFilter,
    roleAdd,
    roleViewTable,
    customBar,
    isGetMore,
  } = props;
  const { t } = useTranslation();
  const [rowsPerPage, setRowsPerPage] = useState(disablePagination ? 99999 : 10);
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(0);
  const [dataSearch, setDataSearch] = useState('');
  const [formFilter, setFormFilter] = useState({});
  const [openFilter, setOpenFilter] = useState(false);
  const [moreParam, setMoreParam] = useState({});
  const handleFilterOpen = () => {
    setOpenFilter(true);
  };
  const handleFilterClose = () => {
    setOpenFilter(false);
  };
  // const mounted = useRef(false);

  useEffect(async () => {
    switch (tableStates.success) {
      case 'DELETE_SUCCESS':
        enqueueSnackbar(t('xoaThanhCong'), {
          variant: 'success',
        });
        setResetTable(true);
        break;
      default:
        break;
    }
  }, [tableStates.success]);

  useEffect(async () => {
    switch (tableStates.error) {
      case 'DELETE_ERROR':
        enqueueSnackbar(t('xoaThatBai'), {
          variant: 'success',
        });
        setResetTable(true);
        break;
      default:
        break;
    }
  }, [tableStates.error]);

  /**
   * @description Lấy thông tin danh sách table load lần đầu
   * @author KhanhND
   */
  useEffect(() => {
    onReset();
    async function fetchData() {
      if (urlData) {
        const dataParam = {};
        if (moreParamGet && Object.keys(moreParamGet).length > 0) {
          Object.keys(moreParamGet).forEach((key) => {
            dataParam[key] = moreParamGet[key];
          });
          setMoreParam(dataParam);
        }
        const structFilter = {};
        if (customFilters && customFilters.length > 0) {
          customFilters.forEach((item) => {
            if (item.type === 'select') {
              structFilter[item.name] = null;
            } else {
              structFilter[item.name] = null;
            }
          });
          setFormFilter(structFilter);
        }
        await onGetList({
          urlData,
          skip: 0,
          take: rowsPerPage,
          ...structFilter,
          ...dataParam,
        });
      }
    }
    fetchData();
  }, []);
  /**
   * @description Lấy lại thông tin datatable khi có sự kiện cần load
   * @author KhanhND
   */
  useEffect(() => {
    if (resetTable && setResetTable) {
      setResetTable(false);
      const objectFilter = {};
      if (customFilters && customFilters.length > 0) {
        customFilters.forEach((item) => {
          if (item.type === 'select' && formFilter[item.name]) {
            objectFilter[item.name] = formFilter[item.name].value;
          } else {
            objectFilter[item.name] = formFilter[item.name];
          }
        });
      }
      // setPage(0);

      onGetList({
        urlData,
        skip: page * rowsPerPage,
        take: rowsPerPage,
        ...moreParam,
        ...objectFilter,
      });
    }
  }, [resetTable]);

  /**
   * @description Lấy thông tin các trường formFilter tạo cấu trúc state formFilter
   * @author KhanhND
   */
  // useEffect(() => {
  //   if (customFilters && customFilters.length > 0) {
  //     const structFilter = {};
  //     customFilters.forEach((item) => {
  //       if (item.type === 'select') {
  //         structFilter[item.name] = null;
  //       } else {
  //         structFilter[item.name] = '';
  //       }
  //     });
  //     setFormFilter(structFilter);
  //   }
  // }, [customFilters]);
  // useEffect(() => {
  //   mounted.current = true;
  //   if (mounted.current) {
  //     if (urlData) {
  //       onGetList({
  //         urlData,
  //         skip: 0,
  //         take: rowsPerPage,
  //         ...formFilter,
  //       });
  //     }
  //   }
  //   return () => {
  //     onReset();
  //     mounted.current = false;
  //   };
  // }, []);

  const handleSearch = () => {
    setPage(0);
    if (urlData) {
      const objectFilter = {};
      if (customFilters && customFilters.length > 0) {
        customFilters.forEach((item) => {
          if (item.type === 'select' && formFilter[item.name]) {
            objectFilter[item.name] = formFilter[item.name].value;
          } else {
            objectFilter[item.name] = formFilter[item.name];
          }
        });
      }
      onGetList({
        urlData,
        skip: 0,
        take: rowsPerPage,
        searchTerm: dataSearch,
        ...moreParam,
        ...objectFilter,
      });
    }
  };
  return (
    <RoleManager roles={roleViewTable || 'ACCESS-ALL'}>
      {!disableSearchBar && (
        <SearchBar
          handleAddClick={handleAddClick}
          roleAdd={roleAdd || 'ACCESS-ALL'}
          onSearch={handleSearch}
          dataSearch={dataSearch}
          setDataSearch={setDataSearch}
          disableFilter={disableFilter}
          rightButtonCustom={rightButtonCustom}
          optionButtonCustom={optionButtonCustom}
          titleTable={titleTable}
          disableSearch={disableSearch}
          handleFilterClick={handleFilterOpen}
          disableAdd={disableAdd}
          customBar={customBar}
        />
      )}
      <Table
        onGetList={onGetList}
        onDelete={onDelete}
        column={column}
        row={row}
        tableStates={tableStates}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        page={page}
        setPage={setPage}
        searchTerm={dataSearch}
        setFormFilter={setFormFilter}
        action={action}
        urlData={urlData}
        formFilter={formFilter}
        objectData={objectData}
        disableAction={disableAction}
        moreParam={moreParam}
        disablePagination={disablePagination}
      />
      <Filter
        customFilters={customFilters}
        onClose={handleFilterClose}
        open={openFilter}
        setFormFilter={setFormFilter}
        searchTerm={dataSearch}
        page={page}
        rowsPerPage={rowsPerPage}
        formFilter={formFilter}
        setPage={setPage}
        setDataSearch={setDataSearch}
        onGetList={onGetList}
        urlData={urlData}
        moreParam={moreParam}
        setGetFilter={setGetFilter}
        isGetMore={isGetMore}
      />
    </RoleManager>
  );
}

TableComponent.propTypes = {
  resetTable: PropTypes.bool,
  setResetTable: PropTypes.func,
  urlData: PropTypes.string,
  handleAddClick: PropTypes.func,
  column: PropTypes.array,
  action: PropTypes.object,
  optionButtonCustom: PropTypes.array,
  titleTable: PropTypes.array,
  objectData: PropTypes.object,
  disableAdd: PropTypes.bool,
  disableAction: PropTypes.bool,
  disableSearch: PropTypes.bool,
  disableFilter: PropTypes.bool,
  disablePagination: PropTypes.bool,
  customFilters: PropTypes.array,
  moreParamGet: PropTypes.object,
  disableSearchBar: PropTypes.bool,
  row: PropTypes.object,
  roleAdd: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  roleViewTable: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  customBar: PropTypes.object,
  isGetMore: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  tableStates: makeSelectTableComponent(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onGetList: (body) => {
      dispatch(getListAct(body));
    },
    onDelete: (body) => {
      dispatch(deleteAct(body));
    },
    onReset: () => {
      dispatch(resetAction());
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(TableComponent);
