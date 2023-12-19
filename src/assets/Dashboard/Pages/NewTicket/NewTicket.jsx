import { useContext, useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { TfiClip } from "react-icons/tfi";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../Providers/AuthProvider";

const NewTicket = () => {
  const [isSubmitDisabled, setSubmitDisabled] = useState(true);
  const [verified, setVerified] = useState(false);
  const [pasteContent, setPasteContent] = useState("");
  const { user } = useContext(AuthContext);

  const handlePaste = async (e) => {
    e.preventDefault();
    try {
      const clipboardData = await navigator.clipboard.readText();
      setPasteContent(clipboardData);
    } catch (error) {
      console.error("Error pasting from clipboard:", error);
    }
  };

  const onChange = (value) => {
    console.log("Captcha value:", value);
    setVerified(true); // Assuming reCAPTCHA verification is successful
    setSubmitDisabled(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const ticket = form.elements.ticket.value;
    const date = form.elements.date.value;
    const name = form.elements.name.value;
    const department = form.elements.department.value;
    const subject = form.elements.subject.value;
    const category = form.elements.category.value;
    const type = form.elements.type.value;
    const property = form.elements.property.value;
    const description = form.elements.description.value;
    if (user && user.email) {
      const formData = {
        ticket,
        date,
        name,
        department,
        subject,
        category,
        type,
        property,
        description,
        userEmail: user.email,
        status: "In Progress"
      };
      console.log(formData);
      try {
        const ticketRes = await fetch("http://localhost:5000/ticket", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (ticketRes.ok) {
          const responseData = await ticketRes.json();
          if (responseData.insertedId) {
            form.reset();
            Swal.fire({
              title: "Submitted!",
              text: "Ticket is Created successfully!",
              icon: "success",
              confirmButtonText: "Ok!",
            });
            console.log("Ticket Data from server:", responseData);
          }
        } else {
          console.error("Error submitting ticket:", ticketRes.statusText);
        }
      } catch (error) {
        console.error("Error submitting ticket:", error);
      }
    }
  };

  useEffect(() => {
    setSubmitDisabled(!verified);
  }, [verified]);

  return (
    <div className="pt-6 pb-12 mb-auto">
      <h1 className="text-2xl font-semibold text-center">Create New Ticket</h1>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="form flex flex-col gap-4 max-w-full mt-8">
          <div className="flex gap-6 w-full">
            <div className="flex gap-2 items-center w-full">
              <h1 className="w-[130px] font-semibold ">Ticket No.</h1>
              <input
                required
                name="ticket"
                type="number"
                placeholder="Ticket No."
                className="text-gray-400 bg-gray-300 rounded-lg h-[35px] px-4 w-full drop-shadow-lg"
              />
            </div>
            <div className="flex gap-2 items-center w-full">
              <h1 className="w-[160px] font-semibold ">Date:</h1>
              <input
                required
                name="date"
                type="date"
                placeholder="Date"
                className="text-gray-400 bg-gray-300 rounded-lg h-[35px] px-4 w-full drop-shadow-lg"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex gap-2 items-center w-full">
              <h1 className="w-[130px] font-semibold ">Name</h1>
              <input
                required
                name="name"
                type="text"
                placeholder="Your Name"
                className="text-gray-400 bg-gray-300 rounded-lg h-[35px] px-4 w-full drop-shadow-lg"
              />
            </div>
            <div className="flex gap-2 items-center w-full">
              <h1 className="w-[160px] font-semibold ">Department</h1>
              <input
                required
                name="department"
                type="text"
                placeholder="Department"
                className="text-gray-400 bg-gray-300 rounded-lg h-[35px] px-4 w-full drop-shadow-lg"
              />
            </div>
          </div>
        </div>

        <div className="w-full">
          <label className="form-control w-full">
            <div className="label">
              <span className="mt-2 font-semibold ">Subject</span>
            </div>
            <input
              required
              type="text"
              name="subject"
              placeholder="Subject"
              className="w-full px-4 bg-gray-300 rounded-lg h-[40px]"
            />
          </label>
        </div>

        <div className="flex gap-6 w-full">
          <div className="flex flex-col w-full">
            <div className="w-full">
              <label className="form-control w-full">
                <div className="label">
                  <span className="mt-2 font-semibold ">Category</span>
                </div>
                <select
                  required
                  name="category"
                  className="w-full text-gray-400 px-4 bg-gray-300 rounded-lg h-[40px]"
                >
                  <option disabled selected>
                    Category
                  </option>
                  <option>Game of Thrones</option>
                  <option>Lost</option>
                  <option>Breaking Bad</option>
                  <option>Walking Dead</option>
                </select>
              </label>
            </div>

            <div className="w-full">
              <label className="form-control w-full">
                <div className="label">
                  <span className="mt-2 font-semibold ">Type</span>
                </div>
                <select
                  required
                  name="type"
                  className="w-full text-gray-400 px-4 bg-gray-300 rounded-lg h-[40px]"
                >
                  <option disabled selected>
                    Type
                  </option>
                  <option>Game of Thrones</option>
                  <option>Lost</option>
                  <option>Breaking Bad</option>
                  <option>Walking Dead</option>
                </select>
              </label>
            </div>

            <div className="w-full">
              <label className="form-control w-full">
                <div className="label">
                  <span className="mt-2 font-semibold ">Property</span>
                </div>
                <input
                  required
                  type="text"
                  name="property"
                  placeholder="Property"
                  className="w-full px-4 bg-gray-300 rounded-lg h-[40px]"
                />
              </label>
            </div>
          </div>

          <div className="w-full relative">
            <label className="form-control w-full">
              <div className="label">
                <span className="font-semibold mt-2">Description:</span>
              </div>
              <textarea
                required
                name="description"
                id="descriptionTextArea"
                defaultValue={pasteContent}
                className="textarea h-[220px] bg-gray-300 w-full"
                placeholder="Description"
              ></textarea>
              <button
                className="absolute bottom-2 right-2 bg-[#55D6C2] text-black text-lg p-2 rounded"
                onClick={handlePaste}
              >
                <TfiClip />
              </button>
            </label>
          </div>
        </div>

        <div className="recaptcha  flex justify-between mt-6 items-center">
          <div className="recaptcha mt-auto">
            <ReCAPTCHA
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={onChange}
            />
          </div>
          <div className="">
            <input
              type="submit"
              disabled={isSubmitDisabled}
              value="Submit"
              className="btn bg-[#55D6C2] h-[40px] font-semibold px-8 rounded-lg"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewTicket;
