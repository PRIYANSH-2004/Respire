import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
import { Formik } from "formik";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "react-native-paper";
import Users from "../../assets/userData";

const loginValidationSchema = yup.object().shape({
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
});

const SignIn = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();
  const [loginError, setLoginError] = useState("");

  const handleLogin = (values, { setSubmitting }) => {
    const foundUser = Users.find(
      (user) =>
        user.user_id === values.user_id && user.password === values.password
    );

    if (foundUser) {
      Alert.alert("Login Successful", "Welcome!", [
        {
          text: "OK",
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            });
          },
        },
      ]);
    } else {
      Alert.alert("Login Failed", "Invalid User ID or Password");
    }
    setSubmitting(false);
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
          initialValues={{ user_id: "", password: "" }}
          validationSchema={loginValidationSchema}
          onSubmit={handleLogin}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <View>
              <TextInput
                style={styles.input}
                placeholder="User ID"
                onChangeText={handleChange("user_id")}
                onBlur={handleBlur("user_id")}
                value={values.user_id}
                autoCapitalize="none"
                placeholderTextColor="#666"
              />
              {touched.user_id && errors.user_id && (
                <Text style={styles.errorText}>{errors.user_id}</Text>
              )}

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

              {loginError ? (
                <Text style={styles.errorText}>{loginError}</Text>
              ) : null}

              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
                disabled={isSubmitting}
              >
                <Text style={styles.buttonText}>
                  {isSubmitting ? "Logging In..." : "Login"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.newUserButton}
                onPress={() => {
                  navigation.navigate("SignUp");
                }}
              >
                <Text style={styles.createTuttonText}>Create new account</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </LinearGradient>
  );
};

export default SignIn;

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
  passwordContainer: {
    position: "relative",
    justifyContent: "center",
  },
  passwordInput: {
    paddingRight: 40, // extra padding for the eye icon
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    height: 80,
    justifyContent: "center",
  },
  newUserButton: {
    backgroundColor: "#ffff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 45,
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
  createTuttonText: {
    color: "black",
    fontSize: 14,
    fontWeight: "600",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});
