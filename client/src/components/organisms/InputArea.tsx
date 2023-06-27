import { Button, VStack, Center, Select } from "@chakra-ui/react";
import React, { FC, memo, useState, useEffect } from "react";
import "dayjs/locale/ja";
import { NamedInput } from "../molecules/inputs/NamedInput";
import { NamedSelect } from "../molecules/inputs/NamedSelect";
import { NamedInputWithUnit } from "../molecules/inputs/NamedInputWithUnit";
import { DateInput } from "@mantine/dates";
import projectApi from "../../api/projectApi";
import clientApi from "../../api/clientAPI";
import { useDispatch } from "react-redux";
import { refreshProjects } from "../../redux/features/homeSlice";
import { Client } from "../../types/api/Client";

type Project = {
  projectName: string;
  client: string;
  scheduledCompletionDate: Date | null;
  contractAmount: string;
};

export const InputArea: FC = memo(() => {
  const [project, setProject] = useState<Project>({
    projectName: "",
    client: "",
    scheduledCompletionDate: null,
    contractAmount: "",
  });
  const dispatch = useDispatch();

  const [isExpanded, setIsExpanded] = useState(false);
  const [clients, setClients] = useState([]);
  const [value, setValue] = useState<Date | null>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setProject((previtems) => {
      return { ...previtems, [name]: value };
    });
  }

  const getClients = async () => {
    try {
      const res = await clientApi.getAll();
      const clients = res.data;
      return clients;
    } catch (err) {
      console.log(err);
      alert("クライアントを取得出来ませんでした");
    }
  };

  useEffect(() => {
    if (value !== null) {
      setProject((prevState) => {
        return { ...prevState, scheduledCompletionDate: value };
      });
    }
  }, [value]);

  const onAdd = async (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();

    try {
      const res = await projectApi.register(project);
      console.log("受注が登録されました");
      console.log(res);
      dispatch(refreshProjects());
      setValue(null);
      setProject({
        projectName: "",
        client: "",
        scheduledCompletionDate: null,
        contractAmount: "",
      });
    } catch (err) {
      console.log(err);
      alert("未記入の項目があります");
    }
  };

  async function expand() {
    setIsExpanded(true);
    const clients = await getClients();
    setClients(clients);
  }

  return (
    <Center p="24px">
      <VStack>
        <VStack direction="row" spacing="4px" alignItems="left">
          <NamedInput
            name="projectName"
            text={isExpanded ? "現場名:" : ""}
            textWidth={{ base: "110px", md: "125px" }}
            placeholder={isExpanded ? "" : "新規受注を入力"}
            value={project.projectName}
            width="330px"
            onChange={handleChange}
            onClick={expand}
          />
          {isExpanded && (
            <>
              <NamedSelect
                text="契約先名:"
                textWidth={{ base: "110px", md: "125px" }}
              >
                <Select
                  height="27px"
                  w="330px"
                  name="client"
                  value={project.client}
                  onChange={(e) => {
                    setProject((prevItems) => {
                      return { ...prevItems, client: e.target.value };
                    });
                  }}
                >
                  <option></option>
                  {clients.map((client: Client) => {
                    return (
                      <option key={client._id} value={client.clientName}>
                        {client.clientName}
                      </option>
                    );
                  })}
                </Select>
              </NamedSelect>

              <NamedInputWithUnit
                text="契約金額（税抜):"
                textWidth={{ base: "110px", md: "125px" }}
                name="contractAmount"
                value={project.contractAmount}
                width="185px"
                unitName="円"
                onChange={handleChange}
              />
              <NamedSelect
                text="完了予定日:"
                textWidth={{ base: "110px", md: "125px" }}
              >
                <DateInput
                  name="scheduledCompletionDate"
                  clearable
                  valueFormat="YYYY/MM/DD"
                  height="27px"
                  size="xs"
                  locale="ja"
                  firstDayOfWeek={0}
                  allowDeselect
                  onChange={setValue}
                  value={value}
                  styles={{ input: { height: "25px", width: "185px" } }}
                  mx="auto"
                ></DateInput>
              </NamedSelect>
            </>
          )}
        </VStack>
        {isExpanded && (
          <Button
            onClick={onAdd}
            w="100px"
            size="sm"
            m="6px"
            bg="rgba(32,152,238,1)"
            color="white"
            _hover={{ opacity: 0.8 }}
            borderRadius="xl"
          >
            追加
          </Button>
        )}
      </VStack>
    </Center>
  );
});
