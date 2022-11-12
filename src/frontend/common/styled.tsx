import styled from "styled-components/native";
import Colors from "../constants/Colors";
import { defaultPadding } from "../constants/Layout";

export const StyledPressable = styled.Pressable`
  border: none;
  border-radius: 100px;
  padding: 15px 32px;
  background: ${Colors.light["dark-blue"]};
  color: white;
`;

export const StyledLabel = styled.Text`
  margin-top: 30px;
  display: flex;
  color: ${Colors.light["dark-blue"]};
  font-weight: bold;
  font-size: 16px;
`;

export const StyledInput = styled.TextInput`
  font-size: 16px;
  margin-top: 8px;
  border: 1px solid ${Colors.light["dark-blue"]};
  background-color: ${Colors.light.white};
  padding: 8px;
  height: 40px;
  width: 100%;
  border-radius: 6px;
  color: ${Colors.light.black};
`;
//   // TODO: FIX INPUT STATES
//   &:focus-visible,
//   &:active {
//     border: 1px solid ${Colors.light["dark-blue"]};
//     outline-color: ${Colors.light["dark-blue"]};
//   }
//   &:read-only {
//     background-color: ${Colors.light.gray};
//   }
//   &[type="checkbox"],
//   &[type="radio"] {
//     height: auto;
//     margin-top: 0;
//     margin-right: 10px;
//     align-self: center;
//   }
//   &[type="checkbox"] {
//     margin: 0 10px;
//     height: 20px;
//     width: 20px;
//   }
export const StyledForm = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 40px;
`;

export const FilterInput = styled.TextInput`
  width: 100%;
  height: 30px;
  border-radius: 35px;
  margin-bottom: 20px;
  border: 1px solid ${Colors.light.black};
  padding-left: 16px;
`;
export const SubmitPressable = styled.Pressable`
  border-radius: 35px;
  margin-bottom: 20px;
  background: ${Colors.light["light-blue"]};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px;
  margin-top: 30px;
`;

export const SubmitPressableText = styled.Text`
  color: ${Colors.light.black};
  font-size: 20px;
  margin-right: 8px;
  font-weight: bold;
`;

export const IconContainer = styled.View`
  padding: 7px;
  background-color: ${Colors.light.red};
  border-radius: 50px;
`;

export const StyledFilterInput = styled.TextInput`
  font-size: 20px;
  line-height: 22px;
  height: 60px;
  max-height: 60px;
  margin-top: 30px;
  margin-bottom: 20px;
  border: 1px solid ${Colors.light.gray};
  padding: 8px 25px;
  flex-grow: 1;
  border-radius: 60px;
`;

export const NoContentFoundText = styled.Text`
  color: ${Colors.light.black};
  font-size: 30px;
  margin-top: 30px;
  font-weight: bold;
`;

export const PaddingView = styled.View`
  padding: ${defaultPadding}px;
  width: 100%;
  padding-bottom: 100px;
  display: flex;
  align-items: center;
`;

export const shadowStyles = {
  margin: 10,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
};
