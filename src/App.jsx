import { useState } from "react";
import ProjectSideBar from "./compoents/ProjectSideBar";
import NewProject from "./compoents/NewProject";
import NoProjectSelected from "./compoents/NoProjectSelected";
import SelectedProject from "./compoents/SelectedProject";

function App() {
  
  const [projectState, SetSelectedProject] = useState( {
    projectSelectedID: undefined,
    projects : [],
    tasks: []
   });

   function handleAddTask(text) {
    SetSelectedProject(prevState => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId : prevState.projectSelectedID,
        id: taskId
       };

      return {
        ...prevState,
        tasks : [newTask, ...prevState.tasks]
      }
    })
   }

   function handleDeleteTask(id) {
    SetSelectedProject((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => 
          task.id !== id)
      }
    })
   }
  
  function handlebuttonNewproject() {
    SetSelectedProject(prevState => {
      return {
        ...prevState,
        projectSelectedID: null,
      }
    })
  }
     // handle l'ajout du project 
   function handleAddProject(projectData) {
  
    SetSelectedProject(prevState => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId
       };

      return {
        ...prevState,
        projectSelectedID: undefined,
        projects : [...prevState.projects, newProject]
      }
    })
   }

   
 // console.log(projectState);
  
 // to handle the button Cancel
 function handleCancelAddProject () {
  SetSelectedProject((prevState) => {
    return{
      ...prevState,
      projectSelectedID:undefined
    }
  })
 }

 function handleSelectedProject(id) {
  SetSelectedProject((prevState) => {
    return {
      ...prevState,
      projectSelectedID: id,
      projects: prevState.projects.filter((project) => 
      project.id !== prevState.projectSelectedID)
    }
  })
 }

 // pour gerer le button delete de SelectedProject
 function handleDeletetedProject () {
  SetSelectedProject((prevState) => {
    return{
      ...prevState,
      projects
    }
  })
 }
   
 // trouver l'element du tableau selectionner
   const selectedproject = projectState.projects.find(project => project.id === projectState.projectSelectedID);
   let content = <SelectedProject 
   project={selectedproject} 
   onDelete={handleDeletetedProject}
   onAddTask={handleAddTask}
   onDeleteTask={handleDeleteTask}
   tasks={projectState.tasks}
   />;

   if(projectState.projectSelectedID === null) {
     content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
   } 
   else if(projectState.projectSelectedID === undefined) 
   {
    content = <NoProjectSelected onslectedButton={handlebuttonNewproject} />
   }
   
  

  return (
    <main className="h-screen my-8 flex gap-8">
     <ProjectSideBar 
     onslectedButton={handlebuttonNewproject} 
     projects={projectState.projects}
     onSelect={handleSelectedProject}
     />
     {content}
    </main>
  );
}

export default App;
