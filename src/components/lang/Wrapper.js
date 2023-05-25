// Thay đổi ngôn ngữ bằng 1 danh sách
// Sử dụng Wrapper để thay đổi ngôn ngữ bất cứ khi nào
// Danh sách file các ngôn ngữ trong file lang
import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import { English, Vietnamese } from "c:/Users/Admin/VSC workspace/ReactJs Project/QLTS/src/assets/lang/index";

export const Context = React.createContext();

// Khi React đang render một component đăng ký đối tượng này,
// nó sẽ đọc giá trị context hiện tại trong Provider phù hợp gần nhất ngay phía trên nó.
// Có thể cung cấp giá trị mặc định ở đây là 'en' nhưng không cần thiết vì đang sử dụng trình điều hướng ngôn ngữ.
const local = navigator.language;

let lang;
if (local === 'en') {
    lang = English;
} else {
    lang = Vietnamese;
}

const Wrapper = (props) => {
    const [locale, setLocale] = useState(local);

    const [messages, setMessages] = useState(lang);

    function selectLanguage(e) {
        const newLocale = e.target.value;
        setLocale(newLocale);
        if (newLocale === 'en') {
            setMessages(English);
        } else {
            setMessages(Vietnamese);
        }
    }

    return (
        <Context.Provider value={{ locale, selectLanguage }}>
            <IntlProvider messages={messages} locale={locale}>
                {props.children}
            </IntlProvider>
        </Context.Provider>

    );
}

export default Wrapper;