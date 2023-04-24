import React, { useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import { FormattedMessage, FormattedDate, FormattedNumber, FormattedPlural, FormattedTime } from 'react-intl';
import { Context } from "./components/Wrapper";
//Import kết nối tới react-redux
import { connect } from 'react-redux'
//Import action dùng để dispatch
import { actAddNote } from './actions/index'
import { Route, Routes } from 'react-router-dom';
import { useForm } from "react-hook-form";

import Home from './components/Home';
import About from './components/About';
import Shop from './components/Shop'
import Error from './components/Error'

import { useDispatch } from "react-redux";
import { useEffect, useSelector } from "react";


function App(props) {
  const context = useContext(Context);


  const onSubmit = data => console.log(data);
  // useForm là một custom hook giúp quản lý form một cách dễ dàng.
  const { register, handleSubmit, formState: { errors } } = useForm({
    // Mode có các giá trị (onChange | onBlur | onSubmit | onTouched | all) dùng để cấu hình một chiến lược validate trước khi submit form.
    // onSubmit: sẽ thực hiện validate khi submit form, và những element không hợp lệ sẽ được lắng nghe sự thay đổi và sau đó tiếp tục validate những element đó bằng mode onChange.
    mode: 'onSubmit',

    // onChange: sẽ thực hiện validate khi mỗi khi onChange element, và nó dẫn đến re-render nhiều lần (cần cân nhắc khi sử dụng).
    reValidateMode: 'onChange',

    // defaultValues: thiết lập giá trị mặc định ( lần đầu ) cho form.
    defaultValues: {},
    resolver: undefined,
    context: undefined,

    //criteriaMode: có các giá trị (firstError | all). Đối với firstError sẽ chỉ nhận được một lỗi đầu tiên, all sẽ nhận được tất cả lỗi.
    criteriaMode: "firstError",
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
    delayError: undefined
  }
  )

  return (


    <><><><div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <select value={context.locale} onChange={context.selectLanguage}>
          <option value='en'>English</option>
          <option value='fr'>French</option>
          <option value='ar'>Arabic</option>
          <option value='vn'>Vietnam</option>

        </select>
        <p>
          <FormattedMessage
            id="app.header"
            defaultMessage="Edit the files and save to reload"
            values={{ fileName: 'src/App.js', code: (word) => <strong>{word}</strong> }} />
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FormattedMessage
            id="app.content"
            defaultMessage="Learn React" />

        </a>
        <FormattedMessage
          id="app.channel.plug"
          defaultMessage="Tutorial brought to you by Lokalise"
          values={{ blogName: "Lokalise" }} />
        <br />
        <FormattedPlural
          id="app.plural"
          defaultMessage="{amount, plural, =0 {no languages} one {# one language} few {# several languages} many {# lots of languages} other {# wrong fromat}}"
          values={{ amount: 90 }} />
        <br />
        <FormattedDate
          value={props.date}
          year='numeric'
          month='long'
          day='numeric'
          weekday='long' />
        <br />
        <FormattedNumber
          value={20.42}
          style="currency"
          currencyDisplay="symbol"
          currency="USD" /><br />
        <FormattedNumber
          value={10000} />
        <br />
        <FormattedTime
          value={new Date()}
          hour="numeric"
          minute="numeric"
          second="numeric"
          timeZoneName="long" />
      </header>

      {/* SỬ DỤNG REACT ROUTER */}

      {/* Route có nhiệm vụ render component theo path được chỉ định.
Trong trường hợp ở trên Route có path là / có thêm một props nữa là exact bởi hầu hết các path đều thông qua.
Khi một route không có thuộc tính path thì render component khi URL không tồn tại. */}
    </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </>


      {/* SỬ DỤNG REACT-HOOK-FORM */}

      {/* Hàm handleSubmit sẽ validate trước khi gọi hàm onSubmit */}
      <form onSubmit={handleSubmit(onSubmit)}>

        {/* đăng kí input cho Hook vói tên example */}
        <input defaultValue="test" {...register("example")} />

        {/* đăng kí thẻ input với React-Hook-Form với tên "exampleRequired"
    // validate là required */}
        <input {...register("exampleRequired", { required: true })} />

        {/* xử lý lỗi bằng errrors */}
        {errors.exampleRequired && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </>
    </>

  );


}


// SỬ DỤNG REDUX

// Gán dispatch thành props
// mapDispatchToProps: giúp chuyển dispatch trong redux thành props. 
// Giả sử muốn thực hiện dispatch action actAddNote thì chỉ cần gọi props.addNote()
const mapDispatchToProps = (dispatch) => {
  return {
    addNote: (content) => {
      dispatch(actAddNote(content))
    }
  }
}

//Gán giá trị của state thành props
//mapStateToProps: giúp chuyển state sang thành props sử dụng trong component.
const mapStateToProps = (state, ownProps) => {
  return {
    note: state.note
  }
}



//Export component với két nối redux.
export default connect(mapStateToProps, mapDispatchToProps)(App);
