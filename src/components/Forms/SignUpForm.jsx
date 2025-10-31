import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomInputField from "../Input/Index";
import { addUser } from "../../Redux/features/Auth/userSlice";
import { useDispatch } from "react-redux";
const SignupForm = ({showListing, setShowListing}) => {
    const dispatch = useDispatch()
    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("Required"),
        city: Yup.string().required("Required"),
        userName: Yup.string().min(8, "UserName Must be 8 characters long").required("Required"),
    });
    return (
        <Formik
            initialValues={{ id: "", email: "", userName: "", city: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log("Form Data:", values);
                dispatch(addUser(values))
               setShowListing(false)
            }}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleSubmit,
                handleChange,
                resetForm,
                isSubmitting,
                setFieldValue,

            }) => (
                  <>
                    {!showListing && (
             
                <Form onSubmit={handleSubmit}>
                    <h2 className=" my-2 text-xl text-white">Add User Information</h2>
                    <CustomInputField
                        name="id"
                        type="text"
                        label={"User Id"}
                        placeholder="Enter User Id"

                        error={
                            errors.id && touched.id
                                ? errors.id
                                : ""
                        }
                        value={values.id}
                        onBlurHandle={handleBlur}
                        onChangeHandle={handleChange}
                    />
                    <CustomInputField
                        name="userName"
                        type="text"
                        label={"User Name"}
                        placeholder="Enter User name"

                        error={
                            errors.userName && touched.userName
                                ? errors.userName
                                : ""
                        }
                        value={values.userName}
                        onBlurHandle={handleBlur}
                        onChangeHandle={handleChange}
                    />
                    <CustomInputField
                        name="email"
                        type="email"
                        label={"Customer Email"}
                        placeholder="Enter Email"
                        error={
                            errors.email && touched.email
                                ? errors.email
                                : ""
                        }

                        value={values.email}
                        onBlurHandle={handleBlur}
                        onChangeHandle={handleChange}
                    />
                    <CustomInputField
                        name="city"
                        type="text"
                        label={"Customer City"}
                        placeholder="Enter City"
                        error={
                            errors.city && touched.city
                                ? errors.city
                                : ""
                        }

                        value={values.city}
                        onBlurHandle={handleBlur}
                        onChangeHandle={handleChange}
                    />





                    <button className="bg-blue-700 text-white rounded-md py-2 w-full cursor-pointer hover:bg-blue-200 hover:text-blue-700" type="submit">Submit</button>
                </Form> ) }
                     </>
            )}
        </Formik>
    );
};

export default SignupForm;
