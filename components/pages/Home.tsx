import { FC, useEffect } from "react";
import { InputArea } from "../organisms/InputArea";
import { ProjectContainer } from "../molecules/cards/ProjectContainer";
import Header from "../layout/Header";
import { AppLayout } from "../layout/AppLayout";
import projectApi from "../../api/projectApi";
import invoiceApi from "../../api/invoiceApi";
import { useDispatch, useSelector } from "react-redux";
import {
  setProjects,
  refreshProjects,
  setunClaimedBills,
} from "../../redux/features/homeSlice";
import { RootState } from "../../redux/store";
import { Divider } from "@mantine/core";
import { ReadytoClaimContainer } from "../molecules/cards/ReadytoClaimContainer";

export const Home: FC = () => {
  const dispatch = useDispatch();
  const projects = useSelector(
    (state: RootState) => state.homeManagement.projectList
  );
  const unClaimedBills = useSelector(
    (state: RootState) => state.homeManagement.unClaimedBills
  );

  const { detectChange } = useSelector(
    (state: RootState) => state.homeManagement
  );

  useEffect(() => {
    const getProjects = async () => {
      try {
        const res = await projectApi.getAll();
        dispatch(setProjects(res.data));
        const res2 = await invoiceApi.getAll();
        dispatch(setunClaimedBills(res2.data));
        return;
      } catch (err) {
        alert(err);
      }
    };
    getProjects();
  }, [dispatch, detectChange]);

  const deleteProject = async (id: string) => {
    console.log(id);
    try {
      const res = await projectApi.delete(id);
      console.log(res);
      dispatch(refreshProjects());
    } catch (err: any) {
      const errors = err.data.errors;
      console.log(errors);
    }
  };

  return (
    <AppLayout>
      <>
        <Header />
        <></>
        <InputArea />
        {projects.map((project: any) => {
          return (
            <ProjectContainer
              key={project._id}
              projectId={project._id}
              deleteProject={deleteProject}
            />
          );
        })}
        <Divider m="50px" />
        {unClaimedBills.map((item: any) => {
          return <ReadytoClaimContainer key={item._id} id={item._id} />;
        })}
      </>
    </AppLayout>
  );
};
