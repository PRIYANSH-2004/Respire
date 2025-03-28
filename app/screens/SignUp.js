import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import * as yup from "yup";
import { Button } from "react-native-paper";
import Users from "../../assets/userData";

const newUserSchema = yup.object().shape({
  user_id: yup.string().required("User ID is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Za-z]/, "Password must contain at least one letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@, $, !, %, *, ?, &)"
    )
    .required("Password is required"),
  name: yup.string().required("Name is required"),
  gender: yup.string().required("Gender is required"),
  dob: yup.date().required("D.O.B. is required"),
});

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();
  // console.log(Users);
  const createUser = async (values, { setSubmitting }) => {
    console.log("******************");
    console.log(values.name);
    try {
      // Validate required fields manually
      if (
        !values.user_id ||
        !values.password ||
        !values.name ||
        !values.gender
      ) {
        throw new Error("Please fill all required fields");
      }

      const newUser = {
        user_id: values.user_id,
        password: values.password,
        name: values.name,
        gender: values.gender,
        // dob: values.dob, // Include dob if it's part of your form
      };
      console.log("New user created:", newUser);
      Users.push(newUser);

      // console.log("Current Users:", Users);

      // Navigate to SignIn page
      navigation.navigate("SignIn");
    } catch (error) {
      console.error("User creation error:", error);
      Alert.alert("Error", error.message || "Failed to create user");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <LinearGradient
      colors={["#4c669f", "#3b5998", "#192f6a"]}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../../assets/RespireLogo2.png")}
        />
        <Formik
          initialValues={{
            user_id: "",
            password: "",
            name: "",
            gender: "",
            dob: "",
          }}
          validationSchema={newUserSchema}
          onSubmit={createUser}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            isSubmitting,
            setFieldValue,
            errors,
          }) => (
            <View>
              <TextInput
                style={styles.input}
                placeholder="User ID"
                onChangeText={handleChange("user_id")}
                onBlur={handleBlur("user_id")}
                value={values.user_id}
                autoCapitalize="none"
                placeholderTextColor={"#666"}
              />
              {touched.user_id && errors.user_id && (
                <Text style={styles.errorText}>{errors.user_id}</Text>
              )}

              <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                autoCapitalize="none"
                placeholderTextColor={"#666"}
              />
              {touched.name && errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}

              {/* Gender Picker */}
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={values.gender}
                  onValueChange={(itemValue) =>
                    setFieldValue("gender", itemValue)
                  }
                  style={styles.picker}
                >
                  <Picker.Item label="Select Gender" value="" />
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>
              {touched.gender && errors.gender && (
                <Text style={styles.errorText}>{errors.gender}</Text>
              )}

              {/* Password Input */}
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  placeholder="Password"
                  secureTextEntry={!passwordVisible}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  placeholderTextColor="#666"
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                >
                  <MaterialIcons
                    name={passwordVisible ? "visibility" : "visibility-off"}
                    size={24}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              {/* Create an Account Button */}
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  createUser(values, { isSubmitting });
                }}
                disabled={isSubmitting}
              >
                <Text style={styles.buttonText}>
                  {isSubmitting ? "Signing Up..." : "Sign Up"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </LinearGradient>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  pickerContainer: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  passwordContainer: {
    position: "relative",
    justifyContent: "center",
  },
  passwordInput: {
    paddingRight: 40, // Extra padding for the eye icon
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    height: 80,
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red", // Errors appear in red
    fontSize: 12,
    marginBottom: 10,
  },
});
