import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import CustomError from "./components/CustomError";
import CoursePage from "./components/CoursePage";
import CategoryCourses from "./components/CategoryCourses";
import ViewAllCourses from "./components/ViewAllCourses";
import CreateCourse from "./components/CreateCourse";
import SplashPage from "./components/SplashPage";
import UpdateCourse from "./components/UpdateCourse";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <ProtectedRoute exact path="/courses/new">
            <CreateCourse />
          </ProtectedRoute>
          <ProtectedRoute exact path="/courses/course/:courseId/update">
            <UpdateCourse />
          </ProtectedRoute>
          <Route exact path="/courses/course/:courseId">
            <CoursePage />
          </Route>
          <Route exact path="/courses/:categoryId">
            <CategoryCourses />
          </Route>
          <Route exact path="/courses">
            <ViewAllCourses />
          </Route>
          <Route exact path="/login" >
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <SplashPage />
          </Route>
          <CustomError />
        </Switch>
      )}
    </>
  );
}

export default App;
