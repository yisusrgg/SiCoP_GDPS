import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Metas from "./Form3";
import Form4 from "./Form4";
import Form5 from "./Form5";
import Form6 from "./Form6";
import Form7 from "./Form7";

const steps = [
  "Datos generales",
  "Acerca de",
  "Metas",
  "Investigadores",
  "Estudiantes",
  "Empresa",
  "Convocatoria",
];

function Register() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 3 || step === 4;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function renderSwitch(param) {
    switch(param) {
      case 0:
        return <Form1 handleNext={handleNext}/>;
      case 1:
        return <Form2 handleNext={handleNext} handleBack={handleBack}/>;
      case 2:
        return <Metas IsRegister={true} handleNext={handleNext} handleBack={handleBack}/>;
      case 3:
        return <Form4 handleNext={handleNext} handleBack={handleBack} />;
      case 4:
        return <Form5 handleNext={handleNext} handleBack={handleBack} />;
      case 5:
        return <Form6 handleNext={handleNext} handleBack={handleBack} />;
      case 6:
        return <Form7 handleBack={handleBack} />;
      default:
        return 'foo';
    }
  }

  return (
    <Box sx={{ width: "100%", padding: "100px" }}>
       <Typography variant="h3" align="center" sx={{ mb: 3 }}>
            {steps[activeStep]}
          </Typography>

      {/*Stepper component */}
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">(opcional)</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        // Final view

        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            ¡Proyecto registrado exitosamente!
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        // Particular views

        <React.Fragment>
         

          {renderSwitch(activeStep)}

         
        </React.Fragment>
      )}
    </Box>
  );
}

export default Register;
