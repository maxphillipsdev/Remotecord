import { useState } from "preact/hooks";
import { FunctionalComponent, h } from "preact";
import { ChakraProvider } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Input, Flex, Button, InputGroup } from "@chakra-ui/react";

const App: FunctionalComponent = () => {
  const [value, setValue] = useState("");
  const toast = useToast();

  return (
    <div id="preact_root">
      <ChakraProvider>
        <Flex
          p="3rem"
          w="100%"
          h="100%"
          justifyContent="center"
          alignItems="center"
        ></Flex>
        <InputGroup paddingInline="3rem">
          <Input
            placeholder="Hello!"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          <Button
            onClick={(e) => {
              e.preventDefault();
              fetch("/api/887227864989179917/message", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: value }),
              }).then((res) => {
                toast({
                  title: "Message sent.",
                  description: `Sent the message ${value}`,
                  status: "success",
                  duration: 9000,
                });
                setValue("");
              });
            }}
          >
            Send
          </Button>
        </InputGroup>
      </ChakraProvider>
    </div>
  );
};

export default App;
