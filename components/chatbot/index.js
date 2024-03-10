import ChatBot from "react-simple-chatbot";
import Wrapper from "./styles";
import { ThemeProvider } from "styled-components";
import steps from "./steps";

const theme = {
 background: "#f5f8fb",
 fontFamily: "Helvetica Neue",
 headerBgColor: "#EF6C00",
 headerFontColor: "#fff",
 headerFontSize: "15px",
 botBubbleColor: "#EF6C00",
 botFontColor: "#fff",
 userBubbleColor: "#fff",
 userFontColor: "#4a4a4a",
};

// const steps = [
//  {
//     id: '1',
//     message: 'What is your name?',
//     trigger: '2',
//  },
//  {
//     id: '2',
//     user: true,
//     trigger: '3',
//  },
//  {
//     id: '3',
//     message: 'Hi {previousValue}, nice to meet you!',
//     trigger: '4',
//  },
//  {
//     id: '4',
//     message: 'Select any service to proceed',
//     trigger: '5',
//  },
//  {
//     id: '5',
//     options: [
//       { label: 'Product', trigger: '6' },
//       { label: 'Service', trigger: '7' },
//     ],
//  },
//  {
//     id: '6',
//     message: 'Select a product:',
//     trigger: '8',
//  },
//  {
//     id: '7',
//     message: 'Select a service:',
//     trigger: '9',
//  },
//  {
//     id: '8',
//     options: [
//       { label: 'Video Production', trigger: '10' },
//       { label: 'Animation', trigger: '10' },
//       { label: 'Design Services', trigger: '10' },
//     ],
//  },
//  {
//     id: '9',
//     options: [
//       { label: 'Video Editing', trigger: '10' },
//       { label: 'Promotion Services', trigger: '10' },
//       { label: 'Consulting', trigger: '10' },
//     ],
//  },
//  {
//     id: '10',
//     message: 'Awesome! We will be connecting you to our {previousValue} service executive!',
//     end: true,
//  },
// ];

function ChatbotWrapper() {
 return (
    <Wrapper>
      <ThemeProvider theme={theme}>
        {/* <ChatBot steps={steps} floating recognitionEnable /> */}
        <ChatBot steps={steps} floating recognitionEnable={false} />
      </ThemeProvider>
    </Wrapper>
 );
}

export default ChatbotWrapper;