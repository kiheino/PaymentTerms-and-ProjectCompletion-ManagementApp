import {
  Box,
  Container,
  Flex,
  Wrap,
  Spacer,
  Center,
  CloseButton,
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
} from "@chakra-ui/react";
import { memo, FC, useState } from "react";
import { ProgressClaimsPopover } from "../popovers/ProgressClaimsPopover";
import { useSelector } from "react-redux";
import { CompletedClaimsPopover } from "../popovers/CompletedClaimsPopover";
import { RootState } from "../../../redux/store";
import { EditIcon } from "@chakra-ui/icons";
import projectApi from "../../../api/projectApi";

type Props = {
  projectId: string;
  deleteProject: (id: string) => void;
};

export const ProjectContainer: FC<Props> = memo((props) => {
  const projects = useSelector(
    (state: RootState) => state.homeManagement.projectList
  );
  const project = projects.find(({ _id }) => _id === props.projectId);

  const localTime = new Date(project!.scheduledCompletionDate);
  const [year, month, day] = [
    localTime.getFullYear(),
    localTime.getMonth() + 1,
    localTime.getDate(),
  ];
  const formattedDate = year + "/" + month + "/" + day;
  const [newScheduledDate, setNewScheduledDate] = useState(formattedDate);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewScheduledDate(event.target.value);
  };
  async function saveChange() {
    try {
      if (newScheduledDate.match(/\d{4}\/\d{1,2}\/\d{1,2}/)) {
        const updates = {
          id: props.projectId,
          scheduledCompletionDate: newScheduledDate,
        };
        const res = await projectApi.update(updates);
        return console.log(res.data);
      } else {
        console.log("YYYY/MM/DDの形式で入力してください");
      }
    } catch (err) {
      console.log(err);
      alert("有効な日付を入力してください");
    }
  }

  return (
    <Center>
      <Container
        m="1"
        p="1"
        px="0.3rem"
        maxW={{ base: "90%", lg: "892px" }}
        borderWidth="1px"
        borderRadius="md"
        overflow="hidden"
        shadow="sm"
      >
        <Flex alignItems="center">
          <Box
            fontWeight="semibold"
            fontSize="md"
            sx={{ whiteSpace: "nowrap" }}
            textOverflow="ellipsis"
          >
            {project!.projectName.length < 11
              ? project!.projectName
              : project!.projectName.substring(0, 10) + "..."}
          </Box>
          <Box
            sx={{ whiteSpace: "nowrap" }}
            textOverflow="ellipsis"
            letterSpacing="wide"
            fontSize="md"
            px="0.5rem"
          >
            {project!.client.clientName.length < 11
              ? project!.client.clientName
              : project!.client.clientName.substring(0, 10) + "..."}
          </Box>

          <Box color="gray.400" fontWeight="normal" fontSize="0.9rem">
            完了予定日:
          </Box>
          <HStack>
            <Editable
              value={newScheduledDate}
              onSubmit={saveChange}
              color="gray.400"
              height="100%"
              w="90px"
              pl="0.5rem"
            >
              <EditablePreview color="gray.400" w="85px" />
              <EditableInput
                onChange={handleChange}
                value={newScheduledDate}
                color="gray.800"
                height="20px"
                w="80px"
                m="0"
              />
            </Editable>
            <EditIcon boxSize="0.8rem" color="gray.400" viewBox="0 0 24 24" />
          </HStack>
          <Spacer />

          <Box fontSize="sm" mr="1">
            {project?.client.cutoffDate === "99"
              ? "末"
              : project?.client.cutoffDate}
            日締
          </Box>

          <Wrap>
            <ProgressClaimsPopover projectId={props.projectId} />
            <CompletedClaimsPopover projectId={props.projectId} />
          </Wrap>

          <CloseButton
            size="sm"
            ml={{ base: 0, md: 1 }}
            color="gray.500"
            onClick={() => props.deleteProject(props.projectId)}
          />
        </Flex>
      </Container>
    </Center>
  );
});
