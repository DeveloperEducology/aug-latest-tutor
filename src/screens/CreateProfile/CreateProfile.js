import React, { useState } from "react";
import { View, ScrollView, Text, Button } from "react-native";
import { Input, CheckBox } from "react-native-elements";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Header2 from "../../components/Header2";
import { ProgressStep, ProgressSteps } from "../../components/ProgressSteps";

const values = {
  contact: {
    phone: "123-456-7890",
    email: "dummyemail@example.com",
    address: "123 Main St, Springfield, USA",
  },
  education: [
    {
      year: "2020",
      degree: "B.Sc. in Computer Science",
      university: "Springfield University",
    },
    {
      year: "2018",
      degree: "High School Diploma",
      university: "Springfield High School",
    },
  ],
  expertise: {
    uiux: true,
    visualDesign: false,
    storyboards: true,
    userFlows: false,
    processFlows: true,
  },
  experience: [
    {
      year: "2021-2023",
      companyName: "Tech Solutions Inc.",
      position: "UI/UX Designer",
      description:
        "Worked on various web and mobile app design projects, focusing on user experience and interface design.",
    },
    {
      year: "2019-2021",
      companyName: "Creative Studio",
      position: "Graphic Designer",
      description:
        "Designed visual content and branding materials for clients across different industries.",
    },
  ],
  languages: {
    english: true,
    spanish: false,
  },
  references: [
    {
      name: "John Doe",
      position: "Manager",
      phone: "987-654-3210",
      email: "johndoe@example.com",
    },
    {
      name: "Jane Smith",
      position: "Senior Designer",
      phone: "555-555-5555",
      email: "janesmith@example.com",
    },
  ],
};

const CreateProfile = ({ navigation }) => {
  const { control, handleSubmit } = useForm({ defaultValues: values });
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const previousStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  const { fields: educationFields, append: appendEducation } = useFieldArray({
    control,
    name: "education",
  });

  const { fields: experienceFields, append: appendExperience } = useFieldArray({
    control,
    name: "experience",
  });

  const { fields: referenceFields, append: appendReference } = useFieldArray({
    control,
    name: "references",
  });

  const onSubmit = (data) => {
    console.log(data, data);
  };

  return (
    <View style={{ marginBottom: 60 }}>
      <Header2
        title="Create Profile"
        isBackButtonVisible={true}
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView style={{ padding: 20, marginBottom: 30 }}>
        <ProgressSteps activeStep={activeStep}>
          <ProgressStep
            onNext={nextStep}
            onPrevious={previousStep}
            isFirstStep={activeStep === 0}
            // label="Contact Information"
          >
            <Text>Contact Information</Text>
            <Controller
              control={control}
              name="contact.phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Phone"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <Controller
              control={control}
              name="contact.email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <Controller
              control={control}
              name="contact.address"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Address"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </ProgressStep>
          <ProgressStep onNext={nextStep} onPrevious={previousStep}>
            <Text>Education</Text>
            {educationFields.map((item, index) => (
              <View key={item.id}>
                <Controller
                  control={control}
                  name={`education.${index}.year`}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      placeholder="Year"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`education.${index}.degree`}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      placeholder="Degree"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`education.${index}.university`}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      placeholder="University"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
              </View>
            ))}
            <Button
              title="Add Education"
              onPress={() =>
                appendEducation({ year: "", degree: "", university: "" })
              }
            />
          </ProgressStep>
          <ProgressStep
            onNext={nextStep}
            onPrevious={previousStep}
            // label="Expertise"
          >
            <Text>Expertise</Text>
            <Controller
              control={control}
              name="expertise.uiux"
              render={({ field: { value, onChange } }) => (
                <CheckBox
                  title="UI/UX"
                  checked={value}
                  onPress={() => onChange(!value)}
                />
              )}
            />
            <Controller
              control={control}
              name="expertise.visualDesign"
              render={({ field: { value, onChange } }) => (
                <CheckBox
                  title="Visual Design"
                  checked={value}
                  onPress={() => onChange(!value)}
                />
              )}
            />
            <Controller
              control={control}
              name="expertise.storyboards"
              render={({ field: { value, onChange } }) => (
                <CheckBox
                  title="Storyboards"
                  checked={value}
                  onPress={() => onChange(!value)}
                />
              )}
            />
            <Controller
              control={control}
              name="expertise.userFlows"
              render={({ field: { value, onChange } }) => (
                <CheckBox
                  title="User Flows"
                  checked={value}
                  onPress={() => onChange(!value)}
                />
              )}
            />
            <Controller
              control={control}
              name="expertise.processFlows"
              render={({ field: { value, onChange } }) => (
                <CheckBox
                  title="Process Flows"
                  checked={value}
                  onPress={() => onChange(!value)}
                />
              )}
            />
          </ProgressStep>
          <ProgressStep
            onNext={nextStep}
            onPrevious={previousStep}
            // label="Experience"
          >
            <Text>Experience</Text>
            {experienceFields.map((item, index) => (
              <View key={item.id}>
                <Controller
                  control={control}
                  name={`experience.${index}.year`}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      placeholder="Year"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`experience.${index}.companyName`}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      placeholder="Company Name"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`experience.${index}.position`}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      placeholder="Position"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`experience.${index}.description`}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      placeholder="Description"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
              </View>
            ))}
            <Button
              title="Add Experience"
              onPress={() =>
                appendExperience({
                  year: "",
                  companyName: "",
                  position: "",
                  description: "",
                })
              }
            />
          </ProgressStep>

          <ProgressStep
            onNext={nextStep}
            onPrevious={previousStep}
            // label="Languages"
          >
            <Text>Languages</Text>
            <Controller
              control={control}
              name="languages.english"
              render={({ field: { value, onChange } }) => (
                <CheckBox
                  title="English"
                  checked={value}
                  onPress={() => onChange(!value)}
                />
              )}
            />
            <Controller
              control={control}
              name="languages.spanish"
              render={({ field: { value, onChange } }) => (
                <CheckBox
                  title="Spanish"
                  checked={value}
                  onPress={() => onChange(!value)}
                />
              )}
            />
          </ProgressStep>
        </ProgressSteps>
      </ScrollView>
    </View>
  );
};

export default CreateProfile;
