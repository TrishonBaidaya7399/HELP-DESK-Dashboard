// import PropTypes from 'prop-types';
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import SwitchSelector from "react-switch-selector";

const Settings = () => {
  const options = [
    {
      label: <span>BM</span>,
      value: {
        BM: true,
      },
      selectedBackgroundColor: "black",
      selectedFontColor: "#fff",
    },
    {
      label: <span>BI</span>,
      value: {
        BI: true,
      },
      selectedBackgroundColor: "black",
      selectedFontColor: "#fff",
    },
  ];

  const onChange = (newValue) => {
    console.log(newValue);
  };

  const initialSelectedIndex = options.findIndex(
    ({ value }) => value === "bar"
  );
  const [general, setGeneral] = useState(true);
  const [contact, setContact] = useState(true);
  const [email, setEmail] = useState(true);
  const [authorization, setAuthorization] = useState(true);
  const [notification, setNotification] = useState(true);
  return (
    <div className="p-8 mb-auto w-full">
      <h1 className="text-2xl font-semibold text-left">Settings</h1>
      <div className="settings w-full my-6">
        <button
          onClick={() => setGeneral(!general)}
          className="title w-full bg-[#55D6C2] flex gap-6 text-xl font-semibold items-center justify-start pl-6 h-10 border-b-2 border-blue-400"
        >
          <p>General</p>
          {general ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </button>
        {general && (
          <>
            <div className="ml-[5%] w-[95%] bg-gray-300 flex gap-6 text-xl font-semibold items-center justify-between px-6 h-10">
              <p>Language</p>
              <div className="language-toggle">
                <div
                  className="your-required-wrapper text-white border-2 border-black rounded-full"
                  style={{ width: 100, height: 30 }}
                >
                  <SwitchSelector
                    className=""
                    onChange={onChange}
                    options={options}
                    initialSelectedIndex={initialSelectedIndex}
                    backgroundColor={"#55DD6C2"}
                    fontSize={14}
                    selectedBackgroundColor={"black"}
                    selectedFontColor={"black"}
                  />
                </div>
              </div>
            </div>
            <div className="ml-[5%] w-[95%] bg-gray-400 flex gap-6 text-xl font-semibold items-center justify-between px-6 h-10">
              <p>Data Backup</p>
              <input type="checkbox"  className="checkbox border-2 border-black bg-white" />
            </div>
          </>
        )}
        <button
          onClick={() => setContact(!contact)}
          className="title w-full bg-[#55D6C2] flex gap-6 text-xl font-semibold items-center justify-start pl-6 h-10 border-b-2 border-blue-400"
        >
          <p>Connect To</p>
          {contact ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </button>
        {contact && (
          <>
           <div className="ml-[5%] w-[95%] bg-gray-300 flex gap-6 text-xl font-semibold items-center justify-between px-6 h-10">
              <p>GoDash</p>
              <input type="checkbox"  className="checkbox border-2 border-black bg-white" />
            </div>
            <div className="ml-[5%] w-[95%] bg-gray-400 flex gap-6 text-xl font-semibold items-center justify-between px-6 h-10">
              <p>SuperController</p>
              <input type="checkbox"  className="checkbox border-2 border-black bg-white" />
            </div>
          </>
        )}
        <button
          onClick={() => setEmail(!email)}
          className="title w-full bg-[#55D6C2] flex gap-6 text-xl font-semibold items-center justify-start pl-6 h-10 border-b-2 border-blue-400"
        >
          <p>Email</p>
          {email ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </button>
        {email && (
          <>
            <div className="ml-[5%] w-[95%] bg-gray-300 flex gap-6 text-xl font-semibold items-center justify-between px-6 h-10">
              <p>Enable SMTP</p>
              <input type="checkbox"  className="checkbox border-2 border-black bg-white" />
            </div>
          </>
        )}
        <button
          onClick={() => setAuthorization(!authorization)}
          className="title w-full bg-[#55D6C2] flex gap-6 text-xl font-semibold items-center justify-start pl-6 h-10 border-b-2 border-blue-400"
        >
          <p>Authorization</p>
          {authorization ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </button>
        {authorization && (
          <>
           <div className="ml-[5%] w-[95%] bg-gray-300 flex gap-6 text-xl font-semibold items-center justify-between px-6 h-10">
              <p>Edit authorization</p>
              <input type="checkbox"  className="checkbox border-2 border-black bg-white" />
            </div>
            <div className="ml-[5%] w-[95%] bg-gray-400 flex gap-6 text-xl font-semibold items-center justify-between px-6 h-10">
              <p>Authority Level</p>
              <input type="checkbox"  className="checkbox border-2 border-black bg-white" />
            </div>
          </>
        )}
        <button
          onClick={() => setNotification(!notification)}
          className="title w-full bg-[#55D6C2] flex gap-6 text-xl font-semibold items-center justify-start pl-6 h-10 border-b-2 border-blue-400"
        >
          <p>Notification</p>
          {notification ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </button>
        {notification && (
          <>
           <div className="ml-[5%] w-[95%] bg-gray-300 flex gap-6 text-xl font-semibold items-center justify-between px-6 h-10">
              <p>Enable Notification</p>
              <input type="checkbox"  className="checkbox border-2 border-black bg-white" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

Settings.propTypes = {};

export default Settings;
